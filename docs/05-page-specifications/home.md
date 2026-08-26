# Home — `/`

## Purpose

Introduce the brand at Apple pace, then route into five families. First-time visitors should understand Dakshya / Prateet / Soma without a paragraph of lore.

## Layout (desktop)

```
[ Global nav 48 ]
[ Hero 100svh ]
[ Five families — full-bleed lockups ]
[ Featured lineup — 4 cards, Apple row ]
[ Triad — three quiet chapters ]
[ Voices — review filmstrip ]
[ Mill note / dummy journal ]
[ Footer ]
```

No right rail on home. No filter bar.

## Hero

Background: `--rm-cream`. Optional slow grain texture (opacity 0.04).

Center:

```
ROOTS AND MILLS          Outfit 72–96
Dakshya, Prateet, Soma   Inconsolata 18, tracking 0.18em
Mastery · Trust · Calm   IBM Plex 17, ink-soft
```

Bottom of hero: a single forest pill **Explore the mill** → `#families` and a ghost **Shop masalas**.

Motion: title fades up; triad types on with a caret in Inconsolata (optional, skip if reduced motion).

## Family lockups

Five full-width or 2+3 bento (Recent: SpaceXAI Bento as *density reference only* — keep more air than a true bento).

Each lockup:

- Family name Display L
- One-liner (Apple style)
- Shop →

Copy:

| Family | One-liner |
|---|---|
| Masalas | The tin, considered. |
| Flour | Grain, milled slow. |
| Coffee | Origin in the cup. |
| Tea | Leaf, unhurried. |
| Oil | Pressed, not performed. |

Image: dummy still-life. Hover: 1.03 scale image, 400ms ease-out.

## Featured lineup

Heading: **This week in the mill.** (or **Explore the lineup.** — Apple’s exact phrase is allowed as a structural heading; prefer original: **From the mill.**)

Four dummy SKUs from JSON `featured: true`. Same card component as category lineup.

## Triad section

Three stacked 80vh chapters **or** one 100vh with three columns on xl.

Each: pillar name Inconsolata small caps, English IBM Plex, one proof sentence.

Do not use three identical icon circles.

## Reviews

Horizontal snap of 6 dummy quotes. Stars in turmeric. Name + city in Inconsolata.

## Analytics

`home_view`, `home_family_click`, `home_featured_click`

## Acceptance

- LCP is the wordmark or hero still, < 2.5s on simulated 4G
- Keyboard can tab to all five families
- No autoplaying video in v1
