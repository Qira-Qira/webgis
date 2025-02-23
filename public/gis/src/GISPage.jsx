import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { Search, Menu } from "lucide-react";

export default function GISPage() {
  const [position, setPosition] = useState([-1.2654, 116.8312]);

  return (
    <div className="relative w-full h-screen">
      {/* Sidebar Button */}
      <button className="absolute top-4 left-4 z-50 p-3 bg-yellow-500 rounded-full shadow-md">
        <Menu size={24} color="white" />
      </button>
      
      {/* Map Container */}
      <MapContainer center={position} zoom={10} className="w-full h-full">
        <TileLayer
          url="https://basemap.mapid.io/styles/street-2d-building/style.json?key=67ba966d6fb80e64559cc7a5"
        />
        <Marker position={position}>
          <Popup>Lokasi Utama</Popup>
        </Marker>
      </MapContainer>

      {/* Search Bar */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-yellow-400 px-5 py-3 flex items-center rounded-full shadow-md w-80">
        <input
          type="text"
          placeholder="Telusuri wilayah di sini"
          className="w-full bg-transparent focus:outline-none text-white placeholder-white"
        />
        <Search size={20} color="white" />
      </div>
    </div>
  );
}
