"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductCard from "@/components/product/ProductCard";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts().slice(0, 8);

  return (
    <section
      style={{ padding: "5rem 0", background: "var(--color-cream)" }}
      aria-label="Featured products"
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeading
          eyebrow="Customer Favourites"
          heading="Loved by Cake & Bake Customers"
          subtext="Our most-ordered cakes, crafted with care for every celebration."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
          className="product-grid"
        >
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link
            href="/shop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
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
            View All Products <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
          }
        }
        @media (max-width: 380px) {
          .product-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
