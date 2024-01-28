var map = L.map("map").setView([51.505, -0.09], 13);

var osmLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

var satelliteLayer = L.tileLayer(
  "https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=h8NTpndn2rVDOcczKIvP	",
  {
    attribution:
      'MapTiler &copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors',
  }
);

var baseLayers = {
  OpenStreetMap: osmLayer,
  "Satellite Imagery": satelliteLayer,
};

L.control.layers(baseLayers).addTo(map);

osmLayer.addTo(map);

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawOptions = {
  position: "topleft",
  draw: {
    marker: true,
    circle: false,
    circlemarker: false,
    polyline: false,
    polygon: {
      allowIntersection: false,
      drawError: {
        color: "#e1e100",
        message: "<strong>Error:</strong> Polygons cannot intersect!",
      },
      shapeOptions: {
        color: "#3388ff",
      },
    },
    rectangle: {
      shapeOptions: {
        color: "#3388ff",
      },
    },
  },
  edit: {
    featureGroup: drawnItems,
  },
};

var drawControl = new L.Control.Draw(drawOptions);
map.addControl(drawControl);

map.on("draw:created", function (event) {
  var layer = event.layer;
  drawnItems.addLayer(layer);
});
