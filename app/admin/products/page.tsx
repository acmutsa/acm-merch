import { getProducts, getCatalogInfoFromStoreProduct } from "@/lib/prinful";
import CatalogDisplay from "@/components/ui/catalog"; // make sure this is a component

export default async function CreateProductPage() {
  const products = await getProducts();

  // Fetch all catalog info BEFORE rendering
  const catalogList = await Promise.all(
    products.map(async (product: any) => {
      const {
        catalog,
        storeProduct,
        storeVariants,
      } = await getCatalogInfoFromStoreProduct(product.id);

      return {
        product,
        catalog,
        storeProduct,
        storeVariants,
      };
    })
  );

  return (
    <div>
      <ul className="space-y-8">
        {catalogList.map(({ product, catalog, storeProduct, storeVariants }) => (
          <li key={product.id}>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <CatalogDisplay
              storeProduct={storeProduct || product}
              storeVariants={storeVariants || []}
              catalog={catalog}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
