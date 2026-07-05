# Threat Intelligence Notes
**Project:** PhantomShield  
**Author:** Member 1  
**Purpose:** Background knowledge to support Member 5's IP reputation feature

---

## What is an IOC (Indicator of Compromise)?

An IOC is any piece of evidence that suggests an attack has 
happened or is happening. Think of it like a fingerprint left 
at a crime scene — it doesn't catch the attacker by itself, 
but it tells you something suspicious occurred.

### Common Types of IOCs
- **IP addresses** known to have attacked other systems before
- **File hashes** of known malware
- **Unusual outbound traffic** (a server suddenly sending lots of data somewhere new)
- **Suspicious domain names** used by attackers for phishing or malware delivery
- **Specific attack payload strings** (like the SQL injection patterns from Week 1)

### Why IOCs Matter for PhantomShield
Our detection engine is mostly looking at IOCs in real time — 
a suspicious payload in a request, a known bad user agent, 
or (new this week) a known bad IP address.

---

## What is IP Reputation?

IP reputation is a score or rating that tells you how 
trustworthy an IP address is, based on its past behavior 
across the entire internet, not just on our website.

If an IP address has been used to attack thousands of other 
websites before, services that track this will have a record 
of it. So even before that IP touches our site, we can already 
know it's likely dangerous.

### How Services Like AbuseIPDB Work

AbuseIPDB is a free community-driven database. Here's the 
basic idea:

1. Websites and security tools all over the world report IP 
   addresses that attacked them
2. AbuseIPDB collects all these reports into one central database
3. Anyone (including our project) can send an IP address to 
   AbuseIPDB's API and get back a "confidence score" — basically, 
   how likely this IP is to be malicious, based on how many 
   times it's been reported and how recently

### Example Flow for Our Project
1. A request comes into our system from IP 203.0.113.50
2. Member 5's detection engine sends that IP to AbuseIPDB's API
3. AbuseIPDB replies: "This IP has been reported 47 times in 
   the last 30 days, confidence score 92%"
4. Our system adds extra suspicion points because of this 
   external reputation data, on top of our own internal rules

### Important Notes for Member 5
- Local/testing IPs (192.168.x.x, 127.0.0.1, localhost) should 
  never be checked against AbuseIPDB — they're internal and 
  would either fail the lookup or waste API calls
- AbuseIPDB's free tier has a request limit per day, so this 
  check shouldn't be run on every single request if possible — 
  maybe only when other rules already raise some suspicion
- A high AbuseIPDB score should combine with our own rule scores, 
  not replace them — an IP with a clean reputation can still 
  send a malicious request for the first time

---

## Summary
- IOC = any clue that an attack might be happening
- IP reputation = a clue based on an IP's history across the 
  *entire internet*, not just our site
- AbuseIPDB lets us borrow the experience of thousands of other 
  websites to catch attackers faster
