import Mustache from "mustache";

function getTooltipData(feature, sizeProp) {
  const [subgroup, type] = sizeProp.split("_");
  return {
    ...feature.properties,
    subgroup,
    type,
  };
}

export default function renderTooltip({ feature, sizeProp }) {
  var template = document.getElementById("tooltipTemplate")
    .innerHTML;
  var rendered = Mustache.render(
    template,
    getTooltipData(feature, sizeProp)
  );
  return rendered;
}
