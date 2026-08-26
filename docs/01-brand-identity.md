# 01 — Brand Identity

## 1. Names and how they appear

| Context | Use |
|---|---|
| Logo lockup, tab title, social | **Roots and Mills** |
| Tagline under logo, hero, product chapters | **Dakshya, Prateet, Soma** |
| Footer legal, invoices, GST, About | **PDM Enterprises** |
| Informal / founders story | Pratik, Daxesh & Mayank |

Do not abbreviate Roots and Mills to RAM in the UI. Do not lead with PDM on the consumer chrome.

**Wordmark:** “Roots and Mills” in Outfit Medium, tracking slightly open. “and” may sit smaller or in Inconsolata to nod at mill ledgers.

**Mark (v1):** A millstone / grain cross-section abstracted into a circle, split turmeric/forest. Do not use a cartoon spice jar.

## 2. Tagline system

Primary: **Dakshya, Prateet, Soma**

Never translate the three words in the lockup. Always gloss nearby:

> Dakshya — Mastery · Prateet — Trust · Soma — Calm

Category-level variants (same structure, different object):

- Masalas: *Mastery in the tin. Trust in the grind. Calm in the kitchen.*
- Flour: *Milled with Dakshya. Bagged with Prateet. Cooked in Soma.*
- Coffee: *Roasted with Dakshya. Traced with Prateet. Brewed in Soma.*
- Tea: *Plucked with Dakshya. Steeped in Prateet. Drunk in Soma.*
- Oil: *Pressed with Dakshya. Proven with Prateet. Poured in Soma.*

## 3. Colour — Growth Today, then turmeric

Extracted from [growthtoday.co](https://growthtoday.co) production CSS (cream canvas, lime growth, forest, warm ink) and extended with spice yellows so the pantry reads as *harvest*, not SaaS.

### 3.1 Core tokens

| Token | Hex | Role | Source |
|---|---|---|---|
| `--rm-cream` | `#F4F1E8` | Page background | Growth Today `--` canvas |
| `--rm-cream-deep` | `#E0DFDA` | Hairlines, wells | Growth Today |
| `--rm-ink` | `#23201A` | Primary text | Growth Today warm black |
| `--rm-ink-soft` | `#5C584F` | Secondary text | Growth Today |
| `--rm-lime` | `#54FF99` | Growth accent, focus rings, active ticks | Growth Today |
| `--rm-lime-soft` | `#BBFFD6` | Selection wash | Growth Today |
| `--rm-forest` | `#0D4A25` | Trust, local nav, primary buttons | Growth Today |
| `--rm-olive` | `#647C3A` | Charts, tags | Growth Today |
| `--rm-turmeric` | `#F0C43C` | Dakshya, highlights, category heat | Roots extension |
| `--rm-mustard` | `#D4A017` | Hover on turmeric, price emphasis | Roots extension |
| `--rm-white` | `#FFFcf6` | Cards on cream | Roots |
| `--rm-bag` | `#1C1C1C` | Bag count, dark overlays | Growth Today |

### 3.2 Semantic mapping to the triad

| Pillar | Colour | Use |
|---|---|---|
| Dakshya (Mastery) | Turmeric `#F0C43C` | Chapter labels, mastery stats, mill icons |
| Prateet (Trust) | Forest `#0D4A25` | Certifications, “tested” chips, primary CTA |
| Soma (Calm) | Cream `#F4F1E8` + lime wash | Page rest, empty space, success toasts |

Lime `#54FF99` is **not** a sale colour. It is *growth / selected / alive*. Use it for:

- Active filter chips
- Scroll-spy current section
- In-stock
- Keyboard focus (`outline: 2px solid #54FF99`)

Never use lime on long text. Contrast fails WCAG on cream.

### 3.3 Do / don’t

**Do**

- Large cream fields, one turmeric object, forest type
- Photography with warm daylight, turmeric dust, green cardamom, mill wood
- Hairline separators in `#E0DFDA`

**Don’t**

- Pure `#FFFFFF` full-bleed (too sterile vs Growth Today)
- Supermarket red `#E31C23` except genuine legal “recall”
- Rainbow category colours; all five families share the same system, distinguished by photography and a small family glyph
- Dark mode in v1

## 4. Typography

Growth Today loads **Outfit**, **IBM Plex Sans**, and **Inconsolata**. We keep that pairing and assign roles:

| Role | Face | Weight | Where |
|---|---|---|---|
| Display | **Outfit** | 400–600 | Heroes, “Masalas”, prices on lineup cards |
| UI / body | **IBM Plex Sans** | 400–500 | Nav, filters, buttons, reviews body |
| Product voice | **Inconsolata** | 400–700 | Tasting notes, origin, batch, Dakshya/Prateet/Soma copy, specs |

**Why typewriter for product information:** a mill ledger, a tea garden log, a roast sheet. Inconsolata is the typewriter analog that already lives in the Growth Today stack, so the brand feels related, not pasted.

### 4.1 Scale (desktop)

| Name | Size | Line | Tracking | Face |
|---|---|---|---|---|
| Display XL | 80 / 96px | 0.95 | -0.03em | Outfit |
| Display L | 56px | 1.0 | -0.025em | Outfit |
| Title | 40px | 1.1 | -0.02em | Outfit |
| Title S | 28px | 1.15 | -0.015em | Outfit |
| Body L | 21px | 1.47 | 0 | IBM Plex Sans |
| Body | 17px | 1.47 | 0 | IBM Plex Sans |
| UI | 14px | 1.3 | 0.01em | IBM Plex Sans |
| Product / typewriter | 16–18px | 1.55 | 0 | Inconsolata |
| Caption | 12px | 1.4 | 0.04em | IBM Plex Sans |

Apple’s body is ~17px with generous leading. Match that. Do not shrink pantry copy to 13px grocery density.

Mobile: Display XL steps down to 40–48px. Never allow hero type to overflow; prefer two lines.

### 4.2 Type rules

- Product names: Outfit Semibold.
- One-liners under lineup cards (Apple: “Thin. Fast. Powerful.”): Outfit Regular, 21px.
- Everything that is *about the commodity* (origin, grind, altitude, FSSAI, batch, tasting): Inconsolata.
- Reviews: IBM Plex Sans for the customer’s words; Inconsolata for the reviewer’s “verified mill lot” meta.
- Do not mix more than these three families.

Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Inconsolata:wght@400;700&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## 5. Voice

**Sound like:** a calm specialist. Short sentences. Specific origins. No superlative spam.

**Do not sound like:** a masala ad, a flash-sale app, or generic AI (“unlock your culinary journey”).

Apple pattern: noun, period, noun.

> Khapli. Stone-milled. Slow.

Triad block example (Haldi):

```
DAKSHYA  Lakadong-style colour strength. 6.5%+ curcumin target. Fine mill.
PRATEET  Batch HAL-2408. Heavy-metal screen. FSSAI lic. dummy-xxx.
SOMA     One tin. One kitchen. No noise.
```

Full voice guide: [07 — Content](07-content-voice.md).

## 6. Photography and motion art direction

Apple sells with **object hero on infinite field**. We do the same:

- Product is large, often larger than life (tin, bag, bottle as “device”).
- Background is cream or a single wash of turmeric/forest — not a busy kitchen.
- Scroll may pin the product while text chapters change (Apple iPhone feature sections).
- Avoid stock “smiling family dinner” as the default hero.

Placeholder system for dummy catalog:

- Category colour field + grain SVG + product name in Outfit
- Optional 3D-ish bottle/tin illustration (Recent.design “product pages” energy, not skeuomorphic clutter)

## 7. Iconography

Line icons, 1.5px stroke, round caps, 24px grid. Forest on cream. Active: lime.

Family glyphs:

- Masalas — mortar silhouette
- Flour — millstone
- Coffee — berry / chemex line
- Tea — leaf with two veins
- Oil — droplet into bowl

Do not use emoji in the global nav.

## 8. Logo clear space and footer

Footer always includes:

```
Roots and Mills
Dakshya · Prateet · Soma
A brand of PDM Enterprises
Pratik, Daxesh & Mayank
```

Plus FSSAI placeholder, GSTIN placeholder, registered address placeholder.

## 9. Brand don’ts (anti-slop)

From Refero Skill craft guidance, applied here:

- No gradient text on headlines
- No 12-column feature grids of identical cards with generic icons
- No “Our story starts with a passion for…”
- No autoplay with sound
- No three-column “Why choose us” with checkmarks as the homepage hero
