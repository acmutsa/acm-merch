// app/products/[productID]/page.tsx
import { notFound } from "next/navigation";
import ProductView from "./product";
import { fetchProductById, getCatalogProduct } from "@/lib/printful";

type ProductPageProps = {
  params: { productID: string };
};

export default async function Page({ params }: ProductPageProps) {
  // 1) Fetch full store product (variants, pricing, files, etc.)
  const idNum = Number(params.productID);
  if (!Number.isFinite(idNum)) return notFound();

  const detail = await fetchProductById(idNum).catch(() => null);
  if (!detail) return notFound();

  //    Use the first variant's catalog product_id.
  let description: string | null = null;
  try {
    const catalogId =
      detail?.sync_variants?.[0]?.product?.product_id ??
      detail?.sync_variants?.[0]?.product_id;

    if (catalogId) {
      const catalog = await getCatalogProduct(catalogId);
      description =
        catalog?.product?.description ??
        catalog?.description ??
        null;
    }
  } catch {
    // Ignore catalog/description errors – just render without description
    description = null;
  }

  // 3) Render
  return <ProductView product={detail} description={description} />;
}
