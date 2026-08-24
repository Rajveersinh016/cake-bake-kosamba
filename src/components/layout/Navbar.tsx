"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ShoppingBag, Search, User, Menu, X, ChevronDown, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchOverlay from "@/components/ui/SearchOverlay";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Custom Cakes", href: "/custom-cake" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Locations", href: "/locations" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { totalItems, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 90,
    width: "100%",
    background: scrolled
      ? "rgba(248, 241, 234, 0.97)"
      : "var(--color-cream)",
    backdropFilter: scrolled ? "blur(12px)" : "none",
    borderBottom: `1px solid ${scrolled ? "var(--color-border)" : "var(--color-border)"}`,
    transition: "all 0.3s ease",
    boxShadow: scrolled ? "var(--shadow-sm)" : "none",
  };

  return (
    <>
      <nav style={navStyle} role="navigation" aria-label="Main navigation">
        <div
          style={{
            maxWidth: "var(--container-max)",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "68px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{ textDecoration: "none", flexShrink: 0 }}
            aria-label="Cake & Bake — The Live Bakery Home"
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: "var(--color-green)",
                  lineHeight: 1,
                  letterSpacing: "0.02em",
                }}
              >
                cake &amp; bake
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.55rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-coral)",
                  marginTop: "2px",
                  fontWeight: 500,
                }}
              >
                The Live Bakery
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div
            className="desktop-nav"
            style={{
              display: "flex",
              gap: "0.1rem",
              alignItems: "center",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: "var(--color-chocolate)",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "var(--radius-sm)",
                  transition: "color var(--transition-base)",
                  letterSpacing: "0.01em",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-green)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-chocolate)")
                }
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
            {/* Order Now — Desktop */}
            <Link
              href="/custom-cake"
              className="order-now-btn"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: "var(--color-green)",
                color: "var(--color-cream)",
                padding: "0.55rem 1.2rem",
                borderRadius: "var(--radius-full)",
                textDecoration: "none",
                transition: "background var(--transition-base)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--color-green-dark)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--color-green)")
              }
            >
              Order Now
            </Link>

            {/* Admin Portal Button */}
            <Link
              href="/admin"
              className="admin-portal-btn"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: "var(--color-cream-dark)",
                color: "var(--color-green)",
                border: "1.5px solid var(--color-green)",
                padding: "0.5rem 0.85rem",
                borderRadius: "var(--radius-full)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                transition: "all var(--transition-fast)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-green)";
                e.currentTarget.style.color = "var(--color-cream)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-cream-dark)";
                e.currentTarget.style.color = "var(--color-green)";
              }}
            >
              <ShieldCheck size={14} /> Admin Portal
            </Link>

            {/* Icon buttons */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              style={iconBtnStyle}
            >
              <Search size={18} />
            </button>
            <Link href="/account" aria-label="Account" style={iconLinkStyle}>
              <User size={18} />
            </Link>
            <button
              onClick={toggleCart}
              aria-label={`Cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
              style={{ ...iconBtnStyle, position: "relative" }}
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-4px",
                    background: "var(--color-coral)",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "16px",
                    height: "16px",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="mobile-hamburger"
              style={iconBtnStyle}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="mobile-menu"
            style={{
              position: "fixed",
              inset: 0,
              top: "calc(68px + 32px)", // nav + announcement bar
              background: "var(--color-cream)",
              zIndex: 88,
              padding: "2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              overflowY: "auto",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.8rem",
                  fontWeight: 500,
                  color: "var(--color-green)",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid var(--color-border)",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ marginTop: "1.5rem" }}>
              <Link
                href="/custom-cake"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: "var(--color-green)",
                  color: "var(--color-cream)",
                  padding: "1rem 2rem",
                  borderRadius: "var(--radius-full)",
                  textDecoration: "none",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Order a Custom Cake
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: "var(--color-cream-dark)",
                  color: "var(--color-green)",
                  border: "1.5px solid var(--color-green)",
                  padding: "0.85rem 2rem",
                  borderRadius: "var(--radius-full)",
                  textDecoration: "none",
                  width: "100%",
                  textAlign: "center",
                  marginTop: "0.75rem",
                  boxSizing: "border-box",
                }}
              >
                <ShieldCheck size={16} /> Admin Portal
              </Link>
            </div>
          </div>
        )}
      </nav>

      <CartDrawer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <style jsx>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .order-now-btn { display: none !important; }
        }
        @media (min-width: 901px) {
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}

const iconBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "var(--color-chocolate)",
  padding: "0.5rem",
  borderRadius: "var(--radius-sm)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "color var(--transition-fast)",
};

const iconLinkStyle: React.CSSProperties = {
  ...iconBtnStyle,
  textDecoration: "none",
};
