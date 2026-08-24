import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminGuard from "@/components/admin/AdminGuard";

export const metadata: Metadata = {
  title: "Admin Dashboard | Cake & Bake — The Live Bakery",
  description: "Bakery Owner Dashboard for managing orders, custom cake enquiries, product catalog and store locations.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "var(--color-cream)",
        }}
      >
        <AdminSidebar />
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </div>
      </div>
    </AdminGuard>
  );
}
