import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { syncVariantToStripe } from "@/lib/sync/stripePrintfulSync";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Your cart items, something like:
    const items = body.items;  
    // items = [{ variantId, quantity }]

    // Build Stripe line_items dynamically
    const lineItems = [];

    for (const item of items) {
      // Fetch Printful variant info
      const variant = await fetchPrintfulVariant(item.variantId);

      // Sync variant to Stripe
      const stripePriceID = await syncVariantToStripe({
        printfulProductId: variant.product_id,
        printfulVariantId: variant.id,
        retailPrice: variant.retail_price
      });

      lineItems.push({
        price: stripePriceID,
        quantity: item.quantity
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US"]
      },
      automatic_tax: {
        enabled: true
      },
      phone_number_collection: {
        enabled: true
      },
      mode: "payment",
      success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cart",
      line_items: lineItems
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Checkout session error" },
      { status: 500 }
    );
  }
}
