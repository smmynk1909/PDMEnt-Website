# 14 — Accessibility

Calm design is not optional contrast.

## Contrast

- Ink `#23201A` on cream: pass AAA for body
- Forest buttons with cream text: check at 14px bold
- **Lime `#54FF99` is not a text colour** on cream
- Turmeric on cream is not small text; use as fill or large type only

## Keyboard

- Skip to catalog / skip to content
- Mega menu: Esc closes, focus trap
- Right rail is a `nav` with `aria-current`
- Filter chips are buttons, not fake divs
- Dialogs (filter sheet, bag): focus trap + Esc

## Motion

`prefers-reduced-motion` documented in [04](04-interaction-and-motion.md).

## Names

- Product names announced with gloss (`Haldi, turmeric`)
- Icon-only nav buttons have `aria-label` (Search, Bag, Account)
- Veg mark has text alternative

## Forms

- Labels not placeholders-only
- Pincode numeric `inputmode`
- Errors linked with `aria-describedby`

## Language

`lang="en"`. Product words in Hindi transliteration are still English page language.

## Target size

44px minimum for Buy, bag, chips.
