import { format } from "d3-format";
import { LEGEND_LANG, VALUE_RANGES } from "../app/config";

const formatNumber = format(",d");
const formatPercent = format(".0%");

function getFormatter(sizeProp) {
  switch (sizeProp) {
    case "res_rate":
      return formatPercent;
    default:
      return formatNumber;
  }
}

function Legend() {
  const largeCount = document.getElementById("largeCount");
  const mediumCount = document.getElementById("mediumCount");
  const smallCount = document.getElementById("smallCount");
  const legendTitle = document.getElementById("legendTitle");
  

  function update({ sizePropExtent, sizeProp }) {
    const formatter = getFormatter(sizeProp)
    largeCount.innerHTML =
      formatter(sizePropExtent[1]) + (VALUE_RANGES[sizeProp] ? "+" : "");
    mediumCount.innerHTML = formatter(sizePropExtent[1] / 2);
    smallCount.innerHTML = formatter(sizePropExtent[0])
    legendTitle.innerHTML = LEGEND_LANG[sizeProp];
  }

  return {
    update,
  };
}

export default Legend;
