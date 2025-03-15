const express = require("express");
const { MongoClient } = require("mongodb");
const fs = require("fs");

const app = express();
const port = 3000;

// Koneksi ke MongoDB
const uri = "mongodb://localhost:27017/"; // Ganti jika pakai MongoDB Atlas
const client = new MongoClient(uri);

app.get("/", async (req, res) => {
    try {
        await client.connect();
        const db = client.db("survey");
        const collection = db.collection("notebooks");

        // Membaca file JSON
        let jsonData = JSON.parse(fs.readFileSync("extracted_data.json", "utf8"));

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        await collection.insertMany(jsonData);

        // Menyimpan data ke MongoDB (jika belum ada)
        const existingData = await collection.countDocuments();
        if (existingData === 0) {
            await collection.insertMany(jsonData);
        }

        // Mengambil data dari MongoDB
        const data = await collection.find().toArray();

        // Ambil dokumen yang berisi data JSON (asumsikan hanya ada 1 dokumen)
        const document = await collection.findOne({});
        if (!document) {
            return res.send("Data tidak ditemukan.");
        }

        // Buat tampilan HTML untuk menampilkan data
        let html = "<h1>Data dari MongoDB</h1>";

        // Tampilkan konten table (HTML) yang sudah tersimpan
        if (document.tables && Array.isArray(document.tables)) {
            document.tables.forEach((table, index) => {
                html += `<div><h2>Tabel ${index + 1}</h2>${table.content}</div>`;
            });
        }

        // Tampilkan gambar (jika ada), pastikan field image memiliki properti type dan content (base64)
        if (document.images && Array.isArray(document.images)) {
            document.images.forEach((image, index) => {
                html += `<div><h2>Gambar ${index + 1}</h2><img src="data:${image.type};base64,${image.content}" alt="Gambar ${index + 1}" /></div>`;
            });
        }

        res.send(html);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
