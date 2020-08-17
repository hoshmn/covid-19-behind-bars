import mapboxgl from "mapbox-gl";
import { generateCircleLayer } from "../app/layers";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaHlwZXJvYmpla3QiLCJhIjoiY2pzZ3Bnd3piMGV6YTQzbjVqa3Z3dHQxZyJ9.rHobqsY_BjkNbqNQS4DNYw";

/**
 * Returns the feature with the lowest value for the given size prop (smallest circle)
 * @param {*} features
 * @param {*} sizeProp
 */
function getSmallestFeature(features, sizeProp) {
  let lowest = Number.MAX_SAFE_INTEGER;
  let feature = null;
  for (let i = 0; i < features.length; i++) {
    let value = features[i].properties[sizeProp];
    if (value === 0) return features[i];
    if (value === "NA") return features[i];
    if (value < lowest) {
      lowest = value;
      feature = features[i];
    }
  }
  return feature;
}

export default function MapboxMap(renderPopup) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/hyperobjekt/ck7zakd4407nn1imsbmnmaygz",
    center: [-97, 38],
    zoom: 3,
  });

  let state = {
    layers: [],
    layerIds: [],
    sizeProp: "res_confirmed",
    sizePropExtent: [1, 100],
  };
  let hoveredId = null;

  /**
   * Sets the map state and updates
   * @param {*} newState
   */
  function setState(newState) {
    state = { ...state, ...newState };
    state.layerIds = state.layers.map((l) => l.layerId);
    update(state);
    console.log("update map state", state);
  }

  function addLayer(layerId, source, updater) {
    const layers = [...state.layers, { layerId, source, updater }];
    setState({ layers });
  }

  function addSource(name, geojson) {
    // Add a GeoJSON source with 2 points
    map.addSource(name, {
      type: "geojson",
      data: geojson,
    });
    const data = { ...state.data, [name]: geojson };
    setState({ data });
  }

  function update() {
    const { layers, sizeProp, sizePropExtent } = state;
    layers
      .map((l) => generateCircleLayer(l, { sizeProp, sizePropExtent }))
      .forEach((l) => {
        console.log("updating layer", l.id);
        map.getLayer(l.id) && map.removeLayer(l.id);
        map.addLayer(l);
      });
  }

  function getMapInstance() {
    return map;
  }

  var popupOffsets = {
    top: [0, 12],
    "top-left": [12, 12],
    "top-right": [-12, 12],
    bottom: [0, -12],
    "bottom-left": [12, -12],
    "bottom-right": [-12, -12],
    left: [12, 0],
    right: [-12, 0],
  };

  // Create a popup, but don't add it to the map yet.
  var popup = new mapboxgl.Popup({
    offset: popupOffsets,
    closeButton: false,
    closeOnClick: false,
  });

  map.on("mousemove", function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: state.layerIds,
    });
    if (!features || features.length === 0) {
      popup.remove();
      if (hoveredId) {
        map.setFeatureState(
          { source: "points", id: hoveredId },
          { hover: false }
        );
      }
      return;
    }
    map.getCanvas().style.cursor = "pointer";
    const feature = getSmallestFeature(features, state.sizeProp);

    var html = renderPopup ? renderPopup({ feature, ...state }) : "";

    // set hovered state
    if (hoveredId) {
      map.setFeatureState(
        { source: "points", id: hoveredId },
        { hover: false }
      );
    }
    hoveredId = feature.id;
    map.setFeatureState({ source: "points", id: hoveredId }, { hover: true });

    popup.trackPointer().setHTML(html).addTo(map);
  });

  map.on("mouseleave", function (e) {
    map.getCanvas().style.cursor = "";
    popup.remove();
    // remove hovered state
    if (hoveredId) {
      map.setFeatureState(
        { source: "points", id: hoveredId },
        { hover: false }
      );
    }
    hoveredId = null;
  });

  return {
    addLayer,
    addSource,
    setState,
    getMapInstance,
    update,
  };
}
