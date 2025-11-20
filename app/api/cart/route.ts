import {NextResponse} from "next/server";
import {
    CartItem,
    getCartFromCookie,
    saveCartToCookie,
} from "@/lib/cart-cookies";

export async function GET() {
    const cart = getCartFromCookie();
    return NextResponse.json(cart);
}

export async function POST(req:Request) {
    const body = (await req.json()) as { id: string; productName: string; price: number; size?: string; quantity?: number; imageURL:string; };
    const qty = body.quantity ?? 1;

    let cart = getCartFromCookie();
    const index = cart.findIndex((item) => item.id === body.id && item.size === body.size);

    if (index >= 0) {
        const existing = cart[index];
        const newQty = existing.quantity + qty;
        const updated: CartItem = {
            ...existing,
            quantity: newQty,
        };
        cart[index] = updated;
    } else {
        const newItem: CartItem = {
            id: body.id,
            printfulProductID: body.id,
            printfulVariantID: body.id,
            stripeProdID: body.id,
            stripePriceID: body.id,
            name: body.productName,
            price: body.price,
            size: body.size,
            quantity: qty,
            image:body.imageURL,
        };
        cart.push(newItem);
    }

    saveCartToCookie(cart);
    return NextResponse.json(cart, {status: 200});
}

export async function PUT(req: Request) {
    const body = (await req.json() as { id: string; size?: string; quantity: number; });

    let cart = getCartFromCookie();

    if (body.quantity <= 0) {
        cart = cart.filter(
            (item) => !(item.id === body.id && item.size === body.size)
          );
          saveCartToCookie(cart);
          return NextResponse.json(cart, { status: 200 });
    }
    cart = cart.map((item) =>
        item.id === body.id && item.size === body.size
          ? { ...item, quantity: body.quantity }
          : item
      );
    
      saveCartToCookie(cart);
      return NextResponse.json(cart, { status: 200 });    
}

export async function DELETE(req: Request) {
    const body = (await req.json()) as {
      id: string;
      size?: string;
    };
  
    let cart = getCartFromCookie();
    cart = cart.filter(
      (item) => !(item.id === body.id && item.size === body.size)
    );
  
    saveCartToCookie(cart);
    return NextResponse.json(cart, { status: 200 });
}