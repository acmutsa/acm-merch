import { getProducts } from "@/lib/queries/products";
import { loadSearchParams } from "./search-params";
import type { SearchParams } from "nuqs/server";
import Search from "./search";
import SearchResults from "./search-results";
import { Suspense } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import SearchSidebar from "./search-sidebar";
type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = loadSearchParams(searchParams);

  return (
    <SidebarProvider className="h-screen w-full">
      <SearchSidebar />
      <div className="flex flex-col gap-4 w-full p-4">
        <Search />
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults params={params} />
        </Suspense>
      </div>
    </SidebarProvider>
  );
}
