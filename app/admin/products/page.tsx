import { getProducts } from "@/lib/prinful";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function CreateProductPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
