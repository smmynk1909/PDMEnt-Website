import type { Review } from "@/types";

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="mono" style={{ color: "var(--rm-ink-soft)" }}>
        No dummy reviews yet for this lot.
      </p>
    );
  }
  return (
    <div className="review-list">
      {reviews.map((r) => (
        <article className="review-item" key={r.id}>
          <div className="stars">{"★".repeat(r.rating)}</div>
          <h4>{r.title}</h4>
          <p>{r.body}</p>
          <div className="who">
            <span>
              {r.author} · {r.city}
            </span>
            {r.verifiedDummy ? (
              <span className="verified">✓ Verified dummy</span>
            ) : null}
            {r.lot ? <span className="mono">Lot {r.lot}</span> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
