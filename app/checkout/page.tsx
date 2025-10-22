"use client";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
      <div className="border rounded-md p-4 text-center text-muted-foreground">
        <p>Payment integration (Stripe) will appear here.</p>
        <Button className="mt-4">Proceed to Payment</Button>
      </div>
    </main>
  );
}
