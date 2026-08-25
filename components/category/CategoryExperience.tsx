"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Family } from "@/types";
import {
  getFamilyMeta,
  getProductsByFamily,
  getLineup,
  getFamilyReviews,
  getProductByHandle,
  averageRating,
} from "@/lib/catalog";
import {
  buildFacets,
  getChapters,
  glimpseSentence,
  matchSegment,
  passesFilters,
  sortProducts,
  EMPTY_FILTERS,
  type FacetId,
  type FilterState,
  type SortKey,
} from "@/lib/category-config";
import { track } from "@/lib/analytics";
import { LocalNav, type LocalNavLink } from "@/components/nav/LocalNav";
import { DummyBanner } from "@/components/nav/DummyBanner";
import { FilterBar } from "@/components/category/FilterBar";
import { SegmentedControl } from "@/components/category/SegmentedControl";
import { ChapterRail, type RailItem } from "@/components/category/ChapterRail";
import { GlimpseHero } from "@/components/category/GlimpseHero";
import { LineupRow } from "@/components/category/LineupRow";
import { Chapter } from "@/components/category/Chapter";
import { EmptySoma } from "@/components/ui/EmptySoma";
import { RatingStars } from "@/components/ui/RatingStars";
import { formatInr, fromPrice } from "@/lib/format";

const FACET_IDS: FacetId[] = ["origin", "form", "heat", "size"];

export function CategoryExperience({ family }: { family: Family }) {
  const meta = getFamilyMeta(family);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const allProducts = useMemo(() => getProductsByFamily(family), [family]);
  const lineupProducts = useMemo(() => getLineup(family), [family]);
  const chapters = useMemo(() => getChapters(family), [family]);
  const facets = useMemo(() => buildFacets(allProducts), [allProducts]);
  const familyReviews = useMemo(() => getFamilyReviews(family), [family]);

  const [filters, setFilters] = useState<FilterState>(() => {
    const parsed: FilterState = { ...EMPTY_FILTERS };
    for (const id of FACET_IDS) {
      const raw = searchParams.get(id);
      if (!raw) continue;
      const valid = new Set(
        facets.find((f) => f.id === id)?.options.map((o) => o.value) ?? [],
      );
      parsed[id] = raw.split(",").filter((v) => valid.has(v));
    }
    return parsed;
  });
  const [sort, setSort] = useState<SortKey>(
    () => (searchParams.get("sort") as SortKey) || "featured",
  );
  const [segment, setSegment] = useState("all");
  const [catalog, setCatalog] = useState(false);
  const [current, setCurrent] = useState("glimpse");
  const [progress, setProgress] = useState(0);
  const firedMode = useRef(false);

  const ratingOf = (handle: string) => averageRating(handle);

  const filtered = useMemo(
    () => allProducts.filter((p) => passesFilters(p, filters)),
    [allProducts, filters],
  );
  const sorted = useMemo(
    () => sortProducts(filtered, sort, ratingOf),
    [filtered, sort],
  );

  const buckets = useMemo(
    () =>
      chapters.map((ch) => ({
        id: ch.id,
        label: ch.label,
        items: sorted.filter(ch.predicate),
      })),
    [chapters, sorted],
  );

  const railItems: RailItem[] = useMemo(() => {
    const base: RailItem[] = [
      { id: "glimpse", label: "Glimpse" },
      { id: "lineup", label: "Lineup" },
    ];
    const chapterItems = buckets
      .filter((b) => b.items.length > 0)
      .map((b) => ({ id: b.id, label: b.label }));
    return [...base, ...chapterItems];
  }, [buckets]);

  const lineupList = useMemo(
    () => lineupProducts.filter((p) => matchSegment(p, segment)).slice(0, 6),
    [lineupProducts, segment],
  );

  const pairingProducts = useMemo(() => {
    const handles = new Set(allProducts.flatMap((p) => p.pairings));
    const out = [];
    const seen = new Set<string>();
    for (const h of handles) {
      const prod = getProductByHandle(h);
      if (prod && prod.family !== family && !seen.has(prod.handle)) {
        seen.add(prod.handle);
        out.push(prod);
      }
      if (out.length >= 4) break;
    }
    return out;
  }, [allProducts, family]);

  // Toggle the mockup's body.catalog class that drives filter bar + rail CSS.
  useEffect(() => {
    document.body.classList.toggle("catalog", catalog);
    return () => document.body.classList.remove("catalog");
  }, [catalog]);

  useEffect(() => {
    track("category_view", { family });
  }, [family]);

  useEffect(() => {
    if (catalog && !firedMode.current) {
      firedMode.current = true;
      track("category_mode_catalog", { family });
    }
  }, [catalog, family]);

  // Scroll + IntersectionObserver state machine — mirrors docs-site/category.html.
  useEffect(() => {
    const lineup = document.getElementById("lineup");
    if (!lineup) return;
    const chapterIds = ["glimpse", "lineup", ...chapters.map((c) => c.id)];

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.id !== "lineup") continue;
          const leavingDown =
            !entry.isIntersecting && entry.boundingClientRect.top < 0;
          const backToGlimpse =
            entry.isIntersecting && window.scrollY < lineup.offsetTop - 80;
          if (leavingDown) setCatalog(true);
          if (backToGlimpse && window.scrollY < 200) setCatalog(false);
        }
      },
      { threshold: 0.08, rootMargin: "-120px 0px 0px 0px" },
    );
    io.observe(lineup);

    const onScroll = () => {
      if (window.scrollY > lineup.offsetTop + lineup.offsetHeight * 0.35) {
        setCatalog(true);
      }
      if (window.scrollY < lineup.offsetTop - 40) {
        setCatalog(false);
      }
      let cur = "glimpse";
      for (const id of chapterIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top < 180) cur = id;
      }
      setCurrent(cur);

      const glimpseEl = document.getElementById("glimpse");
      if (glimpseEl) {
        const h = glimpseEl.offsetHeight || 1;
        setProgress(Math.min(1, Math.max(0, window.scrollY / h)));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [chapters]);

  if (!meta) return null;

  function updateUrl(nextFilters: FilterState, nextSort: SortKey) {
    const params = new URLSearchParams();
    for (const id of FACET_IDS) {
      if (nextFilters[id].length) params.set(id, nextFilters[id].join(","));
    }
    if (nextSort !== "featured") params.set("sort", nextSort);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function onToggle(facet: FacetId, value: string) {
    setFilters((prev) => {
      const set = new Set(prev[facet]);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      const next = { ...prev, [facet]: Array.from(set) };
      updateUrl(next, sort);
      track("filter_apply", { facet, values: next[facet] });
      return next;
    });
  }

  function onClear() {
    const next: FilterState = { ...EMPTY_FILTERS };
    setFilters(next);
    updateUrl(next, sort);
  }

  function onSortChange(next: SortKey) {
    setSort(next);
    updateUrl(filters, next);
    track("sort_change", { sort: next });
  }

  function engageBuy() {
    document.getElementById("lineup")?.scrollIntoView();
    setCatalog(true);
  }

  function onRailNavigate(id: string) {
    if (id !== "glimpse") setCatalog(true);
    track("rail_click", { chapter: id });
  }

  const localNavLinks: LocalNavLink[] = [
    { label: "Explore", href: "#glimpse" },
    ...chapters.map((c) => ({ label: c.label, href: `#${c.id}` })),
  ];

  const unit = family === "masalas" ? "masalas" : `${family} lots`;

  return (
    <>
      <LocalNav title={meta.name} links={localNavLinks} onBuy={engageBuy} />
      <DummyBanner />

      <FilterBar
        facets={facets}
        filters={filters}
        onToggle={onToggle}
        onClear={onClear}
        count={sorted.length}
        unit={unit}
        sort={sort}
        onSort={onSortChange}
      />

      <ChapterRail
        items={railItems}
        current={current}
        onNavigate={onRailNavigate}
      />

      {catalog ? (
        <div
          className="scroll-progress"
          style={{ width: `${progress * 100}%` }}
          aria-hidden
        />
      ) : null}

      <a
        href="#lineup"
        className="skip-link"
        onClick={() => setCatalog(true)}
      >
        Skip to catalog
      </a>

      <GlimpseHero
        familyName={meta.name}
        sentence={glimpseSentence(family)}
        tinColors={lineupProducts.slice(0, 3).map((p) => p.image.bg)}
      />

      <section id="lineup" className="lineup" data-chapter="lineup">
        <h2>Explore the lineup.</h2>
        <p className="triad" style={{ letterSpacing: "0.08em" }}>
          Dummy mill lots — for view, not yet the warehouse.
        </p>
        <SegmentedControl
          segments={meta.lineupSegments}
          value={segment}
          onChange={setSegment}
        />
        <LineupRow products={lineupList} />
      </section>

      <div className="catalog-space">
        {sorted.length === 0 ? (
          <EmptySoma
            message="The mill is quiet under those filters."
            onClear={onClear}
          />
        ) : (
          buckets.map((b) => (
            <Chapter key={b.id} id={b.id} label={b.label} products={b.items} />
          ))
        )}
      </div>

      {familyReviews.length > 0 ? (
        <section className="family-reviews" id="reviews">
          <h2>Voices from the mill</h2>
          <div className="filmstrip">
            {familyReviews.map((r) => (
              <article className="review-card" key={r.id}>
                <div className="stars">{"★".repeat(r.rating)}</div>
                <h4>{r.title}</h4>
                <p>{r.body}</p>
                <p className="who">
                  {r.author} · {r.city}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {pairingProducts.length > 0 ? (
        <section className="pairings-block" id="pairings">
          <h2>Pairs well from the mill</h2>
          <div className="row">
            {pairingProducts.map((p) => (
              <Link
                key={p.handle}
                href={`/${p.family}/${p.handle}`}
                className="gcard"
              >
                <div
                  className="art"
                  style={{ background: `${p.image.bg}22` }}
                  aria-hidden
                >
                  <span className="tin" style={{ background: p.image.bg }} />
                </div>
                <h3>{p.name}</h3>
                <p className="gmeta">
                  {p.family} · {formatInr(fromPrice(p))}
                </p>
                <div style={{ padding: "0 14px 12px" }}>
                  <RatingStars rating={averageRating(p.handle) || 0} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
