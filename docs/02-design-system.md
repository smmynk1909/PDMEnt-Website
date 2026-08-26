# 02 — Design System

Implementation file: [`/design/tokens.css`](../design/tokens.css).  
Living preview: [`/docs-site/index.html`](../docs-site/index.html).

## 1. Spatial system

Apple uses a tight global nav (48px) and huge content padding. Copy that ratio.

| Token | Value | Use |
|---|---|---|
| `--rm-nav-global` | 48px | Top pane |
| `--rm-nav-local` | 52px | Category local nav |
| `--rm-nav-filter` | 56px | Filter/sort bar (appears on scroll) |
| `--rm-gutter-d` | 22px | Desktop edge (Apple ~22–80; we use 24–80) |
| `--rm-gutter-m` | 16px | Mobile |
| `--rm-section-y` | 100–120px | Between chapters |
| `--rm-hero-min` | 100svh | Category hero |
| `--rm-radius-s` | 12px | Chips, inputs |
| `--rm-radius-m` | 18px | Cards |
| `--rm-radius-l` | 28px | Lineup tiles (Apple-like large radius) |
| `--rm-shadow` | none by default | Prefer hairlines; 0 20px 40px rgba(35,32,26,0.06) only on floating bag |

Grid: 12 columns, max width **1400px** for catalog; **980px** for reading (About, legal). Lineup tiles may break the grid and use horizontal scroll (Apple Mac).

## 2. Elevation and surfaces

| Surface | Treatment |
|---|---|
| Page | `--rm-cream` |
| Lineup card | `--rm-white` fill, no border, 28px radius |
| Filter bar | cream at 80% + `backdrop-filter: saturate(180%) blur(20px)` (Apple nav) |
| Global nav | `rgba(244,241,232,0.86)` + blur 20px |
| Mega menu | solid cream, full-width, top hairline |
| Modal / bag drawer | forest ink 40% overlay, panel cream from right |
| Toast | forest bg, lime check, cream text |

## 3. Navigation (Top pane)

This is the most important chrome. Specify it once; every page inherits it.

### 3.1 Global nav (always)

Height 48px. Content:

Left: wordmark **Roots and Mills** → `/`

Center (desktop):

- Masalas
- Flour
- Coffee
- Tea
- Oil
- Explore (About, Triad, Journal, Gifts)

Right:

- Search (icon)
- Account (icon)
- Bag (icon + count)

Hovering a center item opens a **full-width mega menu** (Apple 2023+ text-first mega nav, not tiny icons only).

**Masalas mega menu columns (example):**

| Explore | Indian | World | Heat | Blends |
|---|---|---|---|---|
| All Masalas | Haldi | Oregano | Lal Mirch | Kitchen King |
| Compare | Amchur | Chilli flakes | Podi | Sambhar |
| Gifts | Jeera, Dhania… | … | … | Pav Bhaji, Chole, Rajma, Chana |

Each column lists 4–7 links + “Shop all →”.

Mobile: hamburger. Categories accordion. Bag still visible.

### 3.2 Local nav (category and PDP)

Appears under global nav on `/masalas`, `/flour`, `/coffee`, `/tea`, `/oil`, and product pages.

Left: family name (e.g. **Masalas**)  
Center: Explore · Indian · Foreign · Blends · Compare  
Right: **Buy** (forest pill) — jumps to catalog chapter `#lineup`

On PDP, local nav becomes: Product name · Dakshya · Prateet · Soma · Reviews · Buy

Sticky. When user scrolls past hero, local nav gains a hairline and the **Buy** button fills forest.

## 4. Category page behaviour (core UX)

Specified in detail because it is the Apple equivalent of `/mac` or `/iphone`.

### 4.1 States

**State A — Glimpse (hero + lineup)**  
User has selected a category. Full-viewport hero, then “Explore the lineup” cards (Apple MacBook Neo / Air / Pro pattern).

**State B — Catalog (on scroll)**  
When the lineup section’s bottom crosses a threshold (~40% viewport) **or** the user clicks a subnav / “Shop all”:

1. A **filter + sort bar** animates in, stuck under local nav.
2. A **right-edge scroller** (section rail) fades in, desktop only ≥ 1080px.
3. The page becomes a long catalog of segmented chapters.

Do not show filters on first paint of the category page. The glimpse must stay cinematic.

### 4.2 Filter / sort bar (top, after rendering starts)

Left: result count in Inconsolata (`42 masalas`)  
Center/left: filter chips (not a 200px left sidebar — Apple-like, Facet pattern from Refero “Filter & Sorting”, horizontal for brand stores with ≤ 6 facets)

Facets for masalas:

- Origin: Indian | South-East Asia | Other
- Form: Whole | Ground | Blend
- Heat: None | Low | Medium | High
- Diet: Jain-friendly | Vegan (all) | Gluten-free
- Size: 50g | 100g | 250g | 500g
- Pillar pick: Dakshya | Prateet | Soma (curated flags)

Right: sort select

- Featured (default)
- New
- Price ascending / descending
- Rating
- Name A–Z

Active filters become lime-outline chips with ×. “Clear all” in Inconsolata.

Mobile: one **Filter** button opens a bottom sheet (Mobbin: filter sheet on grocery/shop). Sort is a separate sheet.

### 4.3 Right scroller

Desktop. Fixed to the right, vertically centered, ~40px from edge.

Looks like Apple’s page dots / Vision-style rail:

```
· Glimpse
· Lineup
○ Indian
· Foreign
· Blends
· Heat
· Reviews
· Pairings
```

- Current section: lime filled tick, label appears on hover or always in a 12px Inconsolata caption
- Click: smooth scroll to `[data-chapter]`
- Updates via IntersectionObserver (rootMargin matching sticky header stack: global + local + filter ≈ 156px)

Chapters for Masalas (example):

1. `glimpse` — hero
2. `lineup` — featured SKUs like Mac lineup
3. `indian`
4. `foreign`
5. `blends`
6. `heat`
7. `reviews` — category-level
8. `pairings` — with flour / oil / tea

Other families swap chapters (Coffee: India, SEA, Process, Roast).

## 5. Lineup cards (Apple Mac / iPhone)

Horizontal scroll-snap row, or wrapped grid on large screens.

Each card:

```
[ colour field / product image, 4:5 ]
New | dummy
Name                 Outfit 28
One-liner            IBM Plex 17
From ₹249            Outfit 14, mustard if on offer
[ Learn more ]  [ Buy ]
Colour dots if variants (grind, roast, size)
```

Tap Learn more → PDP. Buy → quick bag or PDP depending on variants.

Compare with Apple Mac:

| Apple | Roots and Mills |
|---|---|
| MacBook Air | Everyday Haldi |
| MacBook Pro | Lakadong / single-estate Haldi |
| Mac mini | Small tin / travel |
| Displays | Accessories: mills, spoons, gift sleeve |

## 6. Product detail (PDP)

Apple product page + Diaspora-style proof + typewriter ledger.

1. Sticky gallery left (desktop) / top (mobile)
2. Buy column: name, one-liner, price, size, add to bag, triad chips
3. Scroll chapters: Dakshya, Prateet, Soma, How to use, Specs (typewriter table), Reviews, You might also like

Reviews: Refero pattern “Reviews & Rating” — summary histogram + list + photo reviews. Sort: Most recent, Highest, Lowest, With photos.

## 7. Buttons

| Kind | Look | Use |
|---|---|---|
| Primary | Forest fill, cream text, 12px 22px, 980 radius (pill) | Buy, Add to bag, Checkout |
| Secondary | Transparent, forest 1.5px border | Learn more |
| Ghost | Text only, underline on hover | Footer, inline |
| Lime | Lime fill, ink text | Selected filter, in-stock |

Height 44px minimum (touch).

Hover: 200ms, slight brightness. Active: scale 0.98.

## 8. Forms

IBM Plex Sans labels, Inconsolata for SKU / pincode / batch inputs (ledger feel).

Focus ring: 2px lime, offset 2px (Growth Today uses a blue focus; we replace with lime to stay on-brand while remaining obvious).

Error: forest is for trust, so errors use `#9B2C2C` text + cream field, not lime.

## 9. Bag

Right drawer, 420px. Line items with tiny product field, Inconsolata qty stepper, Outfit price.

Empty: one sentence in Inconsolata: `The mill is quiet. Add a tin.`

## 10. Breakpoints

| Name | Min | Nav | Lineup | Right rail |
|---|---|---|---|---|
| xs | 0 | hamburger | vertical cards | hidden, replaced by top chips |
| sm | 640 | hamburger | 2 col | hidden |
| md | 868 | compact global | 3 col | hidden |
| lg | 1080 | full global + mega | 4 col / snap | **visible** |
| xl | 1400 | full | 4–5 | visible |

Sticky header stack height is a CSS var `--rm-sticky-stack` updated when filter bar mounts.

## 11. Motion tokens

See [04 — Interaction](04-interaction-and-motion.md). Defaults:

- `--rm-ease`: `cubic-bezier(0.25, 0.1, 0.25, 1)` (Apple-ish)
- `--rm-fast`: 180ms
- `--rm-med`: 320ms
- `--rm-slow`: 600ms

`prefers-reduced-motion: reduce` → no scroll-pinning, instant chapter jumps.

## 12. Dark patterns forbidden

- Pre-ticked add-ons
- Confirmshaming
- Fake “12 people viewing”
- Infinite countdown
