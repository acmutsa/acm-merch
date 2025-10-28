"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-4xl font-semibold mb-4">Thank You!</h1>
      <p className="text-muted-foreground mb-6">
        Your order has been received and is being processed.
      </p>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </main>
  );
}
