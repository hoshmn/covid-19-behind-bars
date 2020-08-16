import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaHlwZXJvYmpla3QiLCJhIjoiY2pzZ3Bnd3piMGV6YTQzbjVqa3Z3dHQxZyJ9.rHobqsY_BjkNbqNQS4DNYw";

function generateCircleLayer(layer, sizeProp, sizeMapArray) {
  return {
    id: layer.layerId,
    type: "circle",
    source: layer.source,
    ...layer.updater(sizeProp, sizeMapArray),
  };
}

function getLowestCount(features, sizeProp) {
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
    style:
      "mapbox://styles/hyperobjekt/ck7zakd4407nn1imsbmnmaygz",
    center: [-97, 38],
    zoom: 3,
  });

  const layers = [];
  const layerIds = [];
  let state = {};
  let hoveredId = null;

  function addLayer(layerId, source, updater) {
    layers.push({ layerId, source, updater });
    layerIds.push(layerId);
  }

  function addSource(name, geojson) {
    // Add a GeoJSON source with 2 points
    map.addSource(name, {
      type: "geojson",
      data: geojson,
    });
  }

  function update({ sizeProp, sizeMap }) {
    console.log(sizeProp, sizeMap);
    const sizeMapArray = Object.keys(sizeMap).reduce(
      (arrMap, key) => [
        ...arrMap,
        parseInt(key),
        parseInt(sizeMap[key]),
      ],
      []
    );
    state = { sizeProp, sizeMapArray };
    layers
      .map((l) => generateCircleLayer(l, sizeProp, sizeMapArray))
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
      layers: layerIds,
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
    const feature = getLowestCount(features, state.sizeProp);

    var html = renderPopup
      ? renderPopup({ feature, ...state })
      : "";

    // set hovered state
    if (hoveredId) {
      map.setFeatureState(
        { source: "points", id: hoveredId },
        { hover: false }
      );
    }
    hoveredId = feature.id;
    map.setFeatureState(
      { source: "points", id: hoveredId },
      { hover: true }
    );

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
    getMapInstance,
    update,
  };
}
