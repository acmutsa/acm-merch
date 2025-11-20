// app/favorites/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/components/favorites/FavoritesProvider";

export default function FavoritesPage() {
  const { favorites } = useFavorites(); // [{ id, name, image, price }]

  // guard + stable key generation even if duplicate ids exist
  const items = (favorites ?? []).map((p, idx) => ({
    ...p,
    _key: `${String(p.id)}-${idx}`,
  }));

  return (
    <div className="min-h-[60vh] w-full max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl text-center font-bold text-[#266ae8] mb-6">Favorites</h1>

      {items.length === 0 ? (
        <p className="text-center text-slate-500">You don’t have any favorites yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link
              key={p._key}
              href={`/products/${encodeURIComponent(String(p.id))}`}
              className="block rounded-2xl border border-[#266ae8]/30 hover:shadow-md transition overflow-hidden bg-white"
            >
              <div className="w-full aspect-square bg-white">
                <div className="w-full h-full flex items-center justify-center">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name ?? "Product"}
                      width={600}
                      height={600}
                      className="object-contain w-full h-full"
                      priority={false}
                    />
                  ) : (
                    <span className="text-slate-400">No image</span>
                  )}
                </div>
              </div>

              <div className="p-4">
                <p className="truncate text-slate-800 font-medium">{p.name}</p>
                <p className="text-slate-900 font-semibold mt-1">
                  {typeof p.price === "number" ? `$${p.price.toFixed(2)}` : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
