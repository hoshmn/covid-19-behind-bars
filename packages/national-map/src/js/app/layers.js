const CIRCLE_SMALL = 4;
const CIRCLE_LARGE = 32;
const NA_COLOR = "rgba(0,0,0,0.3)";
const NA_BORDER_COLOR = "transparent";
const NA_BORDER_WIDTH = 1;
const ZERO_COLOR = "#fff";
const ZERO_BORDER_COLOR = "rgba(44,44,44,0.34)";
const ZERO_BORDER_WIDTH = 1;
const NONZERO_COLOR = "rgba(255,0,0,0.4)";
const NONZERO_BORDER_COLOR = "rgba(255,0,0,0.4)";
const NONZERO_BORDER_WIDTH = 1;

export function generateCircleLayer(layer, context) {
  const { sizePropExtent } = context;
  const sizeMap = getSizeMap(sizePropExtent);
  const sizeMapArray = getSizeMapArray(sizeMap);
  return {
    id: layer.layerId,
    type: "circle",
    source: layer.source,
    ...layer.updater({ sizeMapArray, ...context }),
  };
}

/**
 * Returns a map of data value to circle size
 * based on the extent of the dataset
 * @param {*} dataset
 * @param {*} selector
 */
const getSizeMap = function (extent) {
  return {
    1: CIRCLE_SMALL,
    [extent[1]]: CIRCLE_LARGE,
  };
};

const getSizeMapArray = (sizeMap) => {
  return Object.keys(sizeMap).reduce(
    (arrMap, key) => [...arrMap, parseInt(key), parseInt(sizeMap[key])],
    []
  );
};

const resizeSizeMap = (sizeMapArray, sizeFactor) => {
  const result = sizeMapArray.map((v, i) => (i % 2 === 1 ? v * sizeFactor : v));
  console.log("resized", sizeFactor, result);
  return result;
};

const getZoomSizing = (sizeProp, sizeMapArray) => {
  return [
    "interpolate",
    ["linear"],
    ["zoom"],
    1,
    [
      "case",
      ["any", ["==", ["get", sizeProp], 0], ["==", ["get", sizeProp], "NA"]],
      4,
      [
        "interpolate",
        ["exponential", 1],
        ["get", sizeProp],
        ...resizeSizeMap(sizeMapArray, 0.5),
      ],
    ],
    6,
    [
      "case",
      ["any", ["==", ["get", sizeProp], 0], ["==", ["get", sizeProp], "NA"]],
      4,
      [
        "interpolate",
        ["exponential", 1],
        ["get", sizeProp],
        ...resizeSizeMap(sizeMapArray, 1),
      ],
    ],
    14,
    [
      "case",
      ["any", ["==", ["get", sizeProp], 0], ["==", ["get", sizeProp], "NA"]],
      4,
      [
        "interpolate",
        ["exponential", 1],
        ["get", sizeProp],
        ...resizeSizeMap(sizeMapArray, 3),
      ],
    ],
  ];
};

/**
 * Get styles for facilities with non-zero values
 * @param {*} sizeProp
 * @param {*} sizeMapArray
 */
export function getBaseCircleStyle({ sizeProp, sizeMapArray }) {
  return {
    interactive: true,
    filter: [">", sizeProp, 0],
    paint: {
      "circle-radius": getZoomSizing(sizeProp, sizeMapArray),
      "circle-color": NONZERO_COLOR,
      "circle-stroke-color": NONZERO_BORDER_COLOR,
      "circle-stroke-width": NONZERO_BORDER_WIDTH,
    },
  };
}

export function getUnavailableCircleStyle({ sizeProp, sizeMapArray }) {
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

export function getOutlineCircleStyle({ sizeProp }) {
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

export function getHoverOutlineStyle({ sizeProp, sizeMapArray }) {
  return {
    paint: {
      "circle-radius": getZoomSizing(sizeProp, sizeMapArray),
      "circle-color": [
        "case",
        [
          "all",
          ["==", ["get", sizeProp], 0],
          ["boolean", ["feature-state", "hover"], false],
        ],
        "#fff",
        "transparent",
      ],
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

export function getStateLabelStyle({ sizeProp }) {
  return {
    type: "symbol",
    layout: {
      "text-anchor": "center",
      "text-field": [
        "format",
        ["get", "abbr"],
        {
          "font-scale": 0.8,
          "text-color": "#333",
        },
        "\n",
        {},
        ["get", sizeProp],
        {
          "font-scale": 0.8,
          "text-color": "#7d7d7d",
          "text-font": [
            "literal",
            ["DIN Offc Pro Bold", "Arial Unicode MS Regular"],
          ],
        },
      ],
    },
    paint: {
      "text-halo-width": 1,
      "text-halo-color": "#fff",
      "text-halo-blur": 0.5,
    },
  };
}

export function getStateBaseStyle() {
  return {
    type: "fill",
    paint: {
      "fill-color": "transparent",
    },
  };
}

export function getStateOutlineStyle() {
  return {
    type: "line",
    paint: {
      "line-width": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        2,
        0,
      ],
      "line-color": "#666",
    },
  };
}