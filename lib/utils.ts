import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FilterBy, Product, SortBy } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterAndSortProducts(
  products: Product[],
  filterBy: FilterBy,
  filterValue: string,
  sortBy: SortBy
) {
  let filteredProducts = products;
  if (filterBy !== "all") {
    filteredProducts = products.filter((product) => {
      if (filterBy === "price") {
        return product.syncVariants.some(
          (variant) => variant.retail_price < filterValue
        );
      }
    });
  }

  let sortedProducts = filteredProducts;
  if (sortBy === "alphabeticalAsc") {
    sortedProducts = filteredProducts.sort((a, b) => {
      return a.syncProduct.name.localeCompare(b.syncProduct.name);
    });
  } else if (sortBy === "alphabeticalDesc") {
    sortedProducts = filteredProducts.sort((a, b) => {
      return b.syncProduct.name.localeCompare(a.syncProduct.name);
    });
  } else if (sortBy === "lowestPrice") {
    sortedProducts = filteredProducts.sort((a, b) => {
      return (
        Number(a.syncVariants[0].retail_price) -
        Number(b.syncVariants[0].retail_price)
      );
    });
  } else if (sortBy === "highestPrice") {
    sortedProducts = filteredProducts.sort((a, b) => {
      return (
        Number(b.syncVariants[0].retail_price) -
        Number(a.syncVariants[0].retail_price)
      );
    });
  }
  return sortedProducts;
}
