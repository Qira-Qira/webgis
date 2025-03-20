const express = require("express");
const { MongoClient } = require("mongodb");
const fs = require("fs");

const app = express();
const port = 3000;


const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

app.get("/", async (req, res) => {
    try {
        await client.connect();
        const db = client.db("survey");
        const collection = db.collection("dataIkn");

        let jsonData = JSON.parse(fs.readFileSync("ikn_data.geojson", "utf8"));

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
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
