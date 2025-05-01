import { useState } from "react";

const sidebarStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  width: "360px",
  height: "100vh",
  background: "#1C1C1C",
  boxShadow: "-4px 0 12px rgba(0,0,0,0.5)",
  zIndex: 1200,
  padding: "1rem 1.5rem",
  display: "flex",
  flexDirection: "column",
};

const closeButtonStyle = {
  alignSelf: "flex-end",
  background: "transparent",
  border: "none",
  fontSize: "24px",
  cursor: "pointer",
  color: "#bbb",
};

const headerStyle = {
  textAlign: "center",
  margin: "0.5rem 0 1rem",
  color: "#fff",
};

const tabsContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "1rem",
};

const tabStyle = (active) => ({
  flex: 1,
  margin: "0 0.2rem",
  padding: "0.5rem",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  color: active ? "#fff" : "#ccc",
  background: active ? "#6B73FF" : "#2F2F2F",
  transition: "background 0.3s ease, color 0.3s ease",
});

const contentStyle = {
  flex: 1,
  overflowY: "auto",
  padding: "0.5rem",
  borderRadius: "6px",
  background: "#2F2F2F",
};

const labelStyle = {
  display: "block",
  marginBottom: "1rem",
  color: "#ccc",
  fontSize: "15px",
};

const checkboxStyle = {
  marginRight: "0.5rem",
};

const AnalysisSidebar = ({ analysisFilters, setAnalysisFilters, onClose }) => {
  const [activeTab, setActiveTab] = useState("properti");

  const handleCheckboxChange = (key) => {
    setAnalysisFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderPropertiTab = () => (
    <div style={{ marginTop: "0.5rem" }}>
      <label style={labelStyle}>
        <input
          type="checkbox"
          checked={analysisFilters.masjid}
          onChange={() => handleCheckboxChange("masjid")}
          style={checkboxStyle}
        />
        Tampilkan Analisis Masjid
      </label>
      {/* Bisa tambahin checkbox lain terkait properti */}
    </div>
  );

  const renderBencanaTab = () => (
    <div style={{ marginTop: "0.5rem" }}>
      <label style={labelStyle}>
        <input
          type="checkbox"
          checked={analysisFilters.banjir}
          onChange={() => handleCheckboxChange("banjir")}
          style={checkboxStyle}
        />
        Analisis Banjir
      </label>
      <label style={labelStyle}>
        <input
          type="checkbox"
          checked={analysisFilters.gempa}
          onChange={() => handleCheckboxChange("gempa")}
          style={checkboxStyle}
        />
        Analisis Gempa
      </label>
      <label style={labelStyle}>
        <input
          type="checkbox"
          checked={analysisFilters.tsunami}
          onChange={() => handleCheckboxChange("tsunami")}
          style={checkboxStyle}
        />
        Analisis Tsunami
      </label>
    </div>
  );

  const renderAssetTab = () => (
    <div style={{ marginTop: "0.5rem" }}>
      <label style={labelStyle}>
        <input
          type="checkbox"
          checked={analysisFilters.kepadatan}
          onChange={() => handleCheckboxChange("kepadatan")}
          style={checkboxStyle}
        />
        Kepadatan Penduduk
      </label>
      <label style={labelStyle}>
        <input
          type="checkbox"
          checked={analysisFilters.hutan}
          onChange={() => handleCheckboxChange("hutan")}
          style={checkboxStyle}
        />
        Luas Hutan
      </label>
      {/* Tambah lagi kalau ada asset lain */}
    </div>
  );

  const renderContent = () => {
    if (activeTab === "properti") return renderPropertiTab();
    if (activeTab === "bencana") return renderBencanaTab();
    if (activeTab === "asset") return renderAssetTab();
    return null;
  };

  return (
    <div style={sidebarStyle}>
      <button onClick={onClose} style={closeButtonStyle} title="Tutup Sidebar">
        &times;
      </button>
      <h2 style={headerStyle}>Analisis</h2>

      {/* Tabs */}
      <div style={tabsContainerStyle}>
        <button
          style={tabStyle(activeTab === "properti")}
          onClick={() => setActiveTab("properti")}
        >
          Properti
        </button>
        <button
          style={tabStyle(activeTab === "bencana")}
          onClick={() => setActiveTab("bencana")}
        >
          Bencana
        </button>
        <button
          style={tabStyle(activeTab === "asset")}
          onClick={() => setActiveTab("asset")}
        >
          Asset
        </button>
      </div>

      {/* Content */}
      <div style={contentStyle}>{renderContent()}</div>
    </div>
  );
};

export default AnalysisSidebar;
