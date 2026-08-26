// Data model — verbatim from docs/09-data-model.md

export type VendorId = "pdm" | string;

export type Family = "masalas" | "flour" | "coffee" | "tea" | "oil";

export type Variant = {
  sku: string;
  label: string;
  sizeGrams?: number;
  sizeMl?: number;
  priceInr: number;
  compareAtInr?: number;
  stock: number;
};

export type ProductForm =
  | "whole"
  | "ground"
  | "blend"
  | "leaf"
  | "bean"
  | "pressed";

export type Heat = 0 | 1 | 2 | 3 | 4 | 5;

export type OriginArea = "india" | "south-east-asia" | "world";

export type Product = {
  handle: string;
  family: Family;
  name: string;
  nameGloss?: string;
  oneLiner: string;
  dakshya: string;
  prateet: string;
  soma: string;
  tastingNotes: string;
  description: string;
  originCountry: string;
  originRegion?: string;
  originArea: OriginArea;
  form?: ProductForm;
  heat: Heat;
  tags: string[];
  veg: boolean;
  vendorId: VendorId;
  status: "dummy" | "live" | "archived";
  featured: boolean;
  lineupRank: number | null;
  featuredScore: number;
  pairings: string[];
  variants: Variant[];
  image: { bg: string; accent: string; alt: string };
  createdAt: string;
};

export type Review = {
  id: string;
  productHandle: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  author: string;
  city: string;
  verifiedDummy: boolean;
  lot?: string;
  createdAt: string;
};

export type CartLine = { sku: string; handle: string; qty: number };
export type Cart = { lines: CartLine[]; updatedAt: string };

// Taxonomy (catalog/taxonomy.json)
export type FamilyChapter = { id: string; label: string };

export type FamilyTaxonomy = {
  id: Family;
  path: string;
  name: string;
  oneLiner: string;
  localNav: string[];
  lineupSegments: string[];
  chapters: FamilyChapter[];
  facets: string[];
};

export type Taxonomy = {
  brand: string;
  legalEntity: string;
  founders: string[];
  tagline: string[];
  taglineGloss: string[];
  families: FamilyTaxonomy[];
};
