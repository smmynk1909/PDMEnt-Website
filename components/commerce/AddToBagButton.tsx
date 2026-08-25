"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/ui-store";
import { track } from "@/lib/analytics";

export function AddToBagButton({
  sku,
  handle,
  name,
  priceInr,
  className = "pill block",
}: {
  sku: string;
  handle: string;
  name: string;
  priceInr: number;
  className?: string;
}) {
  const add = useCart((s) => s.add);
  const show = useToast((s) => s.show);
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        add({ sku, handle, qty: 1 });
        track("add_to_bag", { sku, priceInr, qty: 1 });
        show(`${name} — in the bag`);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 900);
      }}
    >
      {added ? "In the bag" : "Add to bag"}
    </button>
  );
}
