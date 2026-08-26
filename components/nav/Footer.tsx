import Link from "next/link";
import { FAMILIES, getFamilyMeta } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="site">
      <div className="brandline">Roots and Mills</div>
      <div className="mono" style={{ fontSize: 13 }}>
        Dakshya · Prateet · Soma · a brand of PDM Enterprises
      </div>
      <div className="footlinks">
        {FAMILIES.map((family) => {
          const meta = getFamilyMeta(family);
          if (!meta) return null;
          return (
            <Link key={family} href={meta.path}>
              {meta.name}
            </Link>
          );
        })}
        <Link href="/search">Search</Link>
        <Link href="/checkout">Bag</Link>
      </div>
      <p className="disclaimer">
        Dummy mill lots for website view. Not for sale until live FSSAI and
        harvest fields exist. PDM Enterprises is the seller of record.
      </p>
    </footer>
  );
}
