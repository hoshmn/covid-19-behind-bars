import Data from "../../assets/data/map.csv";
import { autoType, csvParse } from "d3-dsv";

import { extent as getExtent } from "d3-array";

const CIRCLE_SMALL = 4;
const CIRCLE_LARGE = 32;
/**
 * Remap feature props in dataset
 * @param {*} featureProps
 */
function remapProperties(featureProps) {
  return Object.keys(featureProps).reduce();
}

/**
 * Returns data string
 */
export function getData() {
  return csvParse(Data, autoType);
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
    .filter((row) => !isNaN(row.Latitude) && !isNaN(row.Longitude))
    .map((row) => ({
      type: "Feature",
      properties: row,
      geometry: {
        type: "Point",
        coordinates: [row.Longitude, row.Latitude],
      },
    }));
  return {
    type: "FeatureCollection",
    features,
  };
}
