import { autoType, csvParse } from "d3-dsv";
import { extent as getExtent, groups, rollup, sum } from "d3-array";

import {
  PROPERTY_MAP,
  UPPER_CASE,
  VALUE_RANGES,
  STATE_LEVEL_TOTALS,
} from "./config";
import StateCenters from "../../assets/data/state_centers.json";
import StateShapes from "../../assets/data/state_shapes.json";

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

/**
 * Adds unique ids to each row based on the index
 */
function addUniqueId(row, index) {
  return { id: index + 1000, ...row };
}

/**
 * Fixes casing on strings THAT ARE ALL UPPERCASE
 * so that They Have Title Casing
 * @param {string} str
 */
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

/**
 * Checks the keys for the provided row to see if they
 * have valid number values.
 * @param {*} row
 * @param {*} keys
 */
function hasValues(row, keys) {
  return keys.reduce(
    (hasCount, key) =>
      hasCount ? (row[key] || row[key] === 0) && row[key] !== "NA" : false,
    true
  );
}

/**
 * Gets the active cases count for the provided group
 * by subtracting recovered from confirmed, if they are available
 * @param {*} row
 * @param {*} group
 */
function getActiveCount(row, group) {
  const confirmedKey = group + "_confirmed";
  const recoveredKey = group + "_recovered";
  return hasValues(row, [confirmedKey, recoveredKey])
    ? row[confirmedKey] - row[recoveredKey]
    : "NA";
}

/**
 * Gets the total count for the provided metric
 * by adding the residents / staff values together, if available
 * @param {*} row
 * @param {*} metric
 */
function getTotalCount(row, metric) {
  const resKey = "res_" + metric;
  const staffKey = "stf_" + metric;
  return hasValues(row, [resKey, staffKey])
    ? row[resKey] + row[staffKey]
    : "NA";
}

/**
 * Gets the infection rate given a row with cases and population data
 */
function getInfectionRates(row) {
  const casesKey = "res_confirmed";
  const popKey = "res_population";
  // no value for cases or population, return NA
  if (!hasValues(row, [casesKey, popKey])) return "NA";
  // cases are more than population, impossible, return NA
  if (row[casesKey] > row[popKey]) return "NA";
  // population is 1 or lower, unlikely, return NA
  if (row[popKey] <= 1) return "NA"
  // return calculated rate
  return row[casesKey] / row[popKey];
}

/**
 * Adds additional metrics to the row that are
 * computed from the base data set. (active counts, rates, and totals)
 * @param {*} row
 */
function addCalculatedMetrics(row) {
  // add active count and rate values to result object
  let result = {
    ...row,
    res_active: getActiveCount(row, "res"),
    stf_active: getActiveCount(row, "stf"),
    res_rate: getInfectionRates(row)
  };
  // add total counts values to result object
  const allCounts = [
    "confirmed",
    "active",
    "tested",
    "deaths",
    "recovered",
  ].reduce((obj, key) => {
    obj["tot_" + key] = getTotalCount(result, key);
    return obj;
  }, result);
  return allCounts;
}

/**
 * Formats the text values in the row
 * @param {*} row
 */
function applyFormat(row) {
  return {
    ...row,
    name: fixCasing(row.name),
    city: fixCasing(row.city),
  };
}

/**
 * Fetches a CSV file
 * @param {*} url
 */
function fetchCSV(url) {
  return fetch(url).then((response) => response.text());
}

/**
 * Returns data string
 */
export function getData() {
  return fetchCSV("./assets/data/map101820.csv").then((data) => {
    const parsed = csvParse(data, autoType)
    console.log('parsed data', parsed)
    return parsed
      // rename properties based on PROPERTY_MAP
      .map(remapProperties)
      // filter out jails
      .filter(d => d.facility && d.facility.toLowerCase() !== "jail")
      // add a unique id for GeoJSON features to use
      .map(addUniqueId)
      // add metrics that are calculated (totals)
      .map(addCalculatedMetrics)
      // format strings
      .map(applyFormat)
  }

  );
}

/**
 * Groups data by state
 * @param {*} data
 */
export function getDataByState(data) {
  const result = groups(data, (d) => d.state);
  return result;
}

/**
 * Gets the state sum for the given data property
 */
export function getStateTotal(propName, data) {
  return rollup(
    data,
    (v) => sum(v, (d) => d[propName]),
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
export function getStateCount(data, countIf = () => true) {
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
export function getUnavailableStateTotal(propName, data) {
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
export function getMissingCount(data) {
  return getStateCount(data, (d) => isNaN(d.lat) || isNaN(d.lon));
}

/**
 * Filters out data that does not have lat / lon
 * and returns the filtered dataset
 * @param {*} data
 */
export function getMapData(data) {
  return data.filter((row) => !isNaN(row.lat) && !isNaN(row.lon));
}

/**
 * Creates GeoJSON feature collection from the dataset
 * @param {*} data
 */
export function getFacilitiesGeoJson(data) {
  const features = data.map((row, i) => ({
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

/**
 * Calculates state level totals for all metrics and
 * returns a GeoJSON object containing the calculated properties.
 * @param {*} features
 * @param {*} data
 * @param {*} collector
 * @param {*} suffix
 */
function addTotalsToGeoJson(
  features,
  data,
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
      const value = sumMap[propName].get(f.properties.name) || "--";
      return {
        ...obj,
        [keyName]: value,
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

/**
 * Returns a GeoJSON objects for state center points and shapes
 * with data populated in properties.
 * @param {*} data
 */
export function getStatesGeoJson(data) {
  let features = addTotalsToGeoJson(StateCenters.features, data);
  features = addTotalsToGeoJson(
    features,
    data,
    getUnavailableStateTotal,
    "_na"
  );
  return {
    centers: {
      type: "FeatureCollection",
      features,
    },
    shapes: {
      type: "FeatureCollection",
      features: features.map((f) => {
        const shapeFeature = StateShapes.features.find(
          (sf) => sf.properties.id === f.properties.id
        );
        if (!shapeFeature)
          throw new Error("no shape feature for id " + f.properties.id);
        return {
          ...shapeFeature,
          properties: {
            ...shapeFeature.properties,
            ...f.properties,
          },
        };
      }),
    },
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
