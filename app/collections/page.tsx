"use client";

import * as React from "react";
import { Card, CardContent } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import CollectionContainer from "@/components/shared/CollectionContainer";


export default function Page() {
  return (
    <>

      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold">Collections</h1>
        <Carousel
        opts={{
            align: "center",
        }}
        className="w-full max-w-sm"
        >
        <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                    </CardContent>
                </Card>
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
      </div>

      <div>
        <h2>Apparel</h2>
        <div className="flex flex-col items-center justify-center gap-12 py-12">
          <CollectionContainer
              title="ACM"
              images={[
                "/assets/logo.png",
                "/assets/logo.png",
                "/assets/logo.png",
                "/assets/logo.png"
              ]}
            />
          
          <CollectionContainer
              title="ACM-W"
              images={[
                "/assets/logo.png",
                "/assets/logo.png",
                "/assets/logo.png",
                "/assets/logo.png"
              ]}
            />
        </div>
      </div>


    </>
  );
}
