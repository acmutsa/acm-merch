"use client";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Wishlist</h1>
      <div className="border rounded-md p-4 text-center text-muted-foreground">
        <p>Your wishlist is empty.</p>
        <Button className="mt-4">Browse Products</Button>
      </div>
    </main>
  );
}
