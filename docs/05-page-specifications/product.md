# Product — `/[family]/[handle]`

Apple analog: product marketing page + store configurator.  
Refero: **Product Details**, Reviews & Rating, Suggestion & Similar Items.  
Mobbin: Shop web PDP (add to cart, reviews).  
Recent: Antimetal Product Pages, Card Details Transition.

## Purpose

Sell one SKU with Apple calm and mill honesty. Dummy products must still feel buyable.

## Layout (lg+)

```
[ global + local nav ]
[ 12 col ]
  [ 7 col sticky gallery ]
  [ 5 col buy rail ]
[ full-width chapters: Dakshya | Prateet | Soma ]
[ How we use it ]
[ Spec table typewriter ]
[ Reviews ]
[ Lineup: others in family ]
```

## Local nav

`{Product name truncated} · Dakshya · Prateet · Soma · Reviews · Buy`

Buy is sticky forest pill; on click if buy rail out of view, scroll to it.

## Gallery

- Primary still (dummy generated field)
- Thumbs: tin, back-of-pack (nutrition placeholder), pour/spread, origin map
- Zoom on hover desktop (square lens, not Shopify default clunky)
- Alt text: real descriptions even for dummy (`Haldi powder in a turmeric-yellow tin on cream`)

## Buy rail

```
New · Dummy lot
HALDI                         Outfit Title
Everyday kitchen turmeric     IBM Plex one-liner
₹249                          Outfit
Inclusive of dummy GST        Caption

Size:  50g  100g  250g        pills
Heat:  n/a or dots

[ Add to bag ]                full width forest
[ Buy now ]                   optional secondary

Inconsolata block:
  DAKSHYA  Fine mill. Colour strength first.
  PRATEET  Lot RM-DUM-HAL-100. Screened.
  SOMA     Keep the tin closed. That is all.
```

Variant change updates price, images, URL `?size=100g`.

Out of stock (dummy flag): forest outline **Notify** — store email, do not fake stock.

## Chapters

Each chapter min 70vh on desktop, cream, large type.

**Dakshya** — mastery: origin, cultivar, grind/ mill / roast / press, chef cue.  
**Prateet** — trust: tests, FSSAI dummy, harvest date dummy, what we refuse (fillers).  
**Soma** — calm: storage, daily ritual, pairing, “no rush” copy.

Sticky product image beside chapters on xl (Apple feature pattern).

## Spec table

Inconsolata, two columns, hairline rows:

| Field | Example |
|---|---|
| SKU | RM-DUM-HAL-100 |
| Net qty | 100 g |
| Origin | India (dummy: Meghalaya-style) |
| Form | Ground |
| Heat | None |
| Best before | 12 months dummy |
| Vendor | pdm |

## Reviews

- Histogram (5–1)
- Average to 1 decimal
- Sort + “With photos”
- Each review: stars, title, body, name, city, verified dummy badge, lot code
- Founder reply optional (Prateet)

Prompt after dummy “purchase”: not in Phase 1.

## Similar

Apple “essentials”: 4 cards — e.g. Haldi + Black pepper + Coconut oil.

## SEO JSON-LD

Product, Offer (INR), Brand Roots and Mills, Manufacturer PDM Enterprises.

## Analytics

`pdp_view`, `variant_change`, `add_to_bag`, `review_sort`, `chapter_view` (Dakshya/Prateet/Soma impressions ≥ 50% visible)

## Acceptance

- All three triad chapters present
- Typewriter used for spec + triad ledger
- Add to bag works against dummy cart (localStorage / mocked API)
- Related products do not leak other families unless `pairings` says so
