# PhantomShield — Decoy Website (Member 4)

## What is this?
A fake banking website designed to trap attackers as part of the PhantomShield cybersecurity honeypot project. When a suspicious user is detected, they are silently redirected here instead of the real banking site.

## How it works
- Attacker gets redirected here by the gateway
- They see a fake banking site that looks real
- Every action they take is secretly logged
- Logs are sent to the backend for analysis

## Pages
- `/` — Login page
- `/dashboard` — Fake dashboard with huge balances
- `/transactions` — Fake transaction history
- `/admin` — Fake admin panel with sensitive-looking data
- `/users` — Fake user list with exposed passwords

## Tech Stack
- React
- Tailwind CSS
- React Router DOM

## Week 1 Summary
- Project setup complete
- All pages created with fake data
- Behavior logger working
- All attacker actions being tracked

## Run locally
npm install
npm start

## Member
Member 4 — Decoy Website
Branch: feature/decoy-project-setup