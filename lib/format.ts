import type { Product, Variant } from "@/types";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Render paise-free INR, e.g. 249 → "₹249". */
export function formatInr(amount: number): string {
  return inr.format(amount);
}

/** Lowest variant price for a product (used for "From ₹X"). */
export function fromPrice(product: Product): number {
  return product.variants.reduce(
    (min, v) => Math.min(min, v.priceInr),
    product.variants[0]?.priceInr ?? 0,
  );
}

export function variantNetQty(v: Variant): string {
  if (v.sizeGrams != null) {
    return v.sizeGrams >= 1000 ? `${v.sizeGrams / 1000} kg` : `${v.sizeGrams} g`;
  }
  if (v.sizeMl != null) {
    return v.sizeMl >= 1000 ? `${v.sizeMl / 1000} L` : `${v.sizeMl} ml`;
  }
  return v.label;
}
