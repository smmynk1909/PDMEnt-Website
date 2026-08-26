"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useOverlay } from "@/lib/ui-store";
import { FAMILIES, getFamilyMeta } from "@/lib/catalog";
import { searchProducts } from "@/lib/search";
import { track } from "@/lib/analytics";

export function SearchOverlay() {
  const open = useOverlay((s) => s.searchOpen);
  const close = useOverlay((s) => s.closeSearch);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      const t = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  const results = searchProducts(q).slice(0, 8);

  return (
    <div className="search-overlay" role="dialog" aria-label="Search">
      <button type="button" className="search-close" onClick={close}>
        Close ✕
      </button>
      <div className="search-box">
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the mill…"
          aria-label="Search products"
          onKeyDown={(e) => {
            if (e.key === "Enter" && q.trim()) {
              track("search_submit", { q, results: results.length });
            }
          }}
        />

        {q.trim() === "" ? (
          <>
            <p className="search-info">Explore a family</p>
            <div className="search-shortcuts">
              {FAMILIES.map((family) => {
                const meta = getFamilyMeta(family);
                if (!meta) return null;
                return (
                  <Link
                    key={family}
                    href={meta.path}
                    className="pill ghost small"
                    onClick={close}
                  >
                    {meta.name}
                  </Link>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="search-results">
              {results.map((p) => (
                <Link
                  key={p.handle}
                  href={`/${p.family}/${p.handle}`}
                  className="search-result"
                  onClick={() => {
                    track("search_click", { handle: p.handle, q });
                    close();
                  }}
                >
                  <span className="tin" style={{ background: p.image.bg }} />
                  <span>
                    <span className="rname">{p.name}</span>
                    <span className="rfam"> · {p.family}</span>
                  </span>
                </Link>
              ))}
            </div>
            <p className="search-info">
              {results.length > 0
                ? `${results.length} result${results.length === 1 ? "" : "s"} in the mill for “${q}”`
                : `Nothing in the mill for “${q}”.`}
            </p>
            {q.trim() && (
              <div className="search-shortcuts">
                <Link
                  href={`/search?q=${encodeURIComponent(q)}`}
                  className="pill small"
                  onClick={close}
                >
                  See all results
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
