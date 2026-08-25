# Studio — in-site analytics `/studio`

Not public. Founders (Pratik, Daxesh, Mayank) + later ops.

Refero: **Dashboard**, Stats, Table, Line & Bar Chart.  
Recent: Factory Automation Interface (ops density — use sparingly).

## Purpose

“All the analysis being worked on the Website” — live on the same origin as the store, not a disconnected Google Sheet.

## Access

- SSO later; v1 password or Clerk role `studio`
- Robots noindex
- Separate layout: still cream/forest, denser tables, Inconsolata for metrics

## Pages

### Overview

KPIs: sessions, PDP views, add-to-bag, dummy/live GMV, conversion.

Sparklines 7/28 days.

### Funnels

Home → Family → PDP → Bag → Checkout → Purchase.

Drop-off in forest bars, lime for completed.

### Catalog

Table of SKUs: views, ATC, buy, rating, stock dummy. Sortable. Click to PDP.

### Orders

When Phase 3 exists. Export CSV.

### Events debugger

Last 50 events (dev). Proves instrumentation.

## Do not

- Embed raw Metabase with default blue
- Show vanity metrics only
- Slow the storefront bundle — Studio is a separate route group / split

Event dictionary: [10 — Analytics](../10-analytics.md).
