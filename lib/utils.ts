import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product, SyncVariant } from "./types";
import { SearchParams } from "@/app/explore/search-params";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterAndSortProducts(
  products: Product[],
  params: Awaited<SearchParams>
) {
  let filteredProducts;
  if (params.minPrice && params.maxPrice && params.minPrice > params.maxPrice) {
    return [];
  } else {
    filteredProducts = products.filter((product) => {
      return (
        Number(product.sync_variants[0].retail_price.replace("$", "")) <=
          Number(params.maxPrice) &&
        Number(product.sync_variants[0].retail_price.replace("$", "")) >=
          Number(params.minPrice)
      );
    });
  }
  let sortedProducts = filteredProducts;
  if (params.sortBy === "alphabeticalAsc") {
    sortedProducts = filteredProducts.sort((a, b) => {
      return a.sync_product.name.localeCompare(b.sync_product.name);
    });
  } else if (params.sortBy === "alphabeticalDesc") {
    sortedProducts = filteredProducts.sort((a, b) => {
      return b.sync_product.name.localeCompare(a.sync_product.name);
    });
  } else if (params.sortBy === "lowestPrice") {
    sortedProducts = filteredProducts.sort((a, b) => {
      return (
        Number(a.sync_variants[0].retail_price.replace("$", "")) -
        Number(b.sync_variants[0].retail_price.replace("$", ""))
      );
    });
  } else if (params.sortBy === "highestPrice") {
    sortedProducts = filteredProducts.sort((a, b) => {
      return (
        Number(b.sync_variants[0].retail_price.replace("$", "")) -
        Number(a.sync_variants[0].retail_price.replace("$", ""))
      );
    });
  }
  return sortedProducts;
}

export function getMinVariantPrice(variants: SyncVariant[]) {
  return variants.reduce(
    (acc, variant) =>
      acc < Number(variant.retail_price.replace("$", ""))
        ? acc
        : Number(variant.retail_price.replace("$", "")),
    Infinity
  );
}

export function getMaxVariantPrice(variants: SyncVariant[]) {
  return variants.reduce(
    (acc, variant) =>
      acc > Number(variant.retail_price.replace("$", ""))
        ? acc
        : Number(variant.retail_price.replace("$", "")),
    -Infinity
  );
}
