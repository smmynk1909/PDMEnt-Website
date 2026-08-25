"use client";

import { useState } from "react";
import type { Facet, FacetId, FilterState, SortKey } from "@/lib/category-config";
import { SORT_OPTIONS } from "@/lib/category-config";

export function FilterBar({
  facets,
  filters,
  onToggle,
  onClear,
  count,
  unit,
  sort,
  onSort,
  staticBar = false,
}: {
  facets: Facet[];
  filters: FilterState;
  onToggle: (facet: FacetId, value: string) => void;
  onClear: () => void;
  count: number;
  unit: string;
  sort: SortKey;
  onSort: (sort: SortKey) => void;
  staticBar?: boolean;
}) {
  const [openFacet, setOpenFacet] = useState<FacetId | null>(null);

  const activeChips: { facet: FacetId; value: string; label: string }[] = [];
  for (const facet of facets) {
    for (const value of filters[facet.id]) {
      const opt = facet.options.find((o) => o.value === value);
      activeChips.push({
        facet: facet.id,
        value,
        label: opt?.label ?? value,
      });
    }
  }

  return (
    <div
      className={staticBar ? "fbar static" : "fbar"}
      id="fbar"
      onMouseLeave={() => setOpenFacet(null)}
    >
      <span className="count">
        {count} {unit}
      </span>

      <div className="facets">
        {facets.map((facet) => {
          const activeCount = filters[facet.id].length;
          return (
            <div className="facet" key={facet.id}>
              <button
                type="button"
                className={activeCount > 0 ? "on" : undefined}
                aria-expanded={openFacet === facet.id}
                onClick={() =>
                  setOpenFacet((cur) => (cur === facet.id ? null : facet.id))
                }
              >
                {facet.label}
                {activeCount > 0 ? ` · ${activeCount}` : ""} ▾
              </button>
              {openFacet === facet.id ? (
                <div className="facet-menu">
                  {facet.options.map((opt) => (
                    <label key={opt.value}>
                      <input
                        type="checkbox"
                        checked={filters[facet.id].includes(opt.value)}
                        onChange={() => onToggle(facet.id, opt.value)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}

        {activeChips.length > 0 ? (
          <div className="chips">
            {activeChips.map((chip) => (
              <button
                type="button"
                className="chip"
                key={`${chip.facet}:${chip.value}`}
                onClick={() => onToggle(chip.facet, chip.value)}
                aria-label={`Remove filter ${chip.label}`}
              >
                {chip.label} <span className="x">×</span>
              </button>
            ))}
            <button type="button" className="chip clear" onClick={onClear}>
              Clear
            </button>
          </div>
        ) : null}
      </div>

      <div className="fbar-right">
        <span className="sort-label">Sort:</span>
        <select
          aria-label="Sort"
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
