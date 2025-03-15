import json
from pymongo import MongoClient


with open('extracted_data.json', 'r', encoding='utf-8') as f:
    notebook_data = json.load(f)

client = MongoClient('mongodb://localhost:27017/')
db = client['survey']           
collection = db['notebooks']   

result = collection.insert_one(notebook_data)
print("Notebook berhasil disimpan dengan id:", result.inserted_id)
