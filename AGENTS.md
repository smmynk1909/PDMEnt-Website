# Agent notes — Roots and Mills

Before implementing UI, read:

1. `docs/README.md`
2. `docs/02-design-system.md` and `docs/04-interaction-and-motion.md`
3. `docs/05-page-specifications/` for the page you are building
4. Open `docs-site/index.html` and `docs-site/category.html` for the visual contract

Non-negotiables:

- Cream / turmeric / forest / lime tokens from `design/tokens.css` (Growth Today + spice)
- Product copy in Inconsolata; chrome in Outfit / IBM Plex Sans
- Category pages: glimpse first; filters and right scroller only after scroll
- Every product has Dakshya, Prateet, Soma
- Dummy catalog in `catalog/*.json` until CMS exists
- `vendorId` remains on products for the future marketplace
- **Design references are internal only.** Apple, growthtoday.co, Refero, Mobbin, and Recent must never appear on a customer-facing page — no reference links, no "from growthtoday.co" captions, no "Apple maps / Apple analog" labels. The `/docs-site` living spec may show them (internal artifact); the built site must not.

Do not start from a generic grocery Shopify theme.

To build the real website, follow `docs/17-implementation-guide.md` — it is the exact build contract derived from the mockup and this pack.

## Cursor Cloud specific instructions

The storefront is a **Next.js (App Router) + TypeScript** app rooted at the repo top level (`app/`, `components/`, `lib/`, `types/`). Dependencies install with `npm install` (Node 22, npm 10; committed `package-lock.json`). The update script runs `npm install` automatically, so it is already done at session start.

Standard commands (see `package.json` `scripts`):

- Dev server: `npm run dev` (Next dev on `http://localhost:3000`). Boots with the dummy catalog, zero manual setup.
- Build: `npm run build` (fully static — every family and product is prerendered via `generateStaticParams`).
- Lint: `npm run lint`. Typecheck: `npm run typecheck` (`tsc --noEmit`).

Non-obvious caveats:

- The catalog JSON in `catalog/*.json` is imported at build time via typed loaders in `lib/catalog.ts` (through `resolveJsonModule`), not fetched at runtime. Editing catalog data requires a dev-server reload/rebuild to take effect.
- `lib/copy.ts` `sanitizeCopy()` strips banned design references (Apple, growthtoday.co, Refero, Mobbin, Recent, Diaspora, Burlap & Barrel) from product copy at load time — this enforces the customer-facing "no design references" rule. Keep it in the data path; do not bypass it in components.
- `design/tokens.css` is imported globally in `app/layout.tsx` and its `--rm-font-*` variables are overridden by `next/font` in `app/globals.css` — fonts are self-hosted, not loaded from Google at runtime.
- Cart state is Zustand + `localStorage` (`lib/cart.ts`); a `CartHydrator` guards SSR hydration. Checkout is a mock (`app/checkout/`) that generates a dummy order id — there is no payment/auth/DB integration.
- The `/docs-site/*.html` living-spec mockup is an internal artifact and intentionally still contains design references; the built Next.js app must not.
