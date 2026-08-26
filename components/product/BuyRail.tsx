"use client";

import { useRouter } from "next/navigation";
import type { Product } from "@/types";
import { formatInr } from "@/lib/format";
import { VariantPills } from "@/components/product/VariantPills";
import { AddToBagButton } from "@/components/commerce/AddToBagButton";
import { useCart } from "@/lib/cart";
import { useOverlay, useToast } from "@/lib/ui-store";
import { track } from "@/lib/analytics";

export function BuyRail({
  product,
  selectedSku,
  onSelect,
}: {
  product: Product;
  selectedSku: string;
  onSelect: (sku: string) => void;
}) {
  const router = useRouter();
  const add = useCart((s) => s.add);
  const openBag = useOverlay((s) => s.openBag);
  const show = useToast((s) => s.show);
  const variant =
    product.variants.find((v) => v.sku === selectedSku) ?? product.variants[0];
  const outOfStock = variant.stock <= 0;

  return (
    <div className="buyrail" id="buy">
      <span className="tag">New · Dummy lot</span>
      <h1>{product.name}</h1>
      {product.nameGloss ? <div className="gloss">{product.nameGloss}</div> : null}
      <p className="one">{product.oneLiner}</p>

      <div className="price">
        {formatInr(variant.priceInr)}
        {variant.compareAtInr ? (
          <span
            style={{
              marginLeft: 10,
              textDecoration: "line-through",
              color: "var(--rm-ink-soft)",
              fontSize: 18,
            }}
          >
            {formatInr(variant.compareAtInr)}
          </span>
        ) : null}
        <small>Inclusive of dummy GST</small>
      </div>

      <VariantPills
        variants={product.variants}
        selectedSku={variant.sku}
        onSelect={onSelect}
      />

      {outOfStock ? (
        <button type="button" className="pill ghost block">
          Tell me when the mill has it
        </button>
      ) : (
        <>
          <AddToBagButton
            sku={variant.sku}
            handle={product.handle}
            name={product.name}
            priceInr={variant.priceInr}
          />
          <button
            type="button"
            className="pill ghost block"
            style={{ marginTop: 10 }}
            onClick={() => {
              add({ sku: variant.sku, handle: product.handle, qty: 1 });
              track("add_to_bag", {
                sku: variant.sku,
                priceInr: variant.priceInr,
                qty: 1,
              });
              show(`${product.name} — in the bag`);
              openBag();
            }}
          >
            Buy now
          </button>
        </>
      )}

      <div className="ledger">
        <div className="row-l">
          <b>DAKSHYA</b>
          <span>{product.dakshya}</span>
        </div>
        <div className="row-l">
          <b>PRATEET</b>
          <span>{product.prateet}</span>
        </div>
        <div className="row-l">
          <b>SOMA</b>
          <span>{product.soma}</span>
        </div>
      </div>

      <p className="pdp-disclaimer">
        Dummy lot for website view. Not for sale until FSSAI, MRP, and harvest
        fields are live. PDM Enterprises is the seller.
      </p>
      <button
        type="button"
        className="line-remove"
        style={{ marginTop: 12 }}
        onClick={() => router.push("/checkout")}
      >
        View bag & mock checkout →
      </button>
    </div>
  );
}
