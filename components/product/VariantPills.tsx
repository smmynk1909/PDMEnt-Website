"use client";

import type { Variant } from "@/types";

export function VariantPills({
  variants,
  selectedSku,
  onSelect,
}: {
  variants: Variant[];
  selectedSku: string;
  onSelect: (sku: string) => void;
}) {
  return (
    <div className="variant-pills" role="group" aria-label="Size">
      {variants.map((v) => (
        <button
          key={v.sku}
          type="button"
          className={v.sku === selectedSku ? "on" : undefined}
          aria-pressed={v.sku === selectedSku}
          disabled={v.stock <= 0}
          onClick={() => onSelect(v.sku)}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
