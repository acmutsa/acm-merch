// app/products/page.tsx
import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import {
  fetchAllProducts,
  fetchProductById,
  resolvePrimaryImage,
  resolvePrice,
} from "@/lib/printful";
import ProductCard from "@/components/shared/ProductCard";

export default async function ProductsIndexPage() {
  // Step 1: get lightweight list
  const list = await fetchAllProducts();

  // Step 2: hydrate with details (needed for prices & better images)
  const details = await Promise.all(
    list.map(async (item: any) => {
      try {
        const full = await fetchProductById(item.id);
        return full ?? item;
      } catch {
        console.log("Failed to fetch product details for", item.id);
        return item;
      }
    })
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-[#266ae8] text-center mb-10">
        Products
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {details.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
