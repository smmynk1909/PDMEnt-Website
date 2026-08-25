import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { FAMILIES, getFamilyMeta, isFamily } from "@/lib/catalog";
import { CategoryExperience } from "@/components/category/CategoryExperience";

export function generateStaticParams() {
  return FAMILIES.map((family) => ({ family }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ family: string }>;
}): Promise<Metadata> {
  const { family } = await params;
  const meta = getFamilyMeta(family);
  if (!meta) return { title: "Shop" };
  return {
    title: meta.name,
    description: `${meta.oneLiner} Dummy mill lots from Roots and Mills, a brand of PDM Enterprises.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ family: string }>;
}) {
  const { family } = await params;
  if (!isFamily(family)) notFound();
  return (
    <Suspense fallback={<div className="glimpse" aria-busy />}>
      <CategoryExperience family={family} />
    </Suspense>
  );
}
