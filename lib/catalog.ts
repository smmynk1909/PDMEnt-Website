import productsRaw from "@/catalog/products.json";
import reviewsRaw from "@/catalog/reviews.json";
import taxonomyRaw from "@/catalog/taxonomy.json";
import type {
  Family,
  FamilyTaxonomy,
  Product,
  Review,
  Taxonomy,
} from "@/types";
import { sanitizeCopy } from "@/lib/copy";

// Descriptions are sanitized once at module load so no consumer can leak an
// internal design reference onto a public page.
const products: Product[] = (productsRaw as Product[]).map((p) => ({
  ...p,
  description: sanitizeCopy(p.description),
}));

const reviews: Review[] = reviewsRaw as Review[];
const taxonomy: Taxonomy = taxonomyRaw as Taxonomy;

export const FAMILIES: Family[] = ["masalas", "flour", "coffee", "tea", "oil"];

export function getTaxonomy(): Taxonomy {
  return taxonomy;
}

export function getFamilyMeta(family: string): FamilyTaxonomy | undefined {
  return taxonomy.families.find((f) => f.id === family);
}

export function isFamily(value: string): value is Family {
  return (FAMILIES as string[]).includes(value);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getProductsByFamily(family: Family): Product[] {
  return products.filter((p) => p.family === family);
}

export function getProduct(
  family: string,
  handle: string,
): Product | undefined {
  return products.find((p) => p.family === family && p.handle === handle);
}

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

/** Featured SKUs for the home "From the mill" row (featuredScore desc). */
export function getFeatured(limit?: number): Product[] {
  const list = products
    .filter((p) => p.featured)
    .sort((a, b) => b.featuredScore - a.featuredScore || a.name.localeCompare(b.name));
  return limit ? list.slice(0, limit) : list;
}

/** Lineup products for a family — those with a lineupRank, ascending. */
export function getLineup(family: Family): Product[] {
  return products
    .filter((p) => p.family === family && p.lineupRank != null)
    .sort((a, b) => (a.lineupRank ?? 0) - (b.lineupRank ?? 0));
}

export function getReviewsFor(handle: string): Review[] {
  return reviews
    .filter((r) => r.productHandle === handle)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getFamilyReviews(family: Family): Review[] {
  const handles = new Set(getProductsByFamily(family).map((p) => p.handle));
  return reviews.filter((r) => handles.has(r.productHandle));
}

export function getAllReviews(): Review[] {
  return reviews;
}

export function averageRating(handle: string): number {
  const list = getReviewsFor(handle);
  if (!list.length) return 0;
  return list.reduce((sum, r) => sum + r.rating, 0) / list.length;
}
