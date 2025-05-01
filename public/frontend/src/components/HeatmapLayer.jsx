import React from "react";
import HeatmapLayer from "react-leaflet-heatmap-layer";

// Contoh data heatmap: array [lat, lng, intensity]
const sampleHeatmapData = [
  [ -0.92755057, 116.78855973, 0.8 ],
  [ -1.19283195, 116.61224021, 0.6 ],
  [ -1.19269616, 116.61166496, 0.7 ],
  [ -1.19234432, 116.61874793, 0.9 ],
  [ -1.1921896,  116.61223131, 0.5 ],
];

const HeatmapLayerComponent = ({ points = sampleHeatmapData }) => {
  return (
    <HeatmapLayer
      fitBoundsOnLoad
      fitBoundsOnUpdate
      points={points}
      longitudeExtractor={(m) => m[1]}
      latitudeExtractor={(m) => m[0]}
      intensityExtractor={(m) => m[2]}
      max={1}
      radius={25}
      blur={15}
      gradient={{
        0.4: "blue",
        0.65: "lime",
        1: "red"
      }}
    />
  );
};

export default HeatmapLayerComponent;
