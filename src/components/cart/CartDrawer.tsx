"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

import { useEffect } from "react";

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeCart();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(24,63,58,0.35)",
              zIndex: 300,
              backdropFilter: "blur(3px)",
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(420px, 100vw)",
              background: "#fff",
              zIndex: 301,
              display: "flex",
              flexDirection: "column",
              boxShadow: "var(--shadow-xl)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart"
          >
            {/* Header */}
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShoppingBag size={18} color="var(--color-green)" />
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    color: "var(--color-green)",
                  }}
                >
                  Your Cart
                </span>
                {totalItems > 0 && (
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      color: "var(--color-coral)",
                      background: "rgba(217,122,120,0.1)",
                      padding: "0.1rem 0.5rem",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    {totalItems} item{totalItems !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", display: "flex", alignItems: "center", padding: "0.25rem" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem" }}>
              {items.length === 0 ? (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    color: "var(--color-muted)",
                    textAlign: "center",
                  }}
                >
                  <ShoppingBag size={40} strokeWidth={1} />
                  <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--color-green)" }}>
                    Your cart is empty
                  </p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.83rem" }}>
                    Add some delicious cakes to get started.
                  </p>
                  <button
                    onClick={closeCart}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      background: "var(--color-green)",
                      color: "var(--color-cream)",
                      border: "none",
                      borderRadius: "var(--radius-full)",
                      padding: "0.65rem 1.5rem",
                      cursor: "pointer",
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        gap: "0.85rem",
                        padding: "0.85rem",
                        borderRadius: "var(--radius-md)",
                        background: "var(--color-cream)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <div
                        style={{
                          width: "72px",
                          height: "72px",
                          borderRadius: "var(--radius-sm)",
                          overflow: "hidden",
                          flexShrink: 0,
                          background: "var(--color-cream-dark)",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          loading="lazy"
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", fontWeight: 500, color: "var(--color-green)", marginBottom: "0.15rem" }}>
                          {item.name}
                        </div>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-muted)", marginBottom: "0.5rem" }}>
                          {item.size} · {item.eggOption}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          {/* Qty */}
                          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              style={qtyBtnStyle}
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.83rem", fontWeight: 600, minWidth: "20px", textAlign: "center" }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              style={qtyBtnStyle}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 600, color: "var(--color-green)" }}>
                              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name} from cart`}
                              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", display: "flex", alignItems: "center", transition: "color var(--transition-fast)" }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-error)")}
                              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  borderTop: "1px solid var(--color-border)",
                  flexShrink: 0,
                  background: "#fff",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.83rem", color: "var(--color-muted)" }}>Subtotal</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 600, color: "var(--color-chocolate)" }}>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-muted)", marginBottom: "1rem" }}>
                  Delivery charges calculated at checkout
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    letterSpacing: "0.09em",
                    textTransform: "uppercase",
                    background: "var(--color-green)",
                    color: "var(--color-cream)",
                    borderRadius: "var(--radius-full)",
                    padding: "0.85rem 1.5rem",
                    textAlign: "center",
                    textDecoration: "none",
                    marginBottom: "0.65rem",
                  }}
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={closeCart}
                  style={{
                    display: "block",
                    width: "100%",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    color: "var(--color-muted)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "center",
                    padding: "0.4rem",
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const qtyBtnStyle: React.CSSProperties = {
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  border: "1px solid var(--color-border)",
  background: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--color-chocolate)",
  transition: "all var(--transition-fast)",
};
