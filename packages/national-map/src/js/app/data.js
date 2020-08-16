import Data from "../../assets/data/map.csv";
import { autoType, csvParse } from "d3-dsv";
import { extent as getExtent } from "d3-array";

import {
  PROPERTY_MAP,
  UPPER_CASE,
  VALUE_RANGES,
} from "./config";

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
  return { id: index, ...row };
}

function fixCasing(str) {
  if (!str) return "";

  const result = str
    .toLowerCase()
    .replace(/\b\w/g, (v) => v.toString(v).toUpperCase())
    .split(" ")
    .map((v) =>
      UPPER_CASE.indexOf(v.toLowerCase()) > -1
        ? v.toUpperCase()
        : v
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

/**
 * Creates GeoJSON feature collection from the dataset
 * @param {*} data
 */
export function getGeoJsonFromData(data) {
  const features = data
    .filter((row) => !isNaN(row.lat) && !isNaN(row.lon))
    .map((row, i) => ({
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
