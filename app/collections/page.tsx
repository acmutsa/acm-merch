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


export default function Page() {
  return (
    <>

      <div className="flex flex-col items-center justify-center bg-[#266ae8]">
        <h1 className="p-3 text-3xl font-bold text-center text-white">Collections</h1>
        <Carousel
        opts={{
            align: "center",
            loop: true,
        }}
        className="w-full max-w-4xl"
        >
        <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-9">
                <Card className="hover:scale-105 transition-transform duration-200">
                    <CardContent className="flex items-center justify-center p-6">
                    <span className="font-bold">{index+1}</span>
                    <img src="/assets/logo.png"/>
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

        <h2 className="p-3 text-3xl font-bold text-center">
          <Link href="/collections/apparel" className="block text-[#266ae8] hover:underline underline-offset-4 transition-colors"> Apparel </Link>
        </h2>

        <div className="flex flex-row items-center justify-center gap-12 py-10">

         <Card className="hover:scale-105 transition-transform duration-200 w-72 h-80 border-[#266ae8]">
            <CardHeader>
              <CardTitle>Shoes</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
         </Card>

         <Card className="hover:scale-105 transition-transform duration-200 w-72 h-80 border-[#266ae8]">
            <CardHeader>
              <CardTitle>Shirt</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
         </Card>
         
         <Card className="hover:scale-105 transition-transform duration-200 w-72 h-80 border-[#266ae8]">
            <CardHeader>
              <CardTitle>Service</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
         </Card> 

        </div>

      </div>

      <div>

        <h2 className="p-3 text-3xl font-bold text-center">
          <Link href="/collections/accessories" className="block text-[#266ae8] hover:underline underline-offset-4 transition-colors"> Accessories </Link>
        </h2>

        <div className="flex flex-row items-center justify-center gap-12 py-10">

         <Card className="hover:scale-105 transition-transform duration-200 w-72 h-80 border-[#266ae8]">
            <CardHeader>
              <CardTitle>Hat</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
         </Card>

         <Card className="hover:scale-105 transition-transform duration-200 w-72 h-80 border-[#266ae8]">
            <CardHeader>
              <CardTitle>Belt</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
         </Card>
         
         <Card className="hover:scale-105 transition-transform duration-200 w-72 h-80 border-[#266ae8]">
            <CardHeader>
              <CardTitle>Hydroflask (sksk)</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
         </Card> 

        </div>

      </div>


    </>
  );
}
