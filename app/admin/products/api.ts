const API_KEY = process.env.PRINTFUL_API_KEY;
const BASE_URL = "https://api.printful.com/store/products";
const TURSO_Auth = process.env.TURSO_AUTH_TOKEN;


export async function getProducts(){
  const response = await fetch(`${BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${TURSO_Auth}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching products: ${response.statusText}`);
  }
  const data = await response.json();
  console.log(data);
  return data.result;
}