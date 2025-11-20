import { getOrders } from "@/lib/queries/orders";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default async function Page() {
  const orders = await getOrders();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <DataTable columns={columns} data={orders} searchColumn="orderID" />
    </div>
  );
}
