import type { Product } from "@/types";
import { LineupCard } from "@/components/category/LineupCard";

export function LineupRow({ products }: { products: Product[] }) {
  return (
    <div className="row" id="lineupRow">
      {products.map((p) => (
        <LineupCard key={p.handle} product={p} />
      ))}
    </div>
  );
}
