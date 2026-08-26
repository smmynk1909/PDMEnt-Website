import type { Product } from "@/types";
import { CatalogCard } from "@/components/category/CatalogCard";

export function Chapter({
  id,
  label,
  products,
}: {
  id: string;
  label: string;
  products: Product[];
}) {
  if (products.length === 0) return null;
  return (
    <section className="chapter" id={id} data-chapter={id}>
      <h2>{label}</h2>
      <div className="grid" data-grid={id}>
        {products.map((p) => (
          <CatalogCard key={p.handle} product={p} />
        ))}
      </div>
    </section>
  );
}
