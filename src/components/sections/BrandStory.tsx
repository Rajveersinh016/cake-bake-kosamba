"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section
      style={{ background: "#fff", padding: "5rem 0", overflow: "hidden" }}
      aria-label="Our story"
    >
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
        className="story-grid"
      >
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ position: "relative" }}
        >
          <div
            style={{
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              aspectRatio: "3/4",
              background: "var(--color-cream-dark)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&q=85"
              alt="The Cake & Bake bakery team at work"
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {/* Decorative circle */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-30px",
              left: "-30px",
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              border: "1.5px dashed var(--color-blush)",
              opacity: 0.5,
              zIndex: -1,
            }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>
            Our Story
          </p>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 500,
              color: "var(--color-green)",
              lineHeight: 1.12,
              marginBottom: "1.5rem",
            }}
          >
            More Than Cake.{" "}
            <em style={{ color: "var(--color-coral)", fontStyle: "italic" }}>
              It&apos;s Connection.
            </em>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.92rem",
              color: "var(--color-chocolate-light)",
              lineHeight: 1.8,
              marginBottom: "1.25rem",
            }}
          >
            At Cake &amp; Bake, we believe that a cake is more than flour and
            sugar — it&apos;s the centrepiece of your most meaningful moments.
            Every celebration deserves something truly handcrafted, made with
            care and delivered with warmth.
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.92rem",
              color: "var(--color-chocolate-light)",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            From birthdays to anniversaries, baby showers to corporate
            milestones — we bring people together through the simple joy of a
            beautiful, delicious cake.
          </p>

          <Link
            href="/about"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.76rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-green)",
              borderBottom: "1.5px solid var(--color-green)",
              paddingBottom: "2px",
              textDecoration: "none",
              transition: "color var(--transition-base)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-coral)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-green)")}
          >
            Discover Our Story →
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .story-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
