import MapboxMap from "../map";
import Legend from "../legend";
import {
  getBaseCircleStyle,
  getOutlineCircleStyle,
  getUnavailableCircleStyle,
  getHoverOutlineStyle,
  getStateLabelStyle,
} from "./layers";
import {
  getExtentForProp,
  getMapData,
  getFacilitiesGeoJson,
  getStateCentersGeoJson,
} from "./data";
import MicroModal from "micromodal";
import renderTooltip from "./tooltip";

function App() {
  // state level features
  const statesGeojson = getStateCentersGeoJson();
  // data for the map
  const mapData = getMapData();
  // geojson feature collection for the dataset
  const geojson = getFacilitiesGeoJson();
  console.log(geojson, statesGeojson);
  // map component for the map
  const map = MapboxMap(renderTooltip);
  // mapboxgl instance
  const mapInstance = map.getMapInstance();
  // create legend component
  const mapLegend = Legend();
  // state for the visualization
  let state;

  /**
   * Sets the app state and updates
   * @param {*} newState
   */
  function setState(newState) {
    state = { ...state, ...newState };
    state.sizeProp = [state.subgroup, state.type].join("_");
    state.sizePropExtent = getExtentForProp(mapData, state.sizeProp);
    update();
  }

  /**
   * Updates the map layers and legend
   */
  function update() {
    map.setState(state);
    mapLegend.update(state);
  }

  // add map data source and layers on load
  mapInstance.on("load", () => {
    map.addSource("points", geojson);
    map.addSource("centers", statesGeojson);
    map.addLayer("facilities-na", "points", getUnavailableCircleStyle);
    map.addLayer("facilities-zero", "points", getOutlineCircleStyle);
    map.addLayer("state-labels", "centers", getStateLabelStyle);
    map.addLayer("facilities-non-zero", "points", getBaseCircleStyle);
    map.addLayer("facilities-hover", "points", getHoverOutlineStyle);
    update();
  });

  // initialize default state
  setState({
    subgroup: "res",
    type: "confirmed",
  });

  // initialize population selection
  var populationSelect = document.getElementById("population");
  populationSelect.addEventListener("change", function () {
    setState({ subgroup: this.value });
  });

  // initialize type selection
  var typeSelect = document.getElementById("type");
  typeSelect.addEventListener("change", function () {
    setState({ type: this.value });
  });

  MicroModal.init();
  // MicroModal.show("modal-1");
}

export default App;
