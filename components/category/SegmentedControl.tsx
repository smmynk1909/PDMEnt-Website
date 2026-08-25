"use client";

export function SegmentedControl({
  segments,
  value,
  onChange,
}: {
  segments: string[];
  value: string;
  onChange: (segment: string) => void;
}) {
  return (
    <div className="seg" role="tablist" aria-label="Lineup segments">
      {segments.map((seg) => {
        const key = seg.toLowerCase();
        return (
          <button
            key={seg}
            type="button"
            role="tab"
            aria-selected={value === key}
            className={value === key ? "on" : undefined}
            onClick={() => onChange(key)}
          >
            {seg}
          </button>
        );
      })}
    </div>
  );
}
