"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { useCartTotals } from "@/components/commerce/OrderSummary";
import { QtyStepper } from "@/components/commerce/QtyStepper";
import { formatInr } from "@/lib/format";
import { track } from "@/lib/analytics";

export default function BagPage() {
  const { resolved, subtotal } = useCartTotals();
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const hydrated = useCart((s) => s.hydrated);

  useEffect(() => {
    if (hydrated) {
      track("bag_view", { line_count: resolved.length, valueInr: subtotal });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  return (
    <div className="commerce-page">
      <h1>Your bag</h1>
      {hydrated && resolved.length === 0 ? (
        <>
          <p className="mono" style={{ color: "var(--rm-ink-soft)" }}>
            The mill is quiet. Add a tin.
          </p>
          <Link href="/masalas" className="pill" style={{ marginTop: 20 }}>
            Shop masalas
          </Link>
        </>
      ) : (
        <div className="checkout-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {resolved.map(({ line, product, variant }) => (
              <div className="line" key={line.sku}>
                <Link
                  href={`/${product.family}/${product.handle}`}
                  className="thumb"
                  style={{ background: `${product.image.bg}22` }}
                >
                  <span className="tin" style={{ background: product.image.bg }} />
                </Link>
                <div>
                  <Link
                    href={`/${product.family}/${product.handle}`}
                    className="name"
                  >
                    {product.name}
                  </Link>
                  <div className="vlabel">{variant.label}</div>
                  <div style={{ marginTop: 6 }}>
                    <QtyStepper
                      qty={line.qty}
                      onChange={(next) => setQty(line.sku, next)}
                    />
                    <button
                      type="button"
                      className="line-remove"
                      style={{ marginLeft: 10 }}
                      onClick={() => remove(line.sku)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="mono">
                  {formatInr(variant.priceInr * line.qty)}
                </div>
              </div>
            ))}
          </div>
          <aside className="order-summary">
            <h3>Summary</h3>
            <div className="sline total">
              <span>Subtotal</span>
              <span>{formatInr(subtotal)}</span>
            </div>
            <p className="mono" style={{ fontSize: 12, color: "var(--rm-ink-soft)", margin: "10px 0" }}>
              GST included · shipping at pincode (dummy)
            </p>
            <Link href="/checkout" className="pill block">
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
