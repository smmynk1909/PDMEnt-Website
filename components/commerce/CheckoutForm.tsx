"use client";

import { useState } from "react";

export function CheckoutForm({
  onPlace,
}: {
  onPlace: () => void;
}) {
  const [values, setValues] = useState({
    email: "",
    phone: "",
    pincode: "",
    name: "",
    address: "",
    city: "",
  });

  function set(key: keyof typeof values) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onPlace();
      }}
    >
      <h3 style={{ fontFamily: "var(--rm-font-display)", marginBottom: 12 }}>
        Contact
      </h3>
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" required value={values.email} onChange={set("email")} placeholder="you@example.in" />
      </div>
      <div className="form-field mono">
        <label htmlFor="phone">Phone</label>
        <input id="phone" type="tel" required value={values.phone} onChange={set("phone")} placeholder="+91" />
      </div>

      <h3 style={{ fontFamily: "var(--rm-font-display)", margin: "20px 0 12px" }}>
        Delivery
      </h3>
      <div className="form-field mono">
        <label htmlFor="pincode">Pincode (India)</label>
        <input id="pincode" required value={values.pincode} onChange={set("pincode")} placeholder="560001" />
      </div>
      <div className="form-field">
        <label htmlFor="name">Full name</label>
        <input id="name" required value={values.name} onChange={set("name")} />
      </div>
      <div className="form-field">
        <label htmlFor="address">Address</label>
        <input id="address" required value={values.address} onChange={set("address")} />
      </div>
      <div className="form-field">
        <label htmlFor="city">City</label>
        <input id="city" required value={values.city} onChange={set("city")} />
      </div>

      <button type="submit" className="pill block" style={{ marginTop: 12 }}>
        Place dummy order
      </button>
      <p className="checkout-disclaimer">
        This is a mock checkout. No payment is taken and no order is placed. No
        Razorpay, no card, no money — dummy mill lots only.
      </p>
    </form>
  );
}
