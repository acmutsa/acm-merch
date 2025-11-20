"use client";

import { useFavorites } from "./FavoritesProvider";

export type FavoriteProduct = {
  id: string;
  name: string;
  image: string;
  price: number;
};

export default function FavoriteButton({
  product,
  className,
  label = "Favorite",
}: {
  product: FavoriteProduct;
  className?: string;
  label?: string;
}) {
  const { favorites, toggle } = useFavorites();
  const active = favorites.some((f) => f.id === product.id);

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        toggle(product);
      }}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${
        active
          ? "bg-[#266ae8] text-white border-[#266ae8]"
          : "bg-white text-slate-700 border-slate-300 hover:border-[#266ae8]"
      } ${className ?? ""}`}
    >
      <span>★</span>
      {label}
    </button>
  );
}
