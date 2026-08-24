"use client";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/config";

const tiles = [
  { src: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=500&q=80", alt: "Designer cake" },
  { src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80", alt: "Chocolate truffle" },
  { src: "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=500&q=80", alt: "Red velvet cake" },
  { src: "https://images.unsplash.com/photo-1542124948-dc391252a940?w=500&q=80", alt: "Fresh pastry" },
  { src: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500&q=80", alt: "Strawberry cake" },
  { src: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80", alt: "Belgian chocolate" },
  { src: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500&q=80", alt: "Fudge brownie" },
  { src: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&q=80", alt: "Assorted cookies" },
];

export default function InstagramSection() {
  return (
    <section
      style={{ background: "var(--color-cream-dark)", padding: "5rem 0" }}
      aria-label="Instagram gallery"
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeading
          eyebrow={siteConfig.handle}
          heading="Sweet Moments, Shared."
          subtext="Follow us on Instagram for daily bakes, custom creations and festive specials."
        />

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0.5rem",
            marginBottom: "2rem",
          }}
          className="ig-grid"
        >
          {tiles.map((tile, i) => (
            <motion.a
              key={i}
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${tile.alt} on Instagram`}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              style={{
                display: "block",
                aspectRatio: "1",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                background: "var(--color-cream-dark)",
                position: "relative",
              }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={tile.src}
                alt={tile.alt}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(24,63,58,0)",
                  transition: "background 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(24,63,58,0.4)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(24,63,58,0)")}
              >
                <Camera size={24} color="#fff" style={{ opacity: 0 }} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              color: "var(--color-green)",
              border: "1.5px solid var(--color-green)",
              borderRadius: "var(--radius-full)",
              padding: "0.75rem 1.75rem",
              textDecoration: "none",
              transition: "all var(--transition-base)",
              minHeight: "44px",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-green)"; (e.currentTarget as HTMLElement).style.color = "var(--color-cream)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--color-green)"; }}
          >
            <Camera size={16} />
            Follow Us on Instagram
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .ig-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
