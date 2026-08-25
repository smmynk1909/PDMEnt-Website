import type { Product } from "@/types";
import { getAllProducts } from "@/lib/catalog";

// Dummy client-side ranking (docs/05 search.md):
// 1 exact name, 2 handle, 3 tags, 4 family, 5 body copy.
export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored = getAllProducts()
    .map((p) => {
      let score = 0;
      const name = p.name.toLowerCase();
      if (name === q) score += 100;
      else if (name.startsWith(q)) score += 60;
      else if (name.includes(q)) score += 40;
      if (p.handle.toLowerCase().includes(q)) score += 30;
      if (p.tags.some((t) => t.toLowerCase().includes(q))) score += 20;
      if (p.family.toLowerCase().includes(q)) score += 15;
      if (
        p.oneLiner.toLowerCase().includes(q) ||
        p.tastingNotes.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      ) {
        score += 8;
      }
      if ((p.nameGloss ?? "").toLowerCase().includes(q)) score += 12;
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.p.name.localeCompare(b.p.name));
  return scored.map((x) => x.p);
}
