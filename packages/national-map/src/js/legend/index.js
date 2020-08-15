import { format } from "d3-format";

function Legend() {
  const largeCount = document.getElementById("largeCount");
  const mediumCount = document.getElementById("mediumCount");
  const smallCount = document.getElementById("smallCount");
  const formatNumber = format(",d");

  function update({ sizeMap }) {
    const lastKey = Object.keys(sizeMap).pop();
    largeCount.innerHTML = formatNumber(parseInt(lastKey));
    mediumCount.innerHTML = formatNumber(
      Math.round(parseInt(lastKey) / 2)
    );
  }

  return {
    update,
  };
}

export default Legend;
