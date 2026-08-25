# 06 — Product Catalog (Dummy)

Machine data lives in:

- [`/catalog/taxonomy.json`](../catalog/taxonomy.json)
- [`/catalog/products.json`](../catalog/products.json)
- [`/catalog/reviews.json`](../catalog/reviews.json)

This document explains the merchandising rules. **All Phase 1 SKUs are dummy** (`status: "dummy"`). Replace fields, not page templates, when real lots arrive.

## 1. Families and segments

### Masalas

| Segment | Handles (initial) |
|---|---|
| Everyday Indian | `haldi`, `lal-mirch`, `jeera-ground` (extra), `dhania` (extra) |
| Sour / fruit | `amchur` |
| Regional blends | `sambhar`, `podi-gunpowder`, `pav-bhaji`, `chole`, `rajma`, `chana-masala`, `kitchen-king` |
| Heat | `lal-mirch`, `chilli-flakes`, `podi-gunpowder` |
| World | `oregano`, `chilli-flakes` (also world), later: za’atar, gochugaru, etc. |

User-listed must all exist as dummy SKUs.

### Flour

Raagi (ragi), Chana, Rice, Khapli, Whole Wheat. Segments: millets, pulses, rice, wheat, heritage.

### Coffee

India: Coorg arabica, Chikmagalur, Monsooned Malabar (dummy), filter roast, espresso roast.  
SEA: Vietnam robusta, Indonesia Sumatra, Thailand Doi Chaang-style, Laos, Myanmar dummy lots.

### Tea

India: Assam CTC, Darjeeling first-flush dummy, Nilgiri, green.  
SEA: Vietnamese green, Thai oolong dummy, Indonesian, Myanmar lahpet-adjacent disclaimer (tea leaf only).

### Oil

Sunflower, Olive (imported dummy), Peanut, Coconut, plus Mustard and Sesame as “and more”.

## 2. Every product must include

| Field | Why |
|---|---|
| `dakshya` | Mastery story |
| `prateet` | Trust story |
| `soma` | Calm use / storage |
| `oneLiner` | Apple-style |
| `tastingNotes` | typewriter |
| `originCountry`, `originRegion` | |
| `vendorId` | always `pdm` for now |
| `variants[]` | size / roast / grind |
| `priceInr` | dummy INR |
| `heat` 0–5 | masala/chilli |
| `tags` | filters |
| `pairings` | handles |
| `lineupRank` | null or 1–6 |
| `featured` | homepage |
| `images` | placeholder colors |

## 3. Pricing dummy logic (INR, MRP inclusive)

Not real market prices — *believable* premium:

- Everyday masala 100g: ₹149–299
- Blend 100g: ₹199–349
- World herb 30g: ₹179–249
- Flour 1kg: ₹89–249 (khapli higher)
- Coffee 250g: ₹449–799
- Tea 100g: ₹299–899 (darjeeling high)
- Oil 1L: ₹189–899 (olive high)

Show **From ₹X** on lineup using min variant.

## 4. Imagery placeholders

Until photography:

`image.bg` = turmeric / forest / cream / olive  
`image.glyph` = family icon  
Never use random Unsplash food chaos as the long-term look.

## 5. Inventory

`stock: 0 | 12 | 48` dummy. 0 tests Notify.

## 6. Adding a product (checklist)

1. Add to `products.json` with unique `handle` and `sku`
2. At least one review in `reviews.json` (can be shared quality quotes)
3. Appear in a chapter via `tags.origin` / `tags.segment`
4. Triad copy in Inconsolata-friendly short lines (max ~140 chars each)
5. Veg mark true for all v1 food
6. `fssaiCategory` placeholder string

## 7. Naming

Customer-facing: common Indian names first (`Haldi`, not only `Turmeric`).  
Subline can gloss: `Turmeric · Curcuma longa`.

Coffee/tea use origin + process.
