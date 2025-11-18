import { getProductById, getProducts } from "@/lib/queries/products";

import ProductCard from "@/components/shared/ProductCard";
import { Suspense } from "react";
import { filterAndSortProducts } from "@/lib/utils";
import type { SearchParams } from "./search-params";
import { FilterBy, SortBy } from "@/lib/types";
export default async function SearchResults({
  params,
}: {
  params: SearchParams;
}) {
  const { search, filterBy, filterValue, sortBy } = await params;
  const syncProducts = await getProducts(search);

  const products = await Promise.all(
    syncProducts.map(async (syncProduct) => {
      const product = await getProductById(syncProduct.id);
      return product;
    })
  );

  const filteredSortedProducts = filterAndSortProducts(
    products,
    filterBy as FilterBy,
    filterValue as string,
    sortBy as SortBy
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-y-scroll">
      {filteredSortedProducts.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full col-span-full">
          <p className="text-gray-500 text-2xl font-bold">No products found</p>
        </div>
      ) : (
        filteredSortedProducts.map((product) => (
          <ProductCard key={product.syncProduct.id} product={product} />
        ))
      )}
    </div>
  );
}
