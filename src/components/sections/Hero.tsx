"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function Hero() {
  return (
    <section
      style={{
        background: "var(--color-cream)",
        minHeight: "calc(100vh - 100px)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Hero"
    >
      {/* Decorative circle */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-120px",
          right: "-120px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(233,164,160,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(24,63,58,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "4rem 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          width: "100%",
        }}
        className="hero-grid"
      >
        {/* Text */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ maxWidth: "540px" }}
        >
          <motion.p
            variants={fadeUp}
            className="eyebrow"
            style={{ marginBottom: "1.25rem" }}
          >
            The Live Bakery
          </motion.p>

          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
              fontWeight: 500,
              color: "var(--color-green)",
              lineHeight: 1.08,
              marginBottom: "1.5rem",
            }}
          >
            Made Fresh.{" "}
            <span
              style={{
                fontStyle: "italic",
                color: "var(--color-coral)",
              }}
            >
              Made Personal.
            </span>{" "}
            Made for Your Moments.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              color: "var(--color-chocolate-light)",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
              maxWidth: "440px",
            }}
          >
            Cakes, desserts and custom creations crafted fresh for birthdays,
            celebrations and every little reason to make someone smile.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2rem" }}
          >
            <Link
              href="/shop"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: "var(--color-green)",
                color: "var(--color-cream)",
                padding: "0.85rem 1.75rem",
                borderRadius: "var(--radius-full)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                minHeight: "44px",
                transition: "background var(--transition-base)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-green-dark)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-green)")}
            >
              <Sparkles size={15} />
              Order a Cake
            </Link>

            <Link
              href="/custom-cake"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                background: "transparent",
                color: "var(--color-green)",
                padding: "0.85rem 1.75rem",
                borderRadius: "var(--radius-full)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                minHeight: "44px",
                border: "1.5px solid var(--color-green)",
                transition: "all var(--transition-base)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-green)"; e.currentTarget.style.color = "var(--color-cream)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--color-green)"; }}
            >
              Create a Custom Cake
            </Link>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link
              href="/shop"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.82rem",
                color: "var(--color-muted)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                textDecoration: "none",
                transition: "color var(--transition-base)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-green)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
            >
              Explore Our Cakes <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          style={{
            position: "relative",
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            aspectRatio: "4/5",
            maxHeight: "600px",
            background: "var(--color-cream-dark)",
          }}
          className="hero-image-container"
        >
          <img
            src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=900&q=85"
            alt="Premium Cake & Bake custom cake — a beautifully decorated celebration cake"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          {/* Overlay badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "1.5rem",
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(8px)",
              borderRadius: "var(--radius-md)",
              padding: "0.75rem 1rem",
              boxShadow: "var(--shadow-md)",
            }}
          >
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-coral)", marginBottom: "0.2rem" }}>
              Custom Cakes
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "0.95rem", color: "var(--color-green)", fontWeight: 500 }}>
              Your Idea. Our Craft.
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }
          .hero-image-container {
            max-height: 380px !important;
            aspect-ratio: 4/3 !important;
          }
        }
      `}</style>
    </section>
  );
}
