import type { ReactNode } from "react";

export function TriadChapter({
  id,
  pillar,
  gloss,
  children,
}: {
  id: string;
  pillar: string;
  gloss: string;
  children: ReactNode;
}) {
  return (
    <section className="triad-chapter" id={id} data-chapter={id}>
      <div className="inner wrap">
        <span className="pillar">{pillar}</span>
        <h2>{gloss}</h2>
        <p>{children}</p>
      </div>
    </section>
  );
}
