"use client";

import { useCart } from "@/lib/cart";
import { getProductByHandle } from "@/lib/catalog";
import { formatInr } from "@/lib/format";

export function useCartTotals() {
  const lines = useCart((s) => s.lines);
  const resolved = lines
    .map((line) => {
      const product = getProductByHandle(line.handle);
      const variant = product?.variants.find((v) => v.sku === line.sku);
      if (!product || !variant) return null;
      return { line, product, variant };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
  const subtotal = resolved.reduce(
    (sum, r) => sum + r.variant.priceInr * r.line.qty,
    0,
  );
  return { resolved, subtotal };
}

export function OrderSummary() {
  const { resolved, subtotal } = useCartTotals();

  return (
    <aside className="order-summary" aria-label="Order summary">
      <h3>Order summary</h3>
      {resolved.map((r) => (
        <div className="sline" key={r.line.sku}>
          <span>
            {r.product.name} · {r.variant.label} × {r.line.qty}
          </span>
          <span className="mono">
            {formatInr(r.variant.priceInr * r.line.qty)}
          </span>
        </div>
      ))}
      <div className="sline">
        <span>Estimated GST</span>
        <span className="mono">Included (dummy)</span>
      </div>
      <div className="sline">
        <span>Shipping</span>
        <span className="mono">Calculated at pincode</span>
      </div>
      <div className="sline total">
        <span>Total</span>
        <span>{formatInr(subtotal)}</span>
      </div>
    </aside>
  );
}
