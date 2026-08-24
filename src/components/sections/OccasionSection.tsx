"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const occasions = [
  {
    label: "Birthday",
    tagline: "Make their day sweeter.",
    href: "/shop?occasion=birthday",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&q=80",
    color: "rgba(217,122,120,0.85)",
  },
  {
    label: "Anniversary",
    tagline: "Celebrate your story.",
    href: "/shop?occasion=anniversary",
    image: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&q=80",
    color: "rgba(24,63,58,0.82)",
  },
  {
    label: "Wedding",
    tagline: "For moments worth remembering.",
    href: "/shop?occasion=wedding",
    image: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=600&q=80",
    color: "rgba(43,41,38,0.8)",
  },
  {
    label: "Baby Shower",
    tagline: "Sweet beginnings.",
    href: "/shop?occasion=baby-shower",
    image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600&q=80",
    color: "rgba(233,164,160,0.88)",
  },
  {
    label: "Corporate",
    tagline: "Celebrate your team.",
    href: "/shop?occasion=corporate",
    image: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80",
    color: "rgba(24,63,58,0.8)",
  },
];

export default function OccasionSection() {
  return (
    <section
      style={{ background: "#fff", padding: "5rem 0" }}
      aria-label="Shop by occasion"
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeading
          eyebrow="Every Occasion"
          heading="Find Your Perfect Cake"
          subtext="Whatever the celebration, we have something made just for it."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0.75rem",
          }}
          className="occasion-grid"
        >
          {occasions.map((occ, i) => (
            <motion.div
              key={occ.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link
                href={occ.href}
                style={{ textDecoration: "none", display: "block" }}
                aria-label={`Shop ${occ.label} cakes`}
              >
                <div
                  style={{
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    position: "relative",
                    aspectRatio: "2/3",
                    background: "var(--color-cream-dark)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    const img = (e.currentTarget as HTMLElement).querySelector("img");
                    if (img) img.style.transform = "scale(1.07)";
                  }}
                  onMouseLeave={(e) => {
                    const img = (e.currentTarget as HTMLElement).querySelector("img");
                    if (img) img.style.transform = "scale(1)";
                  }}
                >
                  <img
                    src={occ.image}
                    alt={occ.label}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  />
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(to top, ${occ.color} 0%, transparent 55%)`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      left: "1rem",
                      right: "1rem",
                    }}
                  >
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", fontWeight: 500, color: "#fff", marginBottom: "0.15rem" }}>
                      {occ.label}
                    </div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", color: "rgba(255,255,255,0.75)" }}>
                      {occ.tagline}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link
            href="/shop"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              color: "var(--color-green)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            Find Your Cake →
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .occasion-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 550px) {
          .occasion-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
