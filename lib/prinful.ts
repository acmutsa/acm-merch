// lib/printful.ts
const API_KEY = process.env.PRINTFUL_API_KEY!;
const BASE_URL = "https://api.printful.com/store/products";

export async function getProducts() {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${API_KEY}` },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Printful error: ${res.status} ${res.statusText}`);
  }

  const { result } = await res.json();
  return result;
}