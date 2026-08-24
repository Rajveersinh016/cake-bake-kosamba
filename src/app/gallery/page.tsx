"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { galleryItems, galleryCategories } from "@/data/gallery";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);

  const filtered = activeCategory === "All" ? galleryItems : galleryItems.filter((i) => i.category === activeCategory);

  return (
    <div style={{ background: "var(--color-cream)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "var(--color-green)", padding: "3rem 0 2.5rem", textAlign: "center" }}>
        <p className="eyebrow" style={{ color: "var(--color-blush)", marginBottom: "0.5rem" }}>Gallery</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "var(--color-cream)" }}>
          Our Creations
        </h1>
      </div>

      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        {/* Category Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "2.5rem" }}>
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.78rem",
                fontWeight: 500,
                padding: "0.4rem 1rem",
                borderRadius: "var(--radius-full)",
                border: `1.5px solid ${activeCategory === cat ? "var(--color-green)" : "var(--color-border)"}`,
                background: activeCategory === cat ? "var(--color-green)" : "#fff",
                color: activeCategory === cat ? "var(--color-cream)" : "var(--color-chocolate)",
                cursor: "pointer",
                transition: "all var(--transition-fast)",
                minHeight: "36px",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div style={{ columns: "4 220px", gap: "0.75rem" }}>
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setLightboxItem(item)}
              style={{
                breakInside: "avoid",
                marginBottom: "0.75rem",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                cursor: "pointer",
                background: "var(--color-cream-dark)",
                position: "relative",
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                style={{ width: "100%", display: "block", transition: "transform 0.4s ease" }}
                onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.04)")}
                onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(24,63,58,0)",
                  transition: "background 0.3s ease",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "0.75rem",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(24,63,58,0.35)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(24,63,58,0)")}
              >
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", opacity: 0, transition: "opacity 0.3s ease" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0")}
                >
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxItem(null)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 500, cursor: "pointer" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                maxWidth: "min(800px, 90vw)",
                maxHeight: "90vh",
                zIndex: 501,
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                background: "#000",
              }}
            >
              <img src={lightboxItem.src} alt={lightboxItem.alt} style={{ width: "100%", height: "100%", objectFit: "contain", maxHeight: "85vh" }} />
              <button
                onClick={() => setLightboxItem(null)}
                aria-label="Close lightbox"
                style={{
                  position: "absolute",
                  top: "0.75rem",
                  right: "0.75rem",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
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
    </div>
  );
}
