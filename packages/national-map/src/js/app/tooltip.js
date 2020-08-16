import Mustache from "mustache";
import { PROPERTY_MAP } from "./config";

function getLowestCount(features, sizeProp) {
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
  return feature;
}

function getTooltipData(feature, sizeProp) {
  const [subgroup, type] = sizeProp.split("_");
  return {
    ...feature.properties,
    subgroup,
    type,
  };
}

export default function renderTooltip({ features, sizeProp }) {
  var template = document.getElementById("tooltipTemplate")
    .innerHTML;
  var feature = getLowestCount(features, sizeProp);
  var rendered = Mustache.render(
    template,
    getTooltipData(feature, sizeProp)
  );
  return rendered;
}
