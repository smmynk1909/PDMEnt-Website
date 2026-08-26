import type { Family, FamilyChapter, Product } from "@/types";
import { getFamilyMeta } from "@/lib/catalog";

// ---------------------------------------------------------------------------
// Glimpse copy per family
// ---------------------------------------------------------------------------

const GLIMPSE_SENTENCE: Record<Family, string> = {
  masalas: "Indian kitchens, and the spices that travelled to them.",
  flour: "Grain and pulse, milled slow for the everyday table.",
  coffee: "Estates and highlands, roasted for the cup you keep.",
  tea: "Gardens near and far, leaf kept unhurried.",
  oil: "Pressed and refined, the quiet base of the pan.",
};

export function glimpseSentence(family: Family): string {
  return GLIMPSE_SENTENCE[family];
}

// ---------------------------------------------------------------------------
// Lineup segments
// ---------------------------------------------------------------------------

export function matchSegment(
  product: Product,
  segment: string,
): boolean {
  const s = segment.trim().toLowerCase();
  if (s === "all") return true;
  if (s === "india") return product.originArea === "india";
  if (s === "south-east-asia") return product.originArea === "south-east-asia";
  if (s === "world") {
    return product.originArea === "world" || product.tags.includes("world");
  }
  return product.tags.includes(s);
}

// ---------------------------------------------------------------------------
// Chapters (buckets) — a product can appear in more than one chapter
// ---------------------------------------------------------------------------

export type ChapterDef = {
  id: string;
  label: string;
  predicate: (p: Product) => boolean;
};

type PredicateRegistry = Record<string, (p: Product) => boolean>;

const CHAPTER_PREDICATES: Record<Family, PredicateRegistry> = {
  masalas: {
    indian: (p) => p.originArea === "india",
    foreign: (p) => p.originArea === "world",
    blends: (p) => p.form === "blend",
    heat: (p) => p.heat >= 3,
  },
  flour: {
    millets: (p) => p.tags.includes("millets"),
    pulses: (p) => p.tags.includes("pulses"),
    wheat: (p) => p.tags.includes("wheat"),
    rice: (p) => p.tags.includes("rice"),
  },
  coffee: {
    india: (p) => p.originArea === "india",
    sea: (p) => p.originArea === "south-east-asia",
    process: (p) => p.tags.includes("process"),
    roast: (p) => p.tags.includes("espresso"),
  },
  tea: {
    india: (p) => p.originArea === "india",
    sea: (p) => p.originArea === "south-east-asia",
    style: (p) =>
      p.tags.includes("green") ||
      p.tags.includes("oolong") ||
      p.tags.includes("orthodox"),
  },
  oil: {
    india: (p) => p.originArea === "india",
    foreign: (p) => p.originArea === "world",
    press: (p) => p.tags.includes("pressed"),
  },
};

const NON_CHAPTER_IDS = new Set(["glimpse", "lineup", "reviews", "pairings"]);

/** Content chapters for a family (excludes glimpse/lineup/reviews/pairings). */
export function getChapters(family: Family): ChapterDef[] {
  const meta = getFamilyMeta(family);
  const predicates = CHAPTER_PREDICATES[family];
  if (!meta) return [];
  return meta.chapters
    .filter((c: FamilyChapter) => !NON_CHAPTER_IDS.has(c.id) && predicates[c.id])
    .map((c) => ({ id: c.id, label: c.label, predicate: predicates[c.id] }));
}

// ---------------------------------------------------------------------------
// Facets + filtering
// ---------------------------------------------------------------------------

export type FacetId = "origin" | "form" | "heat" | "size";

export type FacetOption = { value: string; label: string };

export type Facet = {
  id: FacetId;
  label: string;
  options: FacetOption[];
};

export type FilterState = Record<FacetId, string[]>;

export const EMPTY_FILTERS: FilterState = {
  origin: [],
  form: [],
  heat: [],
  size: [],
};

const ORIGIN_LABELS: Record<string, string> = {
  india: "Indian",
  "south-east-asia": "South-East Asia",
  world: "World",
};

const HEAT_BANDS: { value: string; label: string; test: (h: number) => boolean }[] = [
  { value: "none", label: "None", test: (h) => h === 0 },
  { value: "low", label: "Low", test: (h) => h >= 1 && h <= 2 },
  { value: "medium", label: "Medium", test: (h) => h === 3 },
  { value: "high", label: "High", test: (h) => h >= 4 },
];

function titleCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Build the facet set for a family from the products actually present. */
export function buildFacets(products: Product[]): Facet[] {
  const facets: Facet[] = [];

  const origins = Array.from(new Set(products.map((p) => p.originArea)));
  if (origins.length > 1) {
    facets.push({
      id: "origin",
      label: "Origin",
      options: origins.map((o) => ({ value: o, label: ORIGIN_LABELS[o] ?? o })),
    });
  }

  const forms = Array.from(
    new Set(products.map((p) => p.form).filter((f): f is NonNullable<typeof f> => !!f)),
  );
  if (forms.length > 1) {
    facets.push({
      id: "form",
      label: "Form",
      options: forms.map((f) => ({ value: f, label: titleCase(f) })),
    });
  }

  if (products.some((p) => p.heat > 0)) {
    const present = HEAT_BANDS.filter((band) =>
      products.some((p) => band.test(p.heat)),
    );
    facets.push({
      id: "heat",
      label: "Heat",
      options: present.map((b) => ({ value: b.value, label: b.label })),
    });
  }

  const sizes = Array.from(
    new Set(products.flatMap((p) => p.variants.map((v) => v.label))),
  );
  if (sizes.length > 1) {
    facets.push({
      id: "size",
      label: "Size",
      options: sizes.map((s) => ({ value: s, label: s })),
    });
  }

  return facets;
}

function matchHeat(product: Product, bands: string[]): boolean {
  return bands.some((value) => {
    const band = HEAT_BANDS.find((b) => b.value === value);
    return band ? band.test(product.heat) : false;
  });
}

/** AND across facet groups, OR within a group. */
export function passesFilters(product: Product, filters: FilterState): boolean {
  if (filters.origin.length && !filters.origin.includes(product.originArea)) {
    return false;
  }
  if (
    filters.form.length &&
    !(product.form && filters.form.includes(product.form))
  ) {
    return false;
  }
  if (filters.heat.length && !matchHeat(product, filters.heat)) {
    return false;
  }
  if (
    filters.size.length &&
    !product.variants.some((v) => filters.size.includes(v.label))
  ) {
    return false;
  }
  return true;
}

export type SortKey = "featured" | "price" | "rating" | "newest" | "name";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price", label: "Price" },
  { value: "rating", label: "Rating" },
  { value: "newest", label: "Newest" },
  { value: "name", label: "Name A–Z" },
];

export function minPrice(product: Product): number {
  return product.variants.reduce(
    (min, v) => Math.min(min, v.priceInr),
    product.variants[0]?.priceInr ?? 0,
  );
}

export function sortProducts(
  list: Product[],
  sort: SortKey,
  ratingOf: (handle: string) => number,
): Product[] {
  const arr = [...list];
  switch (sort) {
    case "price":
      arr.sort((a, b) => minPrice(a) - minPrice(b));
      break;
    case "rating":
      arr.sort((a, b) => ratingOf(b.handle) - ratingOf(a.handle));
      break;
    case "newest":
      arr.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
    case "name":
      arr.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "featured":
    default:
      arr.sort(
        (a, b) =>
          b.featuredScore - a.featuredScore || a.name.localeCompare(b.name),
      );
      break;
  }
  return arr;
}
