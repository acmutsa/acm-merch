const API_KEY = process.env.PRINTFUL_API_KEY;
const BASE_URL = "https://api.printful.com/store/products";
const TURSO_Auth = process.env.TURSO_AUTH_TOKEN;

export async function GET() {
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!res.ok) {
    return new Response(
      JSON.stringify({ error: `Error: ${res.statusText}` }),
      { status: res.status }
    );
  }

  const data = await res.json();
  console.log(data); // Optional for debugging
  return Response.json(data.result);
}
