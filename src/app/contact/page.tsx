"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.phone.trim()) e.phone = "Phone is required.";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email required.";
    if (!form.message.trim()) e.message = "Message is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return (
    <div style={{ background: "var(--color-cream)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "var(--color-green)", padding: "3rem 0 2.5rem", textAlign: "center" }}>
        <p className="eyebrow" style={{ color: "var(--color-blush)", marginBottom: "0.5rem" }}>Contact Us</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "var(--color-cream)" }}>
          We&apos;d Love to Hear From You
        </h1>
      </div>

      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "3.5rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "3rem" }} className="contact-grid">
          {/* Info */}
          <div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--color-green)", marginBottom: "1.25rem" }}>
              Get in Touch
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
              <ContactInfo icon={<Phone size={18} />} label="Phone" value={siteConfig.phone} href={`tel:${siteConfig.phone}`} />
              <ContactInfo icon={<Mail size={18} />} label="Email" value={siteConfig.email} href={`mailto:${siteConfig.email}`} />
              <ContactInfo icon={<MapPin size={18} />} label="Locations" value="5 Locations in Gujarat" href="/locations" />
            </div>

            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", background: "#25D366", color: "#fff", padding: "0.85rem 1.5rem", borderRadius: "var(--radius-full)", textDecoration: "none", marginBottom: "2rem" }}
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>

            <div style={{ background: "var(--color-cream-dark)", borderRadius: "var(--radius-lg)", padding: "1.25rem", border: "1px solid var(--color-border)" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", color: "var(--color-green)", marginBottom: "0.6rem" }}>Opening Hours</h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--color-chocolate-light)", lineHeight: 1.6 }}>
                Monday – Sunday<br />
                9:00 AM – 9:00 PM<br />
                <em style={{ color: "var(--color-muted)", fontSize: "0.72rem" }}>* Hours may vary by location — to be confirmed by client.</em>
              </p>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: "#fff", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "3rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}
            >
              <CheckCircle size={40} color="var(--color-green)" />
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--color-green)" }}>Message Received!</h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--color-muted)", lineHeight: 1.6, maxWidth: "340px" }}>
                Thank you for reaching out. We&apos;ll get back to you as soon as possible.
              </p>
              <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", subject: "", message: "" }); }} style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", background: "var(--color-green)", color: "var(--color-cream)", border: "none", borderRadius: "var(--radius-full)", padding: "0.75rem 1.5rem", cursor: "pointer", minHeight: "44px" }}>
                Send Another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ background: "#fff", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "2rem", boxShadow: "var(--shadow-sm)" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--color-green)", marginBottom: "1.5rem" }}>Send a Message</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <FormField label="Name *" error={errors.name}><input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" style={inp} /></FormField>
                <FormField label="Phone *" error={errors.phone}><input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 00000 00000" type="tel" style={inp} /></FormField>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <FormField label="Email *" error={errors.email}><input value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="your@email.com" type="email" style={inp} /></FormField>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <FormField label="Subject"><input value={form.subject} onChange={(e) => update("subject", e.target.value)} placeholder="e.g. Custom Cake Enquiry" style={inp} /></FormField>
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <FormField label="Message *" error={errors.message}><textarea value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us how we can help…" rows={5} style={{ ...inp, resize: "vertical" }} /></FormField>
              </div>
              <button type="submit" style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.09em", textTransform: "uppercase", background: "var(--color-green)", color: "var(--color-cream)", border: "none", borderRadius: "var(--radius-full)", padding: "0.85rem 2rem", cursor: "pointer", width: "100%", minHeight: "44px" }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}

function ContactInfo({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
      <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(24,63,58,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-green)", flexShrink: 0 }}>{icon}</div>
      <div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "0.15rem" }}>{label}</p>
        <a href={href} style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--color-chocolate)", textDecoration: "none" }}>{value}</a>
      </div>
    </div>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--color-muted)", display: "block", marginBottom: "0.35rem" }}>{label}</label>
      {children}
      {error && <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-error)", marginTop: "0.25rem" }}>{error}</p>}
    </div>
  );
}

const inp: React.CSSProperties = { width: "100%", fontFamily: "var(--font-sans)", fontSize: "0.88rem", padding: "0.65rem 1rem", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-md)", background: "#fff", color: "var(--color-chocolate)", outline: "none", boxSizing: "border-box" };
