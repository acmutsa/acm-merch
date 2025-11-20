import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { resolvePrice, resolvePrimaryImage } from "@/lib/printful";
import type { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "../favorites/FavoriteButton";

export default async function ProductCard({ product }: { product: Product }) {
  const image = resolvePrimaryImage(product);
  const title = product?.sync_product?.name ?? "Untitled";
  const price = resolvePrice(product);

  return (
            <Link
              key={product?.sync_product?.id}
              href={`/products/${product?.sync_product?.id}`}
              className="block rounded-2xl border border-[#266ae8]/50 hover:shadow-md transition-shadow"
            >
              <div className="aspect-square w-full rounded-t-2xl bg-white/40 flex items-center justify-center overflow-clip">
                {image ? (
                  <Image
                    src={image ?? product?.sync_product?.thumbnail_url ?? ""}
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
                    id: String(product?.sync_product?.id),
                    name: title,
                    image: image ?? "",
                    price: price ?? 0,
                  }}
                  label="Favorite"
                />
              </div>
            </Link>
  );
}
