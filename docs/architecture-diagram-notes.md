
# Architecture Diagram Notes
**Project:** PhantomShield  
**Author:** Member 1  
**Purpose:** Plain text description of every component and data 
flow — to be used by the Team Lead to build the final diagram 
in draw.io

---

## All Components in the System

### 1. User (Browser)
The person visiting the website. Could be a normal user or 
an attacker. They have no idea what is happening behind 
the scenes.

### 2. Nginx Gateway
The main entry point of the entire system. Every single 
request passes through here first before going anywhere else.
Nginx checks for the phantom_flag cookie and decides whether 
to route the user to the real site or the decoy site.

### 3. Backend (FastAPI — Member 2)
Handles all real banking logic — login, user profiles, 
transactions. Also contains middleware that runs on every 
request and calls the detection engine automatically.

### 4. Detection Engine (FastAPI — Member 5)
Receives request details from the backend middleware and 
checks them against 7 detection rules. Returns a rule-based 
suspicion score and a list of which rules fired.

### 5. AI Module (FastAPI — Member 7)
Receives session behavior features and returns an anomaly 
score using the Isolation Forest model. This score gets 
combined with the rule-based score by Member 5.

### 6. MongoDB Database
Central data store for the entire project. Stores:
- User accounts (Member 2)
- Attack logs (Member 8)
- Session records (Member 8)
- Decoy activity logs (Member 8)

### 7. Real Banking Website (React — Member 3)
The legitimate frontend that normal users see. Contains 
login, dashboard, transactions, profile pages and the 
analytics dashboard.

### 8. Decoy Website (React — Member 4)
The fake honeypot frontend that attackers get silently 
redirected to. Looks identical to the real site but contains 
fake tempting data and logs every action the attacker takes.

### 9. Analytics Dashboard (React — Member 3)
Part of the real frontend. Shows the security team real-time 
attack data — total attacks, attack types, timeline chart, 
active sessions, and the replay viewer.

### 10. Logging Service (Member 8)
Receives attack events and writes them to MongoDB. Also 
provides all the API endpoints that feed data to the 
analytics dashboard.

---

## Every Arrow That Needs to Exist in the Diagram

These are listed in the order data flows through the system.

### Normal Request Flow (Clean User)
