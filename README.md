# Dexfomo

Dexfomo is a demo static site and visual prototype for a decentralized exchange analytics and market-intelligence platform.

## Technology stack
- Static HTML/CSS/JavaScript (vanilla)
- No backend included in this repository

## Local setup
1. Clone the repository:
```bash
git clone https://github.com/happyrajpro0-netizen/dexfomo.git
cd dexfomo
```

2. Serve locally (recommended):
```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

## Environment & secrets
This project is a static demo. No secrets should be committed. If you integrate external APIs (market data, email, payments), store keys in environment variables and add them to `.env` locally. See `.env.example` for placeholders.

## Development commands
- Edit HTML/CSS/JS files in the repo root.
- Use a local static server to preview changes.

## Build & tests
There are no automated tests or build steps currently. This is intended as a starter prototype.

## Security notes
- Never commit API keys or private credentials.
- .gitignore includes `.env` and common node artifacts.

## Implemented vs Planned
Implemented (demo): responsive multi-page static site, demo pairs table with simulated sparklines, watchlist UI, waitlist form (client-side only)
Planned: live market integrations, developer API, subscription billing, alerts, AI insights, enterprise features.

## Next steps before production
- Integrate a secure backend for waitlist storage
- Choose data provider(s) for on-chain DEX feeds and add server-side ingestion
- Implement authentication, role-based admin, and rate-limited API endpoints
- Add CI and deploy pipeline (GitHub Actions) and enable GitHub Pages or other hosting

