import os
from fpdf import FPDF
from datetime import datetime


class ThreatReport(FPDF):
    """
    ThreatReport is a PDF class that generates a professional
    security report for the PhantomShield project.
    """

    def header(self):
        self.set_font("Arial", "B", 16)
        self.set_fill_color(30, 30, 30)
        self.set_text_color(255, 255, 255)
        self.cell(0, 12, "PhantomShield Security Report",
                  ln=True, fill=True, align="C")
        self.set_text_color(0, 0, 0)
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font("Arial", "I", 8)
        self.set_text_color(128, 128, 128)
        self.cell(0, 10,
                  f"Page {self.page_no()} | PhantomShield Confidential",
                  align="C")

    def add_report_info(self):
        self.set_font("Arial", "", 10)
        self.set_text_color(80, 80, 80)
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.cell(0, 8, f"Report Generated: {now}", ln=True)
        self.cell(0, 8,
                  "System: PhantomShield Cyber Deception Platform",
                  ln=True)
        self.ln(5)

    def add_executive_summary(self, total_logs, total_redirected):
        # Executive Summary — appears at the very top of the report
        self.set_font("Arial", "B", 13)
        self.set_text_color(0, 0, 0)
        self.cell(0, 10, "Executive Summary", ln=True)
        self.set_draw_color(200, 0, 0)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(4)

        self.set_font("Arial", "", 11)
        self.set_text_color(40, 40, 40)

        summary = (
            f"PhantomShield is a cyber deception system designed to detect "
            f"attackers targeting a banking platform and silently redirect "
            f"them to a honeypot decoy website, where their every action is "
            f"logged and studied. "
            f"This report covers all attack activity recorded by the system "
            f"up to the time of generation. "
            f"During this period, the system recorded a total of {total_logs} "
            f"attack events and successfully redirected {total_redirected} "
            f"suspicious sessions to the decoy environment. "
            f"Detection was performed using a combination of rule-based "
            f"detection covering SQL injection, brute force, XSS, URL "
            f"scanning, rate limiting, and suspicious user agents, combined "
            f"with an AI-powered Isolation Forest model that flags anomalous "
            f"session behavior even when no specific rule is triggered."
        )

        self.multi_cell(0, 7, summary)
        self.ln(6)

    def add_summary_section(self, total_logs, total_sessions,
                             total_redirected):
        self.set_font("Arial", "B", 13)
        self.set_text_color(0, 0, 0)
        self.cell(0, 10, "Attack Statistics", ln=True)
        self.set_draw_color(200, 0, 0)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(4)

        self.set_font("Arial", "", 11)
        self.cell(0, 8,
                  f"Total Attack Logs Recorded:      {total_logs}",
                  ln=True)
        self.cell(0, 8,
                  f"Total Sessions Tracked:          {total_sessions}",
                  ln=True)
        self.cell(0, 8,
                  f"Total Sessions Redirected:       {total_redirected}",
                  ln=True)
        self.ln(6)

    def add_chart(self, chart_path):
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
            self.cell(0, 8,
                      "Chart not available — no data found.",
                      ln=True)

    def add_attack_breakdown(self, attack_counts):
        self.set_font("Arial", "B", 13)
        self.set_text_color(0, 0, 0)
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
            if fill:
                self.set_fill_color(240, 240, 240)
            else:
                self.set_fill_color(255, 255, 255)
            self.cell(100, 7, str(attack_type), border=1, fill=True)
            self.cell(40, 7, str(count), border=1,
                      fill=True, align="C")
            self.ln()
            fill = not fill

        self.ln(6)

    def add_logs_table(self, logs):
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
        self.cell(25, 7, "Redirected", border=1, fill=True,
                  align="C")
        self.cell(60, 7, "Timestamp", border=1, fill=True)
        self.ln()

        self.set_text_color(0, 0, 0)
        self.set_font("Arial", "", 8)
        fill = False
        for log in logs:
            if fill:
                self.set_fill_color(240, 240, 240)
            else:
                self.set_fill_color(255, 255, 255)

            ip = str(log.get("ip_address", "Unknown"))
            attack = str(log.get("attack_type", "Unknown"))
            score = str(log.get("suspicion_score", "0"))
            redirected = "Yes" if log.get(
                "redirected_to_decoy", False) else "No"
            timestamp = str(log.get("timestamp", "Unknown"))

            self.cell(35, 6, ip, border=1, fill=True)
            self.cell(45, 6, attack, border=1, fill=True)
            self.cell(25, 6, score, border=1, fill=True, align="C")
            self.cell(25, 6, redirected, border=1, fill=True,
                      align="C")
            self.cell(60, 6, timestamp, border=1, fill=True)
            self.ln()
            fill = not fill

        self.ln(6)

    def add_recommendations(self, attack_counts, recent_logs):
        # Recommendations section — appears at the very bottom
        self.add_page()
        self.set_font("Arial", "B", 13)
        self.set_text_color(0, 0, 0)
        self.cell(0, 10, "Security Recommendations", ln=True)
        self.set_draw_color(200, 0, 0)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(4)

        self.set_font("Arial", "", 11)
        self.set_text_color(40, 40, 40)

        # Find the most common attack type
        if attack_counts:
            top_attack = max(attack_counts, key=attack_counts.get)
            top_count = attack_counts[top_attack]
        else:
            top_attack = "Unknown"
            top_count = 0

        # Find IPs that appear most in recent logs
        ip_counts = {}
        for log in recent_logs:
            ip = log.get("ip_address", "Unknown")
            ip_counts[ip] = ip_counts.get(ip, 0) + 1

        if ip_counts:
            top_ip = max(ip_counts, key=ip_counts.get)
            top_ip_count = ip_counts[top_ip]
        else:
            top_ip = "Unknown"
            top_ip_count = 0

        recommendations = [
            (
                "1. Permanently block high-frequency attacker IPs",
                f"IP address {top_ip} was seen in {top_ip_count} recent "
                f"attack logs. Consider adding this IP to a permanent "
                f"blocklist at the Nginx gateway level to prevent any "
                f"future requests from reaching the system at all."
            ),
            (
                "2. Strengthen defenses against the most common attack",
                f"The most frequently detected attack type was "
                f"{top_attack} with {top_count} occurrences. Additional "
                f"input validation and sanitization should be applied "
                f"to all endpoints most targeted by this attack type."
            ),
            (
                "3. Lower the redirection threshold if false negatives occur",
                "If testing reveals that some attackers are getting "
                "through without being redirected, consider lowering "
                "the suspicion score threshold from 70 to 60. Monitor "
                "the false positive rate carefully after any change."
            ),
            (
                "4. Enable IP reputation checking on all requests",
                "Currently IP reputation via AbuseIPDB is checked "
                "selectively. Enabling it on every request would catch "
                "known bad actors immediately on their first visit, "
                "before they trigger any local detection rules."
            ),
            (
                "5. Expand honeypot logging detail",
                "The decoy website currently logs page visits, clicks, "
                "and form submissions. Adding keystroke timing data "
                "would provide even richer behavioral profiles of "
                "attackers for future analysis."
            ),
        ]

        for title, body in recommendations:
            self.set_font("Arial", "B", 11)
            self.set_text_color(180, 0, 0)
            self.cell(0, 8, title, ln=True)
            self.set_font("Arial", "", 10)
            self.set_text_color(40, 40, 40)
            self.multi_cell(0, 6, body)
            self.ln(4)
