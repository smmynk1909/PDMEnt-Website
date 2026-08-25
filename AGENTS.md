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

Do not start from a generic grocery Shopify theme.

## Cursor Cloud specific instructions

This repo currently holds only design docs, a dummy catalog, and a static "living spec" site — there is **no** package manager, build step, framework, or automated test suite yet (the Next.js app in `docs/08-technical-architecture.md` is a future target, not present). Nothing needs to be installed; `python3` (used to serve the site) is already available.

- Run the app (dev): serve the repo from its **root**, e.g. `python3 -m http.server 8000`, then open `http://localhost:8000/docs-site/index.html`. Serve from the repo root (not from `docs-site/`) because the pages reference `../design/tokens.css` and cross-link to `catalog/` — serving `docs-site/` directly breaks those relative paths.
- Pages: `docs-site/index.html` (home / families) and `docs-site/category.html` (Masalas category with scroll-driven glimpse → filters + right rail). All product data and JS are inline in the HTML; the `catalog/*.json` files are reference data, not fetched at runtime. Google Fonts load from the network.
- "Lint/test" equivalent: validate the catalog JSON, e.g. `for f in catalog/*.json; do python3 -m json.tool "$f" >/dev/null && echo "OK $f"; done`.
