"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  MapPin,
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
  ShoppingBag,
  Sparkles,
  Cake,
  LogOut,
  Store,
} from "lucide-react";
import { locations } from "@/data/locations";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard size={18} /> },
  { label: "Orders", href: "/admin/orders", icon: <ShoppingBag size={18} />, badge: "3 New" },
  { label: "Custom Cake Requests", href: "/admin/custom-cakes", icon: <Sparkles size={18} />, badge: "2 Pending" },
  { label: "Product Catalog", href: "/admin/products", icon: <Cake size={18} /> },
  { label: "Store Locations", href: "/admin/locations", icon: <MapPin size={18} /> },
];

export default function AdminHeader({ title }: { title: string }) {
  const [selectedBranch, setSelectedBranch] = useState("All Outlets (5)");
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const { logout, user } = useAuth();

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileNavOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [mobileNavOpen]);

  return (
    <>
      <header
        style={{
          height: "70px",
          background: "#fff",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(1rem, 3vw, 2rem)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Title & Mobile Menu Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open Admin Menu"
            className="admin-mobile-menu-btn"
            style={{
              background: "var(--color-cream)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              padding: "0.45rem",
              cursor: "pointer",
              color: "var(--color-green)",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Menu size={20} />
          </button>

          <div>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                fontWeight: 600,
                color: "var(--color-green)",
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                color: "var(--color-muted)",
                margin: 0,
              }}
            >
              Today, {new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Branch Selector */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "var(--color-chocolate)",
                background: "var(--color-cream)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-full)",
                padding: "0.4rem 0.85rem",
                cursor: "pointer",
              }}
            >
              <MapPin size={13} color="var(--color-green)" />
              <span className="branch-label">{selectedBranch}</span>
              <ChevronDown size={13} color="var(--color-muted)" />
            </button>

            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 0.35rem)",
                  right: 0,
                  width: "210px",
                  background: "#fff",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-md)",
                  padding: "0.4rem",
                  zIndex: 200,
                }}
              >
                <button
                  onClick={() => { setSelectedBranch("All Outlets (5)"); setShowDropdown(false); }}
                  style={branchItemStyle(selectedBranch === "All Outlets (5)")}
                >
                  All Outlets (5)
                </button>
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => { setSelectedBranch(loc.name); setShowDropdown(false); }}
                    style={branchItemStyle(selectedBranch === loc.name)}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <button
            aria-label="View notifications"
            style={{
              position: "relative",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "var(--color-cream)",
              border: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-chocolate)",
              cursor: "pointer",
            }}
          >
            <Bell size={16} />
            <span
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--color-coral)",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            display: "flex",
          }}
        >
          <div
            onClick={() => setMobileNavOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(2px)",
            }}
          />
          <div
            style={{
              position: "relative",
              width: "270px",
              background: "var(--color-green-dark)",
              color: "var(--color-cream)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              zIndex: 301,
              padding: "1.25rem",
              boxShadow: "var(--shadow-xl)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid rgba(248,241,234,0.1)", paddingBottom: "1rem" }}>
              <div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 700, color: "var(--color-cream)" }}>Cake &amp; Bake</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", color: "var(--color-blush)" }}>Owner Console</div>
              </div>
              <button onClick={() => setMobileNavOpen(false)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <nav style={{ flex: 1, overflowY: "auto" }}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileNavOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0.75rem 0.9rem",
                          borderRadius: "var(--radius-md)",
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.85rem",
                          fontWeight: active ? 600 : 400,
                          color: active ? "#fff" : "rgba(248,241,234,0.75)",
                          background: active ? "var(--color-green)" : "transparent",
                          textDecoration: "none",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                          <span style={{ color: active ? "var(--color-blush)" : "inherit" }}>{item.icon}</span>
                          {item.label}
                        </div>
                        {item.badge && (
                          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.62rem", fontWeight: 700, background: "var(--color-coral)", color: "#fff", padding: "0.15rem 0.45rem", borderRadius: "var(--radius-full)" }}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div style={{ borderTop: "1px solid rgba(248,241,234,0.1)", paddingTop: "1rem", marginTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "#fff", fontWeight: 600 }}>{user?.name || "Bakery Owner"}</span>
              <button onClick={logout} style={{ background: "none", border: "none", color: "var(--color-coral)", cursor: "pointer" }}>
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 1024px) {
          .admin-mobile-menu-btn {
            display: flex !important;
          }
        }
        @media (max-width: 480px) {
          .branch-label {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

const branchItemStyle = (active: boolean): React.CSSProperties => ({
  display: "block",
  width: "100%",
  textAlign: "left",
  fontFamily: "var(--font-sans)",
  fontSize: "0.78rem",
  fontWeight: active ? 600 : 400,
  padding: "0.45rem 0.75rem",
  borderRadius: "var(--radius-sm)",
  border: "none",
  background: active ? "rgba(24,63,58,0.06)" : "transparent",
  color: active ? "var(--color-green)" : "var(--color-chocolate)",
  cursor: "pointer",
});
