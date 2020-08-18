import Mustache from "mustache";
import { UNAVAILABLE_LANG } from "./config";

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

export const selectHoverFeature = (features, state) => {
  if (!features || features.length === 0) return null;
  const pointFeatures = features.filter((f) => f.source === "points");
  const feature =
    pointFeatures.length > 0
      ? getSmallestFeature(pointFeatures, state.sizeProp)
      : getSmallestFeature(features, state.sizeProp);
  return feature;
};

function getTooltipData(feature, sizeProp, isFacility) {
  const [subgroup, type] = sizeProp.split("_");
  // swap "NA" value
  const featureData = Object.keys(feature.properties).reduce((obj, key) => {
    return {
      ...obj,
      [key]: feature.properties[key] === "NA" ? "--" : feature.properties[key],
    };
  });
  const result = {
    ...featureData,
    subgroup,
    type,
    isFacility,
  };
  // add facility data if needed
  if (!isFacility) {
    result["na_count"] = feature.properties[sizeProp + "_na"];
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
