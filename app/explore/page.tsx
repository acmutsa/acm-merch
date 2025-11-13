import { getProducts } from "@/lib/queries/products";

export default async function Page() {
  const products = await getProducts();

  return (
    <div>
      {products.map((product) => (
        <div key={product.productId}>
          <h2>{product.title}</h2>
          <p>{product.sizes.join(", ")}</p>
          <img src={product.mockupUrl} alt={product.title} />
        </div>
      ))}
    </div>
  );
}
