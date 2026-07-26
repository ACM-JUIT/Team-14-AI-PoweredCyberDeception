import os
from dotenv import load_dotenv
from pymongo import MongoClient
from threat_report import ThreatReport

# Load secret values from .env file
load_dotenv()

# Connect to MongoDB
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client.get_database()

print("Connected to MongoDB successfully.")

# ── Fetch Data ──────────────────────────────────────────

# Count total logs
logs_collection = db["logs"]
total_logs = logs_collection.count_documents({})

# Count total sessions
sessions_collection = db["sessions"]
total_sessions = sessions_collection.count_documents({})

# Count how many sessions were redirected to decoy
total_redirected = sessions_collection.count_documents({"is_redirected_to_decoy": True})

# Count attacks grouped by type
attack_counts = {}
for log in logs_collection.find():
    attack_type = log.get("attack_type", "Unknown")
    attack_counts[attack_type] = attack_counts.get(attack_type, 0) + 1

# Fetch last 50 logs for the detailed table
recent_logs = list(logs_collection.find().sort("timestamp", -1).limit(50))

print(f"Total logs: {total_logs}")
print(f"Total sessions: {total_sessions}")
print(f"Total redirected: {total_redirected}")
print(f"Attack types found: {list(attack_counts.keys())}")

# ── Generate PDF ─────────────────────────────────────────

pdf = ThreatReport()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()

pdf.add_report_info()
pdf.add_summary_section(total_logs, total_sessions, total_redirected)
pdf.add_attack_breakdown(attack_counts)
pdf.add_logs_table(recent_logs)

# Save the PDF file
output_path = "phantomshield_report.pdf"
pdf.output(output_path)

print(f"PDF report generated successfully: {output_path}")
