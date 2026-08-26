// A dummy product "still life": a soft tinted field with a coloured tin.
// Colours come from the catalog image.bg / image.accent fields.

export function TinArt({
  bg,
  className = "art",
  showDots,
  dotColors,
  ariaHidden = true,
}: {
  bg: string;
  className?: string;
  showDots?: boolean;
  dotColors?: string[];
  ariaHidden?: boolean;
}) {
  return (
    <div
      className={className}
      style={{ background: `${bg}22` }}
      aria-hidden={ariaHidden}
    >
      <div className="tin" style={{ background: bg }} />
      {showDots && dotColors && dotColors.length > 0 ? (
        <div className="dots">
          {dotColors.map((c, i) => (
            <i key={i} style={{ background: c }} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
