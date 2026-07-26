from fpdf import FPDF
from datetime import datetime
import os

class ThreatReport(FPDF):
    """
    ThreatReport is a PDF class that generates a security report
    for the PhantomShield project.
    It shows total attacks, attack breakdown by type, and a 
    detailed log table.
    """

    def header(self):
        # This runs automatically at the top of every page
        self.set_font("Arial", "B", 16)
        self.set_fill_color(30, 30, 30)
        self.set_text_color(255, 255, 255)
        self.cell(0, 12, "PhantomShield Security Report", ln=True, fill=True, align="C")
        self.set_text_color(0, 0, 0)
        self.ln(5)

    def footer(self):
        # This runs automatically at the bottom of every page
        self.set_y(-15)
        self.set_font("Arial", "I", 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10, f"Page {self.page_no()} | PhantomShield Confidential", align="C")

    def add_report_info(self):
        # Report generation date and time
        self.set_font("Arial", "", 10)
        self.set_text_color(80, 80, 80)
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.cell(0, 8, f"Report Generated: {now}", ln=True)
        self.cell(0, 8, "System: PhantomShield Cyber Deception Platform", ln=True)
        self.ln(5)

    def add_summary_section(self, total_logs, total_sessions, total_redirected):
        # Summary stats section
        self.set_font("Arial", "B", 13)
        self.set_text_color(0, 0, 0)
        self.cell(0, 10, "Executive Summary", ln=True)
        self.set_draw_color(200, 0, 0)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(4)

        self.set_font("Arial", "", 11)
        self.cell(0, 8, f"Total Attack Logs Recorded:      {total_logs}", ln=True)
        self.cell(0, 8, f"Total Sessions Tracked:          {total_sessions}", ln=True)
        self.cell(0, 8, f"Total Sessions Redirected:       {total_redirected}", ln=True)
        self.ln(6)

    def add_attack_breakdown(self, attack_counts):
    
        self.set_font("Arial", "B", 13)
        self.cell(0, 10, "Attack Breakdown by Type", ln=True)
        self.set_draw_color(200, 0, 0)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(4)

        self.set_fill_color(50, 50, 50)
        self.set_text_color(255, 255, 255)
        self.set_font("Arial", "B", 10)
        self.cell(100, 8, "Attack Type", border=1, fill=True)
        self.cell(40, 8, "Count", border=1, fill=True, align="C")
        self.ln()

        self.set_text_color(0, 0, 0)
        self.set_font("Arial", "", 10)
        fill = False
        for attack_type, count in attack_counts.items():
            self.set_fill_color(240, 240, 240) if fill else self.set_fill_color(255, 255, 255)
            self.cell(100, 7, str(attack_type), border=1, fill=True)
            self.cell(40, 7, str(count), border=1, fill=True, align="C")
            self.ln()
            fill = not fill

        self.ln(6)

    def add_logs_table(self, logs):
        # Detailed logs table section
        self.set_font("Arial", "B", 13)
        self.set_text_color(0, 0, 0)
        self.cell(0, 10, "Detailed Attack Log", ln=True)
        self.set_draw_color(200, 0, 0)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(4)

 
        self.set_fill_color(50, 50, 50)
        self.set_text_color(255, 255, 255)
        self.set_font("Arial", "B", 8)
        self.cell(35, 7, "IP Address", border=1, fill=True)
        self.cell(45, 7, "Attack Type", border=1, fill=True)
        self.cell(25, 7, "Score", border=1, fill=True, align="C")
        self.cell(25, 7, "Redirected", border=1, fill=True, align="C")
        self.cell(60, 7, "Timestamp", border=1, fill=True)
        self.ln()

  
        self.set_text_color(0, 0, 0)
        self.set_font("Arial", "", 8)
        fill = False
        for log in logs:
            self.set_fill_color(240, 240, 240) if fill else self.set_fill_color(255, 255, 255)

            ip = str(log.get("ip_address", "Unknown"))
            attack = str(log.get("attack_type", "Unknown"))
            score = str(log.get("suspicion_score", "0"))
            redirected = "Yes" if log.get("redirected_to_decoy", False) else "No"
            timestamp = str(log.get("timestamp", "Unknown"))

            self.cell(35, 6, ip, border=1, fill=True)
            self.cell(45, 6, attack, border=1, fill=True)
            self.cell(25, 6, score, border=1, fill=True, align="C")
            self.cell(25, 6, redirected, border=1, fill=True, align="C")
            self.cell(60, 6, timestamp, border=1, fill=True)
            self.ln()
            fill = not fill

        self.ln(6)
        def add_chart(self, chart_path):
        # Add the bar chart image into the PDF
        # Only adds it if the image file actually exists
        if os.path.exists(chart_path):
            self.set_font("Arial", "B", 13)
            self.set_text_color(0, 0, 0)
            self.cell(0, 10, "Attack Distribution Chart", ln=True)
            self.set_draw_color(200, 0, 0)
            self.line(10, self.get_y(), 200, self.get_y())
            self.ln(4)
            self.image(chart_path, x=10, w=190)
            self.ln(6)
        else:
            self.set_font("Arial", "I", 10)
            self.set_text_color(128, 128, 128)
            self.cell(0, 8, "Chart not available — no data found.", ln=True)
