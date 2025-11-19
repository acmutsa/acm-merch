import {cookies} from "next/headers";

const CART_COOKIE = "cart";

export type CartItem = {
    id: string;
    printfulProductID: string;
    printfulVariantID: string;
    stripeProdID: string;
    stripePriceID: number;
    name: string;
    price: number;
    size?: string;
    quantity: number;
};

export function getCartFromCookie(): CartItem[] {
    const raw = cookies().get(CART_COOKIE)?.value;

    if(!raw) {
        return [];
    }

    try {
        return JSON.parse(raw) as CartItem[];
    } catch {
        return [];
    }
}

export function saveCartToCookie(cart: CartItem[]) {
    cookies().set({
        name: CART_COOKIE,
        value: JSON.stringify(cart),
        httpOnly: false,
        path:"/"
    });
}