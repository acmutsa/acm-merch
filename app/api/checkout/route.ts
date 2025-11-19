import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { syncVariantToStripe } from "@/lib/sync/stripePrintfulSync";

function generatePrintfulOrderId() {

  const length = 9 + Math.floor(Math.random() * 3); 
  let id = "";
  for (let i = 0; i < length; i++) {
    const digit = Math.floor(Math.random() * 10);
    id += digit.toString();
  }
  return "ACM-" + id;
}


export async function POST(req: Request) {
  try {
    const { items } = await req.json();
    const line_items = [];

    for (const item of items) {
      const stripePriceID = await syncVariantToStripe({
        printfulProductId: String(item.printfulProductId),
        printfulVariantId: String(item.printfulVariantId),
        retailPrice: String(item.retailPrice),
        name: String(item.name)
      });

      line_items.push({
        price: stripePriceID,
        quantity: item.quantity,
      });
    }

    const orderId = generatePrintfulOrderId();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      payment_intent_data: {
        metadata: { orderId }
      },
      shipping_address_collection: { allowed_countries: ["US"] },
      automatic_tax: { enabled: true },
      phone_number_collection: { enabled: true },
      success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cart"
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Checkout session error" }, { status: 500 });
  }
}

