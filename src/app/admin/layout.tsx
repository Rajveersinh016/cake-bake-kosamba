import type { Metadata } from "next";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export const metadata: Metadata = {
  title: "Admin Dashboard | Cake & Bake — The Live Bakery",
  description: "Bakery Owner Dashboard for managing orders, custom cake enquiries, product catalog and store locations.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
