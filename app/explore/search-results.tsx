import { getProducts } from "@/lib/queries/products";

import ProductCard from "@/components/shared/ProductCard";
import Image from "next/image";
import { Suspense } from "react";
export default async function SearchResults({
  params,
}: {
  params: Promise<{ search: string }>;
}) {
  const { search } = await params;
  const syncProducts = await getProducts(search);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {syncProducts.map((syncProduct) => (
        <Suspense key={syncProduct.id}>
          <ProductCard syncProduct={syncProduct} />
        </Suspense>
      ))}
    </div>
  );
}
