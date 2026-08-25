import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchResults } from "@/components/search/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Roots and Mills dummy catalog.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="search-page" aria-busy />}>
      <SearchResults />
    </Suspense>
  );
}
