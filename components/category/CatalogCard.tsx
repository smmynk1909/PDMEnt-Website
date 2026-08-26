"use client";

import Link from "next/link";
import type { Product } from "@/types";
import { formatInr, fromPrice } from "@/lib/format";
import { getReviewsFor, averageRating } from "@/lib/catalog";
import { track } from "@/lib/analytics";

function isLabTested(product: Product): boolean {
  return /screen|lab|tested/i.test(product.prateet);
}

export function CatalogCard({ product }: { product: Product }) {
  const reviews = getReviewsFor(product.handle);
  const rating = averageRating(product.handle);
  const href = `/${product.family}/${product.handle}`;

  return (
    <Link
      href={href}
      className="gcard"
      onClick={() => track("catalog_product_click", { handle: product.handle })}
    >
      <div className="art" style={{ background: `${product.image.bg}22` }} aria-hidden>
        <span className="tin" style={{ background: product.image.bg }} />
      </div>
      <h3>{product.name}</h3>
      <p className="gmeta">{product.tastingNotes}</p>
      {isLabTested(product) ? (
        <span className="badge-prateet">Prateet · lab-screened</span>
      ) : null}
      <div className="gfoot">
        <span className="price">{formatInr(fromPrice(product))}</span>
        {reviews.length > 0 ? (
          <span className="rating">
            ★ {rating.toFixed(1)} ({reviews.length})
          </span>
        ) : null}
      </div>
    </Link>
  );
}
