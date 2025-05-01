import { useEffect, useState } from "react";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.6)",
  backdropFilter: "blur(5px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1200,
  opacity: 1,
  transition: "opacity 0.3s ease-in-out",
};

const containerStyle = {
  background: "#fff",
  padding: "2rem",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "500px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
  transform: "translateY(0)",
  transition: "transform 0.3s ease-in-out",
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  marginBottom: "1rem",
};

const selectStyle = {
  width: "100%",
  padding: "0.75rem",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  marginBottom: "1rem",
  background: "#fff",
};

const resultItemStyle = (isActive) => ({
  padding: "0.75rem",
  cursor: "pointer",
  background: isActive ? "#e6f7ff" : "transparent",
  borderBottom: "1px solid #f0f0f0",
  transition: "background 0.2s ease-in-out",
});

const SearchOverlay = ({
  locations,
  searchTerm,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  onLocationClick,
  onClose,
  activeLocation,
}) => {
  const [containerAnim, setContainerAnim] = useState(false);


  useEffect(() => {
    setContainerAnim(true);
  }, []);

  // Filter lokasi sesuai input
  const filtered = locations.filter((loc) => {
    const matchName = loc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "" || loc.category === selectedCategory;
    return matchName && matchCategory;
  });

  return (
    <div style={overlayStyle}>
      <div
        style={{
          ...containerStyle,
          transform: containerAnim ? "translateY(0)" : "translateY(-100px)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            float: "right",
            background: "transparent",
            border: "none",
            fontSize: "28px",
            cursor: "pointer",
            color: "#888",
            lineHeight: "1",
          }}
          title="Tutup"
        >
          &times;
        </button>
        <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>Cari Lokasi</h2>
        <input
          type="text"
          placeholder="Cari lokasi..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={inputStyle}
        />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          style={selectStyle}
        >
          <option value="">Semua Kategori</option>
          <option value="rumah-sakit">Rumah Sakit</option>
          <option value="sekolah">Sekolah</option>
          <option value="wisata">Wisata</option>
          <option value="properti">Properti</option>
        </select>
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {filtered.length > 0 ? (
            filtered.map((loc) => (
              <div
                key={loc._id}
                style={resultItemStyle(activeLocation && activeLocation._id === loc._id)}
                onClick={() => {
                  onLocationClick(loc);
                  onClose();
                }}
              >
                <h4 style={{ margin: "0 0 0.3rem 0" }}>{loc.name}</h4>
                <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                  {loc.category} - {loc.region}
                </p>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#888" }}>Tidak ada hasil.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
