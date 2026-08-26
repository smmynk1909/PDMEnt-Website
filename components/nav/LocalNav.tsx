"use client";

export type LocalNavLink = { label: string; href: string };

export function LocalNav({
  title,
  links,
  buyLabel = "Buy",
  onBuy,
}: {
  title: string;
  links: LocalNavLink[];
  buyLabel?: string;
  onBuy: () => void;
}) {
  return (
    <nav className="lnav" aria-label={`${title} sections`}>
      <span className="fam">{title}</span>
      <div className="links">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
      <button type="button" className="pill small" onClick={onBuy}>
        {buyLabel}
      </button>
    </nav>
  );
}
