import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getProductById } from "@/lib/queries/products";
import type { Product, SyncProduct } from "@/lib/types";
import Image from "next/image";

export default async function ProductCard({
  syncProduct,
}: {
  syncProduct: SyncProduct;
}) {
  const product: Product = await getProductById(syncProduct.id);
  console.log(product);

  return (
    <Card key={syncProduct.id} className="border-blue-500 border-2">
      <CardContent className="relative transition-transform duration-200 hover:scale-105 w-full">
        <Image
          src={syncProduct.thumbnailUrl}
          alt={syncProduct.name}
          width={100}
          height={100}
          className="object-cover border-blue-400 aspect-square mx-auto"
        />
      </CardContent>
      <CardHeader>
        <CardTitle>{syncProduct.name}</CardTitle>
        <CardDescription>{syncProduct.variants} variants</CardDescription>
      </CardHeader>
    </Card>
  );
}
