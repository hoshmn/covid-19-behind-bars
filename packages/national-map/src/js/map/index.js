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

  // Create a popup, but don't add it to the map yet.
  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

  map.on("mousemove", function (e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: layerIds,
    });
    if (!features || features.length === 0) {
      popup.remove();
      return;
    }
    map.getCanvas().style.cursor = "pointer";

    const feature = features[0];
    var coordinates = feature.geometry.coordinates.slice();
    var html = renderPopup
      ? renderPopup({ features, ...state })
      : "<pre>" +
        JSON.stringify(feature.properties, null, 2) +
        "</pre>";

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] +=
        e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.trackPointer().setHTML(html).addTo(map);
    console.log("mousemove", e, features);
  });

  map.on("mouseleave", function (e) {
    console.log("mouseleave", e);
    map.getCanvas().style.cursor = "";
    popup.remove();
  });

  return {
    addLayer,
    addSource,
    getMapInstance,
    update,
  };
}
