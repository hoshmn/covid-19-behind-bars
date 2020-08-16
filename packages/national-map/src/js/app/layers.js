const NA_COLOR = "rgba(0,0,0,0.3)";
const NA_BORDER_COLOR = "transparent";
const NA_BORDER_WIDTH = 1;
const ZERO_COLOR = "#fff";
const ZERO_BORDER_COLOR = "rgba(44,44,44,0.34)";
const ZERO_BORDER_WIDTH = 1;
const NONZERO_COLOR = "rgba(255,0,0,0.4)";
const NONZERO_BORDER_COLOR = "rgba(255,0,0,0.4)";
const NONZERO_BORDER_WIDTH = 1;

/**
 * Get styles for facilities with non-zero values
 * @param {*} sizeProp
 * @param {*} sizeMapArray
 */
export function getBaseCircleStyle(sizeProp, sizeMapArray) {
  return {
    interactive: true,
    filter: [">", sizeProp, 0],
    paint: {
      "circle-radius": [
        "interpolate",
        ["exponential", 1],
        ["get", sizeProp],
        ...sizeMapArray,
      ],
      "circle-color": NONZERO_COLOR,
      "circle-stroke-color": NONZERO_BORDER_COLOR,
      "circle-stroke-width": NONZERO_BORDER_WIDTH,
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
    filter: ["==", sizeProp, 0],
    paint: {
      "circle-radius": 4,
      "circle-stroke-width": ZERO_BORDER_WIDTH,
      "circle-stroke-color": ZERO_BORDER_COLOR,
      "circle-color": ZERO_COLOR,
    },
  };
}

export function getHoverOutlineStyle(sizeProp, sizeMapArray) {
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
      "circle-color": "transparent",
      "circle-stroke-color": [
        "case",
        [">", ["get", sizeProp], 0],
        "rgba(155, 0, 0, 0.8)",
        "rgba(0, 0, 0, 0.5)",
      ],
      "circle-stroke-width": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        2,
        0,
      ],
    },
  };
}
