"use client";

import { useEffect } from "react";
import { Gradient } from "@/components/shared/gradient.js";

export default function Hero() {
  useEffect(() => {
    const gradient = new Gradient();
    // @ts-ignore lol
    gradient.initGradient("#gradient-canvas");
  }, []);

  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
        <canvas className="absolute inset-0 w-full h-full " id="gradient-canvas" data-transition-in />
        <div className="relative z-10 flex h-full w-full items-center justify-center">
        <h1 className="text-white text-5xl font-bold font-geistmono text-center leading-tight">
          <span className="block">ACM UTSA</span>
          <span className="block">Merch</span>
        </h1>
      </div>
    </div>
  );
}
