import { getProducts } from "@/lib/queries/products";
import { loadSearchParams } from "./searchParams";
import type { SearchParams } from "nuqs/server";
import Search from "./search";
import SearchResults from "./search-results";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = loadSearchParams(searchParams);

  return (
    <div className="flex flex-col gap-4">
      <Search />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults params={params} />
      </Suspense>
    </div>
  );
}
