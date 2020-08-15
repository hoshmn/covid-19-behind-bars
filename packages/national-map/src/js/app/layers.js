const NA_COLOR = "rgba(0,0,0,0.3)";
const NA_BORDER_COLOR = "transparent";
const NA_BORDER_WIDTH = 1;
const ZERO_COLOR = "#fff";
const ZERO_BORDER_COLOR = "rgba(44,44,44,0.34)";
const NONZERO_COLOR = "rgba(255,0,0,0.4)";
const NONZERO_BORDER_COLOR = "rgba(255,0,0,0.4)";

/**
 * Get styles for facilities with non-zero values
 * @param {*} sizeProp
 * @param {*} sizeMapArray
 */
export function getBaseCircleStyle(sizeProp, sizeMapArray) {
  return {
    filter: [">", sizeProp, 0],
    paint: {
      "circle-radius": [
        "case",
        ["==", ["get", sizeProp], "NA"],
        0,
        ["==", ["get", sizeProp], 0],
        0,
        [
          "interpolate",
          ["exponential", 1],
          ["get", sizeProp],
          ...sizeMapArray,
        ],
      ],
      "circle-color": "rgba(255,0,0,0.4)",
    },
  };
}

export function getUnavailableCircleStyle(
  sizeProp,
  sizeMapArray
) {
  return {
    filter: ["==", sizeProp, "NA"],
    paint: {
      "circle-radius": 4,
      "circle-color": NA_COLOR,
      "circle-stroke-color": NA_BORDER_COLOR,
      "circle-stroke-width": NA_BORDER_WIDTH,
    },
  };
}

export function getOutlineCircleStyle(sizeProp, sizeMapArray) {
  return {
    paint: {
      "circle-radius": [
        "case",
        ["==", ["get", sizeProp], "NA"],
        4,
        ["==", ["get", sizeProp], 0],
        4,
        [
          "interpolate",
          ["exponential", 1],
          ["get", sizeProp],
          ...sizeMapArray,
        ],
      ],
      "circle-stroke-width": 1,
      "circle-stroke-color": [
        "case",
        ["==", ["get", sizeProp], "NA"],
        "rgba(0,0,0,0)",
        ["==", ["get", sizeProp], 0],
        "rgba(44,44,44,0.34)",
        "rgba(255,0,0,0)",
      ],
      "circle-color": [
        "case",
        ["==", ["get", sizeProp], 0],
        "#fff",
        "rgba(0,0,0,0)",
      ],
    },
  };
}
