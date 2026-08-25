"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FAMILIES, getFamilyMeta, averageRating } from "@/lib/catalog";
import { searchProducts } from "@/lib/search";
import {
  buildFacets,
  passesFilters,
  sortProducts,
  EMPTY_FILTERS,
  type FacetId,
  type FilterState,
  type SortKey,
} from "@/lib/category-config";
import { FilterBar } from "@/components/category/FilterBar";
import { CatalogCard } from "@/components/category/CatalogCard";
import { track } from "@/lib/analytics";

const POPULAR = ["haldi", "coffee", "khapli", "chai", "oil"];

export function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [filters, setFilters] = useState<FilterState>({ ...EMPTY_FILTERS });
  const [sort, setSort] = useState<SortKey>("featured");

  const base = useMemo(() => searchProducts(q), [q]);
  const facets = useMemo(() => buildFacets(base), [base]);
  const results = useMemo(() => {
    const filtered = base.filter((p) => passesFilters(p, filters));
    return sortProducts(filtered, sort, (h) => averageRating(h));
  }, [base, filters, sort]);

  useEffect(() => {
    if (q) {
      track(base.length === 0 ? "search_zero" : "search_submit", {
        q,
        results: base.length,
      });
    }
  }, [q, base.length]);

  function onToggle(facet: FacetId, value: string) {
    setFilters((prev) => {
      const set = new Set(prev[facet]);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      return { ...prev, [facet]: Array.from(set) };
    });
  }

  if (!q) {
    return (
      <div className="search-page">
        <h1>Search the mill</h1>
        <p className="search-info">Popular dummy queries</p>
        <div className="search-shortcuts">
          {POPULAR.map((term) => (
            <Link key={term} href={`/search?q=${term}`} className="pill ghost small">
              {term}
            </Link>
          ))}
        </div>
        <p className="search-info" style={{ marginTop: 24 }}>
          Or explore a family
        </p>
        <div className="search-shortcuts">
          {FAMILIES.map((family) => {
            const meta = getFamilyMeta(family);
            if (!meta) return null;
            return (
              <Link key={family} href={meta.path} className="pill small">
                {meta.name}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="search-page">
      <h1>“{q}”</h1>
      <p className="search-info" style={{ marginBottom: 16 }}>
        {results.length} result{results.length === 1 ? "" : "s"} in the mill for
        “{q}”
      </p>

      {base.length > 0 ? (
        <FilterBar
          facets={facets}
          filters={filters}
          onToggle={onToggle}
          onClear={() => setFilters({ ...EMPTY_FILTERS })}
          count={results.length}
          unit="results"
          sort={sort}
          onSort={setSort}
          staticBar
        />
      ) : null}

      {results.length === 0 ? (
        <p className="mono" style={{ color: "var(--rm-ink-soft)", marginTop: 24 }}>
          Nothing in the mill for “{q}”.
        </p>
      ) : (
        <div className="grid" style={{ marginTop: 20 }}>
          {results.map((p) => (
            <CatalogCard key={p.handle} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
