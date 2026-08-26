# 12 — Marketplace Roadmap

The store begins as **PDM Enterprises selling Roots and Mills**. It should be able to host other mills, estates, and presses later without a rewrite.

## 1. What “marketplace” means here

Not Amazon clutter. More like a **house of makers**: each seller must still pass Dakshya / Prateet / Soma. The UI stays Apple-calm; the commerce backend gains vendors.

## 2. Schema already reserved

- `vendorId` on product (v1: `pdm`)
- Future `Maker` and split `Offer`

## 3. Capabilities to add (order)

1. **Vendor entity** + KYC (GST, FSSAI, bank)
2. **Seller studio** (subset of Studio: their SKUs, their orders)
3. **Split shipments** if a bag contains two vendors
4. **Commission + T+N settlement**
5. **Maker pages** `/makers/coorg-estate` in the same visual system
6. Search that can filter by maker without ruining Glimpse pages
7. Reviews remain product-centric; badge `Milled by {maker}`

## 4. UX constraints when that day comes

- Global nav does **not** become a department store of 40 vendors
- Family pages stay brand-led; maker is a facet and a PDP line
- No yellow “best seller” badges competing with turmeric
- Guest still checks out once (Roots and Mills as merchant of record **or** disclosed marketplace — legal choice)

## 5. Legal fork (decide before Phase 5)

| Model | Meaning |
|---|---|
| Merchant of record = PDM | PDM buys/resells or fulfils; simpler customer |
| True marketplace | Sellers are sellers; PDM is platform; more compliance |

Until decided, keep copy as PDM as seller.

## 6. Explicitly out of marketplace v1 of marketplace

- Bidding
- Ads in catalog
- Unvetted listings
