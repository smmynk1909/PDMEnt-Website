# 13 — Design References

Requested sources, how they were used, and queries to re-run when MCP is connected.

> **Internal only — never ship references to customers.** Apple, growthtoday.co, Refero, Mobbin, Recent, Diaspora Co., and Burlap & Barrel are *research inputs* for the team. They must **never** appear on any customer-facing page — no reference links, no "from growthtoday.co" captions, no "Apple maps Mac / iPhone" analogies, no "Apple analog" labels. The living-spec pages in `/docs-site` intentionally expose this commentary because they are an **internal design artifact**, not the storefront. The built website (see [17 — Implementation Guide](17-implementation-guide.md)) strips all of it.

## 1. Refero.design

Site: [https://refero.design/](https://refero.design/)  
MCP: [https://api.refero.design/mcp](https://api.refero.design/mcp) (Refero Pro + OAuth/token; **not connected in this documentation pass**)  
Skill: `npx skills add https://github.com/referodesign/refero_skill --skill refero-design`  
Docs: [Getting started](https://doc.refero.design/mcp/getting-started), [Tools](https://doc.refero.design/mcp/tools.md)

### Methodology applied (Refero Skill)

1. Brief (this pack)
2. Styles for taste (Growth Today + Apple, not a random SaaS average)
3. Screens for structure (catalog, PDP, filters, reviews, checkout, dashboard)
4. Flows for cart → pay
5. Decision ledger (below) — do not average references

### Page types mapped

| Refero page type | Our screen |
|---|---|
| Product Page & Landing | Home, family glimpse |
| Catalog Page | Category State B |
| Product Details | PDP |
| Log In / Profile | Account |
| Dashboard | Studio |
| 404 | 404 |
| About | Founders / triad |

### UX patterns mapped

| Refero pattern | Ours |
|---|---|
| Filter & Sorting | Top bar after scroll; sheet on mobile |
| Reviews & Rating | PDP + family chapter |
| Searching | Nav + /search |
| Shopping / Adding to Cart | Bag drawer |
| Suggestion & Similar Items | PDP essentials |
| Testimonials | Home voices |
| Stats | Studio |
| Skeleton | Catalog first load |

### Connect MCP later — run these queries

Styles:

- `premium food brand website cream green editorial`
- `apple.com product family landing sparse typography`
- `specialty coffee tea product marketing site`

Screens (`platform: web`):

- `catalog page filter chips horizontal`
- `product details reviews histogram`
- `ecommerce checkout pincode address`
- `dashboard kpi sparkline table`
- `mega menu product navigation`
- `empty cart state`
- `food drink product origin story`

Flows:

- `adding to cart`
- `checkout with promo code` (we may skip promo in v1)
- `signup onboarding` (light)

Do not copy a Refero screenshot. Extract structure, hierarchy, and states.

## 2. Mobbin.com

Site: [https://mobbin.com/](https://mobbin.com/)  
MCP exists on their product (Pro). Not connected here.

Use for **mobile web** (our hamburger, filter sheet, bag, checkout) even though we are not shipping native first.

Look at flows:

- Adding to cart
- Browsing / catalog
- Checkout
- Product detail (Shop app coffee PDP is a useful grocery-adjacent example)
- Filter & sort
- Onboarding (skip for v1 guests)

Collections to search in the UI: Checkout, Home, Product detail, Slider/Carousel (lineup).

## 3. Recent.design

Site: [https://recent.design/](https://recent.design/)

Posts used as **motion/layout energy** (not templates):

| Post (as listed on Recent) | Takeaway for us |
|---|---|
| Card Details Transition | Lineup card → PDP shared image |
| Sidebar Sub-Menu | Mobile category accordion / mega |
| Antimetal Product Pages | Sparse industrial PDP; specs as first-class |
| Vercel for Retail | Retail + system UI; keep Soma, borrow clarity |
| SpaceXAI Bento | Home family lockups with restraint |
| Factory Automation Interface | Studio density ceiling — do not make the shop look like this |
| Tachometer Component | Optional Studio KPI, not storefront |

## 4. Apple.com (behavioural north star)

- [https://www.apple.com/mac/](https://www.apple.com/mac/) — **Explore the lineup**, segmented control, localnav, product cards with Learn more / Buy, colour dots
- [https://www.apple.com/iphone/](https://www.apple.com/iphone/) — chaptered storytelling, sticky product
- Store configurator — variant pills, From $X, sparse FAQ
- Global nav 48px + local nav 48px, backdrop blur ([layout.design Apple kit](https://layout.design/gallery/apple))

Map:

| Apple | Roots and Mills |
|---|---|
| Mac / iPhone / Watch | Masalas / Flour / Coffee / Tea / Oil |
| MacBook Air vs Pro | Everyday Haldi vs single-origin Haldi |
| Compare | Later `/masalas/compare` |
| Bag | Bag |
| Apple Values | Dakshya Prateet Soma |

We do **not** copy SF Pro, Apple icons, or copyrighted photography.

## 5. growthtoday.co (colour + type)

Extracted CSS tokens:

- Cream `#F4F1E8`, ink `#23201A`, lime `#54FF99`, forest `#0D4A25`, olive `#647C3A`, lime-soft `#BBFFD6`
- Fonts: Outfit, IBM Plex Sans, **Inconsolata** (our typewriter)

We add turmeric `#F0C43C` for Dakshya / spice.

## 6. Pantry craft (content, not chrome)

- [Diaspora Co.](https://www.diasporaco.com/) — origin, harvest, comparison table energy for Prateet
- [Burlap & Barrel](https://www.burlapandbarrel.com/) — tasting notes, cooking tips

Do not clone their Shopify look.

## 7. Decision ledger (primary vs secondary)

| Decision | Primary | Secondary (borrow only) |
|---|---|---|
| Pace, lineup, nav, scroll chapters | Apple | — |
| Palette, font trio | Growth Today | Turmeric extension |
| Catalog filters after intent | Refero filter patterns + Instacart-like facet logic | Mobbin mobile sheets |
| PDP proof | Diaspora / B&B content depth | Apple sticky media |
| Motion transitions | Apple + Recent card transition | — |
| Studio | Refero dashboard | Recent factory UI (caution) |

## 8. Anti-references

- Blinkit / Zepto home (density, countdown, coupons)
- Generic Shopify “premium spice” templates (script fonts, kraft paper overload)
- Dark SaaS dashboards as the storefront
