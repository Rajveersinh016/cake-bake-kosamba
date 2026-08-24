"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { categories } from "@/data/categories";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CategoryGrid() {
  return (
    <section style={{ padding: "5rem 0", background: "#fff" }} aria-label="Shop by category">
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeading
          eyebrow="Explore Our Menu"
          heading="Something Sweet for Every Moment"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "1rem",
          }}
          className="category-grid"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                href={`/shop?category=${cat.slug}`}
                style={{ textDecoration: "none", display: "block" }}
                aria-label={cat.name}
              >
                <div
                  style={{
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    position: "relative",
                    aspectRatio: "3/4",
                    background: "var(--color-cream-dark)",
                    cursor: "pointer",
                    transition: "transform var(--transition-base), box-shadow var(--transition-base)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                    const img = (e.currentTarget as HTMLElement).querySelector("img");
                    if (img) img.style.transform = "scale(1.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    const img = (e.currentTarget as HTMLElement).querySelector("img");
                    if (img) img.style.transform = "scale(1)";
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                  />
                  {/* Gradient overlay */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "55%",
                      background: "linear-gradient(to top, rgba(24,63,58,0.85) 0%, transparent 100%)",
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
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1rem",
                        fontWeight: 500,
                        color: "#fff",
                        marginBottom: "0.15rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {cat.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.68rem",
                        color: "rgba(248,241,234,0.7)",
                      }}
                    >
                      {cat.label}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
