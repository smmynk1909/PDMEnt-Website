"use client";

export function QtyStepper({
  qty,
  onChange,
}: {
  qty: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="qty">
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span aria-live="polite">{qty}</span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
