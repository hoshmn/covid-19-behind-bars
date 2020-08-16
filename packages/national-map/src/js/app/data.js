import Data from "../../assets/data/map.csv";
import { autoType, csvParse } from "d3-dsv";

import { extent as getExtent } from "d3-array";
import { PROPERTY_MAP, UPPER_CASE } from "./config";

const CIRCLE_SMALL = 4;
const CIRCLE_LARGE = 32;
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
 * Returns a map of data value to circle size
 * based on the extent of the dataset
 * @param {*} dataset
 * @param {*} selector
 */
export const getSizeMap = function (dataset, selector) {
  const extent = getExtent(
    dataset.filter((d) => !isNaN(selector(d))),
    selector
  );
  const sizeMap = {
    1: CIRCLE_SMALL,
    [extent[1]]: CIRCLE_LARGE,
  };
  return sizeMap;
};

/**
 * Creates GeoJSON feature collection from the dataset
 * @param {*} data
 */
export function getGeoJsonFromData(data) {
  const features = data
    .filter((row) => !isNaN(row.lat) && !isNaN(row.lon))
    .map((row, i) => ({
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
