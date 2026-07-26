import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

mongo_uri = os.getenv("MONGO_URI")

client = MongoClient(mongo_uri)

db = client.get_database()

logs_collection = db["logs"]

log_count = logs_collection.count_documents({})

print(f"Connection successful. Total logs found in database: {log_count}")
