"use client";

import { create } from "zustand";

type ToastState = {
  message: string | null;
  show: (message: string) => void;
  hide: () => void;
};

let toastTimer: ReturnType<typeof setTimeout> | null = null;

export const useToast = create<ToastState>((set) => ({
  message: null,
  show: (message) => {
    set({ message });
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => set({ message: null }), 2600);
  },
  hide: () => set({ message: null }),
}));

type OverlayState = {
  bagOpen: boolean;
  searchOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
  openSearch: () => void;
  closeSearch: () => void;
};

export const useOverlay = create<OverlayState>((set) => ({
  bagOpen: false,
  searchOpen: false,
  openBag: () => set({ bagOpen: true, searchOpen: false }),
  closeBag: () => set({ bagOpen: false }),
  openSearch: () => set({ searchOpen: true, bagOpen: false }),
  closeSearch: () => set({ searchOpen: false }),
}));
