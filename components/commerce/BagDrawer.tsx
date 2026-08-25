"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { useOverlay, useToast } from "@/lib/ui-store";
import { getProductByHandle } from "@/lib/catalog";
import { formatInr } from "@/lib/format";
import { track } from "@/lib/analytics";
import { QtyStepper } from "@/components/commerce/QtyStepper";
import { TinArt } from "@/components/ui/TinArt";

export function BagDrawer() {
  const open = useOverlay((s) => s.bagOpen);
  const close = useOverlay((s) => s.closeBag);
  const show = useToast((s) => s.show);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);

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

  useEffect(() => {
    if (open) {
      track("bag_view", { line_count: lines.length, valueInr: subtotal });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <>
      <div className="overlay-scrim" onClick={close} aria-hidden />
      <aside className="drawer" role="dialog" aria-label="Your bag">
        <header>
          <h2>Your bag</h2>
          <button type="button" className="icon-btn" onClick={close} aria-label="Close bag">
            ✕
          </button>
        </header>

        {resolved.length === 0 ? (
          <div className="lines">
            <p className="mono" style={{ color: "var(--rm-ink-soft)" }}>
              The mill is quiet. Add a tin.
            </p>
          </div>
        ) : (
          <div className="lines">
            {resolved.map(({ line, product, variant }) => (
              <div className="line" key={line.sku}>
                <Link
                  href={`/${product.family}/${product.handle}`}
                  className="thumb"
                  style={{ background: `${product.image.bg}22` }}
                  onClick={close}
                >
                  <span
                    className="tin"
                    style={{ background: product.image.bg }}
                  />
                </Link>
                <div>
                  <Link
                    href={`/${product.family}/${product.handle}`}
                    className="name"
                    onClick={close}
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
                <div className="mono">{formatInr(variant.priceInr * line.qty)}</div>
              </div>
            ))}
          </div>
        )}

        <footer>
          <div className="subtotal">
            <span>Subtotal</span>
            <span>{formatInr(subtotal)}</span>
          </div>
          <div className="meta">
            Estimated GST included · shipping calculated at pincode (dummy)
          </div>
          {resolved.length > 0 ? (
            <Link
              href="/checkout"
              className="pill block"
              onClick={() => {
                show("Heading to checkout");
                close();
              }}
            >
              Checkout
            </Link>
          ) : (
            <Link href="/masalas" className="pill block" onClick={close}>
              Shop masalas
            </Link>
          )}
        </footer>
      </aside>
    </>
  );
}
