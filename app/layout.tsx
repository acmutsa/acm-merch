import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import FavoritesProvider from "@/components/favorites/FavoritesProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ACM Merch Store",
  description: "The Print On Demand e-store for UTSA's largest student ran tech organization.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <NuqsAdapter>
          <FavoritesProvider>
            <Navbar />
            <main className="">{children}</main>
            <Footer />
          </FavoritesProvider>
        </NuqsAdapter>
        <Toaster />
      </body>
    </html>
  );
}