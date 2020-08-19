import { format } from "d3-format";
import { LEGEND_LANG, VALUE_RANGES } from "../app/config";

function Legend() {
  const largeCount = document.getElementById("largeCount");
  const mediumCount = document.getElementById("mediumCount");
  const smallCount = document.getElementById("smallCount");
  const legendTitle = document.getElementById("legendTitle");
  const formatNumber = format(",d");

  function update({ sizePropExtent, sizeProp }) {
    largeCount.innerHTML =
      formatNumber(sizePropExtent[1]) + (VALUE_RANGES[sizeProp] ? "+" : "");
    mediumCount.innerHTML = formatNumber(
      Math.round(parseInt(sizePropExtent[1]) / 2)
    );
    legendTitle.innerHTML = LEGEND_LANG[sizeProp];
  }

  return {
    update,
  };
}

export default Legend;
