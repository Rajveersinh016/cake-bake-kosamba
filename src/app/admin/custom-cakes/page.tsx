"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Image as ImageIcon, Send, CheckCircle, Clock, X, Phone, DollarSign } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { initialCustomCakeRequests, CustomCakeRequest } from "@/data/adminData";

export default function AdminCustomCakesPage() {
  const [requests, setRequests] = useState<CustomCakeRequest[]>(initialCustomCakeRequests);
  const [selectedReq, setSelectedReq] = useState<CustomCakeRequest | null>(null);
  const [quoteInput, setQuoteInput] = useState<number>(2500);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReq) return;
    const advance = Math.round(quoteInput * 0.5);

    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedReq.id
          ? { ...r, quotedPrice: quoteInput, advancePrice: advance, status: "Quote Sent" }
          : r
      )
    );

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setSelectedReq(null);
    }, 1500);
  };

  return (
    <>
      <AdminHeader title="Custom Cake Requests" />

      <main style={{ padding: "2rem", flex: 1, overflowY: "auto" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--color-green)", margin: 0 }}>
            Incoming Design Enquiries ({requests.length})
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--color-muted)", margin: 0 }}>
            Review customer reference images, cake specs, set final price quotes, and request 50% advance deposit.
          </p>
        </div>

        {/* Request Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {requests.map((req) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "#fff",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                padding: "1.25rem",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                  <div>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 700, color: "var(--color-green)" }}>
                      {req.id}
                    </span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-muted)", marginLeft: "0.5rem" }}>
                      {req.submittedAt}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      padding: "0.2rem 0.6rem",
                      borderRadius: "var(--radius-full)",
                      background: req.status === "Deposit Received" ? "rgba(58,125,68,0.12)" : "rgba(217,122,120,0.15)",
                      color: req.status === "Deposit Received" ? "var(--color-success)" : "var(--color-coral)",
                    }}
                  >
                    {req.status}
                  </span>
                </div>

                {/* Reference Image Thumbnail */}
                {req.referenceImage && (
                  <div
                    onClick={() => setLightboxImg(req.referenceImage!)}
                    style={{
                      width: "100%",
                      height: "140px",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      background: "var(--color-cream-dark)",
                      marginBottom: "0.85rem",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <img src={req.referenceImage} alt="Reference" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0.5rem",
                        right: "0.5rem",
                        background: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "var(--radius-sm)",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.65rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <ImageIcon size={12} /> Inspect Photo
                    </div>
                  </div>
                )}

                {/* Customer Details */}
                <div style={{ marginBottom: "0.75rem" }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 600, color: "var(--color-chocolate)" }}>
                    {req.customerName}
                  </div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--color-muted)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Phone size={12} /> {req.customerPhone} · {req.location}
                  </div>
                </div>

                {/* Cake Specifications */}
                <div style={{ background: "var(--color-cream)", borderRadius: "var(--radius-md)", padding: "0.75rem", fontSize: "0.78rem", color: "var(--color-chocolate-light)", marginBottom: "0.85rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <div><strong>Occasion:</strong> {req.occasion}</div>
                  <div><strong>Flavour:</strong> {req.flavour} ({req.eggOption})</div>
                  <div><strong>Size:</strong> {req.size}</div>
                  <div><strong>Style:</strong> {req.style}</div>
                  {req.message && <div><strong>Inscription:</strong> &ldquo;{req.message}&rdquo;</div>}
                </div>
              </div>

              {/* Action / Quote Footer */}
              <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "0.75rem", marginTop: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", color: "var(--color-muted)" }}>Quoted Price</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 700, color: "var(--color-green)" }}>
                    {req.quotedPrice ? `₹${req.quotedPrice}` : "Not Quoted Yet"}
                  </div>
                </div>

                <button
                  onClick={() => { setSelectedReq(req); setQuoteInput(req.quotedPrice || 2500); }}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    background: "var(--color-green)",
                    color: "var(--color-cream)",
                    border: "none",
                    borderRadius: "var(--radius-full)",
                    padding: "0.55rem 1.1rem",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  <Send size={13} /> {req.quotedPrice ? "Update Quote" : "Send Quote"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote Modal */}
        <AnimatePresence>
          {selectedReq && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedReq(null)}
                style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 400, backdropFilter: "blur(2px)" }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "min(480px, 92vw)",
                  background: "#fff",
                  borderRadius: "var(--radius-xl)",
                  padding: "1.75rem",
                  zIndex: 401,
                  boxShadow: "var(--shadow-xl)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--color-green)", margin: 0 }}>
                    Quote Custom Cake ({selectedReq.id})
                  </h3>
                  <button onClick={() => setSelectedReq(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)" }}>
                    <X size={18} />
                  </button>
                </div>

                {sentSuccess ? (
                  <div style={{ textAlign: "center", padding: "2rem 0" }}>
                    <CheckCircle size={44} color="var(--color-success)" style={{ margin: "0 auto 0.75rem" }} />
                    <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--color-green)", margin: 0 }}>
                      Quote Sent to Customer!
                    </h4>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--color-muted)" }}>
                      SMS / WhatsApp notification simulation dispatched to {selectedReq.customerPhone}.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSendQuote}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--color-muted)", marginBottom: "1.25rem" }}>
                      Customer: <strong>{selectedReq.customerName}</strong> ({selectedReq.occasion} - {selectedReq.flavour})
                    </p>

                    <div style={{ marginBottom: "1.25rem" }}>
                      <label style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-muted)", display: "block", marginBottom: "0.4rem" }}>
                        Enter Total Quoted Price (₹)
                      </label>
                      <input
                        type="number"
                        value={quoteInput}
                        onChange={(e) => setQuoteInput(Number(e.target.value))}
                        style={{
                          width: "100%",
                          fontFamily: "var(--font-sans)",
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          padding: "0.6rem 1rem",
                          border: "1.5px solid var(--color-green)",
                          borderRadius: "var(--radius-md)",
                          outline: "none",
                          color: "var(--color-green)",
                        }}
                      />
                    </div>

                    <div style={{ background: "var(--color-cream)", padding: "0.85rem", borderRadius: "var(--radius-md)", fontSize: "0.78rem", color: "var(--color-chocolate)", marginBottom: "1.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                        <span>Required 50% Advance:</span>
                        <strong style={{ color: "var(--color-coral)" }}>₹{Math.round(quoteInput * 0.5)}</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Remaining Balance on Delivery:</span>
                        <strong>₹{quoteInput - Math.round(quoteInput * 0.5)}</strong>
                      </div>
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: "100%",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        background: "var(--color-green)",
                        color: "var(--color-cream)",
                        border: "none",
                        borderRadius: "var(--radius-full)",
                        padding: "0.85rem",
                        cursor: "pointer",
                      }}
                    >
                      Send Price Quote &amp; Request Deposit
                    </button>
                  </form>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Lightbox for reference image */}
        <AnimatePresence>
          {lightboxImg && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxImg(null)}
                style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 500 }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: "min(700px, 90vw)",
                  maxHeight: "85vh",
                  zIndex: 501,
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  background: "#000",
                }}
              >
                <img src={lightboxImg} alt="Reference Fullscreen" style={{ width: "100%", height: "100%", objectFit: "contain", maxHeight: "80vh" }} />
                <button
                  onClick={() => setLightboxImg(null)}
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <X size={18} />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
