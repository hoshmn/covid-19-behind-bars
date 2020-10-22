import Mustache from "mustache";
import { UNAVAILABLE_LANG } from "./config";
import { format } from "d3-format";

const formatNumber = format(",d");
const formatPercent = format(".0%");

/**
 * Returns the feature with the lowest value for the given size prop (smallest circle)
 * @param {*} features
 * @param {*} sizeProp
 */
function getSmallestFeature(features, sizeProp) {
  let lowest = Number.MAX_SAFE_INTEGER;
  let feature = null;
  for (let i = 0; i < features.length; i++) {
    let value = features[i].properties[sizeProp];
    if (value === 0) return features[i];
    if (value === "NA") return features[i];
    if (value < lowest) {
      lowest = value;
      feature = features[i];
    }
  }
  return feature || features[0];
}

/**
 * Selects the feature that should receive hovered state when hovering
 * over a group of features
 * @param {*} features
 * @param {*} state
 */
export const selectHoverFeature = (features, state) => {
  if (!features || features.length === 0) return null;
  const pointFeatures = features.filter((f) => f.source === "points");
  const feature =
    pointFeatures.length > 0
      ? getSmallestFeature(pointFeatures, state.sizeProp)
      : getSmallestFeature(features, state.sizeProp);
  return feature;
};

/**
 * Returns the data required in order to populate the tooltip
 * @param {*} feature
 * @param {*} sizeProp
 * @param {*} isFacility
 */
function getTooltipData(feature, sizeProp, isFacility) {
  const [subgroup, type] = sizeProp.split("_");
  // swap "NA" value
  const featureData = Object.keys(feature.properties).reduce((obj, key) => {
    return {
      ...obj,
      [key]: feature.properties[key] === "NA" ? "--" : feature.properties[key],
    };
  });
  // update missing value
  const missingCount = featureData["missing"];
  featureData["missing"] =
    missingCount === "--" || missingCount === 0 ? false : missingCount;
  // format numbers
  Object.keys(featureData).forEach((k) => {
    if (isNaN(featureData[k])) return
    if (k === "res_rate") {
      featureData[k] = formatPercent(featureData[k])
    } else {
      featureData[k] = formatNumber(featureData[k]);
    }
    
  });
  // add subgroup, type and if it is a facility to the data
  const result = {
    ...featureData,
    subgroup,
    type,
    isFacility,
  };
  // add facility data if needed
  if (!isFacility) {
    const naCount = featureData[sizeProp + "_na"];
    result["na_count"] = naCount === "--" || naCount === 0 ? false : naCount;
    result["na_lang"] = UNAVAILABLE_LANG[sizeProp];
  }

  return result;
}

export function renderTooltip({ feature, sizeProp }) {
  const isFacility = feature.source === "points";
  const template = document.getElementById("tooltipTemplate").innerHTML;
  const data = getTooltipData(feature, sizeProp, isFacility);
  const rendered = Mustache.render(template, data);
  return rendered;
}
