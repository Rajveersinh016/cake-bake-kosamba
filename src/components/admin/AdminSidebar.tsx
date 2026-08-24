"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Sparkles,
  Cake,
  MapPin,
  Settings,
  Store,
  ExternalLink,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
  { label: "Orders", href: "/admin/orders", icon: <ShoppingBag size={18} />, badge: "3 New" },
  { label: "Custom Cake Requests", href: "/admin/custom-cakes", icon: <Sparkles size={18} />, badge: "2 Pending" },
  { label: "Product Catalog", href: "/admin/products", icon: <Cake size={18} /> },
  { label: "Store Locations", href: "/admin/locations", icon: <MapPin size={18} /> },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <>
      <aside
        className="admin-sidebar"
        style={{
          width: "260px",
          background: "var(--color-green-dark)",
          color: "var(--color-cream)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          borderRight: "1px solid rgba(248,241,234,0.08)",
          zIndex: 150,
        }}
      >
      {/* Brand Header */}
      <div
        style={{
          padding: "1.5rem",
          borderBottom: "1px solid rgba(248,241,234,0.08)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "var(--radius-md)",
            background: "var(--color-coral)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            fontSize: "1.1rem",
          }}
        >
          C&amp;B
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--color-cream)",
              letterSpacing: "0.02em",
            }}
          >
            Cake &amp; Bake
          </div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.68rem",
              color: "var(--color-blush)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Owner Portal
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "1.25rem 0.75rem", flex: 1, overflowY: "auto" }}>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(248,241,234,0.4)",
            padding: "0 0.75rem 0.6rem",
          }}
        >
          Management
        </div>

        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.7rem 0.85rem",
                    borderRadius: "var(--radius-md)",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.83rem",
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#fff" : "rgba(248,241,234,0.72)",
                    background: isActive ? "var(--color-green)" : "transparent",
                    textDecoration: "none",
                    transition: "all var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "rgba(248,241,234,0.06)";
                      e.currentTarget.style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(248,241,234,0.72)";
                    }
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                    <span style={{ color: isActive ? "var(--color-blush)" : "inherit" }}>{item.icon}</span>
                    {item.label}
                  </div>
                  {item.badge && (
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        background: "var(--color-coral)",
                        color: "#fff",
                        padding: "0.15rem 0.45rem",
                        borderRadius: "var(--radius-full)",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Customer Store Quick Link */}
      <div
        style={{
          padding: "1rem 1.25rem",
          borderTop: "1px solid rgba(248,241,234,0.08)",
          background: "rgba(0,0,0,0.15)",
        }}
      >
        <Link
          href="/"
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.6rem 0.85rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(248,241,234,0.15)",
            background: "rgba(248,241,234,0.04)",
            color: "var(--color-cream)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.78rem",
            fontWeight: 500,
            textDecoration: "none",
            transition: "all var(--transition-fast)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(248,241,234,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(248,241,234,0.04)")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Store size={15} color="var(--color-blush)" />
            <span>View Live Store</span>
          </div>
          <ExternalLink size={13} opacity={0.6} />
        </Link>
      </div>

      {/* Owner Badge */}
      <div
        style={{
          padding: "1.25rem",
          borderTop: "1px solid rgba(248,241,234,0.08)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "var(--color-green)",
            border: "1.5px solid var(--color-blush)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "0.85rem",
            color: "#fff",
          }}
        >
          CB
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {user?.name || "Bakery Owner"}
          </div>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", color: "rgba(248,241,234,0.5)" }}>
            5 Outlets Connected
          </div>
        </div>
        <button
          onClick={logout}
          title="Sign Out"
          aria-label="Admin Logout"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-coral)",
            padding: "0.4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "var(--radius-sm)",
            transition: "opacity var(--transition-fast)",
          }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
    <style jsx>{`
      @media (max-width: 1024px) {
        .admin-sidebar {
          display: none !important;
        }
      }
    `}</style>
    </>
  );
}
