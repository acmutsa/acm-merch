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
  let filteredProducts = products;
  if (params.minPrice && params.maxPrice && params.minPrice > params.maxPrice) {
    return [];
  } else {
    filteredProducts = products.filter((product) => {
      return (
        Number(product.syncVariants[0].retail_price.replace("$", "")) <=
          Number(params.maxPrice) &&
        Number(product.syncVariants[0].retail_price.replace("$", "")) >=
          Number(params.minPrice)
      );
    });
  }
  let sortedProducts = filteredProducts;
  if (params.sortBy === "alphabeticalAsc") {
    sortedProducts = filteredProducts.sort((a, b) => {
      return a.syncProduct.name.localeCompare(b.syncProduct.name);
    });
  } else if (params.sortBy === "alphabeticalDesc") {
    sortedProducts = filteredProducts.sort((a, b) => {
      return b.syncProduct.name.localeCompare(a.syncProduct.name);
    });
  } else if (params.sortBy === "lowestPrice") {
    sortedProducts = filteredProducts.sort((a, b) => {
      return (
        Number(a.syncVariants[0].retail_price.replace("$", "")) -
        Number(b.syncVariants[0].retail_price.replace("$", ""))
      );
    });
  } else if (params.sortBy === "highestPrice") {
    sortedProducts = filteredProducts.sort((a, b) => {
      return (
        Number(b.syncVariants[0].retail_price.replace("$", "")) -
        Number(a.syncVariants[0].retail_price.replace("$", ""))
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
