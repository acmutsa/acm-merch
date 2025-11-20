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
        {details.map((p: any) => {
          const image = resolvePrimaryImage(p);
          const title = p?.sync_product?.name ?? p?.name ?? "Untitled";
          const price = resolvePrice(p);

          return (
            <Link
              key={p?.sync_product?.id ?? p?.id}
              href={`/products/${p?.sync_product?.id ?? p?.id}`}
              className="block rounded-2xl border border-[#266ae8]/30 hover:shadow-md transition overflow-hidden"
            >
              <div className="aspect-square w-full bg-white/40 flex items-center justify-center">
                {image ? (
                  <Image
                    src={image}
                    alt={title}
                    width={600}
                    height={600}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <span className="text-slate-400">No Image</span>
                )}
              </div>

              <div className="p-4 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {title}
                  </p>
                  <p className="text-sm text-slate-700">
                    {price != null ? `$${price.toFixed(2)}` : "—"}
                  </p>
                </div>

                <FavoriteButton
                  product={{
                    id: String(p?.sync_product?.id ?? p?.id),
                    name: title,
                    image: image ?? "",
                    price: price ?? 0,
                  }}
                  label="Favorite"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
