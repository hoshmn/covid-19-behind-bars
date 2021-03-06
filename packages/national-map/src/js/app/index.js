import MapboxMap from "../map";
import Legend from "../legend";
import {
  getBaseCircleStyle,
  getOutlineCircleStyle,
  getUnavailableCircleStyle,
  getHoverOutlineStyle,
  getStateLabelStyle,
  getStateBaseStyle,
  getStateOutlineStyle,
  getStateBgStyle,
} from "./layers";
import {
  getExtentForProp,
  getData,
  getMapData,
  getFacilitiesGeoJson,
  getStatesGeoJson,
} from "./data";
import MicroModal from "micromodal";
import { selectHoverFeature, renderTooltip } from "./tooltip";
import { ButtonGroup } from "../ui/button-group";
import { POPULATION_OPTIONS, TYPE_OPTIONS } from "./config";

function App() {
  // map component for the map
  const map = MapboxMap({ renderTooltip, selectHoverFeature });
  // mapboxgl instance
  const mapInstance = map.getMapInstance();
  // create legend component
  const mapLegend = Legend({
    root: document.getElementById("legend"),
  });
  // modal button DOM element
  const modalButton = document.getElementById("openModalButton");
  // state for the visualization
  let state;

  // initialize population selection
  var populationButtonGroup = ButtonGroup({
    root: document.getElementById("populationButtonGroup"),
    buttons: POPULATION_OPTIONS,
    onSelect: handlePopulationSelect,
  });

  var typeButtonGroup = ButtonGroup({
    root: document.getElementById("typeButtonGroup"),
    buttons: TYPE_OPTIONS,
    onSelect: handleTypeSelect,
  });

  /**
   * Sets the app state and updates
   * @param {*} newState
   */
  function setState(newState) {
    state = { ...state, ...newState };
    state.sizeProp = [state.subgroup, state.type].join("_");
    state.sizePropExtent = getExtentForProp(state.mapData, state.sizeProp);
    update();
  }

  /**
   * Updates the map layers and legend
   */
  function update() {
    map.setState(state);
    mapLegend.update(state);
  }

  function handlePopulationSelect(event, button) {
    setState({ subgroup: button.value });
  }

  function handleTypeSelect(event, button) {
    setState({ type: button.value });
  }

  function handleShowInfo() {
    MicroModal.show("introModal", {
      awaitCloseAnimation: true,
    });
  }

  function init() {
    getData().then((data) => {
      console.log('got data', data, data.map(d => d["res_rate"]))
      // data for the map
      const mapData = getMapData(data);
      // state level features
      const { centers, shapes } = getStatesGeoJson(data);
      // geojson feature collection for the dataset
      const geojson = getFacilitiesGeoJson(data);
      // add map data source and layers on load
      mapInstance.on("load", () => {
        map.addSource("points", geojson);
        map.addSource("state-centers", centers);
        map.addSource("state-shapes", shapes);
        map.addLayer("state-bg", "state-shapes", getStateBgStyle, false);
        map.addLayer("state-shapes", "state-shapes", getStateBaseStyle);
        map.addLayer(
          "state-outline",
          "state-shapes",
          getStateOutlineStyle,
          false
        );
        map.addLayer("facilities-na", "points", getUnavailableCircleStyle);
        map.addLayer("facilities-zero", "points", getOutlineCircleStyle);
        map.addLayer("facilities-non-zero", "points", getBaseCircleStyle);
        map.addLayer(
          "state-labels",
          "state-centers",
          getStateLabelStyle,
          false
        );
        map.addLayer("facilities-hover", "points", getHoverOutlineStyle, false);
        update();
        const loaderEl = document.getElementById("loading");
        loaderEl.classList.add("loading--complete");
        setTimeout(function () {
          loaderEl.classList.add("hide");
        }, 1000);
      });
      // initialize default state
      setState({
        subgroup: "res",
        type: "rate",
        mapData,
        geojson,
        centers,
        shapes,
      });
      MicroModal.init({
        awaitCloseAnimation: true,
      });
      MicroModal.show("introModal", {
        awaitCloseAnimation: true,
      });
      modalButton.addEventListener("click", handleShowInfo);
    });
  }

  init();
}

export default App;
