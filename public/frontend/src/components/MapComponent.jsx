import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  GeoJSON,
  useMap,
  useMapEvents,
} from "react-leaflet";
import DrawingTool from "./DrawingTool"; // Pastikan path benar
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

// Impor GeoJSON sudah otomatis dengan bundler
// Default marker icon
const defaultIcon = new Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const analysisStyleMapping = {
  masjid: { color: "blue", baseRadius: 25 },
  gereja: { color: "purple", baseRadius: 25 },
  pura: { color: "orange", baseRadius: 25 },
  "sarana pendidikan": { color: "yellow", baseRadius: 25 },
  "rumah sakit": { color: "red", baseRadius: 25 },
  "fasilitas umum": { color: "gray", baseRadius: 25 },
  "tempat usaha": { color: "darkorange", baseRadius: 25 },
  infrastruktur: { color: "brown", baseRadius: 25 },
  perumahan: { color: "green", baseRadius: 25 },
  "fasilitas olahraga": { color: "magenta", baseRadius: 25 },
  "pariwisata & rekreasi": { color: "teal", baseRadius: 25 },
  "lain-lain": { color: "black", baseRadius: 25 },
};

function ChangeView({ center, zoom }) {
  const map = useMap();
  const prevCenterRef = useRef(null);
  useEffect(() => {
    if (center) {
      if (!prevCenterRef.current || prevCenterRef.current[0] !== center[0] || prevCenterRef.current[1] !== center[1]) {
        map.flyTo(center, zoom, { duration: 1.5 });
        prevCenterRef.current = center;
      }
    }
  }, [center, zoom, map]);
  return null;
}

function MouseCoordinates({ setCoords }) {
  const throttleRef = useRef(0);
  useMapEvents({
    mousemove: (e) => {
      const now = Date.now();
      if (now - throttleRef.current > 200) {
        setCoords(e.latlng);
        throttleRef.current = now;
      }
    },
  });
  return null;
}

function CoordinatesDisplay({ coords }) {
  const map = useMap();
  const zoom = map.getZoom();
  const style = {
    position: "absolute",
    bottom: "10px",
    left: "10px",
    background: "rgba(255, 255, 255, 0.8)",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    fontSize: "14px",
    zIndex: 1100,
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    pointerEvents: "none",
  };
  return (
    <div style={style}>
      {coords
        ? `Lat: ${coords.lat.toFixed(4)}, Lng: ${coords.lng.toFixed(4)} | Zoom: ${zoom}`
        : "Gerakkan kursor di peta"}
    </div>
  );
}

const MapComponent = ({
  locations,
  activeLocation,
  analysisFilters,
  allLocations,
  showDrawingTool,
  assetData,
}) => {
  const defaultCenter = [-0.92755057, 116.78855973];
  const [currentCoords, setCurrentCoords] = useState(null);

  const dataForAnalysis = allLocations || [];

  const overlayData = {};
  Object.keys(analysisStyleMapping).forEach((cat) => {
    if (analysisFilters[cat]) {
      overlayData[cat] = dataForAnalysis.filter((loc) => loc.category === cat);
    }
  });

  return (
    <MapContainer center={defaultCenter} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {activeLocation && (
        <ChangeView center={[activeLocation.latitude, activeLocation.longitude]} zoom={16} />
      )}

      <MouseCoordinates setCoords={setCurrentCoords} />
      <CoordinatesDisplay coords={currentCoords} />

      {/* Render marker properti hasil pencarian */}
      {locations.map((loc) => (
        <Marker key={loc._id} position={[loc.latitude, loc.longitude]} icon={defaultIcon}>
          <Popup>
            <div style={{ textAlign: "center" }}>
              <h3>{loc.name}</h3>
              <p>Kategori: {loc.category}</p>
              <p>Daerah: {loc.region}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Render overlay CircleMarker untuk properti analysis */}
      {Object.keys(overlayData).map((cat) =>
        overlayData[cat].map((loc) => {
          const { color, baseRadius } = analysisStyleMapping[cat];
          return (
            <CircleMarker
              key={`${cat}-${loc._id}`}
              center={[loc.latitude, loc.longitude]}
              radius={baseRadius}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: 0.8,
                weight: 4,
                opacity: 1,
              }}
            />
          );
        })
      )}

      {/* Render overlay assets (polygon) jika filter assets aktif */}
      {analysisFilters.assets && assetData && assetData.type === "FeatureCollection" && (
        <GeoJSON
          data={assetData}
          style={(feature) => {
            // Misal, gunakan properti 'ket' untuk menentukan style warna; jika tidak, pakai default
            const ket = feature.properties.ket ? feature.properties.ket.toLowerCase() : "";
            const colorMapping = {
              perairan: "teal",
              default: "green",
            };
            const chosenColor = colorMapping[ket] || colorMapping.default;
            return {
              color: chosenColor,
              weight: 3,
              fillColor: chosenColor,
              fillOpacity: 0.6,
            };
          }}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(
              `<strong>${feature.properties.name || "Asset Area"}</strong><br/>${feature.properties.ket || ""}`
            );
          }}
        />
      )}

      {/* Render DrawingTool di dalam MapContainer */}
      {showDrawingTool && (
        <DrawingTool
          onCreated={(e) => console.log("Created:", e)}
          onEdited={(e) => console.log("Edited:", e)}
          onDeleted={(e) => console.log("Deleted:", e)}
        />
      )}
    </MapContainer>
  );
};

export default MapComponent;
