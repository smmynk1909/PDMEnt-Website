"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";

// Triggers zustand persist rehydration on mount so the bag count and drawer
// reflect localStorage without SSR hydration mismatches.
export function CartHydrator() {
  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);
  return null;
}
