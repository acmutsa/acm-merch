import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Suspense } from "react";
import AdminSidebar from "./admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <Suspense fallback={<div>Loading...</div>}>
        <SidebarInset className="h-full">
          <div className="h-full w-full p-4">{children}</div>
        </SidebarInset>
      </Suspense>
    </SidebarProvider>
  );
}
