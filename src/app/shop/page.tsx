"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";

const categoryFilters = ["All", "Cakes", "Pastries", "Desserts", "Cookies", "Snacks", "Festival Specials", "Gift Hampers"];
const sortOptions = ["Featured", "Popular", "Price: Low to High", "Price: High to Low"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [eggFilter, setEggFilter] = useState<"all" | "egg" | "eggless">("all");
  const [sort, setSort] = useState("Featured");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    let result = [...products];

    // Category
    if (activeCategory !== "All") {
      const cat = activeCategory.toLowerCase().replace(/ /g, "-").replace("pastries", "pastries").replace("desserts", "desserts").replace("cookies", "cookies");
      result = result.filter((p) =>
        p.category === cat ||
        p.subcategory?.toLowerCase().includes(activeCategory.toLowerCase()) ||
        p.category.includes(activeCategory.toLowerCase().split(" ")[0])
      );
    }

    // Egg
    if (eggFilter === "eggless") result = result.filter((p) => p.isEggless || p.hasEgglessOption);
    if (eggFilter === "egg") result = result.filter((p) => !p.isEggless);

    // Search
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.subcategory?.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
      );
    }

    // Sort
    if (sort === "Price: Low to High") result.sort((a, b) => a.basePrice - b.basePrice);
    if (sort === "Price: High to Low") result.sort((a, b) => b.basePrice - a.basePrice);
    if (sort === "Popular") result.sort((a, b) => b.reviewCount - a.reviewCount);

    return result;
  }, [activeCategory, eggFilter, sort, searchTerm]);

  return (
    <div style={{ background: "var(--color-cream)", minHeight: "100vh" }}>
      {/* Page Header */}
      <div
        style={{
          background: "var(--color-green)",
          padding: "3rem 0 2.5rem",
          textAlign: "center",
        }}
      >
        <p className="eyebrow" style={{ color: "var(--color-blush)", marginBottom: "0.6rem" }}>
          Our Menu
        </p>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 500,
            color: "var(--color-cream)",
          }}
        >
          Find Something Delicious
        </h1>
      </div>

      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "2.5rem 1.5rem",
        }}
      >
        {/* Filters Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "2rem",
            padding: "1rem 1.25rem",
            background: "#fff",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
          }}
        >
          {/* Category pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  padding: "0.35rem 0.85rem",
                  borderRadius: "var(--radius-full)",
                  border: `1.5px solid ${activeCategory === cat ? "var(--color-green)" : "var(--color-border)"}`,
                  background: activeCategory === cat ? "var(--color-green)" : "transparent",
                  color: activeCategory === cat ? "var(--color-cream)" : "var(--color-chocolate)",
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                  minHeight: "32px",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            {/* Egg filter */}
            <select
              value={eggFilter}
              onChange={(e) => setEggFilter(e.target.value as typeof eggFilter)}
              aria-label="Egg preference filter"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.78rem",
                padding: "0.4rem 0.75rem",
                border: "1.5px solid var(--color-border)",
                borderRadius: "var(--radius-full)",
                background: "#fff",
                color: "var(--color-chocolate)",
                cursor: "pointer",
                minHeight: "36px",
                outline: "none",
              }}
            >
              <option value="all">All Options</option>
              <option value="eggless">Eggless</option>
              <option value="egg">With Egg</option>
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.78rem",
                padding: "0.4rem 0.75rem",
                border: "1.5px solid var(--color-border)",
                borderRadius: "var(--radius-full)",
                background: "#fff",
                color: "var(--color-chocolate)",
                cursor: "pointer",
                minHeight: "36px",
                outline: "none",
              }}
            >
              {sortOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.82rem",
            color: "var(--color-muted)",
            marginBottom: "1.25rem",
          }}
        >
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        </div>

        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 0",
              color: "var(--color-muted)",
            }}
          >
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", marginBottom: "0.5rem", color: "var(--color-green)" }}>
              No cakes found.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem" }}>
              Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.25rem",
            }}
            className="shop-grid"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .shop-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
          }
        }
        @media (max-width: 380px) {
          .shop-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
