import Data from "../../assets/data/map.csv";
import { autoType, csvParse } from "d3-dsv";
import { extent as getExtent, groups, rollup, sum } from "d3-array";

import {
  PROPERTY_MAP,
  UPPER_CASE,
  VALUE_RANGES,
  STATE_LEVEL_TOTALS,
} from "./config";
import StateCenters from "../../assets/data/state_centers.json";

/**
 * Remap feature props in dataset
 * @param {*} featureProps
 */
function remapProperties(row) {
  return Object.keys(PROPERTY_MAP).reduce((obj, key) => {
    obj[PROPERTY_MAP[key]] = row[key];
    return obj;
  }, {});
}

function addUniqueId(row, index) {
  return { id: index + 1000, ...row };
}

function fixCasing(str) {
  if (!str) return "";

  const result = str
    .toLowerCase()
    .replace(/\b\w/g, (v) => v.toString(v).toUpperCase())
    .split(" ")
    .map((v) =>
      UPPER_CASE.indexOf(v.toLowerCase()) > -1 ? v.toUpperCase() : v
    )
    .join(" ");
  return result;
}

function applyFormat(row) {
  return {
    ...row,
    name: fixCasing(row.name),
    city: fixCasing(row.city),
  };
}

/**
 * Returns data string
 */
export function getData() {
  return csvParse(Data, autoType)
    .map(remapProperties)
    .map(addUniqueId)
    .map(applyFormat);
}

export function getDataByState(data = getData()) {
  const result = groups(data, (d) => d.state);
  return result;
}

/**
 * Gets the state sum for the given data property
 */
export function getStateTotal(propName, data = getData()) {
  return rollup(
    data,
    (v) => (propName === "count" ? v.length : sum(v, (d) => d[propName])),
    (d) => d.state
  );
}

/**
 * Returns a count of the facilities in the data based on
 * if the `countIf` conditional returns true.  By default,
 * it counts all facilities in the state
 * @param {*} data
 * @param {*} countIf
 */
export function getStateCount(data = getData(), countIf = () => true) {
  return rollup(
    data,
    (v) => sum(v, (d) => (countIf(d) ? 1 : 0)),
    (d) => d.state
  );
}

/**
 * Gets a count of how many facilities have "NA" value by state
 * for the given property.
 * @param {*} propName
 * @param {*} data
 */
export function getUnavailableStateTotal(propName, data = getData()) {
  return getStateCount(
    data,
    (d) =>
      (!d[propName] && d[propName] !== 0) ||
      d[propName].toString().toLowerCase() === "na"
  );
}

/**
 * Gets the number of facilities missing geojson data by state
 */
export function getMissingCount(data = getData()) {
  return getStateCount(data, (d) => isNaN(d.lat) || isNaN(d.lon));
}

export function getMapData(data = getData()) {
  return data.filter((row) => !isNaN(row.lat) && !isNaN(row.lon));
}

/**
 * Creates GeoJSON feature collection from the dataset
 * @param {*} data
 */
export function getFacilitiesGeoJson() {
  const features = getMapData().map((row, i) => ({
    id: row.id,
    type: "Feature",
    properties: row,
    geometry: {
      type: "Point",
      coordinates: [row.lon, row.lat],
    },
  }));
  return {
    type: "FeatureCollection",
    features,
  };
}

function addTotalsToGeoJson(
  features,
  data = getData(),
  collector = getStateTotal,
  suffix = ""
) {
  const sumMap = STATE_LEVEL_TOTALS.reduce((obj, propName) => {
    return {
      ...obj,
      [propName]: collector(propName, data),
    };
  }, {});
  sumMap["count"] = getStateCount(data);
  sumMap["missing"] = getMissingCount(data);
  return features.map((f) => {
    const newProps = Object.keys(sumMap).reduce((obj, propName) => {
      const keyName =
        propName === "count" || propName === "missing"
          ? propName
          : propName + suffix;
      return {
        ...obj,
        [keyName]: sumMap[propName].get(f.properties.name),
      };
    }, {});
    return {
      ...f,
      properties: {
        ...f.properties,
        ...newProps,
      },
    };
  });
}

export function getStateCentersGeoJson() {
  const data = getData();
  let features = addTotalsToGeoJson(StateCenters.features, data);
  features = addTotalsToGeoJson(
    features,
    data,
    getUnavailableStateTotal,
    "_na"
  );
  console.log("feature w added", features);
  return {
    type: "FeatureCollection",
    features,
  };
}

/**
 * Returns the extent of the dataset from this list
 * of presets in VALUE_RANGES, or by auto calculating
 * @param {*} dataset
 * @param {*} sizeProp
 */
export const getExtentForProp = function (dataset, sizeProp) {
  if (VALUE_RANGES[sizeProp]) return VALUE_RANGES[sizeProp];
  const selector = (d) => d[sizeProp];
  return getExtent(
    dataset.filter((d) => !isNaN(selector(d))),
    selector
  );
};
