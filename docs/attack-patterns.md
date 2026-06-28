# Attack Patterns Research
**Project:** PhantomShield  
**Author:** Member 1  
**Purpose:** This document helps Member 5 build detection rules

---

## 1. SQL Injection

### What It Is
SQL Injection is when an attacker types special code into a 
login form or search box to trick the database into giving 
them information they shouldn't have access to.

### How It Works
When you log in to a website, the website sends your 
username and password to a database like this:
SELECT * FROM users WHERE username='john' AND password='1234'

An attacker types this into the username box:
' OR '1'='1

The database query becomes:
SELECT * FROM users WHERE username='' OR '1'='1' AND password=''

'1'='1' is always true — so the attacker gets in without 
knowing the real password.

### Real Attack Payloads (Examples)
- ' OR '1'='1
- admin'--
- ' UNION SELECT username, password FROM users--
- 1; DROP TABLE users--
- ' OR 1=1--

### What Member 5 Should Detect
Look for these characters/words in any form input or URL:
- Single quote mark: '
- Double dash: --
- The word UNION
- The word SELECT
- The word DROP
- The word INSERT

---

## 2. Brute Force Attack

### What It Is
The attacker tries thousands of username and password 
combinations very fast until one works. Like trying every 
key on a keychain until one opens the lock.

### How It Works
Attackers use tools like Hydra or Burp Suite that 
automatically send hundreds of login attempts per minute.
A normal person types slowly. An attacker's tool sends 
100 attempts in one second.

### Signs of a Brute Force Attack
- Same IP address tries to login more than 5 times in 60 seconds
- Many different usernames tried from same IP
- Requests come in perfectly timed intervals (not human typing speed)
- Mostly fails with "wrong password" errors

### What Member 5 Should Detect
- If same IP hits /login more than 5 times in 60 seconds, flag it
- If more than 3 accounts tried from same IP, flag it

---

## 3. Cross-Site Scripting (XSS)

### What It Is
The attacker puts JavaScript code into a form field 
(like a comment box or search bar). If the website 
displays that input without checking it, the JavaScript 
runs in other users' browsers and can steal their data.

### How It Works
Attacker types this into a comment field:
<script>alert('You are hacked')</script>

If the website shows this comment to other users, 
the script runs in their browser. More dangerous scripts 
can steal cookies (login sessions) and send them to 
the attacker.

### Real Attack Payloads
- <script>alert('xss')</script>
- <img src=x onerror=alert(1)>
- <svg onload=alert(1)>
- javascript:alert('xss')
- <body onload=alert('XSS')>

### What Member 5 Should Detect
Look for these in any user input:
- <script>
- </script>
- onerror=
- onload=
- javascript:
- <img src=x

---

## 4. URL/Path Scanning

### What It Is
Before attacking, hackers explore the website by visiting 
hidden or sensitive URLs trying to find admin panels, 
config files, or backups.

### How It Works
Tools like DirBuster or Nikto automatically request 
hundreds of paths like:
/admin
/admin/login
/.env
/config.php
/backup.zip
/wp-admin
/.git
/database.sql

A normal user visits 3-5 pages. A scanner visits 
100+ unusual paths in seconds.

### Suspicious URLs to Watch
- /admin
- /wp-admin
- /.env
- /.git
- /config.php
- /backup
- /backup.zip
- /database.sql
- /phpmyadmin
- /server-status

### What Member 5 Should Detect
- Same IP requesting 10+ different URLs within 30 seconds, flag it
- Any request to the suspicious URLs listed above, flag it immediately

---

## 5. Rate Limiting Attack

### What It Is
A rate limiting attack is when one user (or bot) sends 
far more requests than a normal human ever would in a 
short period of time. This is not always a "hack" by 
itself, but it is one of the strongest early warning 
signs of an attacker, scanner, or bot. Most other attacks 
(brute force, URL scanning, SQL injection testing) involve 
sending many requests fast, so detecting the speed itself 
helps catch attacks even before we know what type they are.

### How It Works
A normal human clicks around a website slowly. They might 
visit 1 page every few seconds. An attacker's automated 
tool or script can send 50, 100, or even 1000 requests 
in a single second because a computer program is doing 
the clicking instead of a human finger.

### Examples of Rate Limit Violations
- 100 requests from the same IP within 10 seconds
- Hitting the same /login endpoint 20 times in 5 seconds
- Hitting any single endpoint repeatedly with no delay between requests
- A sudden burst of traffic after a long period of silence from the same IP

### What Member 5 Should Detect
- Track number of requests per IP address per time window (example: per 10 seconds)
- If an IP exceeds a set number of requests (example: more than 20 requests in 10 seconds), flag it
- If requests from one IP are spaced extremely evenly apart (example: exactly every 0.1 seconds), this suggests a script, not a human, flag it
- Combine this with other rules: if rate limiting AND suspicious user agent both trigger, suspicion score should be much higher

---

## 6. Suspicious User Agents

### What It Is
Every browser tells the website who it is using a 
"User-Agent" header. Hacking tools also send 
user agents, and they're recognizable.

### Normal User Agents (Safe)
- Mozilla/5.0 (Windows NT 10.0; Win64; x64)
- Mozilla/5.0 (iPhone; CPU iPhone OS 17)
- Mozilla/5.0 (Macintosh; Intel Mac OS X)

### Hacking Tool User Agents (Dangerous)
- sqlmap/1.0 (the most famous SQL injection tool)
- Nikto/2.1 (web vulnerability scanner)
- python-requests/2.28 (automated scripts)
- curl/7.88 (command line tool, often used in attacks)
- Nmap Scripting Engine
- DirBuster
- masscan
- Wget (sometimes used to download entire sites for cloning)
- Go-http-client (often used by custom attack scripts)

### Why This Matters
Real browsers always include detailed information like 
operating system, browser version, and rendering engine. 
Hacking tools and scripts often send short, generic, or 
missing User-Agent headers, which makes them easy to spot.

### What Member 5 Should Detect
- Maintain a list of known bad user agents shown above
- If any request has one of these in its User-Agent header, flag it immediately as high suspicion
- If the User-Agent header is completely empty or missing, also flag it as suspicious
EOF
