// app/products/page.tsx

import Link from "next/link";

const PRODUCTS = [
  { id: "acm-tee", name: "ACM T-Shirt" },
  { id: "acmw-tee", name: "ACM-W T-Shirt" },
];

export default function ProductsIndexPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-6 space-y-6">
      <h1 className="text-3xl font-bold">Products</h1>
      <ul className="space-y-3">
        {PRODUCTS.map((p) => (
          <li key={p.id}>
            <Link
              href={`/products/${p.id}`}
              className="text-primary hover:underline"
            >
              {p.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
