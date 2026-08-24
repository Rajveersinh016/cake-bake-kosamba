"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert, Lock } from "lucide-react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    if (!isAdmin) {
      // Redirect unauthorized user directly to login
      router.replace("/admin/login?unauthorized=true");
    } else {
      setChecking(false);
    }
  }, [isAdmin, isLoginPage, router, pathname]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking || !isAdmin) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-green-dark)",
          color: "var(--color-cream)",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "rgba(217,122,120,0.15)",
            color: "var(--color-coral)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.25rem",
          }}
        >
          <Lock size={28} />
        </div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", marginBottom: "0.5rem" }}>
          Admin Authentication Required
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--color-blush)", maxWidth: "360px" }}>
          Verifying access credentials and security boundaries…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
