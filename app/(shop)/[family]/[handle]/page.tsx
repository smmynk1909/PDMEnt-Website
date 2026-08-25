import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllProducts,
  getProduct,
  getReviewsFor,
  getProductByHandle,
} from "@/lib/catalog";
import { minPrice } from "@/lib/category-config";
import { ProductDetail } from "@/components/product/ProductDetail";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ family: p.family, handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ family: string; handle: string }>;
}): Promise<Metadata> {
  const { family, handle } = await params;
  const product = getProduct(family, handle);
  if (!product) return { title: "Product" };
  return {
    title: `${product.name}${product.nameGloss ? ` · ${product.nameGloss}` : ""}`,
    description: `${product.oneLiner} Dakshya · Prateet · Soma. Dummy mill lot from Roots and Mills.`,
  };
}

function sizeTokenOf(v: {
  sizeGrams?: number;
  sizeMl?: number;
  label: string;
  sku: string;
}): string {
  if (v.sizeGrams != null) return `${v.sizeGrams}g`;
  if (v.sizeMl != null) return `${v.sizeMl}ml`;
  return v.label.replace(/\s+/g, "");
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ family: string; handle: string }>;
  searchParams: Promise<{ size?: string }>;
}) {
  const { family, handle } = await params;
  const { size } = await searchParams;
  const product = getProduct(family, handle);
  if (!product) notFound();

  const reviews = getReviewsFor(handle);
  const similar = product.pairings
    .map((h) => getProductByHandle(h))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const initialSku =
    (size &&
      product.variants.find((v) => sizeTokenOf(v) === size)?.sku) ||
    product.variants[0].sku;

  const avg =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.oneLiner,
    brand: { "@type": "Brand", name: "Roots and Mills" },
    manufacturer: { "@type": "Organization", name: "PDM Enterprises" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: minPrice(product),
      offerCount: product.variants.length,
      availability: "https://schema.org/PreOrder",
    },
    ...(reviews.length > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: avg.toFixed(1),
            reviewCount: reviews.length,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail
        product={product}
        reviews={reviews}
        similar={similar}
        initialSku={initialSku}
      />
    </>
  );
}
