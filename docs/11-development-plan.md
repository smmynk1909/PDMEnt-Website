# 11 — Development Plan

Work is sequenced so the **Masalas category page** (Apple /mac analog) is real as early as possible. Dummy JSON is the catalog. Do not wait for inventory, FSSAI, or photography.

Durations are intentionally omitted. Each phase is a vertical slice with acceptance gates.

## Phase 0 — Foundations

**Goal:** The app can render cream, type, and nav at Apple density.

- Next.js + TS + tokens.css + fonts
- Global nav + mega menu (Masalas populated, others stub)
- Footer with PDM + triad
- Dummy banner component
- Import `catalog/*.json`
- Lint, preview deploys

**Gate:** `/` shows wordmark, nav, footer. No broken layout at 375 / 768 / 1440.

## Phase 1 — Category experience (the product)

**Goal:** `/masalas` matches [category spec](05-page-specifications/category.md).

- Glimpse hero
- Lineup cards (Apple)
- State machine glimpse ↔ catalog
- Filter + sort bar entrance
- Right scroller + chapters
- Query-string filters
- Mobile filter sheet + chapter chips
- Repeat template for flour, coffee, tea, oil (data-driven chapters)

**Gate:** Founders can demo Masalas on a laptop and a phone; filters hidden until scroll; rail on desktop.

## Phase 2 — PDP, home, search, bag (dummy commerce)

- PDP with triad chapters, typewriter specs, reviews
- Shared-element or fade routing
- Home lockups + featured
- Search
- Cart localStorage + drawer
- Mock checkout (no money) → dummy order id
- Dummy disclaimer on Buy

**Gate:** Walkthrough: Home → Masalas → Haldi → Add → Bag → Mock pay → Thank you.

## Phase 3 — Real orders

- Auth
- Postgres orders
- Razorpay
- Pincode / shipping rules (even if one metro)
- Emails/WhatsApp transactional
- Remove dummy sale or clearly split “preview SKUs”

**Gate:** One paid test order in Razorpay live/test as agreed.

## Phase 4 — Studio analytics

- Event wrapper from day one of Phase 1 (even if Studio UI is later)
- `/studio` overview, funnel, catalog table
- PostHog dashboards mirrored

**Gate:** Founders see yesterday’s funnel without asking an engineer for a CSV.

## Phase 5 — Marketplace rails

See [12](12-marketplace-roadmap.md). Only after Phase 3 is stable.

## Cross-cutting (every phase)

- Accessibility ([14](14-accessibility.md))
- Performance budgets
- Content: no lorem; use catalog JSON
- Motion: reduced-motion path
- Refero/Mobbin check before inventing a new pattern

## Suggested ticket breakdown (Phase 0–1)

| ID | Ticket | Depends |
|---|---|---|
| RM-0.1 | App shell, tokens, fonts | |
| RM-0.2 | Global nav + mega menu data | 0.1 |
| RM-0.3 | Catalog types + JSON loaders | |
| RM-1.1 | Category layout + local nav | 0.2, 0.3 |
| RM-1.2 | Glimpse + lineup | 1.1 |
| RM-1.3 | Filter bar + sort + grid | 1.2 |
| RM-1.4 | View state machine + URL | 1.3 |
| RM-1.5 | Right rail + chapters + IO | 1.4 |
| RM-1.6 | Mobile sheets | 1.4 |
| RM-1.7 | Other families via config | 1.5 |
| RM-1.8 | Analytics events category | 1.4 |

## What not to do in Phase 1

- Magento/Shopify theme customisation
- Native apps
- Multi-currency
- AI chat widgets
- Dark mode
- Real payment keys on production

## Definition of done (any UI ticket)

- Matches tokens
- Dummy data only (no empty boxes)
- Keyboard + focus lime
- Event fired if in dictionary
- Screenshot at 1440 and 390 attached to PR
