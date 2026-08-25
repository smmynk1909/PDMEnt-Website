# 00 — Vision and Product Brief

## 1. One-sentence pitch

Roots and Mills is the Apple of the Indian pantry: a calm, mastery-led store for high-quality masalas, flours, coffees, teas, and cooking oils, built by three friends under PDM Enterprises, and designed to grow from a branded catalog into a trusted marketplace.

## 2. Who we are

| Role | Person | Brand association |
|---|---|---|
| Co-founder | **Pratik** | P in PDM |
| Co-founder | **Daxesh** | D in PDM |
| Co-founder | **Mayank** | M in PDM |
| Legal entity | **PDM Enterprises** | Operator, seller of record (Phase 1–4) |
| Consumer brand | **Roots and Mills** | The name customers see |
| Brand triad | **Dakshya, Prateet, Soma** | Mastery, Trust, Calm |

The public face is Roots and Mills. PDM Enterprises appears in the footer, invoices, FSSAI declarations, and About.

## 3. Why this exists

Indian grocery ecommerce is loud, crowded, and discount-led. Apple.com is the opposite: one product at a time, photography that does the selling, copy that respects the reader, and a navigation system that never makes you hunt.

Roots and Mills borrows that *pace* and applies it to pantry staples that deserve the same reverence as a MacBook:

- A tin of Haldi should feel as considered as an iPhone finish.
- A bag of Khapli flour should be introduced the way Apple introduces MacBook Air — one hero, one line, then depth on scroll.
- A coffee from Coorg or Đà Lạt should be explored, compared, and bought without a messy grid of banners.

## 4. Brand triad (product north star)

Every SKU, collection, review prompt, and marketing block must map to all three:

| Sanskrit | Transliteration used | English | Product proof |
|---|---|---|---|
| दक्षता | **Dakshya** | Mastery | Origin, cultivar, grind, roast, mill, harvest, chef use |
| प्रतीत | **Prateet** | Trust | Lab tests, FSSAI, batch codes, farmer partners, reviews |
| सोम | **Soma** | Calm | Quiet design, honest portions, no fake urgency, slow photography |

If a product page cannot name Dakshya, Prateet, and Soma in concrete terms, it is not ready.

## 5. Product universe (Phase 1)

Five families. Indian and foreign (especially South and South-East Asia) in each.

1. **Masalas** — single spices and blends (Haldi, Lal Mirch, Kitchen King, Sambhar, Amchur, Chana, Rajma, Chole, Pav Bhaji, Podi/gunpowder, chilli flakes, oregano, and more).
2. **Flour** — Raagi, Chana, Rice, Khapli, Whole Wheat, and later millets / imported specialty flours.
3. **Coffee** — Indian estates and South-East Asian origins, multiple processes and roasts.
4. **Tea** — Indian gardens and South-East Asian teas, orthodox and CTC, plus herbal.
5. **Cooking oil** — Sunflower, Olive, Peanut, Coconut, and other India / SEA oils.

Phase 1 uses **dummy products** with realistic copy, prices, origins, and reviews so the site can be designed and demoed before procurement is final.

## 6. What we are building (product type)

A **branded commerce web application**, not a brochure:

| Horizon | What the customer can do |
|---|---|
| Now (docs + dummy catalog) | Browse, understand, fall in love with the brand |
| Phase 3 | Place orders, track them, leave reviews |
| Phase 4 | The business sees analytics on the same site |
| Phase 5 | Other trusted mills and estates can sell through the same rails |

Treat the first release as a **website that already thinks like an app**: accounts, cart, catalog schema, events, and admin hooks exist even when some backends are mocked.

## 7. Primary users

| Persona | Goal | Design implication |
|---|---|---|
| **Home cook, 24–45** | Restock Haldi / wheat without thinking, occasionally discover a better origin | Fast reorder + Apple-like discovery |
| **Curious cook** | Understand *why* Khapli or Coorg peaberry is better | Typewriter tasting notes, origin chapters |
| **Gift buyer** | A calm, premium gift of tea or masala | Bundles, photography, Soma |
| **NRI / export later** | Taste of home with trust | Origin maps, Prateet proofs |
| **Internal (founders)** | See what sells, what is viewed, what stalls at checkout | In-app analytics (Phase 4) |
| **Future seller** (marketplace) | List a mill’s oil or an estate’s tea | Not in UI until Phase 5 |

## 8. Experience principles

1. **One thing on stage.** Apple never shows twelve banners. Neither do we.
2. **Category first, SKU second.** Enter Masalas the way you enter Mac — lineup, then depth.
3. **Scroll reveals craft.** Filters and the right-hand scroller appear *after* the glimpse, not before.
4. **Typewriter for the product’s voice.** The mill, the garden, the roast speak in Inconsolata. The chrome stays sans-serif.
5. **No dark patterns.** No fake timers, no disguised subscriptions. Soma forbids it.
6. **Motion is meaning.** Scroll, sticky nav, and product photography are the product — not decoration.
7. **Yellow-green growth, not neon grocery.** Growth Today’s cream + lime, plus turmeric. Never supermarket red sale stickers as a default.
8. **India-first commerce.** INR, GST, pincode, UPI/Razorpay, Hindi-friendly names, FSSAI in the footer.

## 9. Success metrics (how we know it worked)

Experience (Phase 1–2)

- Time-to-first-product-story < 3 seconds on 4G
- Category page: 70%+ of sessions scroll past the lineup
- PDP: 40%+ expand Dakshya / Prateet / Soma blocks

Commerce (Phase 3)

- Add-to-bag from PDP > 8% of PDP views
- Checkout completion > 45% of checkouts started
- Repeat 90-day purchase > 25% once live inventory exists

Brand

- Unaided recall of the triad in qualitative tests
- Review volume with photos, not only stars

## 10. Out of scope for the first build

- Native iOS/Android apps (responsive web first; Mobbin patterns still inform mobile web)
- Live multi-seller marketplace
- Subscription boxes (architecture may allow later)
- Full ERP / warehouse management
- Dark mode (cream brand is the identity; do not ship an inverted theme in v1)

## 11. Constraints

- Dummy catalog must be swappable for CMS/API without redesign.
- All copy in English first; transliterations of Sanskrit and Indian product names are first-class.
- Photography will initially be placeholders; the layout must still look finished (large colour fields, mill illustrations, grain textures).
- Three founders; prefer a stack one engineer can ship (see architecture doc).

## 12. Open product questions (do not block dummy build)

Record decisions here when made:

- [ ] Fulfilment: self-ship vs 3PL vs hyperlocal
- [ ] Cities for first delivery
- [ ] Private label vs sourced brands vs both
- [ ] Hindi UI — Phase 2 or later
- [ ] Wholesale / HoReCa storefront — separate or same login
