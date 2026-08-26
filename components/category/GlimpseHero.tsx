export function GlimpseHero({
  familyName,
  sentence,
  tinColors,
}: {
  familyName: string;
  sentence: string;
  tinColors: string[];
}) {
  return (
    <section className="glimpse" id="glimpse" data-chapter="glimpse">
      <div>
        <h1>{familyName}</h1>
        <p className="triad">Dakshya · Prateet · Soma</p>
        <p className="sentence">{sentence}</p>
        <div className="tins" aria-hidden>
          {tinColors.map((c, i) => (
            <div key={i} className="tin" style={{ background: c }} />
          ))}
        </div>
      </div>
    </section>
  );
}
