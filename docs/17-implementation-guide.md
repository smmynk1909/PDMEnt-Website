# 17 — Implementation Guide (build the website exactly)

This is the **build contract**. It turns the approved mockup (`/docs-site/index.html`, `/docs-site/category.html`) and the rest of this pack into an exact, buildable Next.js storefront. If any instruction here conflicts with a general doc, this file plus the mockup win for *what ships*; the design docs win for *why*.

Read first: [`README.md`](README.md), [02 — Design System](02-design-system.md), [04 — Interaction and Motion](04-interaction-and-motion.md), [08 — Technical Architecture](08-technical-architecture.md), [09 — Data Model](09-data-model.md), [16 — Component Inventory](16-component-inventory.md), and the page specs in [`05-page-specifications/`](05-page-specifications/00-overview.md).

The mockup is the **visual contract**. Reproduce its look, spacing, colour, type, and interactions 1:1 — but as a real app, not by copying the single-file HTML.

---

## 0. The one review fix — no design references on the storefront

The mockup's `index.html` is an **internal living spec**, so it shows a "References" section (apple.com, growthtoday.co, refero, mobbin, recent) and internal commentary ("From growthtoday.co production CSS", "Apple maps Mac / iPhone", "Apple Mac analog"). **None of this may appear on the real website.**

When you build the public pages:

- **Do not** render any reference links or logos (Apple, growthtoday.co, Refero, Mobbin, Recent, Diaspora, Burlap & Barrel).
- **Do not** carry over internal-only sections from the mockup home page: `#colour`, `#type`, `#ux` (the "Apple analog" table), `#plan` (development phases), and `#refs` (references). Those describe the system for the team, not the shopper.
- **Do not** use "Apple analog / Apple maps / MacBook Air of the masala cupboard" phrasing in customer copy. Keep the calm original voice ([07 — Content Voice](07-content-voice.md)).
- Product/marketing copy may keep its own words (e.g. Haldi's "Colour first. Then the kitchen calms.") — that is brand copy, not a reference.

This rule is a non-negotiable in [`README.md`](README.md) and [13 — Design References](13-design-references.md).

---

## 1. Stack (from [08](08-technical-architecture.md))

| Layer | Choice |
|---|---|
| Framework | **Next.js (App Router) + TypeScript** |
| Styling | **CSS variables** from `design/tokens.css` (global import) + CSS Modules or Tailwind v4 optional. Brand tokens first. |
| Fonts | Outfit, IBM Plex Sans, Inconsolata via `next/font/google` (self-hosted). Weights: Outfit 400–700, IBM Plex 400–600, Inconsolata 400/700. |
| Catalog v1 | `catalog/*.json` imported as modules / read at build time. No CMS yet. |
| Cart v1 | **Zustand + `localStorage`**. No real payments. Mock checkout → dummy order id. |
| Motion | CSS scroll-driven + `IntersectionObserver`; Framer Motion allowed for shared element/route transitions. Respect `prefers-reduced-motion`. |
| Analytics | Thin `track(event, props)` wrapper from day one (console/no-op sink is fine in v1). Event names in the specs. |

Do **not** start from a Shopify/Magento theme or a generic UI kit. Do **not** add auth, Razorpay, Postgres, or multi-currency in this build — those are Phase 3+.

### Setup expectations

- `package.json` with scripts: `dev`, `build`, `start`, `lint` (and `typecheck` = `tsc --noEmit`).
- ESLint + `next lint` + TypeScript strict.
- Keep `design/tokens.css` as the single source of design tokens; import it once in the root layout. Do not fork the values.
- `npm run dev` (or the chosen package manager's dev) must boot the storefront with dummy data and zero manual steps.

---

## 2. Project structure (target, from [08 §2](08-technical-architecture.md))

```
/app
  layout.tsx                 root: fonts, tokens.css, GlobalNav, Footer
  page.tsx                   Home /
  (shop)/
    [family]/page.tsx        Category /masalas /flour /coffee /tea /oil
    [family]/[handle]/page.tsx   PDP
  search/page.tsx            Search
  bag/page.tsx               Bag (drawer is global; page is fallback)
  checkout/page.tsx          Mock checkout
  api/                       (reserved; not needed for dummy build)
/components
  nav/      GlobalNav, MegaMenu, LocalNav, DummyBanner, Footer
  category/ CategoryExperience, GlimpseHero, LineupRow, LineupCard, SegmentedControl,
            FilterBar, FilterChip, SortSelect, FilterSheet, ChapterRail, Chapter, CatalogCard
  product/  PdpGallery, BuyRail, VariantPills, TriadChapter, SpecTable, ReviewSummary, ReviewList, PairingRow
  commerce/ BagDrawer, QtyStepper, Price, CheckoutForm, OrderSummary
  ui/       Button, Input, Pill, RatingStars, Skeleton, EmptySoma, Toast
/lib
  catalog.ts   typed loaders over /catalog/*.json
  cart.ts      Zustand store + localStorage
  analytics.ts track() wrapper
  format.ts    INR en-IN price, etc.
/types         Product, Variant, Review, Cart... (from doc 09)
```

Component list is the authoritative inventory — see [16](16-component-inventory.md). Build these and nothing extra.

---

## 3. Data layer (from [06](06-product-catalog.md), [09](09-data-model.md))

- Types come from [09 — Data Model](09-data-model.md) verbatim (`Product`, `Variant`, `Review`, `Cart`, `CartLine`). Put them in `/types`.
- `lib/catalog.ts` loads and validates `catalog/products.json`, `catalog/reviews.json`, `catalog/taxonomy.json`. Provide helpers:
  - `getProductsByFamily(family)`, `getProduct(family, handle)`, `getFeatured()` (`featured: true`, sort by `featuredScore` desc), `getLineup(family)` (has `lineupRank`, ascending), `getReviewsFor(handle)`, `getFamilyReviews(family)`.
- Prices render via `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })` → `₹249`.
- All products in this build are `status: "dummy"`. The dummy banner and "not for sale" disclaimer must be visible wherever a Buy affordance is.

Do not hardcode product data in components; always read from the catalog loaders (the mockup hardcodes it inline — the real app must not).

---

## 4. Design tokens & type (from `design/tokens.css`, [02](02-design-system.md))

Import `design/tokens.css` globally. Key tokens (do not change values):

- Colour: `--rm-cream #F4F1E8` (page/Soma), `--rm-white #FFFCF6` (cards), `--rm-ink #23201A`, `--rm-ink-soft #5C584F`, `--rm-lime #54FF99` (selected/focus), `--rm-forest #0D4A25` (Prateet/Buy), `--rm-olive #647C3A` (tags), `--rm-turmeric #F0C43C` (Dakshya), `--rm-mustard #D4A017` (price/stars).
- Fonts: `--rm-font-display` Outfit (headings/chrome), `--rm-font-ui` IBM Plex Sans (body chrome), `--rm-font-product` Inconsolata (all product information: specs, triad ledger, lot codes, prices-as-ledger where used).
- Nav heights: global 48px, local 52px, filter 56px. Radii: 12/18/28. Easing: `--rm-ease`, `--rm-ease-out`; durations fast/med/slow (0ms under reduced motion).

Type scale to match the mockup: hero H1 `clamp(42px, 8vw, 88px)` Outfit 500, section H2 `clamp(32px, 4vw, 48px)`, card H4 22px, product info 14–18px Inconsolata. Focus ring uses `--rm-lime`.

---

## 5. Global chrome (all pages)

### GlobalNav (`--rm-nav-global`, 48px)
Sticky, translucent cream `rgba(244,241,232,0.86)` + `backdrop-filter: saturate(180%) blur(20px)`, bottom hairline `--rm-cream-deep`. Left: wordmark **Roots and Mills** (Outfit 500, links to `/`). Center nav: **Masalas · Flour · Coffee · Tea · Oil** (each → `/[family]`). Right icons: **Search** (opens SearchOverlay), **Bag** (opens BagDrawer, shows count). Hover → `--rm-forest`. Collapses to a hamburger under 800px.

### MegaMenu
On hover/focus of a family (desktop): 5 families + short "Explore" affordance. Masalas fully populated; other families may be stubs pointing to their category page. Mobile → accordion/sheet.

### DummyBanner
Slim Inconsolata strip under the local nav on the category/PDP: `Viewing dummy mill lots. Orders will be enabled in Phase 3.` (Green background as in the mockup's category banner.)

### Footer
`Roots and Mills · Dakshya, Prateet, Soma · PDM Enterprises` and the disclaimer `Dummy mill lots for website view. Not for sale until live FSSAI and harvest fields exist.` Plus legal/nav links. Ink-soft, centered, calm. **No reference links.**

---

## 6. Home `/` (spec: [05/home.md](05-page-specifications/home.md); reproduce the *storefront* parts of the mockup only)

Order top → bottom:

1. **Hero** (`min-height` ~88–100svh, centered, cream): triad `Dakshya · Prateet · Soma` (Inconsolata, uppercase, tracking 0.18em, ink-soft) → **Roots and Mills** (Outfit display) → gloss `Mastery · Trust · Calm — a brand of PDM Enterprises / Pratik, Daxesh & Mayank` (IBM Plex, ink-soft). CTAs: forest pill **Shop masalas** → `/masalas`; ghost pill **Explore the mill** → `#families`. (The mockup labels these "Open Masalas prototype" / "Read the docs" — use the storefront labels here, not the doc links.) Title fades up; triad optional type-on caret (skip under reduced motion).
2. **Five families** (`#families`): cards for **Masalas / Flour / Coffee / Tea / Oil** with the one-liners: *The tin, considered. · Grain, milled slow. · Origin in the cup. · Leaf, unhurried. · Pressed, not performed.* Numbered `01–05` (Inconsolata), soft gradient card backgrounds as in the mockup, each links to `/[family]`. Hover image/card scale 1.03, 400ms ease-out.
3. **From the mill** (featured lineup): 4 SKUs where `featured: true`, using the **same LineupCard** as category (image on cream, name, one-liner, `From ₹X`, Learn more · Buy). Read from JSON, not hardcoded.
4. **Triad** section: three quiet chapters (Dakshya / Prateet / Soma), pillar name in Inconsolata, English in IBM Plex, one proof sentence each. No three identical icon circles.
5. **Voices**: horizontal snap of ~6 dummy reviews from `reviews.json`; stars in turmeric; name + city in Inconsolata.
6. **Footer**.

**No** `#colour`, `#type`, `#ux`, `#plan`, `#refs` sections. No right rail, no filter bar on home.

Analytics: `home_view`, `home_family_click`, `home_featured_click`.

---

## 7. Category `/[family]` (spec: [05/category.md](05-page-specifications/category.md); mirror `docs-site/category.html`)

This is the most important screen. One data-driven template renders all five families; **Masalas** is the reference implementation and must match the mockup exactly.

### Local nav (`--rm-nav-local`)
`Masalas | Explore · Indian · World · Blends · Heat | Buy`. **Buy** is a forest pill; clicking scrolls to the lineup and engages the catalog (mirror the mockup's `#buy` handler).

### State machine — glimpse ↔ catalog
Exactly as the mockup: start in **glimpse**. Add `catalog` state to the page when the user scrolls past the lineup; remove it near the top. Concretely (from `category.html`):
- Enter catalog when `scrollY > lineup.offsetTop + lineup.offsetHeight * 0.35`, or when the lineup leaves the top of the viewport (IntersectionObserver, `rootMargin: "-120px 0 0 0"`, threshold ~0.08).
- Return to glimpse when `scrollY < lineup.offsetTop - 40` (near top).
- The **FilterBar** and **ChapterRail** are hidden in glimpse and only mount/reveal in catalog state (rail only at viewport ≥ 1080px).

### A. GlimpseHero (`#glimpse`, full viewport)
Left/center: **Masalas** (Outfit display XL). Under: Inconsolata `Dakshya · Prateet · Soma`. One sentence IBM Plex: `Indian kitchens, and the spices that travelled to them.` Right: clustered dummy tins (colour blocks per product `image.bg`/`accent`, as the mockup does). Optional thin lime scroll-progress line.

### B. Lineup (`#lineup`)
Heading **Explore the lineup.**; subhead (Inconsolata) `Dummy mill lots — for view, not yet the warehouse.` **SegmentedControl**: `All · Everyday · Regional · World · Heat` — filters the lineup row only (mirror the mockup's `#seg` → `renderLineup()`), not the full catalog. Cards = products with `lineupRank` (ascending). LineupCard anatomy: image (1:1 or 4:5 on cream), variant/heat dots, name, one-liner, `From ₹X`, **Learn more** (ghost) · **Buy** (forest).

### C. Catalog (State B)
When catalog is active, mount the **FilterBar**:
```
[ N masalas ]  [ Origin ▾ ] [ Form ▾ ] [ Heat ▾ ] [ Size ▾ ]        Sort: Featured ▾
```
Active filters show as **FilterChip**s (lime when active, mirroring the mockup's `.facets button.on`). Below: a responsive **grid** (2/3/4 cols) of **CatalogCard**s (denser than lineup): image, name, price, rating, Prateet badge if lab-tested.

**Chapters** (each a heading + grid subset), for Masalas: **Indian** (`#indian`), **World** (`#foreign`), **Blends** (`#blends`), **Heat** (`#heat`) — matching the mockup's chapter ids. Hide a chapter heading if a filter empties it (no empty graves). Other families use the chapter mapping table in [05/category.md](05-page-specifications/category.md).

**Filter logic:** AND across facet groups, OR within a group. Sync to the URL query (`router.replace`/`nuqs`) so Back restores filters. **Sort:** featured (`featuredScore` desc then name), price, rating, newest (`createdAt`) — mirror the mockup's `#sort` → `renderGrids()`.

### D. ChapterRail (right scroller, desktop ≥ 1080px)
Items = `Glimpse`, `Lineup`, then chapters that currently have products (`Indian`, `World`, `Blends`, `Heat`). Scroll-spy highlights the current item (mockup: `.cur` when a section's top < 180px). Clicking scrolls to that chapter. Hide rail items whose chapter is filtered empty.

### E. Family reviews & pairings
Before the footer: dummy reviews filtered by family from `reviews.json`, and pairings.

### Mobile
Right rail → horizontal chapter chips under a Filter button; filters → **FilterSheet**; lineup → snap carousel with a peek of the next card.

Analytics: `category_view`, `category_mode_catalog`, `filter_apply`, `sort_change`, `lineup_click`, `rail_click`, `catalog_product_click`.

Acceptance: filters **not** visible above the fold on first load; scrolling to a chapter reveals filters + rail (desktop); keyboard "Skip to catalog" link; a11y ≥ 90 on dummy content.

---

## 8. PDP `/[family]/[handle]` (spec: [05/product.md](05-page-specifications/product.md))

Layout lg+: sticky 7-col gallery + 5-col buy rail, then full-width triad chapters, "How we use it", spec table, reviews, and "others in family".

- **Local nav:** `{name} · Dakshya · Prateet · Soma · Reviews · Buy` (Buy sticky forest pill).
- **Gallery:** primary still + thumbs (use `image.bg`/`accent` colour blocks for dummy), real alt text from `image.alt`.
- **BuyRail:** `New · Dummy lot` tag, name, one-liner, price, `Inclusive of dummy GST`, **VariantPills** (sizes from `variants`) that update price + URL (`?size=100g`), **Add to bag** (full-width forest) → cart store + Toast, optional Buy now. Inconsolata triad ledger (Dakshya/Prateet/Soma from the product fields). Out-of-stock dummy → forest outline **Notify** (store email; never fake stock).
- **TriadChapter** ×3: each ≥ 70vh, cream, large type, sticky product image beside on xl.
- **SpecTable** (Inconsolata, hairline rows): SKU, Net qty, Origin, Form, Heat, Best before (12 months dummy), Vendor.
- **Reviews:** histogram 5–1, average to 1 decimal, sort + "With photos", each review with stars/title/body/name/city/verified-dummy badge/lot; optional founder reply.
- **Similar:** 4 pairing cards from `pairings` (don't leak other families unless pairings say so).
- SEO JSON-LD: Product, Offer (INR), Brand Roots and Mills, Manufacturer PDM Enterprises.

Analytics: `pdp_view`, `variant_change`, `add_to_bag`, `review_sort`, `chapter_view`.

---

## 9. Commerce (dummy) & Search

- **BagDrawer** (global): line items (name, variant, qty stepper, price), subtotal, `Checkout`. Persist to `localStorage` via the cart store. `QtyStepper` uses typewriter numerals.
- **Mock checkout** `/checkout`: `CheckoutForm` + `OrderSummary`, **no money** — on submit generate a dummy order id and show a thank-you. Clear disclaimer that no order is placed. No Razorpay/keys.
- **Search** `/search` + SearchOverlay: client filter over the catalog JSON (name, family, tags). Skeletons on first load.
- Cart events per specs; `add_to_bag` fires on PDP and lineup Buy.

---

## 10. Motion & accessibility (from [04](04-interaction-and-motion.md), [14](14-accessibility.md))

- Scroll-driven reveals via IntersectionObserver; shared-element/fade route transitions allowed (Framer Motion) but must degrade to instant under `prefers-reduced-motion` (tokens already zero the durations).
- Keyboard: all families/cards/filters tabbable; visible **lime** focus ring; skip links.
- No autoplaying video in v1. Lighthouse a11y ≥ 90 on dummy content. Test at 375 / 390 / 768 / 1440.

---

## 11. Definition of done (this build)

- `dev`, `build`, `lint`, `typecheck` all pass; app boots on dummy data with no manual steps.
- Home, `/masalas` (exact mockup parity), the other four category families (data-driven), a working PDP (e.g. `/masalas/haldi`), search, bag drawer, and mock checkout all work.
- End-to-end walkthrough passes: **Home → Masalas → (scroll: glimpse → filters + rail) → Haldi PDP → Add to bag → Bag → Mock checkout → dummy order id.**
- **No design references / internal analogies on any public page** (§0).
- Tokens/fonts match `design/tokens.css`; product info in Inconsolata; every product shows Dakshya · Prateet · Soma.
- No empty boxes (dummy data everywhere); no Shopify/MUI/Bootstrap leftovers.
- Responsive at 375/768/1440; keyboard + lime focus; reduced-motion path.

## 12. Do not (this phase)

Auth, real payments/Razorpay keys, Postgres, multi-currency, native apps, AI chat widgets, dark mode, Shopify/Magento themes, generic UI kits, or shipping the internal spec sections/references to customers.
