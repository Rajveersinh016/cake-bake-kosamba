"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Footer from "@/components/layout/Footer";
import ToastContainer from "@/components/ui/ToastContainer";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <>
        <main id="main-content" style={{ minHeight: "100vh" }}>
          {children}
        </main>
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <ToastContainer />
    </>
  );
}
