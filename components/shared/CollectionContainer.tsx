"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";

type Item = {
  /** image URL */
  src: string;
  /** optional href to make the box clickable (e.g. /products/123) */
  href?: string;
  /** optional accessible label */
  alt?: string;
};

interface CollectionContainerProps {
  title: string;
  /** legacy: simple image list (no links) */
  images?: string[];
  /** new: preferred way with optional links */
  items?: Item[];
}

export default function CollectionContainer({
  title,
  images,
  items,
}: CollectionContainerProps) {
  // Normalize to items[]
  const data: Item[] =
    items ??
    (images ?? []).map((src) => ({
      src,
      alt: `${title} preview`,
    }));

  return (
    <div className="flex items-center gap-8 py-6 m-4 justify-center">
      <h1 className="text-5xl font-bold text-blue-500 flex-none">{title}</h1>

      <div className="flex-grow flex justify-end">
        <div className="grid grid-cols-4 gap-3">
          {data.slice(0, 4).map((it, i) => {
            const box = (
              <div
                className="relative w-[200px] aspect-square overflow-hidden rounded-md border-2 border-blue-500 transition-transform duration-200 hover:scale-105 bg-white"
              >
                <Image
                  src={it.src}
                  alt={it.alt ?? `${title} preview ${i + 1}`}
                  fill
                  sizes="(min-width:1024px) 200px, 40vw"
                  className="object-cover"
                />
              </div>
            );

            return it.href ? (
              <Link key={`${it.src}-${i}`} href={it.href} className="block">
                {box}
              </Link>
            ) : (
              <div key={`${it.src}-${i}`}>{box}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
