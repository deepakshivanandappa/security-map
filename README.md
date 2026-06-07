# Security Landscape

> Have you ever gotten confused with Security JARGON?  
> Being in the industry for decades, I get confused at times —  
> so my response to that confusion: build a clean visual flow for clarity.

**[→ Open the app](https://deepakshivanandappa.github.io/security-map/)**

---

An interactive map of 47 enterprise security terms across 6 layers —
Network, Cloud (AWS/K8s), Identity, DevSecOps, Clients, and Monitoring.
Each term includes a plain-English description, where it fits in your
architecture, OSS alternatives, and the vendor landscape.

## What's inside

- **6 security layers** — click any layer to explore its terms
- **47 terms** — WAF, CSPM, SIEM, SOAR, ZTNA, EDR, and more
- **Per-term flow diagrams** — see exactly where each tool sits in your stack
- **Vendor landscape** — public companies, private startups, and OSS options
- **Full architecture map** on the home page — clickable top-to-bottom overview

## Tech stack

- React 19 + Vite — no UI framework, inline styles throughout
- Zero runtime dependencies beyond React itself
- Deployed via GitHub Pages + GitHub Actions

## Run locally

```bash
git clone https://github.com/deepakshivanandappa/security-map.git
cd security-map
npm install
npm run dev        # → http://localhost:5173
```

## Deploy your own

1. Fork this repo
2. Go to **Settings → Pages → Source** and select **GitHub Actions**
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` handles the rest
