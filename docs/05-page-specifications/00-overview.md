# 05 — Page Specifications — Overview

Each page spec is a contract: layout, content, components, states, analytics, dummy data, and acceptance.

| Page | File | Apple analog |
|---|---|---|
| Home | [home.md](home.md) | apple.com |
| Family category | [category.md](category.md) | /mac, /iphone |
| Product | [product.md](product.md) | /macbook-air, shop PDP |
| Search | [search.md](search.md) | apple.com/search |
| Bag + checkout | [cart-checkout.md](cart-checkout.md) | checkout.apple.com (simplified) |
| Account | [account.md](account.md) | appleid / orders |
| About / triad / founders | [about.md](about.md) | /environment + values |
| Studio analytics | [analytics-admin.md](analytics-admin.md) | internal (not public Apple) |

Shared chrome: Global nav, footer, bag drawer, search overlay. Specified in [02 — Design System](../02-design-system.md).

## Implementation order

1. Tokens + fonts + nav + footer
2. Category (Masalas) — proves the product
3. PDP
4. Home
5. Search
6. Bag
7. Checkout (mocked payment in Phase 2)
8. Account
9. Studio

## Shared states

Every customer page must define:

- Loading (skeleton)
- Empty
- Error (network)
- Dummy vs live badge in non-production (`Dummy mill lot` in Inconsolata)

## SEO defaults

- Title: `{Page} — Roots and Mills`
- Description: triad + family
- OG image: cream, wordmark, one product
- JSON-LD: Organization, WebSite, Product, Offer, AggregateRating when real

## India compliance blocks (footer or PDP)

Placeholder until legal fills in:

- FSSAI license number
- Country of origin
- Veg mark (green dot) on food
- Net quantity
- MRP inclusive of taxes (when live)
- Customer care of PDM Enterprises
