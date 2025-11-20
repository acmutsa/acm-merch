import { getProductById } from "./queries/products";
import { Product } from "./types";

// lib/printful.ts
const API_KEY = process.env.PRINTFUL_API_KEY!;
const STORE_BASE_URL = "https://api.printful.com/store/products";
const CATALOG_BASE_URL = "https://api.printful.com/catalog/products";


export interface PrintfulProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
  is_ignored: boolean;
  main_category_id?: number;
}

const COLLECTION_CATEGORY_IDS: Record<string, number[]> = {
  stickers: [202],
  hats: [15, 42, 93],
};

export async function getProducts(): Promise<PrintfulProduct[]> {
  const res = await fetch(STORE_BASE_URL, {
    headers: { Authorization: `Bearer ${API_KEY}` },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Printful error: ${res.status} ${res.statusText}`);
  }

  const { result } = await res.json();
  // console.log("Fetched products:", result);
  return result;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const categoryIds = COLLECTION_CATEGORY_IDS[category.toLowerCase()];

  if (!categoryIds) {
    console.error(`No category ID found for collection: ${category}`);
    return [];
  }

  const allProducts = await getProducts();
  return (await Promise.all(allProducts.map(async (product) => {
    return (await getProductById(product.id))
  }))).filter(
      (product) => {if (categoryIds.includes(product.syncVariants[0].main_category_id)) {
        console.log(product.syncVariants[0].main_category_id);
        return true;
      } else {
        return false;
      }}
    );
}

//Gets catalogue information for a specific product this includes
export async function getCatalogProduct(catalogProductId: number) {
  const res = await fetch(`${CATALOG_BASE_URL}/${catalogProductId}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Printful error: ${res.status} ${res.statusText}`);
  }

  const { result } = await res.json();
  // console.log("Fetched catalog product:", result);
  return result;
}

export async function getProductInfo(storeProductId: number) {
  const res = await fetch(`${STORE_BASE_URL}/${storeProductId}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Printful error: ${res.status} ${res.statusText}`);
  }

  const { result } = await res.json();
  return result;
}

export async function getCatalogInfoFromStoreProduct(storeProductId: number) {
  const syncInfo = await getProductInfo(storeProductId);
  const firstVariant = syncInfo.sync_variants?.[0];

  if (!firstVariant?.product?.product_id) {
    throw new Error("Unable to resolve catalog product for store product");
  }

  const catalogProductId = firstVariant.product.product_id;
  const catalogInfo = await getCatalogProduct(catalogProductId);

  return {
    storeProduct: syncInfo.sync_product,
    storeVariants: syncInfo.sync_variants,
    catalog: catalogInfo,
  };
}
