"use client";

import { useState } from "react";
import Image from "next/image";

type ProductType = {
  id: string;
  name: string;
  price: number;
  images: string[];
  sizes: string[];
};

export default function Product({ product }: { product: ProductType }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Basic placeholder shirt colors
  const colors = ["Blue", "Black", "White"];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <main className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-16 py-16 px-4 md:px-8">
        {/* LEFT: PRODUCT IMAGE */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md aspect-square rounded-3xl border-[3px] border-[#266ae8] bg-white flex items-center justify-center shadow-sm">
            {product.images?.length ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                width={400}
                height={400}
                className="object-contain max-h-full max-w-full"
              />
            ) : (
              <span className="text-slate-400 text-lg font-medium">
                Product Image
              </span>
            )}
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="flex-1 flex flex-col gap-8 max-w-md w-full">
          {/* Title + Price */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#266ae8]">
              {product.name}
            </h1>
            <p className="text-xl font-semibold text-slate-800">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* COLOR OPTIONS */}
          <div className="flex flex-col gap-2">
            <p className="font-medium text-slate-700">Colours</p>
            <div className="flex gap-4">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`h-14 w-20 rounded-xl border-2 flex items-center justify-center text-sm font-medium transition ${
                    selectedColor === color
                      ? "border-[#266ae8] text-[#266ae8]"
                      : "border-slate-300 text-slate-700 hover:border-[#266ae8]"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* SIZE OPTIONS */}
          <div className="flex flex-col gap-2">
            <p className="font-medium text-slate-700">Sizes</p>
            <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
              {product.sizes.map((size, idx) => (
                <div key={size} className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedSize(size)}
                    className={`px-1 transition-colors ${
                      selectedSize === size
                        ? "text-[#266ae8] border-b-2 border-[#266ae8]"
                        : "hover:text-[#266ae8]"
                    }`}
                  >
                    {size}
                  </button>
                  {idx !== product.sizes.length - 1 && (
                    <span className="text-slate-300">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ADD TO CART */}
          <button
            disabled={!selectedSize}
            onClick={() =>
              console.log("Added to cart:", {
                id: product.id,
                color: selectedColor,
                size: selectedSize,
              })
            }
            className={`mt-4 w-full md:w-64 py-3.5 rounded-full text-lg font-semibold shadow-md transition ${
              selectedSize
                ? "bg-[#266ae8] text-white hover:bg-[#2057bb]"
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
            }`}
          >
            {selectedSize === null && selectedColor=== null
                ? "Select a Size and Colour"
                : !selectedSize
                ? "Select a Size"
                : !selectedColor
                ? "Select a Colour"
                : "Add to Cart"}          
            </button>
        </div>
      </main>
    </div>
  );
}
