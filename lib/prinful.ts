// lib/printful.ts
const API_KEY = process.env.PRINTFUL_API_KEY!;
const STORE_BASE_URL = "https://api.printful.com/store/products";
const CATALOG_BASE_URL = "https://api.printful.com/catalog/products";

export async function getProducts() {
  const res = await fetch(STORE_BASE_URL, {
    headers: { Authorization: `Bearer ${API_KEY}` },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Printful error: ${res.status} ${res.statusText}`);
  }

  const { result } = await res.json();
  console.log("Fetched products:", result);
  return result;
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
  console.log("Fetched catalog product:", result);
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
