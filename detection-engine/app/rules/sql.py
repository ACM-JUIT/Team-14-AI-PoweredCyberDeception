import re

SQL_PATTERNS = [
    r"union\s+select",
    r"drop\s+table",
    r"information_schema",
    r"or\s+1=1",
    r"and\s+1=1",
    r"--",
    r";",
]


def detect(text: str):

    score = 0
    reasons = []

    for pattern in SQL_PATTERNS:

        if re.search(pattern, text, re.IGNORECASE):
            score += 20
            reasons.append(
                f"SQL pattern detected: {pattern}"
            )

    return min(score, 100), reasons