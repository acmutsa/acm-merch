import type { SyncProduct, Product } from "../types";
const BASE_URL = "https://api.printful.com";

export async function getProducts(search: string): Promise<SyncProduct[]> {
  const params = new URLSearchParams();
  const response = await fetch(`${BASE_URL}/store/products?${params}`, {
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

  const productList: SyncProduct[] = data.result?.map(
    (product: any): SyncProduct => ({
      id: product.id,
      externalId: product.external_id,
      name: product.name,
      variants: product.variants,
      thumbnailUrl: product.thumbnail_url,
      isIgnored: product.is_ignored,
    })
  );

  return productList.filter((product: SyncProduct) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
}

export async function getProductById(productId: number): Promise<Product> {
  const params = new URLSearchParams();
  const response = await fetch(
    `${BASE_URL}/store/products/${productId}?${params}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      },
    }
  );
  if (!response.ok) {
    console.log(await response.json());
    throw new Error(`Error fetching products: ${response.statusText}`);
  }
  const data = await response.json();
  return {
    syncProduct: data.result.sync_product,
    syncVariants: data.result.sync_variants,
  };
}
