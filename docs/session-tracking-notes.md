# Session Tracking Notes
**Project:** PhantomShield  
**Author:** Member 1  
**Purpose:** Explains what a session is and what data to track — supports Member 2 and Member 8


## What is a Session?

A session represents one continuous visit by one user to 
the website. It starts when they first arrive and ends when 
they leave or go inactive for a long time.

For PhantomShield, a session is identified by a combination 
of two things:

- **IP address** — the network address the request comes from
- **Session cookie** — a unique ID stored in the user's browser

Using both together is important because:
- IP alone is not reliable — multiple people can share one IP 
  (like in an office or university)
- Cookie alone is not reliable — an attacker might clear cookies
- Together they give the strongest identification possible


## What Data Should Be Tracked Per Session?

Every session record stored in MongoDB should contain 
these fields:

### Identity Fields
- session_id — a unique randomly generated ID for this session
- ip_address — the IP address of the visitor
- user_agent — what browser or tool they are using

### Time Fields
- start_time — when the session first began (timestamp)
- last_seen_time — the most recent request from this session
- duration_seconds — total time from start to last seen

### Behavior Fields
- total_requests — how many requests this session has made
- unique_paths_visited — list of all different URLs they visited
- failed_login_attempts — how many times login failed
- post_to_get_ratio — ratio of POST requests to GET requests
  (attackers tend to submit many forms = high POST ratio)

### Suspicion Fields
- max_suspicion_score — the highest score this session ever reached
- current_suspicion_score — the most recent score
- is_flagged — true or false, whether score reached 70+
- is_redirected_to_decoy — true or false, whether they got 
  sent to the fake site
- flags_triggered — list of which rules fired 
  (e.g. ["sql_injection", "rate_limiting"])

---

## When Should a New Session Be Created?

A new session record should be created when:
- A request arrives with no session cookie at all (brand new visitor)
- A request arrives with a session cookie that does not exist 
  in the database (expired or deleted session)

A session should be considered expired after 30 minutes of 
no activity from that visitor.

---

## How Sessions Link to Attack Logs

Every attack log entry created by Member 8 should include 
the session_id of the session that triggered it. This allows 
the dashboard to show:

- All attacks grouped by session
- The full timeline of what one attacker did from start to finish
- Which session eventually got redirected to the decoy

---

## Session Lifecycle (Simple Flow)
