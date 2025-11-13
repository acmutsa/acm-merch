const BASE_URL = "https://api.printful.com/product-templates";

export async function getProducts(search: string): Promise<Product[]> {
  const params = new URLSearchParams();
  const response = await fetch(`${BASE_URL}?${params}`, {
    headers: {
      Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      "X-PF-Store-ID": "ACM's Store",
    },
  });
  if (!response.ok) {
    console.log(await response.json());
    throw new Error(`Error fetching products: ${response.statusText}`);
  }
  const data = await response.json();

  return data.result?.items
    ?.map((product: any) => ({
      productId: product.id,
      title: product.title,
      sizes: product.sizes,
      mockupUrl: product.mockup_file_url,
    }))
    .filter((product: Product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
}
