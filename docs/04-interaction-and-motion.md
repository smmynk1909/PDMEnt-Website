# 04 — Interaction and Motion

North star: [Apple.com](https://www.apple.com/mac/) product family pages — sticky dual nav, scroll-pinned product, large type that fades in, horizontal lineup, no noisy parallax.

Secondary motion refs from [Recent.design](https://recent.design/): Card Details Transition, Sidebar Sub-Menu, Antimetal Product Pages, Vercel for Retail.

## 1. Timing and easing

| Token | Value | Use |
|---|---|---|
| `--rm-ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Enters (slight overshoot feel without bounce) |
| `--rm-ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Apple-like deceleration |
| `--rm-ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exits |
| Fast | 160–200ms | Hover, chips, bag count |
| Medium | 280–360ms | Filter bar entrance, mega menu |
| Slow | 600–900ms | Hero text, chapter crossfade |
| Scroll pin | driven by scroll, not duration | Product chapters |

No bounce easings. No elastic scroll hijacking on window (breaks accessibility). Use native scroll + IntersectionObserver / Scroll-driven animations where supported.

## 2. Global nav

- Mega menu: fade + 8px translateY, 280ms, backdrop cream.
- Current family: lime underline 2px, 16px wide, centered under label.
- Bag count: scale 1 → 1.15 → 1 on increment.
- Scroll: nav stays; background opacity 0.72 → 0.92.

## 3. Category page — the critical choreography

This is the interaction the founders asked for. Implement as a state machine.

```
IDLE_GLIMPSE
  → (scrollY past lineup threshold) → CATALOG_ACTIVE
  → (click localnav Buy / Shop all) → CATALOG_ACTIVE
  → (click right rail except Glimpse/Lineup) → CATALOG_ACTIVE + scrollTo
CATALOG_ACTIVE
  → (scroll back to top of hero) → IDLE_GLIMPSE (hide filter + rail with 200ms delay)
```

### 3.1 Glimpse

Hero 100svh:

- Wordmark family name: Outfit 80px, fade-up 40px over first 20% of hero scroll
- Triad line: Inconsolata, letter-spacing 0.12em, delayed 120ms
- Product cluster: 3 tins/bags in a still life; on scroll, they separate slightly (max 24px) — *subtle*, Apple not video-game

Lineup:

- Cards enter with 8% opacity stagger (40ms)
- Horizontal wheel: snap align center on mobile

### 3.2 Filter bar entrance

When `CATALOG_ACTIVE`:

- Filter bar `translateY(-100%)` → `0` under local nav
- `--rm-sticky-stack` updates so chapters offset correctly
- First paint of grid: skeleton shimmer in cream/deep cream (Refero: Skeleton), 3×4 cells, then content

### 3.3 Right scroller

- Opacity 0 → 1, translateX(12px) → 0, delay 120ms after filter bar
- Active item: lime disc 8px; inactive 6px cream-deep
- Label: Inconsolata 11px, `writing-mode: vertical-rl` **or** horizontal tooltip on hover — prefer **horizontal labels to the left of the dots** so they stay readable (Apple page dots on some campaign pages keep labels hidden until hover; we show the current label always)
- Keyboard: `aria-label` list, arrow keys move chapters

### 3.4 Sticky stack math

```
top: 0                         global nav
top: 48px                      local nav
top: 100px                     filter bar (only CATALOG_ACTIVE)
scroll-padding-top: 156px      when filters visible, else 100px
```

Right rail `top: 50%` but `margin-top` accounts for stack so it never hides under the filter bar.

## 4. Apple-style product storytelling (PDP and category feature blocks)

Pattern: **sticky media + scrolling copy**.

Container `height: 300vh` (example). Inner media `position: sticky; top: stack; height: 100svh`.

Scroll progress 0–1 maps to:

- Frame or still sequence (if we have image sprites) **or**
- Crossfade three photographs (whole spice → grind → plated)

Text chapters absolute, opacity tied to progress bands 0–0.33, 0.33–0.66, 0.66–1.

Libraries: CSS `animation-timeline: scroll()` where possible; GSAP ScrollTrigger as progressive enhancement. Avoid full-page Locomotive Scroll.

## 5. Lineup ↔ PDP transition (Recent: Card Details Transition)

Shared element: product image `layoutId` (Framer Motion) from card to PDP gallery.

If shared layout is too costly, fade-through cream 200ms. Never a hard cut.

## 6. Filters

- Applying a chip filters instantly (no Apply on desktop). Count updates in Inconsolata.
- Empty result: Soma empty state, not an error. Offer Clear filters.
- Mobile sheet: Apply + result preview count on the CTA (`Show 18 oils`).

## 7. Add to bag

1. Button label → `Added` 600ms
2. Bag icon bounce
3. Optional: flying image (skip if reduced motion)
4. Drawer does **not** auto-open on desktop (Apple often stays on page). Show a quiet toast. Auto-open on first add of session is acceptable on mobile.

## 8. Mega menu / sidebar sub-menu (Recent: Sidebar Sub-Menu)

Desktop = mega. Mobile = accordion. Tablet = full-screen sheet with family list then segment list.

## 9. Page transitions

App router: template fade 180ms. Keep nav mounted so it never blinks.

## 10. Performance budgets (motion that doesn’t jank)

- Hero images: AVIF/WebP, 1600w, `fetchpriority=high` on LCP
- Avoid `filter: blur` on large images during scroll
- Right rail and nav use `transform`/`opacity` only
- Cap canvas/WebGL — v1 is CSS + images

## 11. Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

State machine still shows filter bar and rail immediately when user scrolls into catalog — without entrance animation. Sticky media becomes static stacked sections.

## 12. Implementation sketch (React)

```ts
type CategoryView = "glimpse" | "catalog";

// lineupRef: IntersectionObserver with threshold 0.15, rootMargin: `-${stack}px`
// when leaving lineup downward → catalog
// when entering glimpse with boundingClientRect.top > 0 → glimpse
```

Pseudo-structure:

```html
<body data-view="glimpse">
  <header id="globalnav"/>
  <nav id="localnav"/>
  <div id="filterbar" hidden data-show-on="catalog"/>
  <aside id="rail" hidden data-show-on="catalog"/>
  <section id="glimpse" data-chapter="glimpse"/>
  <section id="lineup" data-chapter="lineup"/>
  <section id="indian" data-chapter="indian"/>
  …
</body>
```

Analytics: fire `category_view_mode` when view flips (see [10 — Analytics](10-analytics.md)).
