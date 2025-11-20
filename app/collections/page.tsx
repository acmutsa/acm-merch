import * as React from "react";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
 } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import CollectionContainer from "@/components/shared/CollectionContainer";
import Link from "next/link";
import Image from "next/image";
import { getProductsByCategory } from "@/lib/prinful";


export default async function Page() {
  const apparel = (await getProductsByCategory("apparel")).slice(0, 3);
  const hats =  (await getProductsByCategory("hats")).slice(0, 3);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col items-center justify-center bg-[#266ae8]">
        <h1 className="p-3 text-3xl font-bold text-center text-white">
          Collections
        </h1>
      </div>

      {/* Apparel Section */}
      <div>
        <h2 className="p-3 text-3xl font-bold text-center text-[#266ae8]">Hats</h2>

        <div className="flex flex-row items-center justify-center gap-12 py-10">
          {hats.map((p) => (
            <Card
              key={p.syncProduct.id}
              className="hover:scale-105 transition-transform duration-200 w-72 h-80 border-[#266ae8]"
            >
              <Link
                href={`/products/${p.syncProduct.id}`}
                className="flex flex-col h-full"
              >
                <CardHeader>
                  <CardTitle className="truncate">
                    {p.syncProduct.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                  <Image
                    src={p.syncProduct.thumbnail_url}
                    alt={p.syncProduct.name}
                    width={200}
                    height={200}
                    className="max-h-full max-w-full object-contain"
                  />
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        
      </div>

      {/* Accessories Section */}
      <div>
        <h2 className="p-3 text-3xl font-bold text-center text-[#266ae8]">Apparel</h2>

        <div className="flex flex-row items-center justify-center gap-12 py-10">
          {apparel.map((p) => (
            <Card
              key={p.syncProduct.id}
              className="hover:scale-105 transition-transform duration-200 w-72 h-80 border-[#266ae8]"
            >
              <Link
                href={`/products/${p.syncProduct.id}`}
                className="flex flex-col h-full"
              >
                <CardHeader>
                  <CardTitle className="truncate">
                    {p.syncProduct.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center">
                  <Image
                    src={p.syncProduct.thumbnail_url}
                    alt={p.syncProduct.name}
                    width={200}
                    height={200}
                    className="max-h-full max-w-full object-contain"
                  />
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
