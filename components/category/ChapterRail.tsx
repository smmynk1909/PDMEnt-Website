"use client";

export type RailItem = { id: string; label: string };

export function ChapterRail({
  items,
  current,
  onNavigate,
}: {
  items: RailItem[];
  current: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <aside className="rail" id="rail" aria-label="Sections">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          data-id={item.id}
          className={current === item.id ? "cur" : undefined}
          onClick={() => onNavigate(item.id)}
        >
          <i className="dot" />
          {item.label}
        </a>
      ))}
    </aside>
  );
}
