import type { Review } from "@/types";
import { RatingStars } from "@/components/ui/RatingStars";

export function ReviewSummary({ reviews }: { reviews: Review[] }) {
  const total = reviews.length;
  const avg = total
    ? reviews.reduce((s, r) => s + r.rating, 0) / total
    : 0;

  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    n: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="review-summary">
      <div>
        <div className="avg-big">{avg.toFixed(1)}</div>
        <RatingStars rating={avg} />
        <p className="mono" style={{ fontSize: 12, color: "var(--rm-ink-soft)", marginTop: 6 }}>
          {total} dummy review{total === 1 ? "" : "s"}
        </p>
      </div>
      <div className="histogram">
        {counts.map(({ star, n }) => (
          <div className="hrow" key={star}>
            <span>{star}★</span>
            <span className="bar">
              <i style={{ width: total ? `${(n / total) * 100}%` : "0%" }} />
            </span>
            <span>{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
