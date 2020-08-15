import Mustache from "mustache";
import { PROPERTY_MAP } from "./config";

export default function renderTooltip({ features, sizeProp }) {
  var template = document.getElementById("tooltipTemplate").innerHTML;
  var feature = features[0];
  var rendered = Mustache.render(template, features[0].properties);
  return rendered;
}
