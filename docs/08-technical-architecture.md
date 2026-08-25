# 08 — Technical Architecture

## 1. Recommendation (Phase 1–3)

A single engineer-friendly web app:

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js** (App Router) + TypeScript | SEO + app + Studio on one origin |
| Styling | **CSS variables** (`tokens.css`) + Tailwind v4 optional | Brand tokens first |
| Motion | CSS scroll-driven + **Framer Motion** for shared layout | Apple-like without WebGL |
| Catalog v1 | JSON in `/catalog` imported as modules | Dummy, git-versioned |
| Catalog v2 | Sanity or Payload CMS | Founders can edit lots |
| Cart v1 | Zustand + localStorage | Dummy checkout |
| Cart v2 | Server cart + Postgres | Logged-in orders |
| DB | **Postgres** (Neon/Supabase) | Orders, users, events |
| Auth | Clerk or NextAuth phone/email | India OTP later |
| Payments | **Razorpay** | UPI |
| Media | Cloudflare R2 / Cloudinary | Product stills |
| Hosting | Vercel (storefront) | Edge |
| Analytics | **PostHog** + our Studio reads the same events | [10](10-analytics.md) |
| Search v1 | Client filter over JSON | < 200 SKUs |
| Search v2 | Typesense/Meilisearch | Marketplace scale |

Do **not** start on Shopify themes. We would fight the Apple layout, custom rail, and Studio. Shopify *can* be a checkout backend later; the front is custom.

## 2. Repository layout (target)

```
/app
  /(shop)            cream layouts, nav
  /(studio)          founders analytics
  /api
    /cart
    /checkout
    /events          if self-hosted
/catalog             dummy JSON (now)
/design/tokens.css
/docs                this pack
/components
  /nav
  /category          glimpse, lineup, rail, filters
  /product
  /bag
```

## 3. Category page architecture

Client component `CategoryExperience` owns:

- `view: glimpse | catalog`
- URL query sync
- IntersectionObserver on chapters
- Filter derived products (`useMemo` on JSON)

Server component loads products by family (filter in RSC for first paint of glimpse/lineup only).

## 4. Performance

- RSC for homepage and PDP copy
- Lineup images `priority` for first three
- No client JS on legal pages beyond nav
- INP: click filter < 100ms on 50 items (all client) 

## 5. Environments

| Env | Catalog | Pay | Banner |
|---|---|---|---|
| local / preview | dummy JSON | mock | dummy mill lots |
| staging | dummy or CMS draft | Razorpay test | dummy |
| production | CMS published | Razorpay live | none |

## 6. i18n

Next-intl ready, English only v1. Product names stay transliterated.

## 7. Security

- Studio behind auth
- CSP
- No PII in client events beyond distinct_id
- Razorpay signatures verified server-side

## 8. CMS model (when leaving JSON)

Types: `family`, `product`, `variant`, `review`, `bundle`, `maker` (marketplace later).

Keep handles stable.

## 9. Why not a marketplace monolith first

Multi-vendor (orders split, commissions, KYC) would delay the Apple-quality storefront. Schema has `vendorId` now; services land in Phase 5 ([12](12-marketplace-roadmap.md)).
