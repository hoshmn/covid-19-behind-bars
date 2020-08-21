import mapboxgl from "mapbox-gl";
import { generateCircleLayer } from "../app/layers";
import bbox from "@turf/bbox";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaHlwZXJvYmpla3QiLCJhIjoiY2pzZ3Bnd3piMGV6YTQzbjVqa3Z3dHQxZyJ9.rHobqsY_BjkNbqNQS4DNYw";

const defaultSelectHoverFeature = (features) => features[0];

export default function MapboxMap({
  renderTooltip,
  selectHoverFeature = defaultSelectHoverFeature,
}) {
  const map = new mapboxgl.Map({
    container: "map",
    style:
      "mapbox://styles/hyperobjekt/cke1roqr302yq19jnlpc8dgr9",
    center: [-97, 38],
    zoom: 3,
  });

  map.addControl(new mapboxgl.NavigationControl());

  let state = {
    layers: [],
    layerIds: [],
    sizeProp: "res_confirmed",
    sizePropExtent: [1, 100],
  };
  let hoveredFeature = null;

  /**
   * Sets the map state and updates
   * @param {*} newState
   */
  function setState(newState) {
    state = { ...state, ...newState };
    state.hoverLayers = state.layers
      .filter((l) => l.hover)
      .map((l) => l.layerId);
    update(state);
  }

  function addLayer(layerId, source, updater, hover = true) {
    const layers = [
      ...state.layers,
      { layerId, source, updater, hover },
    ];
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
      .map((l) =>
        generateCircleLayer(l, { sizeProp, sizePropExtent })
      )
      .forEach((l) => {
        map.getLayer(l.id) && map.removeLayer(l.id);
        l.id.includes("bg")
          ? map.addLayer(l, "waterway")
          : map.addLayer(l);
      });
  }

  function getMapInstance() {
    return map;
  }

  var popupOffsets = {
    "top": [0, 12],
    "top-left": [12, 12],
    "top-right": [-12, 12],
    "bottom": [0, -12],
    "bottom-left": [12, -12],
    "bottom-right": [-12, -12],
    "left": [12, 0],
    "right": [-12, 0],
  };

  // Create a popup, but don't add it to the map yet.
  var popup = new mapboxgl.Popup({
    offset: popupOffsets,
    closeButton: false,
    closeOnClick: false,
  });

  map.on("mousemove", function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: state.hoverLayers,
    });
    const feature = selectHoverFeature(features, state);
    if (!feature) {
      popup.remove();
      if (hoveredFeature) {
        map.setFeatureState(
          {
            source: hoveredFeature.source,
            id: hoveredFeature.id,
          },
          { hover: false }
        );
      }
      return;
    }
    map.getCanvas().style.cursor = "pointer";
    var html = renderTooltip
      ? renderTooltip({ feature, ...state })
      : null;

    // set hovered state
    if (hoveredFeature) {
      map.setFeatureState(
        { source: hoveredFeature.source, id: hoveredFeature.id },
        { hover: false }
      );
    }
    hoveredFeature = feature;
    map.setFeatureState(
      { source: feature.source, id: feature.id },
      { hover: true }
    );
    if (html) popup.trackPointer().setHTML(html).addTo(map);
  });

  map.on("mouseleave", function (e) {
    map.getCanvas().style.cursor = "";
    popup.remove();
    // remove hovered state
    if (hoveredFeature) {
      map.setFeatureState(
        { source: hoveredFeature.source, id: hoveredFeature.id },
        { hover: false }
      );
    }
    hoveredFeature = null;
  });

  map.on("click", function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: state.hoverLayers,
    });
    const feature = selectHoverFeature(features, state);
    if (!feature) return;
    if (feature.source === "state-shapes") {
      var bounds = bbox(feature);
      map.fitBounds(bounds);
    }
    if (feature.source === "points") {
      map.flyTo({
        center: feature.geometry.coordinates,
        zoom: 8,
      });
    }
  });

  return {
    addLayer,
    addSource,
    setState,
    getMapInstance,
    update,
  };
}
