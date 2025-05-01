import React from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

const DrawingTool = ({ onCreated, onEdited, onDeleted }) => {
  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        onCreated={onCreated}
        onEdited={onEdited}
        onDeleted={onDeleted}
        draw={{
          rectangle: true,
          polyline: true,
          polygon: true,
          circle: true,
          marker: false,
          circlemarker: false,
        }}
      />
    </FeatureGroup>
  );
};

export default DrawingTool;
