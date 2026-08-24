"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  { num: "01", label: "Choose your occasion" },
  { num: "02", label: "Choose your flavour" },
  { num: "03", label: "Tell us your idea" },
  { num: "04", label: "Upload a reference" },
];

export default function CustomCakeCTA() {
  return (
    <section
      style={{
        background: "var(--color-cream-dark)",
        padding: "5rem 0",
        overflow: "hidden",
      }}
      aria-label="Custom cake builder"
    >
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
        className="custom-cake-grid"
      >
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            aspectRatio: "4/5",
            background: "var(--color-cream-dark)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=85"
            alt="A beautifully custom-designed Cake & Bake cake"
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>
            Custom Cakes
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 500,
              color: "var(--color-green)",
              lineHeight: 1.12,
              marginBottom: "1rem",
            }}
          >
            Your Idea.{" "}
            <em style={{ color: "var(--color-coral)", fontStyle: "italic" }}>Our Craft.</em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.92rem",
              color: "var(--color-chocolate-light)",
              lineHeight: 1.7,
              marginBottom: "2rem",
              maxWidth: "420px",
            }}
          >
            Have a design in mind? Tell us what you imagine, upload a reference
            and we&apos;ll help bring it to life.
          </p>

          {/* Steps */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.25rem" }}>
            {steps.map((step) => (
              <div key={step.num} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.4rem",
                    fontWeight: 300,
                    color: "var(--color-blush)",
                    minWidth: "32px",
                    lineHeight: 1,
                  }}
                >
                  {step.num}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.88rem",
                    color: "var(--color-chocolate)",
                    fontWeight: 500,
                  }}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/custom-cake"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "var(--color-green)",
              color: "var(--color-cream)",
              padding: "0.9rem 2rem",
              borderRadius: "var(--radius-full)",
              textDecoration: "none",
              minHeight: "44px",
              transition: "background var(--transition-base)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-green-dark)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-green)")}
          >
            Create Your Custom Cake <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .custom-cake-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
