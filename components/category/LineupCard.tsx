"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { fromPrice } from "@/lib/format";
import { Price } from "@/components/ui/Price";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/ui-store";
import { track } from "@/lib/analytics";

function dotColors(product: Product): string[] {
  if (product.heat > 0) {
    return Array.from({ length: Math.min(product.heat, 4) }, () => "#c23b22");
  }
  return product.variants
    .slice(0, 3)
    .map((_, i) => (i % 2 === 0 ? product.image.bg : product.image.accent));
}

export function LineupCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const show = useToast((s) => s.show);
  const cheapest = product.variants.reduce(
    (min, v) => (v.priceInr < min.priceInr ? v : min),
    product.variants[0],
  );
  const href = `/${product.family}/${product.handle}`;

  return (
    <article className="card">
      <Link
        href={href}
        className="art"
        style={{ background: `${product.image.bg}22` }}
        aria-label={product.image.alt}
        onClick={() =>
          track("lineup_click", { handle: product.handle, cta: "learn" })
        }
      >
        <span className="tin" style={{ background: product.image.bg }} />
        <span className="dots" aria-hidden>
          {dotColors(product).map((c, i) => (
            <i key={i} style={{ background: c }} />
          ))}
        </span>
      </Link>
      <h3>{product.name}</h3>
      <p className="one">{product.oneLiner}</p>
      <p className="from">
        <Price amount={fromPrice(product)} from />
      </p>
      <div className="cta">
        <Link
          href={href}
          className="learn"
          onClick={() =>
            track("lineup_click", { handle: product.handle, cta: "learn" })
          }
        >
          Learn more
        </Link>
        <button
          type="button"
          className="buy"
          onClick={() => {
            add({ sku: cheapest.sku, handle: product.handle, qty: 1 });
            track("lineup_click", { handle: product.handle, cta: "buy" });
            track("add_to_bag", {
              sku: cheapest.sku,
              priceInr: cheapest.priceInr,
              qty: 1,
            });
            show(`${product.name} — in the bag`);
          }}
        >
          Buy
        </button>
      </div>
    </article>
  );
}
