# Honeypot Research
**Project:** PhantomShield  
**Author:** Member 1

---

## What is a Honeypot?
A honeypot is a fake system that looks real but is designed 
to trap attackers. The real system stays safe while the 
attacker wastes their time on the fake one — and we 
silently record everything they do.

Real companies like banks and government agencies use 
honeypots to study how attackers work.

---

## What Makes a Decoy Website Convincing?

### 1. It Must Look Identical
The decoy must be pixel-perfect — same colors, same fonts, 
same buttons as the real site. Member 4 should copy every 
page exactly from Member 3's real site.

### 2. It Must Have Tempting Fake Data
Attackers are looking for valuable things. Show them:
- User accounts with huge fake balances (₹50,00,000+)
- Labels like "SUPER ADMIN" on the dashboard
- A fake admin panel with buttons like:
  - "View All Passwords"
  - "Export User Data"
  - "Access Master Account"
- A user list showing names, emails, and visible passwords
  (attackers will try to copy this data — we log that)

### 3. It Must Feel Real
- Never show error pages — always respond like a working server
- Response times should feel normal, not instant
- Fake transactions should look real with dates and amounts

---

## Why Silent Redirection is Important
The most important thing: the attacker must NEVER know 
they have been redirected to the decoy.

If they knew, they would leave immediately. Because they 
think they broke into the real system, they keep exploring 
and we keep collecting information about them.

Nginx handles this silently — the URL in their browser 
looks the same, the site looks the same, nothing feels wrong.

---

## What the Decoy Should Log (For Member 4)
Every single action an attacker takes should be recorded:

- Every page/URL they visit (with timestamp)
- Every form they fill out (username, password they tried)
- Every button they click
- How long they spend on each page
- What order they visited pages in
- Any data they tried to download or export

This data goes to the dashboard so the team can 
demonstrate the attack being caught and studied in real time.

---

## Summary — Key Principles
1. Look real → attacker stays longer
2. Show tempting data → attacker reveals their intentions  
3. Log everything → we learn their techniques
4. Never reveal it's a trap → attacker keeps going
