import pandas as pd
import json

# 1. Memuat data dari file Excel
file_path = "Penajam_Paser_Utara.xlsx"  # pastikan file Excel berada di direktori yang sama
df = pd.read_excel(file_path, sheet_name="Sheet1")

# 2. Pembersihan data dasar
# Misalnya, hapus baris yang memiliki nilai kosong di kolom yang dianggap penting
# Ubah nama kolom agar lebih mudah diakses (opsional)
df = df.dropna(subset=["Desa/Kelurahan", "Hutan Belukar (ha)"])
df.columns = [col.strip().replace(" ", "_") for col in df.columns]

# 3. Mengonversi DataFrame ke GeoJSON dengan geometry bernilai null
features = []
for _, row in df.iterrows():
    properties = row.to_dict()
    feature = {
        "type": "Feature",
        "geometry": None,  # Karena tidak ada data spasial
        "properties": properties
    }
    features.append(feature)

geojson = {
    "type": "FeatureCollection",
    "features": features
}

# 4. Menyimpan hasil ke file GeoJSON
with open("output.geojson", "w", encoding="utf-8") as f:
    json.dump(geojson, f, indent=4)

print("GeoJSON berhasil dibuat dengan nama file: output.geojson")
