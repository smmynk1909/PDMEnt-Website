"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { CheckoutForm } from "@/components/commerce/CheckoutForm";
import { OrderSummary, useCartTotals } from "@/components/commerce/OrderSummary";
import { track } from "@/lib/analytics";

function makeOrderId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 4; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return `RM-ORD-${id}`;
}

export default function CheckoutPage() {
  const { resolved, subtotal } = useCartTotals();
  const clear = useCart((s) => s.clear);
  const hydrated = useCart((s) => s.hydrated);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && resolved.length > 0 && !orderId) {
      track("checkout_start", { valueInr: subtotal });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  if (orderId) {
    return (
      <div className="commerce-page">
        <div className="order-done">
          <p className="triad">Dakshya · Prateet · Soma</p>
          <h1>Thank you.</h1>
          <p className="oid">{orderId}</p>
          <p>No money changed hands — this is a dummy mill order for website view.</p>
          <p className="triad-line">
            Dakshya in the pack. Prateet on the invoice. Soma at your door.
          </p>
          <Link href="/masalas" className="pill" style={{ marginTop: 20 }}>
            Back to the mill
          </Link>
        </div>
      </div>
    );
  }

  if (hydrated && resolved.length === 0) {
    return (
      <div className="commerce-page">
        <h1>Your bag</h1>
        <p className="mono" style={{ color: "var(--rm-ink-soft)" }}>
          The mill is quiet. Add a tin.
        </p>
        <Link href="/masalas" className="pill" style={{ marginTop: 20 }}>
          Shop masalas
        </Link>
      </div>
    );
  }

  return (
    <div className="commerce-page">
      <h1>Checkout</h1>
      <div className="checkout-grid">
        <CheckoutForm
          onPlace={() => {
            const id = makeOrderId();
            track("dummy_purchase", { orderId: id, valueInr: subtotal });
            clear();
            setOrderId(id);
          }}
        />
        <OrderSummary />
      </div>
    </div>
  );
}
