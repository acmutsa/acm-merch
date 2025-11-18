const BASE_URL = "https://api.printful.com/store/products";

export async function getProducts(search: string): Promise<Product[]> {
  const params = new URLSearchParams();
  const response = await fetch(`${BASE_URL}?${params}`, {
    headers: {
      Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
    },
  });
  if (!response.ok) {
    console.log(await response.json());
    throw new Error(`Error fetching products: ${response.statusText}`);
  }
  const data = await response.json();
  console.log(data);

  const productList: Product[] = data.result?.map(
    (product: any): Product => ({
      id: product.id,
      externalId: product.external_id,
      name: product.name,
      variants: product.variants,
      thumbnailUrl: product.thumbnail_url,
      isIgnored: product.is_ignored,
    })
  );

  return productList.filter((product: Product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
}
