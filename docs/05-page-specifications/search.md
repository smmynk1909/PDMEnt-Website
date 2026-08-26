# Search — `/search`

Refero: Searching, Filter & Sorting, Catalog Page.  
Mobbin: search + filters grocery.

## Behaviour

- `/search?q=` required for results; empty q shows **popular dummy queries** and five family shortcuts
- As-you-type overlay from nav: 8 suggestions (products + families), 200ms debounce
- Results page reuses **category catalog cards + the same filter bar** (always visible — user already has intent)
- No cinematic glimpse
- Right rail only if query maps to one family (`family` inferred); otherwise hide rail

## Ranking (dummy)

1. Exact name
2. Handle
3. Tags
4. Family
5. Body copy

Show `Inconsolata` line: `12 results in the mill for “haldi”`

## Empty

`Nothing in the mill for “xyz”.` + three nearest products (fuzzy).

## Analytics

`search_submit`, `search_zero`, `search_click`
