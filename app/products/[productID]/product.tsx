"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import {
  resolvePrimaryImage,
  resolveColours,
  resolveSizes,
  resolvePrice,
} from "@/lib/printful";

type Props = {
  product: any; // Printful detail object { sync_product, sync_variants, ... }
  description?: string | null;
};

export default function ProductView({ product, description }: Props) {
  const title = product?.sync_product?.name ?? "Product";
  const primaryImage = resolvePrimaryImage(product);

  // Choices
  const colours = useMemo(() => resolveColours(product), [product]);
  const allSizes = useMemo(() => resolveSizes(product), [product]);

  const [color, setColor] = useState<string | null>(colours[0] ?? null);
  const availableSizesForColor = useMemo(() => {
    if (!color) return allSizes;
    const set = new Set<string>();
    for (const v of product?.sync_variants ?? []) {
      const vc = String(v?.color ?? v?.product?.color ?? v?.name ?? "").toLowerCase();
      const vs = String(v?.size ?? v?.product?.size ?? v?.size_name ?? "");
      if (vc.includes(String(color).toLowerCase())) set.add(vs);
    }
    return Array.from(set.size ? set : new Set(allSizes));
  }, [product, color, allSizes]);

  const [size, setSize] = useState<string | null>(
    availableSizesForColor?.[0] ?? null
  );

  // Price based on selection (falls back to lowest if no selection)
  const price = useMemo(
    () => resolvePrice(product, { color: color ?? undefined, size: size ?? undefined }),
    [product, color, size]
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Image */}
        <div className="rounded-2xl border border-[#266ae8]/30 p-4 bg-white">
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={title}
              width={1200}
              height={1200}
              className="object-contain w-full h-full"
              priority
            />
          ) : (
            <div className="aspect-square w-full grid place-items-center text-slate-400">
              No Image
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#266ae8] leading-tight">
              {title}
            </h1>

            <FavoriteButton
              product={{
                id: String(product?.sync_product?.id),
                name: title,
                image: primaryImage ?? "",
                price: price ?? 0,
              }}
            />
          </div>

          {/* Price */}
          <div className="text-lg font-semibold">
            {price != null ? `$${price.toFixed(2)}` : "Price unavailable"}
          </div>

          {/* Description (subtext under price) */}
          {description && (
            <div
              className="mt-2 text-sm leading-relaxed text-slate-600/90 prose prose-sm max-w-none
                        [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
                        [&_p]:my-1 [&_li]:my-0.5"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {/* Colours */}
          {colours.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Colours</div>
              <div className="flex flex-wrap gap-2">
                {colours.map((c) => {
                  const active = c === color;
                  return (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setColor(c)}
                      className={`px-3 h-8 rounded-full border text-sm
                        ${active ? "bg-[#266ae8] text-white border-[#266ae8]"
                                 : "border-slate-300 text-slate-700 hover:bg-slate-50"}`}
                      title={c}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sizes */}
          {availableSizesForColor.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Sizes</div>
              <div className="flex flex-wrap gap-2">
                {availableSizesForColor.map((s) => {
                  const active = s === size;
                  return (
                    <button
                      key={s || "one-size"}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSize(s)}
                      className={`px-3 h-8 rounded-full border text-sm
                        ${active ? "bg-[#266ae8] text-white border-[#266ae8]"
                                 : "border-slate-300 text-slate-700 hover:bg-slate-50"}`}
                    >
                      {s || "One size"}
                    </button>
                  );
                })}
              </div>
            </div>
          )}


          {/* Add to cart (wire up when you’re ready) */}
          <button
            type="button"
            disabled={!size}
            className={`inline-flex items-center justify-center h-11 px-5 rounded-xl font-medium transition
              ${size ? "bg-[#266ae8] text-white hover:opacity-90"
                     : "bg-slate-200 text-slate-500 cursor-not-allowed"}`}
            title={size ? "Add to Cart" : "Select a Size"}
          >
            {size ? "Add to Cart" : "Select a Size"}
          </button>
        </div>
      </div>
    </main>
  );
}
