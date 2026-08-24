"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      style={{
        background: "var(--color-green)",
        padding: "5rem 0",
      }}
      aria-label="Newsletter signup"
    >
      <div
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          padding: "0 1.5rem",
          textAlign: "center",
        }}
      >
        <p
          className="eyebrow"
          style={{ color: "var(--color-blush)", marginBottom: "1rem" }}
        >
          Join the Community
        </p>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 500,
            color: "var(--color-cream)",
            marginBottom: "1rem",
            lineHeight: 1.15,
          }}
        >
          Stay in the Sweet Loop.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.92rem",
            color: "rgba(248,241,234,0.7)",
            lineHeight: 1.7,
            marginBottom: "2.25rem",
          }}
        >
          Be the first to know about new flavours, special offers and festive creations.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: "rgba(248,241,234,0.1)",
              border: "1px solid rgba(248,241,234,0.2)",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem 2rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.1rem",
                color: "var(--color-cream)",
                marginBottom: "0.4rem",
              }}
            >
              You&apos;re in! 🎂
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.83rem", color: "rgba(248,241,234,0.7)" }}>
              Thank you for joining. We&apos;ll be in touch with the sweetest updates.
            </p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: "0.5rem",
              maxWidth: "440px",
              margin: "0 auto",
            }}
            className="newsletter-form"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              style={{
                flex: 1,
                fontFamily: "var(--font-sans)",
                fontSize: "0.88rem",
                padding: "0.85rem 1.25rem",
                borderRadius: "var(--radius-full)",
                border: "1.5px solid rgba(248,241,234,0.2)",
                background: "rgba(248,241,234,0.08)",
                color: "var(--color-cream)",
                outline: "none",
                minHeight: "44px",
              }}
            />
            <button
              type="submit"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: "var(--color-coral)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--radius-full)",
                padding: "0.85rem 1.5rem",
                cursor: "pointer",
                minHeight: "44px",
                whiteSpace: "nowrap",
                transition: "background var(--transition-base)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-blush)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-coral)")}
            >
              Join the Community
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 480px) {
          .newsletter-form {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
