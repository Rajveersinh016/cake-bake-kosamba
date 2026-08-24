"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { searchProducts } from "@/data/products";
import type { Product } from "@/data/products";
import Image from "next/image";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const RECENT_KEY = "cb_recent_searches";

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) setRecent(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    setResults(searchProducts(query).slice(0, 6));
  }, [query]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open, onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSelect = (slug: string, name: string) => {
    setRecent((prev) => {
      const next = [name, ...prev.filter((r) => r !== name)].slice(0, 5);
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
    router.push(`/shop/${slug}`);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(query)}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(24,63,58,0.4)",
              zIndex: 200,
              backdropFilter: "blur(4px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.22 }}
            style={{
              position: "fixed",
              top: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(620px, calc(100vw - 2rem))",
              background: "#fff",
              borderRadius: "var(--radius-xl)",
              boxShadow: "var(--shadow-xl)",
              zIndex: 201,
              overflow: "hidden",
            }}
          >
            {/* Search input */}
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "1rem 1.25rem",
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <Search size={18} color="var(--color-muted)" />
                <input
                  autoFocus
                  type="search"
                  placeholder="Search cakes, desserts, flavours…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.95rem",
                    color: "var(--color-chocolate)",
                    background: "transparent",
                  }}
                  aria-label="Search products"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", display: "flex", alignItems: "center" }}
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </form>

            {/* Results */}
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              {results.length > 0 && (
                <div style={{ padding: "0.5rem 0" }}>
                  {results.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSelect(product.slug, product.name)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.65rem 1.25rem",
                        width: "100%",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background var(--transition-fast)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-cream)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                    >
                      <div style={{ width: "40px", height: "40px", borderRadius: "var(--radius-sm)", overflow: "hidden", flexShrink: 0, background: "var(--color-cream-dark)" }}>
                        <img src={product.images[0]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                      </div>
                      <div>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", fontWeight: 500, color: "var(--color-chocolate)" }}>{product.name}</div>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--color-muted)" }}>From ₹{product.basePrice}</div>
                      </div>
                      <ArrowRight size={14} style={{ marginLeft: "auto", color: "var(--color-muted)" }} />
                    </button>
                  ))}
                </div>
              )}

              {/* Recent Searches */}
              {!query && recent.length > 0 && (
                <div style={{ padding: "0.75rem 1.25rem" }}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: "0.5rem" }}>Recent</p>
                  {recent.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => setQuery(term)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.4rem 0",
                        width: "100%",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.85rem",
                        color: "var(--color-chocolate)",
                      }}
                    >
                      <Clock size={13} color="var(--color-muted)" />
                      {term}
                    </button>
                  ))}
                </div>
              )}

              {query.length >= 2 && results.length === 0 && (
                <div style={{ padding: "2rem 1.25rem", textAlign: "center", fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--color-muted)" }}>
                  No cakes found for &ldquo;{query}&rdquo;
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
