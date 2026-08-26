"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FAMILIES, getFamilyMeta, getProductsByFamily } from "@/lib/catalog";
import { useCart, cartCount } from "@/lib/cart";
import { useOverlay } from "@/lib/ui-store";
import type { Family } from "@/types";

export function GlobalNav() {
  const pathname = usePathname();
  const [activeFamily, setActiveFamily] = useState<Family | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openSearch = useOverlay((s) => s.openSearch);
  const openBag = useOverlay((s) => s.openBag);
  const lines = useCart((s) => s.lines);
  const hydrated = useCart((s) => s.hydrated);
  const count = hydrated ? cartCount(lines) : 0;

  const currentFamily = FAMILIES.find((f) => pathname.startsWith(`/${f}`));

  return (
    <header
      className="gnav"
      onMouseLeave={() => setActiveFamily(null)}
    >
      <Link className="wordmark" href="/">
        Roots and Mills
      </Link>

      <nav className="gnav-center" aria-label="Families">
        {FAMILIES.map((family) => {
          const meta = getFamilyMeta(family);
          if (!meta) return null;
          return (
            <Link
              key={family}
              href={meta.path}
              className={currentFamily === family ? "active" : undefined}
              onMouseEnter={() => setActiveFamily(family)}
              onFocus={() => setActiveFamily(family)}
            >
              {meta.name}
            </Link>
          );
        })}
      </nav>

      <div className="gnav-icons">
        <button
          type="button"
          className="icon-btn"
          onClick={openSearch}
          aria-label="Search the mill"
        >
          Search
        </button>
        <button
          type="button"
          className="icon-btn"
          onClick={openBag}
          aria-label={`Bag, ${count} item${count === 1 ? "" : "s"}`}
        >
          Bag <span className="bag-count">{count}</span>
        </button>
        <button
          type="button"
          className="hamburger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {activeFamily ? (
        <MegaMenu
          family={activeFamily}
          onNavigate={() => setActiveFamily(null)}
        />
      ) : null}

      {mobileOpen ? (
        <div className="mobile-menu">
          {FAMILIES.map((family) => {
            const meta = getFamilyMeta(family);
            if (!meta) return null;
            return (
              <Link
                key={family}
                href={meta.path}
                onClick={() => setMobileOpen(false)}
              >
                {meta.name}
              </Link>
            );
          })}
          <Link href="/search" onClick={() => setMobileOpen(false)}>
            Search
          </Link>
        </div>
      ) : null}
    </header>
  );
}

function MegaMenu({
  family,
  onNavigate,
}: {
  family: Family;
  onNavigate: () => void;
}) {
  const meta = getFamilyMeta(family);
  const products = getProductsByFamily(family);
  if (!meta) return null;

  return (
    <div className="mega" role="region" aria-label={`${meta.name} menu`}>
      <div className="col">
        <h4>Explore</h4>
        <Link href={meta.path} className="shop-all" onClick={onNavigate}>
          All {meta.name} →
        </Link>
        <p
          className="mono"
          style={{ marginTop: 10, color: "var(--rm-ink-soft)", fontSize: 13 }}
        >
          {meta.oneLiner}
        </p>
      </div>
      <div className="col">
        <h4>In the lineup</h4>
        {products.slice(0, 6).map((p) => (
          <Link
            key={p.handle}
            href={`/${family}/${p.handle}`}
            onClick={onNavigate}
          >
            {p.name}
          </Link>
        ))}
      </div>
      {products.length > 6 ? (
        <div className="col">
          <h4>And more</h4>
          {products.slice(6, 12).map((p) => (
            <Link
              key={p.handle}
              href={`/${family}/${p.handle}`}
              onClick={onNavigate}
            >
              {p.name}
            </Link>
          ))}
          <Link href={meta.path} className="shop-all" onClick={onNavigate}>
            Shop all →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
