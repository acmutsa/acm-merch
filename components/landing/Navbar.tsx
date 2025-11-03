"use client";

import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="w-full flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/logo.png"
            alt="ACM Merch Logo"
            width={40}
            height={40}
          />
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="flex gap-2">
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/collections/apparel">Apparel</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/collections/stickers">Stickers</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/collections/misc">Misc</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/collections">Collections</Link>
              </NavigationMenuLink> 
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
