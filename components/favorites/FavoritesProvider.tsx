"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type FavoriteProduct = {
  id: string;
  name: string;
  image: string;
  price: number;
};

type Ctx = {
  favorites: FavoriteProduct[];
  toggle: (p: FavoriteProduct) => void;
  isFavorite: (id: string) => boolean;
};

const C = createContext<Ctx | null>(null);

const STORAGE_KEY = "acm-merch:favorites:v1";

export default function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const toggle = (p: FavoriteProduct) => {
    setFavorites((prev) => {
      const exists = prev.some((x) => x.id === p.id);
      const next = exists ? prev.filter((x) => x.id !== p.id) : [...prev, p];
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.some((x) => x.id === id);

  const value = useMemo(() => ({ favorites, toggle, isFavorite }), [favorites]);

  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useFavorites() {
  const ctx = useContext(C);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
