export function RatingStars({
  rating,
  count,
}: {
  rating: number;
  count?: number;
}) {
  const rounded = Math.round(rating);
  const stars = "★★★★★".slice(0, rounded) + "☆☆☆☆☆".slice(0, 5 - rounded);
  return (
    <span
      className="stars"
      aria-label={`${rating.toFixed(1)} out of 5${count != null ? `, ${count} reviews` : ""}`}
    >
      {stars}
      {count != null ? <span className="mono"> ({count})</span> : null}
    </span>
  );
}
