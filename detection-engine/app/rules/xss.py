import re

XSS_PATTERNS = [
    r"<script",
    r"javascript:",
    r"onerror=",
    r"onload=",
    r"alert\(",
]


def detect(text: str):

    score = 0
    reasons = []

    for pattern in XSS_PATTERNS:

        if re.search(pattern, text, re.IGNORECASE):
            score += 20
            reasons.append(
                f"XSS pattern detected: {pattern}"
            )

    return min(score, 100), reasons