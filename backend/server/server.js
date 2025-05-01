require('dotenv').config();
console.log("process.env:", process.env);
console.log("MONGO_URL:", process.env.MONGO_URI);

const express = require("express");
const cors = require("cors");
// const { MongoClient } = require("mongodb");
const fs = require("fs");
const app = express();


app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;


// const uri = "mongodb://localhost:27017/";
// const client = new MongoClient(uri);

const { connectDB } = require('../db/mongo');

//Hapus cache browser
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });

//API untuk Dashboard  



//API untuk Data Spasial  
  app.get("/api/hutan", async (req, res) => {
    try {
        const client = await connectDB();
        const db = client.db("survey");
        const collection = db.collection("hutan");

        let jsonData = JSON.parse(fs.readFileSync("hutan_polygon.geojson", "utf8"));

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        // await collection.insertMany(jsonData);

        // const existingData = await collection.countDocuments()
        // if (existingData === 0) {
        //     await collection.insertMany(jsonData);
        // }

        const data = await collection.find().toArray();

        const document = await collection.findOne({});
        if (!document) {
            return res.send("Data tidak ditemukan.");
        }

        res.json(data);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});


app.get("/api/properti", async (req, res) => {
    try {
        const client = await connectDB();
        const db = client.db("survey");
        const collection = db.collection("properti");

        let jsonData = JSON.parse(fs.readFileSync("properti_point.geojson", "utf8"));

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        const data = await collection.find().toArray();

        const document = await collection.findOne({});
        if (!document) {
            return res.send("Data tidak ditemukan.");
        }

        res.json(data);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    } 
});


app.get("/api/tutupan_lahan", async (req, res) => {
    try {
        const client = await connectDB();
        const db = client.db("survey");
        const collection = db.collection("tutupan_lahan");

        let jsonData = JSON.parse(fs.readFileSync("tutupan_lahan_polygon.geojson", "utf8"));

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        const data = await collection.find().toArray();

        const document = await collection.findOne({});
        if (!document) {
            return res.send("Data tidak ditemukan.");
        }

        res.json(data);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    } 
});


app.get("/api/kawasan_rawan_tsunami", async (req, res) => {
    try {
        const client = await connectDB();
        const db = client.db("survey");
        const collection = db.collection("kawasan_rawan_tsunami");

        let jsonData = JSON.parse(fs.readFileSync("kawasan_rawan_tsunami_polygon.geojson", "utf8"));

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        const data = await collection.find().toArray();

        const document = await collection.findOne({});
        if (!document) {
            return res.send("Data tidak ditemukan.");
        }

        res.json(data);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    } 
});


app.get("/api/kawasan_rawan_longsor", async (req, res) => {
    try {
        const client = await connectDB();
        const db = client.db("survey");
        const collection = db.collection("kawasan_rawan_longsor");

        let jsonData = JSON.parse(fs.readFileSync("kawasan_rawan_longsor_polygon.geojson", "utf8"));

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        const data = await collection.find().toArray();

        const document = await collection.findOne({});
        if (!document) {
            return res.send("Data tidak ditemukan.");
        }

        res.json(data);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    } 
}); 


app.get("/api/kawasan_rawan_banjir", async (req, res) => {
    try {
        const client = await connectDB();
        const db = client.db("survey");
        const collection = db.collection("kawasan_rawan_banjir");

        let jsonData = JSON.parse(fs.readFileSync("kawasan_rawan_banjir_polygon.geojson", "utf8"));

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        const data = await collection.find().toArray();

        const document = await collection.findOne({});
        if (!document) {
            return res.send("Data tidak ditemukan.");
        }

        res.json(data);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    } 
}); 


app.get("/api/jenis_tanah", async (req, res) => {
    try {
        const client = await connectDB();
        const db = client.db("survey");
        const collection = db.collection("jenis_tanah");

        let jsonData = JSON.parse(fs.readFileSync("jenis_tanah_polygon.geojson", "utf8"));

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        const data = await collection.find().toArray();

        const document = await collection.findOne({});
        if (!document) {
            return res.send("Data tidak ditemukan.");
        }

        res.json(data);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    } 
}); 


app.get("/api/curah_hujan", async (req, res) => {
    try {
        const client = await connectDB();
        const db = client.db("survey");
        const collection = db.collection("curah_hujan");

        let jsonData = JSON.parse(fs.readFileSync("curah_hujan_polygon.geojson", "utf8"));

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        const data = await collection.find().toArray();

        const document = await collection.findOne({});
        if (!document) {
            return res.send("Data tidak ditemukan.");
        }

        res.json(data);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    } 
}); 


app.get("/api/daerah_aliran_sungai", async (req, res) => {
    try {
        const client = await connectDB();
        const db = client.db("survey");
        const collection = db.collection("daerah_aliran_sungai");

        let jsonData = JSON.parse(fs.readFileSync("daerah_aliran_sungai_polygon.geojson", "utf8"));

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        const data = await collection.find().toArray();

        const document = await collection.findOne({});
        if (!document) {
            return res.send("Data tidak ditemukan.");
        }

        res.json(data);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    } 
}); 


app.get("/api/BA_kecamatan", async (req, res) => {
    try {
        const client = await connectDB();
        const db = client.db("survey");
        const collection = db.collection("BA_kecamatan");

        let jsonData = JSON.parse(fs.readFileSync("BA_kecamatan_polygon.geojson", "utf8"));

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        const data = await collection.find().toArray();

        const document = await collection.findOne({});
        if (!document) {
            return res.send("Data tidak ditemukan.");
        }

        res.json(data);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    } 
}); 


app.get("/api/BA_kecamatan_L", async (req, res) => {
    try {
        const client = await connectDB();
        const db = client.db("survey");
        const collection = db.collection("BA_kecamatan_L");

        let jsonData = JSON.parse(fs.readFileSync("BA_kecamatan_line.geojson", "utf8"));

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        const data = await collection.find().toArray();

        const document = await collection.findOne({});
        if (!document) {
            return res.send("Data tidak ditemukan.");
        }

        res.json(data);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    } 
}); 


app.get("/api/BA_kabupaten", async (req, res) => {
    try {
        const client = await connectDB();
        const db = client.db("survey");
        const collection = db.collection("BA_kabupaten");

        let jsonData = JSON.parse(fs.readFileSync("BA_kabupaten_polygon.geojson", "utf8"));

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        const data = await collection.find().toArray();

        const document = await collection.findOne({});
        if (!document) {
            return res.send("Data tidak ditemukan.");
        }

        res.json(data);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    } 
}); 


app.get("/api/BA_desa_kelurahan", async (req, res) => {
    try {
        const client = await connectDB();
        const db = client.db("survey");
        const collection = db.collection("BA_desa_kelurahan");

        let jsonData = JSON.parse(fs.readFileSync("BA_desa_kelurahan_polygon.geojson", "utf8"));

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        const data = await collection.find().toArray();

        const document = await collection.findOne({});
        if (!document) {
            return res.send("Data tidak ditemukan.");
        }

        res.json(data);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    } 
}); 


app.get("/api/B_kabupaten", async (req, res) => {
    try {
        const client = await connectDB();
        const db = client.db("survey");
        const collection = db.collection("B_kabupaten");

        let jsonData = JSON.parse(fs.readFileSync("B_kabupaten_line.geojson", "utf8"));

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        const data = await collection.find().toArray();

        const document = await collection.findOne({});
        if (!document) {
            return res.send("Data tidak ditemukan.");
        }

        res.json(data);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    } 
}); 


app.get("/api/B_desa_kelurahan", async (req, res) => {
    try {
        const client = await connectDB();
        const db = client.db("survey");
        const collection = db.collection("B_desa_kelurahan");

        let jsonData = JSON.parse(fs.readFileSync("B_desa_kelurahan_line.geojson", "utf8"));

        if (!Array.isArray(jsonData)) {
            jsonData = [jsonData];
        }

        const data = await collection.find().toArray();

        const document = await collection.findOne({});
        if (!document) {
            return res.send("Data tidak ditemukan.");
        }

        res.json(data);

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    } 
}); 



app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
