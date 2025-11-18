import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
// this is an example setup DO NOT USE THIS IN PRODUCTION
export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      automatic_tax:{
        enabled: true,
      },
      phone_number_collection:{
        enabled: true,
      },
      mode: "payment",
      success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cart",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Demo Product" },
            unit_amount: 1999
          },
          quantity: 1
        }
      ]
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Checkout session error" }, { status: 500 });
  }
}
