"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  const delivery = items.length > 0 ? 60 : 0;
  const total = subtotal + delivery;

  return (
    <div style={{ background: "var(--color-cream)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "var(--color-green)", padding: "2.5rem 0 2rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 500, color: "var(--color-cream)" }}>
          Your Cart
        </h1>
      </div>

      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <ShoppingBag size={48} strokeWidth={1} color="var(--color-muted)" style={{ margin: "0 auto 1rem" }} />
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--color-green)", marginBottom: "0.5rem" }}>Your cart is empty</h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--color-muted)", marginBottom: "2rem" }}>Add some delicious cakes to get started.</p>
            <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", background: "var(--color-green)", color: "var(--color-cream)", padding: "0.85rem 2rem", borderRadius: "var(--radius-full)", textDecoration: "none" }}>
              Browse Cakes <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "2.5rem", alignItems: "start" }} className="cart-layout">
            {/* Items */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--color-green)" }}>{items.length} item{items.length !== 1 ? "s" : ""}</h2>
                <button onClick={clearCart} style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--color-muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Clear All</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      background: "#fff",
                      borderRadius: "var(--radius-lg)",
                      border: "1px solid var(--color-border)",
                      padding: "1rem",
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: "80px", height: "80px", borderRadius: "var(--radius-md)", overflow: "hidden", flexShrink: 0, background: "var(--color-cream-dark)" }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link href={`/shop/${item.slug}`} style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", fontWeight: 500, color: "var(--color-green)", textDecoration: "none" }}>
                        {item.name}
                      </Link>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--color-muted)", marginTop: "0.15rem" }}>
                        {item.size} · {item.eggOption}
                        {item.message && ` · "${item.message}"`}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--color-border)", borderRadius: "var(--radius-full)" }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={qtyBtn}><Minus size={12} /></button>
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.83rem", fontWeight: 600, padding: "0 0.65rem" }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={qtyBtn}><Plus size={12} /></button>
                      </div>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 700, color: "var(--color-green)", minWidth: "70px", textAlign: "right" }}>
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                      <button onClick={() => removeItem(item.id)} aria-label="Remove item" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", display: "flex", alignItems: "center" }}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div style={{ background: "#fff", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "1.5rem", boxShadow: "var(--shadow-sm)" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--color-green)", marginBottom: "1.25rem" }}>Order Summary</h3>
              <SummaryRow label="Subtotal" value={`₹${subtotal.toLocaleString("en-IN")}`} />
              <SummaryRow label="Delivery" value={`₹${delivery}`} />
              <div style={{ borderTop: "1px solid var(--color-border)", margin: "0.75rem 0" }} />
              <SummaryRow label="Total" value={`₹${total.toLocaleString("en-IN")}`} bold />
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-muted)", margin: "0.5rem 0 1.5rem" }}>
                * Delivery charges are indicative. Final charges confirmed at checkout.
              </p>
              <Link
                href="/checkout"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  background: "var(--color-green)",
                  color: "var(--color-cream)",
                  padding: "0.9rem",
                  borderRadius: "var(--radius-full)",
                  textDecoration: "none",
                  marginBottom: "0.75rem",
                }}
              >
                Proceed to Checkout <ArrowRight size={15} />
              </Link>
              <Link href="/shop" style={{ display: "block", textAlign: "center", fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--color-muted)", textDecoration: "none" }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .cart-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.83rem", color: "var(--color-muted)", fontWeight: bold ? 600 : 400 }}>{label}</span>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: bold ? "1rem" : "0.9rem", fontWeight: bold ? 700 : 600, color: bold ? "var(--color-green)" : "var(--color-chocolate)" }}>{value}</span>
    </div>
  );
}

const qtyBtn: React.CSSProperties = {
  width: "30px",
  height: "30px",
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--color-chocolate)",
};
