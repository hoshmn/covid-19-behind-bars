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

export default function MapboxMap(geojson, options) {
  const map = new mapboxgl.Map({
    container: "map",
    style:
      "mapbox://styles/hyperobjekt/ck7zakd4407nn1imsbmnmaygz",
    center: [-97, 38],
    zoom: 3,
  });

  const layers = [];

  function addLayer(layerId, source, updater) {
    layers.push({ layerId, source, updater });
  }

  function addSource(name, geojson) {
    // Add a GeoJSON source with 2 points
    map.addSource(name, {
      type: "geojson",
      data: geojson,
    });
  }

  function update({ subgroup, type, sizeMap }) {
    const sizeProp = [subgroup, type].join(".");
    const sizeMapArray = Object.keys(sizeMap).reduce(
      (arrMap, key) => [
        ...arrMap,
        parseInt(key),
        parseInt(sizeMap[key]),
      ],
      []
    );
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

  return {
    addLayer,
    addSource,
    getMapInstance,
    update,
  };
}
