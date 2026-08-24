"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);

  const current = testimonials[idx];

  return (
    <section
      style={{ background: "var(--color-cream)", padding: "5rem 0" }}
      aria-label="Customer testimonials"
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeading
          eyebrow="People Are Talking"
          heading="What Our Customers Say"
          subtext="Demo content — to be replaced with verified customer reviews."
        />

        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              background: "#fff",
              borderRadius: "var(--radius-xl)",
              padding: "2.5rem",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-sm)",
              textAlign: "center",
            }}
          >
            {/* Stars */}
            <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "1.25rem" }}>
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} size={16} fill="var(--color-warning)" color="var(--color-warning)" />
              ))}
            </div>

            <blockquote
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--color-green)",
                lineHeight: 1.55,
                marginBottom: "1.5rem",
              }}
            >
              &ldquo;{current.text}&rdquo;
            </blockquote>

            <div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--color-chocolate)",
                  marginBottom: "0.15rem",
                }}
              >
                {current.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  color: "var(--color-muted)",
                }}
              >
                {current.location}
                {current.occasion && ` · ${current.occasion}`}
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.5rem",
              marginTop: "1.75rem",
            }}
          >
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              style={navBtnStyle}
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div style={{ display: "flex", gap: "6px" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`View testimonial ${i + 1}`}
                  style={{
                    width: i === idx ? "20px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: i === idx ? "var(--color-green)" : "var(--color-border-dark)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all var(--transition-base)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              style={navBtnStyle}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const navBtnStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "1.5px solid var(--color-border-dark)",
  background: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--color-chocolate)",
  transition: "all var(--transition-base)",
};
