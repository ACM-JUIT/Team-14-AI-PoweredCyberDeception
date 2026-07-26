# Redirection Logic Notes
**Project:** PhantomShield  
**Author:** Member 1  
**Purpose:** Explains how silent redirection should work — supports Member 6 (Nginx) and Member 2 (Middleware)


## What is Silent Redirection?

Silent redirection is when the system moves a suspicious user 
from the real banking website to the fake decoy website without 
them knowing it happened. The URL in their browser looks the 
same, the design looks the same, nothing feels different — 
but they are now inside a trap.


## What Conditions Should Trigger a Redirect?

A redirect should happen when the suspicion score from the 
detection engine reaches 70 points or above.

Examples of situations that should trigger a redirect:

- A user whose IP has sent 20+ requests in 10 seconds 
  AND has a known hacking tool user agent like sqlmap
- A user who has tried to log in 10+ times with wrong 
  passwords in 60 seconds
- A user whose request body contains SQL injection 
  payloads like ' OR '1'='1
- A user who has visited 10+ suspicious paths like 
  /admin, /.env, /config.php in 30 seconds
- A user whose IP is flagged by AbuseIPDB with a high 
  confidence score AND has triggered at least one local rule

A single low-scoring signal alone (like one visit to /admin) 
should NOT immediately trigger a redirect — the threshold 
of 70 points protects against false positives.

---

## How the Redirect Should Feel to the Attacker

This is the most important requirement. The attacker must 
have zero idea they have been redirected. Specifically:

- The URL in their browser must NOT change
- The page design must look pixel-perfect identical to the real site
- The response time must feel normal — not suddenly faster or slower
- There must be no error messages, no loading screens, no flashes
- The login page on the decoy must accept any username and password
  (so the attacker thinks they successfully broke in)

If any of these fail, a skilled attacker will notice and leave 
immediately, ending our ability to study their behavior.

---

## How It Works Technically (For Member 6)

The redirection is handled by Nginx, which sits in front of 
all services as the main gateway. Here is the flow:

1. Every request first passes through Nginx
2. Nginx checks if the request has a cookie called phantom_flag
3. If phantom_flag cookie = "suspicious" → Nginx routes the 
   request to the decoy website silently
4. If phantom_flag cookie is missing or normal → Nginx routes 
   the request to the real website

The cookie is set by the backend (Member 2's middleware) after 
the detection engine returns a score of 70 or above. Once the 
cookie is set, every subsequent request from that browser 
automatically goes to the decoy — even if the attacker 
navigates to a new page or refreshes.


## How the Cookie Gets Set (For Member 2)

Member 2's middleware runs on every single incoming request. 
Here is what it should do:

1. Extract the request details — IP address, path, method, body
2. Send these details to Member 5's detection engine at 
   /check endpoint
3. Receive back a suspicion score and flags list
4. If score is 70 or above:
   - Set a cookie called phantom_flag with value "suspicious"
   - Log the event to MongoDB
   - Let the request continue (Nginx will handle the routing)
5. If score is below 70:
   - Do nothing — let the request pass through normally


## What Should Never Happen

- The redirect must never show a loading screen or blank page
- The attacker must never see a URL change in their browser
- The system must never crash if the detection engine is 
  temporarily unavailable — it should fail safely and let 
  the request through rather than breaking the whole site
- The cookie must never be visible in a way that hints it 
  controls routing (name it something innocent if needed)
