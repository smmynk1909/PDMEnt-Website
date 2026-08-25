# PDM Enterprises — Roots and Mills

Consumer brand **Roots and Mills**  
Tagline **Dakshya, Prateet, Soma** (Mastery, Trust, Calm)  
Legal entity **PDM Enterprises** — Pratik, Daxesh & Mayank

This repository currently holds the **design system, information architecture, dummy catalog, and development plan** for an Apple-like pantry store (masalas, flour, coffee, tea, oil) that will later take orders and host marketplace makers.

## Start here

1. Open **[docs/README.md](docs/README.md)** — map of every specification.
2. Open **[docs-site/index.html](docs-site/index.html)** in a browser — living visual spec (cream / turmeric / growth green).
3. Dummy products: **[catalog/products.json](catalog/products.json)**

## Design references used

- [Apple.com Mac / iPhone](https://www.apple.com/mac/) — lineup, local nav, scroll chapters
- [growthtoday.co](https://growthtoday.co) — cream, lime `#54FF99`, forest, Outfit + IBM Plex Sans + Inconsolata
- [Refero.design](https://refero.design/) — catalog, PDP, filters, reviews, checkout, dashboards
- [Mobbin](https://mobbin.com/) — mobile filter sheets, bag, checkout
- [Recent.design](https://recent.design/) — card transitions, product pages, retail UI

Refero MCP is not authenticated in this environment. To connect later, copy [.cursor/mcp.json.example](.cursor/mcp.json.example) and add a Refero Pro token. Queries to run are listed in [docs/13-design-references.md](docs/13-design-references.md).

## Build order

See [docs/11-development-plan.md](docs/11-development-plan.md). First engineering vertical: design tokens + global nav + **Masalas category** (glimpse → filters + right scroller).

Orders, Razorpay, and Studio analytics come after the dummy storefront feels like Apple. Marketplace sellers come last.
