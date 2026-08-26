# 03 — Information Architecture

## 1. Sitemap

```
/
├── /masalas
│   ├── /masalas/indian
│   ├── /masalas/world
│   ├── /masalas/blends
│   ├── /masalas/heat
│   └── /masalas/[handle]          PDP
├── /flour
│   ├── /flour/millets
│   ├── /flour/pulses
│   ├── /flour/wheat
│   ├── /flour/rice
│   └── /flour/[handle]
├── /coffee
│   ├── /coffee/india
│   ├── /coffee/south-east-asia
│   ├── /coffee/process
│   └── /coffee/[handle]
├── /tea
│   ├── /tea/india
│   ├── /tea/south-east-asia
│   ├── /tea/style
│   └── /tea/[handle]
├── /oil
│   ├── /oil/india
│   ├── /oil/world
│   └── /oil/[handle]
├── /explore
│   ├── /explore/dakshya-prateet-soma
│   ├── /explore/founders            PDM — Pratik, Daxesh, Mayank
│   ├── /explore/journal             later
│   └── /explore/gifts
├── /search?q=
├── /bag                             or drawer-only; URL for share/refresh
├── /checkout
├── /account
│   ├── /account/orders
│   ├── /account/orders/[id]
│   ├── /account/addresses
│   └── /account/reviews
├── /order/thank-you/[id]
├── /legal/privacy
├── /legal/terms
├── /legal/shipping
├── /legal/fssai
└── /studio                          internal analytics (Phase 4)
    ├── /studio/overview
    ├── /studio/catalog
    ├── /studio/orders
    └── /studio/funnels
```

Subcategory URLs are **filters on the same category template**, not separate visual systems. `/masalas/indian` opens Masalas in State B with Origin=Indian preselected and chapter `indian` in view.

## 2. Navigation model

Apple uses:

1. **Globalnav** — product families
2. **Localnav** — in-family
3. **Page chapters** — on-page anchors

We match that exactly. Do not add a third persistent left sidebar on desktop category pages (that is grocery SaaS). Segmentation lives in:

- Mega menu (intent)
- Local nav (family)
- Right scroller + chapters (orientation after scroll)
- Top filter bar (refinement)

## 3. URL and handle rules

- Handles: lowercase, hyphenated, stable (`haldi-lakadong-dummy`)
- Dummy SKUs prefix `RM-DUM-`
- Never put spaces or Unicode in the path; display names can have diacritics
- Query for filters: `?origin=india&form=ground&sort=featured` — shareable

## 4. Search

Command-palette energy (Refero: command palette / search) **or** full page.

v1: `/search` full page with the same filter bar as category.

Suggestions:

- Products
- Families
- Recipes / uses (“sambhar”, “dosa batter”, “pour over”)

## 5. Homepage IA (Apple store + brand)

Not a banner carousel of 8 offers.

Chapters:

1. Hero: Roots and Mills + triad
2. Family tiles (5) — like Apple “Quick links” / product lockups
3. Featured lineup (mix, 4 SKUs)
4. Triad explainer (three calm columns, not icon soup)
5. Review strip
6. Journal / mill note (optional)
7. Footer

## 6. Content objects

| Object | Examples |
|---|---|
| Family | Masalas |
| Segment | Indian, Blends, Heat |
| Product | Haldi 100g |
| Variant | 50g / 100g / 250g |
| Batch | dummy lot |
| Review | 1–5 + body + photos |
| Recipe pair | “Khapli roti + ghee” |
| Bundle | Soma gift trio |

## 7. Marketplace-ready IA (do not build UI yet)

Reserve:

- `/makers/[slug]` — mill / estate story
- `/m/[handle]` — seller storefront
- Query `?seller=`

Catalog schema includes `vendorId` from day one (`pdm` for first-party). See [12 — Marketplace](12-marketplace-roadmap.md).

## 8. Redirects and aliases

| Alias | Canonical |
|---|---|
| /spices | /masalas |
| /atta | /flour |
| /chai | /tea |
| /pdm | /explore/founders |

## 9. 404

Cream page. Inconsolata: `This aisle is empty.` Forest button: Masalas.
