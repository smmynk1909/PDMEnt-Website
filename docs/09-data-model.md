# 09 — Data Model

## Product

```ts
type VendorId = "pdm" | string; // marketplace later

type Family = "masalas" | "flour" | "coffee" | "tea" | "oil";

type Variant = {
  sku: string;
  label: string;          // "100 g" | "Medium roast"
  sizeGrams?: number;
  sizeMl?: number;
  priceInr: number;
  compareAtInr?: number;
  stock: number;
};

type Product = {
  handle: string;
  family: Family;
  name: string;
  nameGloss?: string;     // Turmeric
  oneLiner: string;
  dakshya: string;
  prateet: string;
  soma: string;
  tastingNotes: string;
  description: string;
  originCountry: string;
  originRegion?: string;
  originArea: "india" | "south-east-asia" | "world";
  form?: "whole" | "ground" | "blend" | "leaf" | "bean" | "pressed";
  heat: 0 | 1 | 2 | 3 | 4 | 5;
  tags: string[];         // indian, blends, roast:filter, millet
  veg: boolean;
  vendorId: VendorId;
  status: "dummy" | "live" | "archived";
  featured: boolean;
  lineupRank: number | null;
  featuredScore: number;
  pairings: string[];     // handles
  variants: Variant[];
  image: { bg: string; accent: string; alt: string };
  createdAt: string;
};
```

## Review

```ts
type Review = {
  id: string;
  productHandle: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  author: string;
  city: string;
  verifiedDummy: boolean;
  lot?: string;
  createdAt: string;
};
```

## Cart (client v1)

```ts
type CartLine = { sku: string; handle: string; qty: number };
type Cart = { lines: CartLine[]; updatedAt: string };
```

## Order (Phase 3)

`id`, `email`, `phone`, `address`, `lines[]`, `totals` (sub, gst, ship, grand), `status`, `razorpayId`, `vendorId` (always pdm until split orders).

## Event (analytics)

`name`, `props`, `ts`, `path`, `sessionId`, `distinctId`.

## Marketplace additions (reserved)

`Maker { id, name, kycStatus, bio }`  
`Offer { productId, vendorId, priceInr, stock }` — when two vendors share a commodity.

v1: Product *is* the offer.
