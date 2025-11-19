'use server'
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { syncVariantToStripe } from "@/lib/sync/stripePrintfulSync";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { orders, user } from "@/db/schema";
import { headers } from "next/headers";
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
      
    const userSession = await auth.api.getSession({
        headers: await headers()
    });
    const userId = userSession?.user?.id;
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 403 });
    }
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

    // 1. compute total
    const totalAmount = items
      .reduce((sum, item) => sum + Number(item.retailPrice) * item.quantity, 0)
      .toFixed(2);

    // 2. store order in DB
    await db.insert(orders).values({
      orderID: orderId,
      userId,
      cart: items,       // Drizzle will store this as JSON in your blob column
      totalAmount
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Checkout session error" }, { status: 500 });
  }
}

