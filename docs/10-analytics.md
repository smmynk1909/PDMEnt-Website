# 10 — Analytics

Analytics is a product surface ([Studio](05-page-specifications/analytics-admin.md)), not only a GTM snippet.

## 1. Principles

- Instrument **before** checkout exists (dummy events).
- Names: `object_action` snake_case.
- No PII in props (no email, no phone, no address).
- Same event schema in PostHog and `/studio`.

## 2. Event dictionary

| Event | When | Props |
|---|---|---|
| `home_view` | Home landed | |
| `home_family_click` | Family lockup | `family` |
| `category_view` | Family page | `family` |
| `category_mode_catalog` | Glimpse → catalog | `family` |
| `rail_click` | Right scroller | `chapter` |
| `filter_apply` | Facet change | `facet`, `values[]` |
| `sort_change` | Sort | `sort` |
| `lineup_click` | Lineup card | `handle`, `cta` learn\|buy |
| `catalog_product_click` | Grid | `handle` |
| `pdp_view` | PDP | `handle`, `family` |
| `variant_change` | SKU | `sku` |
| `chapter_view` | 50% visible | `chapter` dakshya\|prateet\|soma\|reviews |
| `add_to_bag` | CTA | `sku`, `priceInr`, `qty` |
| `bag_view` | Drawer/page | `line_count`, `valueInr` |
| `checkout_start` | | `valueInr` |
| `checkout_step` | | `step` |
| `dummy_purchase` | Mock pay | `orderId`, `valueInr` |
| `purchase` | Real | `orderId`, `valueInr`, `items[]` |
| `payment_fail` | | `reason` |
| `search_submit` | | `q`, `results` |
| `search_zero` | | `q` |
| `review_impression` | | `handle` |
| `studio_view` | | `page` |

## 3. Funnels (Studio)

1. Acquisition: `home_view` or `category_view`
2. Interest: `pdp_view`
3. Intent: `add_to_bag`
4. Checkout: `checkout_start`
5. Revenue: `purchase` / `dummy_purchase`

## 4. Product analytics questions

- Which family converts glimpse → catalog?
- Which triad chapter is skipped? (if `soma` never fires, copy is too low)
- Filter combinations that yield zero
- Dummy SKCs with high PDP and low ATC (price or variant issue)

## 5. Implementation

- PostHog JS in shop layout
- `capture` wrapper so Studio can also POST to `/api/events` in Phase 4
- Server-side `purchase` only (don’t trust client for revenue)

## 6. Privacy

Cookie banner if required (India DPDP — consult legal). Prefer first-party PostHog. Disable session replay on checkout fields.
