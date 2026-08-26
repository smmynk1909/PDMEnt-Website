"use client";

import { useToast } from "@/lib/ui-store";

export function Toast() {
  const message = useToast((s) => s.message);
  if (!message) return null;
  return (
    <div className="toast" role="status" aria-live="polite">
      <span className="check">✓</span>
      <span>{message}</span>
    </div>
  );
}
