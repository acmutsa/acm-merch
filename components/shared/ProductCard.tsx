import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getProductById } from "@/lib/queries/products";
import type { Product, SyncProduct } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default async function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.syncProduct.id}`}
      className="hover:scale-105 transition-transform duration-200"
    >
      <Card key={product.syncProduct.id} className="border-blue-500 border-2">
        <CardContent className="relative transition-transform duration-200 hover:scale-105">
          <Image
            src={product.syncProduct.thumbnail_url}
            alt={product.syncProduct.name}
            width={100}
            height={100}
            className="object-contain border-blue-400 mx-auto"
          />
        </CardContent>
        <CardFooter className="block gap-2">
          <CardTitle className="">{product.syncProduct.name}</CardTitle>
          <div className="flex items-center justify-between gap-0.5">
            <p>${product.syncVariants[0].retail_price}</p>
            <p className="text-sm text-gray-500">
              {product.syncProduct.variants} options
            </p>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
