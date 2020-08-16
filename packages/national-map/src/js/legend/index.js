import { format } from "d3-format";

function Legend() {
  const largeCount = document.getElementById("largeCount");
  const mediumCount = document.getElementById("mediumCount");
  const smallCount = document.getElementById("smallCount");
  const formatNumber = format(",d");

  function update({ sizePropExtent }) {
    largeCount.innerHTML = formatNumber(sizePropExtent[1]);
    mediumCount.innerHTML = formatNumber(
      Math.round(parseInt(sizePropExtent[1]) / 2)
    );
  }

  return {
    update,
  };
}

export default Legend;
