import { getProducts } from "@/lib/prinful";

export default async function CreateProductPage() {
  const products = await getProducts();
  console.log(products);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">All Products</h1>
      <ul className="space-y-2">
        {products.map((product: { id: number; name: string }) => (
          <li key={product.id}>
            {product.name}
          </li>
        ))}
      </ul>
      {/* rest of your create-form UI */}
    </div>
  );
}