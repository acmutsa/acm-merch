import { getProducts } from "@/lib/queries/products";

export default async function SearchResults({
  params,
}: {
  params: Promise<{ search: string }>;
}) {
  const { search } = await params;
  const products = await getProducts(search);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
