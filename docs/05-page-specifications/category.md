# Category — `/masalas` (template for all families)

Apple analog: [Mac](https://www.apple.com/mac/), [iPhone](https://www.apple.com/iphone/).  
Refero page type: **Catalog Page** + **Product Page & Landing**.  
Refero UX: Filter & Sorting, Searching, Shopping.  
Mobbin: catalog + filter sheet + carousel.

This is the most important screen in the product.

## Purpose

1. Give a **glimpse** of the family (cinematic).
2. Show a **lineup** of hero products (Apple “Explore the lineup”).
3. On scroll, become a **shoppable catalog** with top filters/sort and a **right scroller** for segments.

## Chrome

- Global nav (Masalas highlighted)
- Local nav: `Masalas | Explore · Indian · World · Blends · Heat | Buy`
- Filter bar: hidden until `CATALOG_ACTIVE`
- Right rail: hidden until `CATALOG_ACTIVE` and viewport ≥ 1080px

## Section-by-section

### A. Glimpse hero (`#glimpse`)

Full viewport.

Left (or center): **Masalas** Outfit Display XL.  
Under: Inconsolata `Dakshya · Prateet · Soma`  
One sentence IBM Plex: `Indian kitchens, and the spices that travelled to them.`

Right: clustered dummy tins (Haldi, Lal Mirch, Kitchen King).

Scroll indicator: thin lime line that grows with hero progress (optional).

### B. Lineup (`#lineup`)

Heading: **Explore the lineup.**  
Subhead: Inconsolata `Dummy mill lots — for view, not yet the warehouse.`

Segmented control (Apple Mac: All / Laptops / Desktops / Displays):

Masalas: **All · Everyday · Regional · World · Heat**

This control only filters the lineup row, not the full catalog.

Cards: 3–6 featured products from catalog JSON (`lineupRank`).

Card anatomy (must match Apple density):

- Image 1:1 or 4:5 on cream
- Colour/variant dots (size or heat)
- Name, one-liner, “From ₹X”
- Learn more (ghost) · Buy (forest)

Compare mapping for the team:

| Apple Mac | Masalas lineup example |
|---|---|
| MacBook Neo | Everyday Haldi 100g |
| MacBook Air | Lakadong Haldi (mastery) |
| MacBook Pro | Kitchen King (workhorse blend) |
| iMac | Gift sleeve trio |
| Mac mini | 50g travel tin |

Flour mapping: Raagi, Chana, Rice, Khapli, Whole Wheat as the five “models”.  
Coffee: India filter, India espresso, SEA robusta, SEA arabica, decaf dummy.  
Tea: Assam, Darjeeling, Nilgiri, SEA oolong, herbal soma.  
Oil: Sunflower, Peanut, Coconut, Olive, Sesame.

### C. Catalog chapters (State B)

When active, **filter/sort bar** mounts.

Bar contents:

```
[ 28 masalas ]   [ Origin ▾ ] [ Form ▾ ] [ Heat ▾ ] [ Size ▾ ]     Sort: Featured ▾
```

Chips for active filters.

Below, a **responsive grid** (not the cinematic lineup): 2/3/4 columns of **catalog cards** (smaller than lineup cards): image, name, price, rating, Prateet badge if `labTested`.

Chapters (each is a heading in Outfit Title S + grid subset):

| id | Masalas | Flour | Coffee | Tea | Oil |
|---|---|---|---|---|---|
| indian / grain | Indian | Millets & native | India | India | India |
| foreign | World & SEA | World | South-East Asia | South-East Asia | World |
| blends / style | Blends | Wheat & gluten | Process | Style (CTC, orthodox, green) | Cold vs refined |
| heat / use | Heat ladder | Use (roti, batter, bake) | Roast | Time of day | Smoke point |
| reviews | Family reviews | … | … | … | … |
| pairings | With oil & flour | With masala | With milk / filter | With snacks | With masala |

If a filter hides all products in a chapter, hide the chapter heading (do not show empty graves).

### D. Right scroller

Items = chapters that currently have products + Glimpse + Lineup.

See [04 — Motion](../04-interaction-and-motion.md).

### E. Family reviews & pairings

Social proof before footer. Dummy reviews from `/catalog/reviews.json` filtered by family.

## Filter logic

AND across facet groups, OR within a group (standard e-commerce).  
Update URL query without full reload (`nuqs` or router.replace).  
Back button restores filters.

Sort:

- featured: `featuredScore` desc then name
- price, rating, newest (`createdAt`)

## Empty / dummy banners

A slim Inconsolata strip under local nav on preview deploys:

`Viewing dummy mill lots. Orders will be enabled in Phase 3.`

## Mobile

- Right rail → horizontal chapter chips under the filter button
- Filter → sheet
- Lineup → snap carousel with peek of next card (Apple)

## Analytics

`category_view`, `category_mode_catalog`, `filter_apply`, `sort_change`, `lineup_click`, `rail_click`, `catalog_product_click`

## Acceptance

- Filters are **not** visible on first load above the fold
- Scrolling to Indian chapter shows filters + rail (desktop)
- Local nav Buy scrolls to lineup then engages catalog if needed
- Keyboard: skip link “Skip to catalog”
- Lighthouse a11y ≥ 90 on dummy content
