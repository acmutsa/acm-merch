// lib/printful.ts
const API_KEY = process.env.PRINTFUL_API_KEY!;
const STORE_BASE_URL = "https://api.printful.com/store/products";
const CATALOG_BASE_URL = "https://api.printful.com/catalog/products";

// --- Raw API wrappers --------------------------------------------------------
export async function getProducts() {
  const res = await fetch(STORE_BASE_URL, {
    headers: { Authorization: `Bearer ${API_KEY}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Printful error: ${res.status} ${res.statusText}`);
  const { result } = await res.json();
  return result; // array of { id, external_id, sync_product, ... }
}

export async function getProductInfo(storeProductId: number) {
  const res = await fetch(`${STORE_BASE_URL}/${storeProductId}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Printful error: ${res.status} ${res.statusText}`);
  const { result } = await res.json();
  return result; // { sync_product, sync_variants }
}

export async function getCatalogProduct(catalogProductId: number) {
  const res = await fetch(`${CATALOG_BASE_URL}/${catalogProductId}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Printful error: ${res.status} ${res.statusText}`);
  const { result } = await res.json();
  return result;
}

// --- Helpers used by pages ---------------------------------------------------
export async function fetchAllProducts() {
  // Lightweight listing (no variants or prices)
  return getProducts();
}

export async function fetchProductById(storeProductId: number) {
  // Full details (variants, prices, files)
  return getProductInfo(storeProductId);
}

// Try to pick the best preview image for a product (list or detail)
export function resolvePrimaryImage(p: any): string | null {
  // 1) store-level thumbnail (list & detail both have sync_product)
  const storeThumb = p?.sync_product?.thumbnail_url ?? p?.thumbnail_url;
  if (storeThumb) return storeThumb;

  // 2) first variant preview
  const fromVariant =
    p?.sync_variants?.find?.((v: any) =>
      v?.files?.some?.((f: any) => f?.preview_url)
    )?.files?.find?.((f: any) => f?.preview_url)?.preview_url ??
    p?.sync_variants?.[0]?.files?.[0]?.preview_url ??
    null;

  // 3) catalog (rarely needed)
  const fromCatalog =
    p?.catalog?.product?.images?.[0] ??
    p?.catalog?.product?.image ??
    null;

  return fromVariant ?? fromCatalog ?? null;
}

// Normalize color strings for dedupe/matching
function normColor(s: unknown): string {
  return String(s ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

export function resolveColours(p: any): string[] {
  const fromVariants =
    p?.sync_variants?.map((v: any) => v?.color ?? v?.product?.color ?? v?.name ?? "") ?? [];
  const fromCatalog =
    p?.catalog?.product?.options
      ?.find((o: any) => o?.title?.toLowerCase() === "color" || o?.id?.toLowerCase?.().includes("color"))
      ?.values ?? [];

  // Dedup by normalized value but keep the pretty original
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of [...fromVariants, ...fromCatalog]) {
    const pretty = String(raw ?? "").trim();
    const key = normColor(pretty);
    if (key && !seen.has(key)) {
      seen.add(key);
      out.push(pretty);
    }
  }
  return out;
}

export function resolveSizes(p: any): string[] {
  const fromVariants =
    p?.sync_variants?.map((v: any) => v?.size ?? v?.product?.size ?? v?.size_name ?? "") ?? [];
  const fromCatalog =
    p?.catalog?.product?.options
      ?.find((o: any) => o?.title?.toLowerCase() === "size" || o?.id?.toLowerCase?.().includes("size"))
      ?.values ?? [];
  const all = [...fromVariants, ...fromCatalog]
    .map((s: any) => String(s ?? "").trim())
    .filter(Boolean);

  return Array.from(new Set(all));
}

export function resolvePrice(
  p: any,
  sel?: { color?: string; size?: string }
): number | null {
  const variants: any[] = p?.sync_variants ?? [];

  // 1) Try exact match using color/size if provided
  if (variants.length && (sel?.color || sel?.size)) {
    const c = normColor(sel?.color);
    const s = normColor(sel?.size);
    const match = variants.find((v: any) => {
      const vc = normColor(v?.color ?? v?.product?.color ?? v?.name);
      const vs = normColor(v?.size ?? v?.product?.size ?? v?.size_name);
      const okC = c ? vc.includes(c) : true;
      const okS = s ? vs === s : true;
      return okC && okS;
    });
    const rp = Number(match?.retail_price);
    if (!Number.isNaN(rp)) return rp;
  }

  // 2) Minimum variant price
  if (variants.length) {
    let min = Number.POSITIVE_INFINITY;
    for (const v of variants) {
      const rp = Number(v?.retail_price);
      if (!Number.isNaN(rp)) min = Math.min(min, rp);
    }
    if (Number.isFinite(min)) return min;
  }

  // 3) Fallback to product retail price (some endpoints include it)
  const fallback = Number(p?.sync_product?.retail_price ?? p?.retail_price);
  return Number.isNaN(fallback) ? null : fallback;
}
