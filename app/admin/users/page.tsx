import { getUsers } from "@/lib/queries/users";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default async function Page() {
  const users = await getUsers();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <DataTable columns={columns} data={users} />
    </div>
  );
}