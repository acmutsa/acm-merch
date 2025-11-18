// app/products/[productID]/page.tsx

import { notFound } from "next/navigation";
import Product from "./product";

type ProductType = {
  id: string;
  name: string;
  price: number;
  images: string[];
  sizes: string[];
};

type ProductPageProps = {
  params: {
    productID: string; // 👈 matches folder name [productID]
  };
};

// TODO: replace with real DB + Printful integration later
async function getProduct(productId: string): Promise<ProductType | null> {
  const MOCK_PRODUCTS: Record<string, ProductType> = {
    "acm-tee": {
      id: "acm-tee",
      name: "ACM T-Shirt",
      price: 25,
      images: ["/assets/logo.png"],
      sizes: ["Sm", "Md", "Lg", "XL"],
    },
    "acmw-tee": {
      id: "acmw-tee",
      name: "ACM-W T-Shirt",
      price: 28,
      images: ["/assets/logo.png"],
      sizes: ["Sm", "Md", "Lg", "XL"],
    },
  };

  return MOCK_PRODUCTS[productId] ?? null;
}

export default async function Page({ params }: ProductPageProps) {
  const product = await getProduct(params.productID); // 👈 use productID

  if (!product) {
    return notFound();
  }

  return <Product product={product} />;
}
