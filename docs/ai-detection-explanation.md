# AI Detection Explanation
**Project:** PhantomShield  
**Author:** Member 1  
**Purpose:** Plain English explanation of how the AI component 
works — written for judges, evaluators, and non-technical readers

---

## Why Do We Need AI at All?

Our rule-based detection engine (Member 5's work) is very good 
at catching known attacks. If a request contains a SQL injection 
payload, it gets caught. If an IP sends 50 requests in 10 
seconds, it gets caught.

But what about a clever attacker who moves slowly and carefully?
Someone who sends only 3 requests per minute, never uses a 
known hacking tool, and never triggers any specific rule — 
but whose overall behavior pattern is still clearly not human?

This is where the AI component comes in. It does not look for 
specific attack signatures. Instead it learns what normal 
behavior looks like and flags anything that looks different 
from normal — even if it cannot explain exactly why.

---

## What is Isolation Forest?

Isolation Forest is a machine learning algorithm designed 
specifically for detecting anomalies — things that are 
unusual or out of place.

Here is the simplest possible explanation:

Imagine you have a crowd of 1000 people in a field. 999 of 
them are standing in a big group in the center. One person 
is standing alone in a corner. If you randomly drew dividing 
lines through the field, you would isolate the lone person 
very quickly — in just a few cuts. The people in the crowd 
would take many more cuts to isolate because they are packed 
together.

Isolation Forest works exactly like this but with data instead 
of people. Normal users cluster together because they all 
behave similarly. Attackers behave differently and are isolated 
quickly by the algorithm. The faster something gets isolated, 
the more anomalous it is.

---

## What Features Does the AI Look At?

The AI does not read request payloads or look for specific 
words. Instead it looks at 5 numbers that describe the overall 
behavior of a user session:

### Feature 1 — Requests Per Minute
How many requests is this session sending per minute?
- Normal user: 2 to 8 requests per minute (clicking around, reading)
- Attacker: 50 to 500+ requests per minute (automated tool)

### Feature 2 — Failed Logins
How many times has this session failed to log in?
- Normal user: 0 to 2 (mistyped password once or twice)
- Attacker: 10, 50, 100+ (brute forcing passwords)

### Feature 3 — Unique Paths Visited
How many different URLs has this session requested?
- Normal user: 3 to 8 (login, dashboard, transactions, profile)
- Attacker: 50 to 200+ (scanning for hidden admin pages)

### Feature 4 — POST to GET Ratio
What fraction of requests are POST requests vs GET requests?
- Normal user: mostly GET (loading pages), some POST (submitting forms)
- Attacker: very high POST ratio (constantly submitting attack payloads)

### Feature 5 — Suspicious Keyword Presence
Does the session's requests contain keywords associated with 
attacks like SELECT, UNION, script, onerror?
- Normal user: 0 (never types these)
- Attacker: 1 (yes, present in their requests)

---

## How Does It Actually Work Step by Step?

1. A user session is tracked by Member 2's middleware
2. As the session progresses, the 5 feature values are 
   calculated from real request data
3. These 5 numbers are sent to the AI module's /score endpoint
4. The Isolation Forest model compares this pattern against 
   everything it learned during training
5. It returns an anomaly score between 0 and 100
6. 0 means completely normal behavior
7. 100 means extremely anomalous behavior
8. This score gets combined with Member 5's rule-based score
   (30% AI score + 70% rule score = final suspicion score)

---

## How Was the Model Trained?

The model was trained on synthetic (artificially generated) data 
that simulates thousands of normal user sessions and hundreds 
of attacker sessions. Normal sessions were generated with 
realistic values — low request rates, few failed logins, 
normal path counts. Attacker sessions were generated with 
extreme values — very high request rates, many failed logins, 
hundreds of paths visited.

The model learned the boundary between these two groups and 
can now apply that learning to real sessions it has never 
seen before.

---

## Why Use AI Alongside Rules?

Neither approach is perfect alone:

| Approach | Good At | Bad At |
|----------|---------|--------|
| Rule-based | Catching known specific attacks | Catching slow or unusual attackers |
| AI-based | Catching unusual behavior patterns | Explaining exactly why something is suspicious |

Together they cover each other's weaknesses. A slow careful 
attacker might score low on rules but high on AI. A fast 
obvious attacker might score high on both. The combined score 
gives a much more reliable picture than either approach alone.

---

## Simple Summary for Judges

PhantomShield uses two layers of detection working together:

Layer 1 is rule-based — it checks for known attack signatures 
like SQL injection code or too many login attempts, and adds 
points for each one found.

Layer 2 is AI-based — it looks at the overall behavior pattern 
of a session and flags anything that looks unusual compared to 
normal human behavior, even if no specific rule was triggered.

Both scores are combined into a final suspicion score from 0 
to 100. If the score reaches 70 or above, the user is silently 
redirected to the decoy website where their every action is 
logged and studied.
