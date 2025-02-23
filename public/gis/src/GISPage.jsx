import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function GISPage() {
  const [position, setPosition] = useState([-1.2654, 116.8312]);
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchSurveyData = async () => {
      const response = await fetch("YOUR_API_URL");  // Replace with your actual API endpoint
      const data = await response.json();
      setSurveyData(data);
    };

    fetchSurveyData();
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Map Container */}
      <MapContainer center={position} zoom={10} className="w-full h-full">
        {/* Using GLstyle2D */}
        <TileLayer
          url="https://basemap.mapid.io/styles/street-2d-building/style.json?key=67ba966d6fb80e64559cc7a5"
        />
        {/* Loop through survey data to place markers */}
        {surveyData.map((survey, index) => (
          <Marker key={index} position={[survey.lat, survey.lng]}>
            <Popup>{survey.description}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
