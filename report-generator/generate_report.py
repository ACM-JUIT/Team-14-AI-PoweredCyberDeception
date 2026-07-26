import os
from dotenv import load_dotenv
from pymongo import MongoClient
from threat_report import ThreatReport
from chart_generator import generate_attack_bar_chart

# Load secret values from .env file
load_dotenv()

# Connect to MongoDB
mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)
db = client.get_database()

print("Connected to MongoDB successfully.")

# ── Fetch Data ──────────────────────────────────────────

logs_collection = db["logs"]
total_logs = logs_collection.count_documents({})

sessions_collection = db["sessions"]
total_sessions = sessions_collection.count_documents({})

total_redirected = sessions_collection.count_documents(
    {"is_redirected_to_decoy": True}
)

attack_counts = {}
for log in logs_collection.find():
    attack_type = log.get("attack_type", "Unknown")
    attack_counts[attack_type] = attack_counts.get(attack_type, 0) + 1

recent_logs = list(
    logs_collection.find().sort("timestamp", -1).limit(50)
)

print(f"Total logs: {total_logs}")
print(f"Total sessions: {total_sessions}")
print(f"Total redirected: {total_redirected}")
print(f"Attack types found: {list(attack_counts.keys())}")

# ── Generate Chart ──────────────────────────────────────

chart_path = "attack_chart.png"
generate_attack_bar_chart(attack_counts, output_path=chart_path)

# ── Generate PDF ─────────────────────────────────────────

pdf = ThreatReport()
pdf.set_auto_page_break(auto=True, margin=15)
pdf.add_page()

# Page 1 — Summary and chart
pdf.add_report_info()
pdf.add_executive_summary(total_logs, total_redirected)
pdf.add_summary_section(total_logs, total_sessions, total_redirected)
pdf.add_chart(chart_path)

# Page 2 — Attack breakdown and detailed logs
pdf.add_attack_breakdown(attack_counts)
pdf.add_logs_table(recent_logs)

# Page 3 — Recommendations
pdf.add_recommendations(attack_counts, recent_logs)

output_path = "phantomshield_report.pdf"
pdf.output(output_path)

print(f"PDF report generated successfully: {output_path}")
