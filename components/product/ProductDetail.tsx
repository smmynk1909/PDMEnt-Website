"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Product, Review } from "@/types";
import { track } from "@/lib/analytics";
import { LocalNav, type LocalNavLink } from "@/components/nav/LocalNav";
import { DummyBanner } from "@/components/nav/DummyBanner";
import { PdpGallery } from "@/components/product/PdpGallery";
import { BuyRail } from "@/components/product/BuyRail";
import { TriadChapter } from "@/components/product/TriadChapter";
import { SpecTable } from "@/components/product/SpecTable";
import { ReviewSummary } from "@/components/product/ReviewSummary";
import { ReviewList } from "@/components/product/ReviewList";
import { PairingRow } from "@/components/product/PairingRow";

type SortKey = "recent" | "highest" | "lowest";

export function ProductDetail({
  product,
  reviews,
  similar,
  initialSku,
}: {
  product: Product;
  reviews: Review[];
  similar: Product[];
  initialSku: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedSku, setSelectedSku] = useState(initialSku);
  const [sort, setSort] = useState<SortKey>("recent");
  const [withPhotos, setWithPhotos] = useState(false);

  const selectedVariant =
    product.variants.find((v) => v.sku === selectedSku) ?? product.variants[0];

  useEffect(() => {
    track("pdp_view", { handle: product.handle, family: product.family });
  }, [product.handle, product.family]);

  // chapter_view when a triad/reviews chapter is ≥ 50% visible.
  useEffect(() => {
    const ids = ["dakshya", "prateet", "soma", "reviews"];
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const id = entry.target.id;
            if (!seen.has(id)) {
              seen.add(id);
              track("chapter_view", { chapter: id });
            }
          }
        }
      },
      { threshold: [0.5] },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [product.handle]);

  function sizeToken(sku: string): string {
    const v = product.variants.find((x) => x.sku === sku);
    if (!v) return sku;
    if (v.sizeGrams != null) return `${v.sizeGrams}g`;
    if (v.sizeMl != null) return `${v.sizeMl}ml`;
    return v.label.replace(/\s+/g, "");
  }

  function onSelect(sku: string) {
    setSelectedSku(sku);
    track("variant_change", { sku });
    router.replace(`${pathname}?size=${sizeToken(sku)}`, { scroll: false });
  }

  const sortedReviews = useMemo(() => {
    const list = withPhotos ? [] : [...reviews];
    switch (sort) {
      case "highest":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        list.sort((a, b) => a.rating - b.rating);
        break;
      default:
        list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
    return list;
  }, [reviews, sort, withPhotos]);

  const localNavLinks: LocalNavLink[] = [
    { label: "Dakshya", href: "#dakshya" },
    { label: "Prateet", href: "#prateet" },
    { label: "Soma", href: "#soma" },
    { label: "Reviews", href: "#reviews" },
  ];

  function onBuy() {
    document.getElementById("buy")?.scrollIntoView({ block: "center" });
  }

  return (
    <>
      <LocalNav title={product.name} links={localNavLinks} onBuy={onBuy} />
      <DummyBanner />

      <div className="pdp">
        <div className="pdp-top">
          <PdpGallery product={product} />
          <BuyRail
            product={product}
            selectedSku={selectedVariant.sku}
            onSelect={onSelect}
          />
        </div>
      </div>

      <TriadChapter id="dakshya" pillar="Dakshya" gloss="Mastery">
        {product.dakshya}
      </TriadChapter>
      <TriadChapter id="prateet" pillar="Prateet" gloss="Trust">
        {product.prateet}
      </TriadChapter>
      <TriadChapter id="soma" pillar="Soma" gloss="Calm">
        {product.soma}
      </TriadChapter>

      <section className="wrap block" style={{ padding: "56px 24px" }}>
        <h2 className="section-head" style={{ fontSize: 32 }}>
          The details
        </h2>
        <p className="section-sub mono">{product.tastingNotes}</p>
        <SpecTable product={product} variant={selectedVariant} />
      </section>

      <section className="wrap reviews-block" id="reviews">
        <h2 className="section-head" style={{ fontSize: 32 }}>
          Reviews
        </h2>
        <ReviewSummary reviews={reviews} />
        <div className="review-controls">
          <label className="mono" style={{ fontSize: 13 }}>
            Sort:{" "}
            <select
              value={sort}
              onChange={(e) => {
                const next = e.target.value as SortKey;
                setSort(next);
                track("review_sort", { sort: next });
              }}
            >
              <option value="recent">Most recent</option>
              <option value="highest">Highest</option>
              <option value="lowest">Lowest</option>
            </select>
          </label>
          <label className="mono" style={{ fontSize: 13, display: "inline-flex", gap: 6, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={withPhotos}
              onChange={(e) => setWithPhotos(e.target.checked)}
            />
            With photos
          </label>
        </div>
        {withPhotos ? (
          <p className="mono" style={{ color: "var(--rm-ink-soft)" }}>
            No photo reviews on dummy lots yet.
          </p>
        ) : (
          <ReviewList reviews={sortedReviews} />
        )}
      </section>

      {similar.length > 0 ? (
        <section className="wrap block" style={{ padding: "40px 24px 80px" }}>
          <h2 className="section-head" style={{ fontSize: 32 }}>
            Pairs well
          </h2>
          <PairingRow products={similar} />
        </section>
      ) : null}
    </>
  );
}
