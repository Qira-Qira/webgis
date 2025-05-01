import { useState, useEffect } from "react";
import axios from "axios";
import MapComponent from "./components/MapComponent";
import SearchOverlay from "./components/SearchOverlay";
import AnalysisSidebar from "./components/AnalysisSidebar";
import DrawingTool from "./components/DrawingTool";
import "leaflet/dist/leaflet.css";

// Fungsi transformasi data GeoJSON properti teko backend
const transformFeatureToLocation = (feature, idx) => {
  const [longitude, latitude] = feature.geometry.coordinates;
  const name = feature.properties.nama_unsur || feature.properties.bangunan || "Tidak ada nama";
  const category = feature.properties.klasifikas
    ? feature.properties.klasifikas.toLowerCase()
    : "lain-lain";
  return {
    _id: String(idx),
    name,
    latitude,
    longitude,
    description: feature.properties.bangunan || "Tidak ada deskripsi",
    category, // misalnya "masjid", "tempat usaha", dll.
    region: `${feature.properties.nm_kel_des || ""} ${feature.properties.nm_kec || ""}`.trim(),
    image: "https://via.placeholder.com/150",
  };
};

function App() {
  // Data properti dari backend
  const [locations, setLocations] = useState([]);
  // Data aset dari backend
  const [assetData, setAssetData] = useState(null);
  const [activeLocation, setActiveLocation] = useState(null);

  // State pencarian
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Overlay kontrol
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [showAnalysisSidebar, setShowAnalysisSidebar] = useState(false);
  const [showDrawingTool, setShowDrawingTool] = useState(false);

  // Analysis filters 
  const [analysisFilters, setAnalysisFilters] = useState({
    masjid: false,
    gereja: false,
    pura: false,
    "sarana pendidikan": false,
    "rumah sakit": false,
    "fasilitas umum": false,
    "tempat usaha": false,
    infrastruktur: false,
    perumahan: false,
    "fasilitas olahraga": false,
    "pariwisata & rekreasi": false,
    "lain-lain": false,
    assets: false,
  });

  // LOGIKA BACKENDDD 

  // Fetch data properti teko backend
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/properti`)
      .then(response => {
        const transformed = response.data[0].features.map((f, i) =>
          transformFeatureToLocation(f, i)
        );
        setLocations(transformed);
      })
      .catch(error => console.error("Error fetching properti data:", error));
  }, []);

  // Fetch data aset (polygon) teko backend
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/hutan`)
      .then(response => {
        const geoJsonData = Array.isArray(response.data)
          ? { type: "FeatureCollection", features: response.data }
          : response.data;
        setAssetData(geoJsonData);

      })
      .catch(error => console.error("Error fetching asset data:", error));
  }, []);

  // Filter properti pencarian 
  const filteredLocations = locations.filter((loc) => {
    const matchName = loc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "" || loc.category === selectedCategory;
    return matchName && matchCategory;
  });

  // Logika marker:
  // - Jika properti sudah dipilih (activeLocation) → tampilkan hanya properti itu.
  // - Jika pencarian aktif → tampilkan hasil pencarian.
  // - Default: tidak ada marker.
  let markerLocations = [];
  if (activeLocation) {
    markerLocations = [activeLocation];
  } else if (searchTerm.trim() !== "" || selectedCategory.trim() !== "") {
    markerLocations = filteredLocations;
  } else {
    markerLocations = [];
  }


  const anyAnalysisActive = Object.values(analysisFilters).some((v) => v === true);
  const displayedLocations = anyAnalysisActive ? [] : markerLocations;


  const searchBoxWidth = activeLocation ? "400px" : "250px";
  const searchBoxValue = activeLocation ? `${activeLocation.name} - ${activeLocation.region}` : "";

  return (
    <div style={{ position: "relative", fontFamily: "Arial, sans-serif", background: "#f9f9f9" }}>
      <MapComponent
        locations={displayedLocations}
        activeLocation={activeLocation}
        analysisFilters={analysisFilters}
        allLocations={locations}
        showDrawingTool={showDrawingTool}
        assetData={assetData}
      />

      {/* Search Box Trigger */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1100,
        }}
      >
        <input
          type="text"
          placeholder="Cari lokasi..."
          value={searchBoxValue}
          onFocus={() => {
            setActiveLocation(null);
            setShowSearchOverlay(true);
          }}
          style={{
            width: searchBoxWidth,
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "1px solid #ddd",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            fontSize: "16px",
            transition: "width 0.3s ease-in-out, all 0.2s ease-in-out",
            cursor: "pointer",
          }}
          readOnly
        />
      </div>

      {showSearchOverlay && (
        <SearchOverlay
          locations={locations}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onLocationClick={(loc) => {
            setActiveLocation(loc);
            setSearchTerm(loc.region);
            setShowSearchOverlay(false);
          }}
          onClose={() => setShowSearchOverlay(false)}
          activeLocation={activeLocation}
        />
      )}

      {/* Analysis Sidebar Trigger */}
      <button
        onClick={() => setShowAnalysisSidebar(true)}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 1100,
          padding: "0.75rem 1.5rem",
          background: "linear-gradient(135deg, #28a745 0%, #1e7e34 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(40, 167, 69, 0.4)",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "10px",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        }}
      >
        Analisis
      </button>

      {showAnalysisSidebar && (
        <AnalysisSidebar
          analysisFilters={analysisFilters}
          setAnalysisFilters={setAnalysisFilters}
          onClose={() => setShowAnalysisSidebar(false)}
        />
      )}

      {/* Drawing Tool Trigger */}
      <button
        onClick={() => setShowDrawingTool((prev) => !prev)}
        style={{
          position: "absolute",
          bottom: "70px",
          left: "20px",
          zIndex: 1100,
          padding: "0.75rem 1.5rem",
          background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(107, 115, 255, 0.4)",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        }}
      >
        {showDrawingTool ? "Tutup Draw" : "Drawing Tool"}
      </button>

      
      {/* dashboard Tool Trigger */}
      <button>
        
      </button>
    </div>
  );
}

export default App;
