# Roots and Mills — Design & Development Documentation

**Brand:** Roots and Mills  
**Legal entity:** PDM Enterprises (Pratik, Daxesh, Mayank)  
**Tagline:** Dakshya · Prateet · Soma  
**Meanings:** Mastery · Trust · Calm  
**Repo:** `PDMEnt-Website`

This folder is the source of truth for designing and building the Roots and Mills website and, later, marketplace. Read documents in order the first time. After that, jump by task using the map below.

## How to use this pack

| If you are… | Start here |
|---|---|
| Aligning on what we are building | [00 — Vision and Product Brief](00-vision-and-brief.md) |
| Designing screens or a visual system | [01 — Brand](01-brand-identity.md) → [02 — Design System](02-design-system.md) |
| Building navigation, routes, or IA | [03 — Information Architecture](03-information-architecture.md) |
| Implementing Apple-like motion | [04 — Interaction and Motion](04-interaction-and-motion.md) |
| Implementing a specific page | [05 — Page Specifications](05-page-specifications/00-overview.md) |
| Adding or editing dummy products | [06 — Product Catalog](06-product-catalog.md) and `/catalog` JSON |
| Writing copy | [07 — Voice and Content](07-content-voice.md) |
| Choosing stack / APIs / data | [08 — Technical Architecture](08-technical-architecture.md) → [09 — Data Model](09-data-model.md) |
| Instrumenting analytics | [10 — Analytics](10-analytics.md) |
| Planning sprints / tickets | [11 — Development Plan](11-development-plan.md) |
| Thinking about the future marketplace | [12 — Marketplace Roadmap](12-marketplace-roadmap.md) |
| Checking design references | [13 — Design References](13-design-references.md) |
| QA / accessibility / launch | [14 — Accessibility](14-accessibility.md) → [15 — QA](15-qa-acceptance.md) |
| Building UI components | [16 — Component Inventory](16-component-inventory.md) |

Living visual spec (open in a browser):

- [`/docs-site/index.html`](../docs-site/index.html) — brand, tokens, type, category behaviour, and dummy catalog preview
- [`/design/tokens.css`](../design/tokens.css) — CSS custom properties to copy into the app

## Non-negotiables

1. **The site must feel like Apple.com**, not a generic grocery store: sparse type, huge product photography, sticky dual navigation, lineup cards, and scroll-driven storytelling.
2. **The palette is cream + turmeric yellow + growth green**, taken from [growthtoday.co](https://growthtoday.co) (cream canvas `#F4F1E8`, lime `#54FF99`, forest `#0D4A25`) and extended with turmeric for spices.
3. **Every product story is framed by Dakshya, Prateet, and Soma.** No product page ships without all three.
4. **Product information uses a typewriter face** (Inconsolata). UI chrome uses Outfit / IBM Plex Sans — the same pairing as Growth Today.
5. **Phase 1 ships dummy products** so the experience can be judged before real inventory, payments, or logistics exist.
6. **The web app must be instrumented from day one.** Analytics is not a later add-on; events are specified in [10 — Analytics](10-analytics.md).
7. **Marketplace is a later capability**, not the first architecture. Build a first-party brand store that can later host other sellers.

## Design research used

Primary references (as requested):

- [Refero.design](https://refero.design/) — page types, flows, and UX patterns (catalog, PDP, filters, reviews, checkout, dashboards)
- [Mobbin](https://mobbin.com/) — web/iOS screens for product detail, adding to cart, filters, checkout
- [Recent.design](https://recent.design/) — motion, product-page transitions, retail explorations, sidebar sub-menus

Behavioural north star:

- [Apple.com Mac](https://www.apple.com/mac/) and [iPhone](https://www.apple.com/iphone/) — lineup, local nav, scroll chapters
- [growthtoday.co](https://growthtoday.co) — yellow-green cream palette, Outfit + IBM Plex Sans + Inconsolata

Category / pantry craft (not visual clones):

- [Diaspora Co.](https://www.diasporaco.com/) — origin, harvest, trust tables
- [Burlap & Barrel](https://www.burlapandbarrel.com/) — tasting notes and sourcing

Refero MCP is not connected in this environment (Pro subscription required). The research methodology, page types, and pattern names from Refero’s public docs are applied throughout. When Refero MCP is connected, run the queries listed in [13 — Design References](13-design-references.md) before implementing a screen.

## Suggested first development ticket

Implement the design tokens, global nav + mega menu, and the Masalas category page against dummy JSON in `/catalog`. That single vertical proves the Apple-like interaction model the rest of the store inherits.
