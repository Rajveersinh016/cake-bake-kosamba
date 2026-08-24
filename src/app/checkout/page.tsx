"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, CreditCard, Smartphone, Building } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { isValidIndianPhone, getMinDeliveryDate } from "@/lib/pricing";

const steps = ["Customer Details", "Delivery / Pickup", "Payment", "Confirmation"];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", deliveryType: "pickup", paymentMethod: "upi", date: "", time: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const update = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validateCurrentStep = () => {
    const errs: Record<string, string> = {};
    if (step === 0) {
      if (!form.name.trim()) errs.name = "Full name is required.";
      if (!form.phone.trim()) {
        errs.phone = "Phone number is required.";
      } else if (!isValidIndianPhone(form.phone)) {
        errs.phone = "Valid 10-digit mobile number required.";
      }
      if (!form.email.trim() || !form.email.includes("@")) errs.email = "Valid email required.";
    }
    if (step === 1) {
      if (form.deliveryType === "delivery" && !form.address.trim()) {
        errs.address = "Delivery address is required.";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setStep((s) => Math.min(2, s + 1));
    }
  };

  const handlePlaceOrder = () => {
    if (!validateCurrentStep()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      setConfirmed(true);
    }, 1200);
  };

  const delivery = form.deliveryType === "delivery" ? 60 : 0;
  const total = subtotal + delivery;

  if (confirmed) {
    return (
      <div style={{ background: "var(--color-cream)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ background: "#fff", borderRadius: "var(--radius-xl)", padding: "3rem", maxWidth: "480px", width: "100%", textAlign: "center", boxShadow: "var(--shadow-lg)" }}>
          <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(24,63,58,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <CheckCircle size={36} color="var(--color-green)" />
          </div>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", fontWeight: 500, color: "var(--color-green)", marginBottom: "0.75rem" }}>Order Placed! 🎂</h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--color-chocolate-light)", lineHeight: 1.7, marginBottom: "2rem" }}>
            Thank you, {form.name || "valued customer"}! Your order has been received. We&apos;ll confirm it via your phone number shortly.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-muted)", marginBottom: "1.5rem" }}>
            Demo order — not a real transaction.
          </p>
          <a href="/" style={{ display: "inline-flex", alignItems: "center", fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", background: "var(--color-green)", color: "var(--color-cream)", padding: "0.85rem 2rem", borderRadius: "var(--radius-full)", textDecoration: "none" }}>
            Back to Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--color-cream)", minHeight: "100vh" }}>
      <div style={{ background: "var(--color-green)", padding: "2.5rem 0 2rem", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 500, color: "var(--color-cream)" }}>Checkout</h1>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        {/* Step progress */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.25rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: i <= step ? 600 : 400, color: i <= step ? "var(--color-green)" : "var(--color-muted)", padding: "0.25rem 0.5rem", background: i === step ? "rgba(24,63,58,0.08)" : "transparent", borderRadius: "var(--radius-full)" }}>
                {s}
              </span>
              {i < steps.length - 1 && <span style={{ color: "var(--color-border-dark)", fontSize: "0.75rem" }}>›</span>}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "2rem" }} className="checkout-grid">
          {/* Main */}
          <div style={{ background: "#fff", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "2rem" }}>
            {step === 0 && (
              <div>
                <h2 style={sh}>Customer Details</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <Field label="Full Name *" error={errors.name}><input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" style={inp} /></Field>
                  <Field label="Mobile Number *" error={errors.phone}><input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="9876543210" type="tel" style={inp} /></Field>
                  <Field label="Email *" error={errors.email}><input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="your@email.com" type="email" style={inp} /></Field>
                </div>
              </div>
            )}
            {step === 1 && (
              <div>
                <h2 style={sh}>Delivery / Pickup</h2>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
                  {["pickup", "delivery"].map((opt) => (
                    <button key={opt} onClick={() => update("deliveryType", opt)} style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 500, padding: "0.5rem 1.25rem", borderRadius: "var(--radius-full)", border: `1.5px solid ${form.deliveryType === opt ? "var(--color-green)" : "var(--color-border)"}`, background: form.deliveryType === opt ? "var(--color-green)" : "transparent", color: form.deliveryType === opt ? "var(--color-cream)" : "var(--color-chocolate)", cursor: "pointer", minHeight: "40px" }}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </button>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <Field label="Preferred Date"><input value={form.date} onChange={(e) => update("date", e.target.value)} type="date" min={getMinDeliveryDate(0)} style={inp} /></Field>
                  <Field label="Preferred Time"><input value={form.time} onChange={(e) => update("time", e.target.value)} type="time" style={inp} /></Field>
                </div>
                {form.deliveryType === "delivery" && (
                  <Field label="Delivery Address *" error={errors.address}><textarea value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Full delivery address" rows={3} style={{ ...inp, resize: "vertical" }} /></Field>
                )}
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 style={sh}>Payment</h2>
                <div style={{ background: "rgba(217,122,120,0.08)", border: "1.5px solid var(--color-coral)", borderRadius: "var(--radius-md)", padding: "0.75rem 1rem", marginBottom: "1.5rem" }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--color-coral)", fontWeight: 600 }}>⚠️ Demo Mode — No real payment processed</p>
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--color-muted)", marginBottom: "1rem" }}>Select a payment method:</p>
                {[
                  { id: "upi", label: "UPI", icon: <Smartphone size={18} /> },
                  { id: "card", label: "Credit / Debit Card", icon: <CreditCard size={18} /> },
                  { id: "netbanking", label: "Net Banking", icon: <Building size={18} /> },
                ].map((m) => (
                  <button key={m.id} onClick={() => update("paymentMethod", m.id)} style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "100%", padding: "0.85rem 1rem", border: `1.5px solid ${form.paymentMethod === m.id ? "var(--color-green)" : "var(--color-border)"}`, borderRadius: "var(--radius-md)", background: form.paymentMethod === m.id ? "rgba(24,63,58,0.04)" : "#fff", cursor: "pointer", marginBottom: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--color-chocolate)", textAlign: "left", transition: "all var(--transition-fast)" }}>
                    <span style={{ color: form.paymentMethod === m.id ? "var(--color-green)" : "var(--color-muted)" }}>{m.icon}</span>
                    {m.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div style={{ background: "#fff", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "1.5rem", height: "fit-content" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", color: "var(--color-green)", marginBottom: "1rem" }}>Order Summary</h3>
            {items.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-sm)", overflow: "hidden", flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 500, color: "var(--color-chocolate)" }}>{item.name}</p>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-muted)" }}>Qty {item.quantity} · {item.size}</p>
                </div>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "0.75rem", marginTop: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--color-muted)" }}>Subtotal</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", fontWeight: 600 }}>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--color-muted)" }}>Delivery</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem" }}>₹{delivery}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--color-border)", paddingTop: "0.5rem", marginTop: "0.5rem" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 700, color: "var(--color-green)" }}>Total</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 700, color: "var(--color-green)" }}>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", background: "transparent", color: "var(--color-chocolate)", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-full)", padding: "0.75rem 1.5rem", cursor: step === 0 ? "not-allowed" : "pointer", opacity: step === 0 ? 0.4 : 1, minHeight: "44px" }}>
            Back
          </button>
          {step < 2 ? (
            <button onClick={handleNextStep} style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", background: "var(--color-green)", color: "var(--color-cream)", border: "none", borderRadius: "var(--radius-full)", padding: "0.75rem 1.75rem", cursor: "pointer", minHeight: "44px" }}>
              Continue
            </button>
          ) : (
            <button onClick={handlePlaceOrder} disabled={isSubmitting} style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", background: "var(--color-coral)", color: "#fff", border: "none", borderRadius: "var(--radius-full)", padding: "0.75rem 2rem", cursor: isSubmitting ? "wait" : "pointer", minHeight: "44px" }}>
              {isSubmitting ? "Placing Order…" : "Place Order (Demo)"}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--color-muted)", display: "block", marginBottom: "0.35rem" }}>{label}</label>
      {children}
      {error && <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-error)", marginTop: "0.25rem" }}>{error}</p>}
    </div>
  );
}

const sh: React.CSSProperties = { fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 500, color: "var(--color-green)", marginBottom: "1.25rem" };
const inp: React.CSSProperties = { width: "100%", fontFamily: "var(--font-sans)", fontSize: "0.88rem", padding: "0.65rem 1rem", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-md)", background: "#fff", color: "var(--color-chocolate)", outline: "none", boxSizing: "border-box" };
