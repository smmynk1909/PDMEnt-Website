import Link from "next/link";
import type { Product } from "@/types";
import { formatInr, fromPrice } from "@/lib/format";

export function PairingRow({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <div className="row">
      {products.map((p) => (
        <Link key={p.handle} href={`/${p.family}/${p.handle}`} className="gcard">
          <div
            className="art"
            style={{ background: `${p.image.bg}22` }}
            aria-hidden
          >
            <span className="tin" style={{ background: p.image.bg }} />
          </div>
          <h3>{p.name}</h3>
          <p className="gmeta">
            {p.oneLiner}
            <br />
            {formatInr(fromPrice(p))}
          </p>
        </Link>
      ))}
    </div>
  );
}
