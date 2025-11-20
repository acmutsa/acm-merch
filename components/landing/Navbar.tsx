"use client";

import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ShoppingCart, Search } from 'lucide-react';
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const isSignedIn = !!session?.user;
  return (
    <header className="border-b relative z-50">

      <div className="w-full flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/logo.png"
            alt="ACM Merch Logo"
            width={40}
            height={40}
          />
        </Link>

        <NavigationMenu viewport={false}>
          <NavigationMenuList className="flex gap-2">
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="font-semibold" href="/collections/apparel">Apparel</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="font-semibold" href="/collections/stickers">Stickers</Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="font-semibold" href="/collections">Collections</Link>
              </NavigationMenuLink> 
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-semibold" >Profile</NavigationMenuTrigger>
                <NavigationMenuContent className="p-2 min-w-[160px]">
                  {isSignedIn ? (
                    <>
                      <NavigationMenuLink asChild>
                        <Link className="font-semibold" href="/account">View Account</Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild className="min-w-[160px]">
                        <button
                          className="w-full text-left px-2 py-1 rounded hover:bg-accent font-semibold"
                          onClick={() => signOut()}
                        >
                          Sign Out
                        </button>
                        </NavigationMenuLink>
                    </>
                  ) : (
                    <>
                      <NavigationMenuLink asChild>
                        <Link href="/sign-in">Sign In</Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="/sign-up">Sign Up</Link>
                      </NavigationMenuLink>
                    </>
                  )}
                </NavigationMenuContent>
              </NavigationMenuItem>
          </NavigationMenuList>
           <NavigationMenuList>
                <Link href="/cart"><ShoppingCart/> </Link>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link className="font-semibold" href="/explore"><Search/></Link>
              </NavigationMenuLink>
              </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
