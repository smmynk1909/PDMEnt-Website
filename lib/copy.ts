// Strips internal design-reference language from any customer-facing copy.
// The dummy catalog descriptions contain analogies ("The MacBook Air of the
// masala cupboard", "Lineup analog: MacBook Pro", etc.) that are internal-only.
// Per docs/17 §0 and docs/13, none of these may reach a public page, so we
// sanitize free-text fields at load time rather than editing the source data.

const BANNED = new RegExp(
  [
    "apple",
    "macbook",
    "mac mini",
    "imac",
    "mac analog",
    "lineup analog",
    "iphone",
    "ipad",
    "ipod",
    "growthtoday",
    "refero",
    "mobbin",
    "recent\\.design",
    "diaspora",
    "burlap",
  ].join("|"),
  "i",
);

/**
 * Remove any sentence that references an internal design source or analogy.
 * Splits on sentence boundaries, drops offending sentences, and rejoins the
 * remaining brand copy so the calm original voice survives.
 */
export function sanitizeCopy(text: string): string {
  if (!text) return text;
  const sentences = text.match(/[^.!?]+[.!?]*/g) ?? [text];
  const kept = sentences
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !BANNED.test(s));
  return kept.join(" ").replace(/\s+/g, " ").trim();
}
