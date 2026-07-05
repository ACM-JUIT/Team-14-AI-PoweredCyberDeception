# Detection Rule Score Suggestions
**Project:** PhantomShield  
**Author:** Member 1  
**Purpose:** Suggested suspicion score values for each attack type, for Member 5 to use when finalizing rule scoring in Week 3

---

## Scoring System Overview
Total suspicion score ranges from 0 to 100. Each rule below adds 
points when triggered. Multiple triggered rules stack together. 
A combined score above a threshold (suggested: 70+) should 
redirect the user to the decoy.

---

## 1. SQL Injection
**Suggested score: +35 points per match**

Reasoning: SQL injection payloads are very specific and rarely 
appear by accident in normal user input. A single match is a 
strong signal of intent to attack, so it deserves a high score.

- Each distinct SQL injection pattern matched: +35 points
- If 2+ different SQL injection patterns match in the same request: +50 points total (not just doubled, slightly reduced to avoid over-scoring)

---

## 2. Brute Force
**Suggested score: scales with attempt count**

Reasoning: A single failed login is completely normal (people 
mistype passwords). The danger is in the pattern over time, so 
score should increase gradually rather than jumping immediately.

- 3 failed attempts in 60 seconds: +10 points
- 5 failed attempts in 60 seconds: +20 points
- 10+ failed attempts in 60 seconds: +40 points
- 20+ failed attempts in 60 seconds: +60 points (near-certain attack)

---

## 3. Cross-Site Scripting (XSS)
**Suggested score: +30 points per match**

Reasoning: Like SQL injection, XSS payloads use specific syntax 
that normal users never type by accident.

- Each distinct XSS pattern matched: +30 points
- If the payload includes both a script tag AND an event handler (e.g. onerror=): +45 points (more sophisticated attempt)

---

## 4. URL/Path Scanning
**Suggested score: scales with path count**

Reasoning: Visiting one unusual path could be a mistake or a 
bookmark. Visiting many in a short time is clearly automated 
scanning behavior.

- 1 suspicious path (e.g. /admin, /.env): +15 points
- 5+ different paths in 30 seconds: +35 points
- 10+ different paths in 30 seconds: +55 points

---

## 5. Rate Limiting
**Suggested score: scales with request rate**

Reasoning: Speed alone isn't proof of attack, but it's a 
strong supporting signal, especially combined with other rules.

- 20-39 requests in 10 seconds: +15 points
- 40+ requests in 10 seconds: +30 points
- Perfectly even request timing (e.g. every 0.1 sec exactly): +10 points bonus (suggests a script, not a human)

---

## 6. Suspicious User Agent
**Suggested score: +25 points flat**

Reasoning: A known hacking tool user agent is a strong standalone 
signal, but it can also occasionally be a false positive (e.g. 
a developer testing their own site), so it's high but not 
instantly maximum.

- Known bad user agent (sqlmap, Nikto, curl, etc.): +25 points
- Missing/empty user agent entirely: +15 points

---

## Suggested Combination Logic
When multiple rules trigger together, the combined score should 
feel more dangerous than any single rule alone. Example:

SQL injection (+35) AND suspicious user agent (+25) AND 
high rate limiting (+30) = should push well past the 70 
threshold, clearly flagging a serious automated attack.

## Final Note for Member 5
These numbers are starting suggestions based on attack severity 
and reliability of detection. Feel free to adjust based on real 
testing results in Week 3 — false positives or false negatives 
during testing should guide final tuning.
