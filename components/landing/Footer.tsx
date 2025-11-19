"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="min-h-[375px] w-full items-center justify-center overflow-hidden border-muted-foreground bg-[#266ae8] p-1 py-8 sm:p-8 md:px-10">
      <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 md:justify-items-center lg:grid-cols-5 lg:justify-items-start">
        <div className="col-span-2 row-span-1 flex items-center justify-self-center font-black sm:row-span-3 lg:row-span-1 lg:justify-self-start">
          <Image
            className="w-20 sm:w-28"
            src="/assets/logo.png"
            alt="ACM Logo"
            width={100}
            height={50}
          />
        </div>

        <div className="col-span-2 flex flex-col gap-y-3 justify-self-center lg:col-span-1"></div>
        <div className="col-span-2 flex h-[41px] w-[200px] items-center justify-between gap-2 justify-self-center rounded-lg bg-black px-2 lg:col-span-1 lg:col-start-5">
          <Link href="https://twitter.com/acmutsa/">
            <Twitter className="invert dark:invert-0" />
          </Link>
          <Link href="https://www.instagram.com/acmutsa/">
            <Instagram className="invert dark:invert-0" />
          </Link>
          <Link href="https://www.facebook.com/UTSA.ACM">
            <Facebook className="invert dark:invert-0" />
          </Link>
          <Link href="https://github.com/acmutsa">
            <Github className="invert dark:invert-0" />
          </Link>
          <Link href="https://go.acmutsa.org/discord">
            <Image
              className="select-none"
              src="/assets/discord_icon.svg"
              alt="Discord logo"
              width={20}
              height={20}
            />
          </Link>
        </div>
        <p className="text-white col-span-2 self-center justify-self-center text-center font-mono text-xs sm:col-start-2 md:py-0 lg:col-span-3 lg:col-start-2 lg:row-start-2 lg:w-11/12">
          Made with &lt;/&gt; &amp; ♥ @ ACM UTSA
          <br />© Association of Computing Machinery at UTSA 2025. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}
