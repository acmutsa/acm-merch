"use client";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
      <div className="border rounded-md p-4 text-center text-muted-foreground">
        <p>You currently have no items in your cart.</p>
        <Button className="mt-4">Continue Shopping</Button>
      </div>
    </main>
  );
}
