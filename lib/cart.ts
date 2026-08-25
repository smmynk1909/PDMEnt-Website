"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartLine } from "@/types";

type CartState = {
  lines: CartLine[];
  updatedAt: string;
  hydrated: boolean;
  add: (line: CartLine) => void;
  setQty: (sku: string, qty: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
  setHydrated: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      updatedAt: new Date().toISOString(),
      hydrated: false,
      add: (line) =>
        set((state) => {
          const existing = state.lines.find((l) => l.sku === line.sku);
          const lines = existing
            ? state.lines.map((l) =>
                l.sku === line.sku ? { ...l, qty: l.qty + line.qty } : l,
              )
            : [...state.lines, line];
          return { lines, updatedAt: new Date().toISOString() };
        }),
      setQty: (sku, qty) =>
        set((state) => ({
          lines:
            qty <= 0
              ? state.lines.filter((l) => l.sku !== sku)
              : state.lines.map((l) => (l.sku === sku ? { ...l, qty } : l)),
          updatedAt: new Date().toISOString(),
        })),
      remove: (sku) =>
        set((state) => ({
          lines: state.lines.filter((l) => l.sku !== sku),
          updatedAt: new Date().toISOString(),
        })),
      clear: () => set({ lines: [], updatedAt: new Date().toISOString() }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "rm-cart-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines, updatedAt: state.updatedAt }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    },
  ),
);

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}
