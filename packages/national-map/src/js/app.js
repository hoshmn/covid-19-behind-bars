import * as $ from "jquery";
import * as d3 from "d3";
import Data from "../assets/data/map.csv";
import createMap from "./map";

const CIRCLE_SMALL = 4;
const CIRCLE_LARGE = 32;

function getData() {
  return Data;
}

const getSizeMap = function (dataset, selector) {
  const extent = d3.extent(
    dataset.filter((d) => !isNaN(selector(d))),
    selector
  );
  const sizeMap = {
    1: CIRCLE_SMALL,
    [extent[1]]: CIRCLE_LARGE,
  };
  return sizeMap;
};

function getCoordsForRow(row) {
  return [row.Longitude, row.Latitude];
}

function getGeoJsonFromData(data, getCoords = getCoordsForRow) {
  const features = data
    .filter(
      (row) => !isNaN(row.Latitude) && !isNaN(row.Longitude)
    )
    .map((row) => ({
      type: "Feature",
      properties: row,
      geometry: {
        type: "Point",
        coordinates: getCoords(row),
      },
    }));
  return {
    type: "FeatureCollection",
    features,
  };
}

function getBaseCircleStyle(sizeProp, sizeMapArray) {
  return {
    paint: {
      "circle-radius": [
        "match",
        ["get", sizeProp],
        "NA",
        4,
        [
          "interpolate",
          ["exponential", 1],
          ["get", sizeProp],
          ...sizeMapArray,
        ],
      ],
      "circle-color": [
        "match",
        ["get", sizeProp],
        "NA",
        "rgba(0,0,0,0.3)",
        [
          "match",
          ["get", sizeProp],
          0,
          "rgba(0,255,0,0.4)",
          "rgba(255,0,0,0.4)",
        ],
      ],
    },
  };
}

function App() {
  const formatNumber = d3.format(",d");
  const data = d3
    .csvParse(getData(), d3.autoType)
    .filter(
      (row) => !isNaN(row.Latitude) && !isNaN(row.Longitude)
    );
  let state = {
    subgroup: "Residents",
    type: "Confirmed",
    sizeMap: getSizeMap(data, (d) => d["Residents.Confirmed"]),
  };
  const geojson = getGeoJsonFromData(data);
  const map = createMap(geojson);
  const mapInstance = map.getMapInstance();

  mapInstance.on("load", () => {
    map.addSource("points", geojson);
    map.addLayer("points", "points", getBaseCircleStyle);
    update();
  });

  function updateMap() {
    map.updateCircles(state);
  }

  function updateLegend() {
    const lastKey = Object.keys(state.sizeMap).pop();
    $("#largeCount").html(formatNumber(parseInt(lastKey)));
    $("#mediumCount").html(
      formatNumber(Math.round(parseInt(lastKey) / 2))
    );
  }

  function update() {
    updateMap();
    updateLegend();
  }

  function setState(newState) {
    state = { ...state, ...newState };
    const dataKey = [state.subgroup, state.type].join(".");
    getSizeMap(data, (d) => d[dataKey]);
    state.sizeMap = getSizeMap(data, (d) => d[dataKey]);
    update();
  }

  $("#population").change(function () {
    setState({ subgroup: this.value });
  });

  $("#type").change(function () {
    setState({ type: this.value });
  });
}

export default App;
