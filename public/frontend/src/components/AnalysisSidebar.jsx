import React, { useState } from "react";

const sidebarStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  width: "360px",
  height: "100vh",
  background: "#1C1C1C",
  boxShadow: "-4px 0 12px rgba(0,0,0,0.5)",
  zIndex: 1200,
  display: "flex",
  flexDirection: "column",
  padding: "1rem 1.5rem",
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
  const [activeTab, setActiveTab] = useState("properti"); // "properti" atau "assets"

  const propertiCategories = [
    "masjid",
    "gereja",
    "pura",
    "sarana pendidikan",
    "rumah sakit",
    "fasilitas umum",
    "tempat usaha",
    "infrastruktur",
    "perumahan",
    "fasilitas olahraga",
    "pariwisata & rekreasi",
    "lain-lain",
  ];

  const assetsCategories = ["assets"]; // Satu checkbox untuk assets

  const renderPropertiTab = () => (
    <div style={{ marginTop: "0.5rem" }}>
      {propertiCategories.map((cat) => (
        <label key={cat} style={labelStyle}>
          <input
            type="checkbox"
            checked={analysisFilters[cat] || false}
            onChange={() =>
              setAnalysisFilters((prev) => ({ ...prev, [cat]: !prev[cat] }))
            }
            style={checkboxStyle}
          />
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </label>
      ))}
    </div>
  );

  const renderAssetsTab = () => (
    <div style={{ marginTop: "0.5rem" }}>
      {assetsCategories.map((cat) => (
        <label key={cat} style={labelStyle}>
          <input
            type="checkbox"
            checked={analysisFilters[cat] || false}
            onChange={() =>
              setAnalysisFilters((prev) => ({ ...prev, [cat]: !prev[cat] }))
            }
            style={checkboxStyle}
          />
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </label>
      ))}
    </div>
  );

  const renderContent = () => {
    if (activeTab === "properti") return renderPropertiTab();
    if (activeTab === "assets") return renderAssetsTab();
    return null;
  };

  return (
    <div style={sidebarStyle}>
      <button onClick={onClose} style={closeButtonStyle} title="Tutup Sidebar">
        &times;
      </button>
      <h2 style={headerStyle}>Analisis Data</h2>
      <div style={tabsContainerStyle}>
        <button
          style={tabStyle(activeTab === "properti")}
          onClick={() => setActiveTab("properti")}
        >
          Properti
        </button>
        <button
          style={tabStyle(activeTab === "assets")}
          onClick={() => setActiveTab("assets")}
        >
          Assets
        </button>
      </div>
      <div style={contentStyle}>{renderContent()}</div>
    </div>
  );
};

export default AnalysisSidebar;
