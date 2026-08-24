"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Check, X, Search, ToggleLeft, ToggleRight, Sparkles } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { products, Product } from "@/data/products";

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>(products);
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: "cakes", price: 500, isEggless: true, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80" });

  const filtered = productList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStock = (id: string) => {
    setAvailability((prev) => ({ ...prev, [id]: !(prev[id] ?? true) }));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: `p-${Date.now()}`,
      name: newProduct.name,
      slug: newProduct.name.toLowerCase().replace(/ /g, "-"),
      category: newProduct.category as any,
      description: "Freshly baked cake prepared with premium ingredients.",
      shortDescription: "Signature creation baked fresh daily.",
      basePrice: Number(newProduct.price),
      images: [newProduct.image],
      isEggless: newProduct.isEggless,
      hasEgglessOption: true,
      rating: 5.0,
      reviewCount: 1,
      isBestseller: false,
      isNew: true,
      sizes: [{ label: "0.5 kg", weight: "500g", price: Number(newProduct.price) }],
      tags: ["fresh", newProduct.category],
      isFeatured: false,
      flavours: ["Chocolate"],
      occasions: ["birthday"],
      available: true,
    };
    setProductList([created, ...productList]);
    setShowAddModal(false);
    setNewProduct({ name: "", category: "cakes", price: 500, isEggless: true, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80" });
  };

  return (
    <>
      <AdminHeader title="Product Catalog" />

      <main style={{ padding: "2rem", flex: 1, overflowY: "auto" }}>
        {/* Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1.75rem",
            background: "#fff",
            padding: "1rem 1.25rem",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative", minWidth: "260px" }}>
            <Search size={15} color="var(--color-muted)" style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Search products by name or category…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                fontFamily: "var(--font-sans)",
                fontSize: "0.82rem",
                padding: "0.5rem 1rem 0.5rem 2.3rem",
                borderRadius: "var(--radius-full)",
                border: "1px solid var(--color-border)",
                outline: "none",
              }}
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: "var(--color-green)",
              color: "var(--color-cream)",
              border: "none",
              borderRadius: "var(--radius-full)",
              padding: "0.65rem 1.25rem",
              cursor: "pointer",
            }}
          >
            <Plus size={16} /> Add New Product
          </button>
        </div>

        {/* Product Catalog Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {filtered.map((prod) => {
            const inStock = availability[prod.id] ?? true;
            return (
              <div
                key={prod.id}
                style={{
                  background: "#fff",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-border)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-sm)",
                  opacity: inStock ? 1 : 0.6,
                  transition: "opacity var(--transition-base)",
                }}
              >
                <div style={{ position: "relative", aspectRatio: "4/3", background: "var(--color-cream-dark)" }}>
                  <img src={prod.images[0]} alt={prod.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <span
                    style={{
                      position: "absolute",
                      top: "0.5rem",
                      left: "0.5rem",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      background: inStock ? "var(--color-success)" : "var(--color-error)",
                      color: "#fff",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "var(--radius-full)",
                    }}
                  >
                    {inStock ? "In Stock" : "Sold Out"}
                  </span>
                </div>

                <div style={{ padding: "1rem" }}>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-coral)", marginBottom: "0.2rem" }}>
                    {prod.category}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1rem", fontWeight: 500, color: "var(--color-green)", marginBottom: "0.4rem" }}>
                    {prod.name}
                  </h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", fontWeight: 700, color: "var(--color-green)" }}>
                      From ₹{prod.basePrice}
                    </span>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--color-muted)" }}>
                      {prod.isEggless ? "100% Eggless" : "Egg Option"}
                    </span>
                  </div>

                  <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "0.65rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--color-muted)" }}>
                      Toggle Availability
                    </span>
                    <button
                      onClick={() => toggleStock(prod.id)}
                      aria-label={`Toggle stock for ${prod.name}`}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: inStock ? "var(--color-success)" : "var(--color-muted)",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {inStock ? <ToggleRight size={26} color="var(--color-success)" /> : <ToggleLeft size={26} color="var(--color-muted)" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Product Modal */}
        <AnimatePresence>
          {showAddModal && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddModal(false)}
                style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 400 }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "min(440px, 92vw)",
                  background: "#fff",
                  borderRadius: "var(--radius-xl)",
                  padding: "1.75rem",
                  zIndex: 401,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", color: "var(--color-green)", margin: 0 }}>
                    Add New Bakery Product
                  </h3>
                  <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)" }}>
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleAddProduct}>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={fieldLabel}>Product Name *</label>
                    <input
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="e.g. Nutella Hazelnut Crunch Cake"
                      style={inpStyle}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={fieldLabel}>Category</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        style={inpStyle}
                      >
                        <option value="cakes">Cakes</option>
                        <option value="pastries">Pastries</option>
                        <option value="desserts">Desserts</option>
                        <option value="cookies">Cookies</option>
                        <option value="snacks">Snacks</option>
                      </select>
                    </div>

                    <div>
                      <label style={fieldLabel}>Base Price (₹) *</label>
                      <input
                        type="number"
                        required
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        style={inpStyle}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      background: "var(--color-green)",
                      color: "var(--color-cream)",
                      border: "none",
                      borderRadius: "var(--radius-full)",
                      padding: "0.8rem",
                      cursor: "pointer",
                      marginTop: "0.5rem",
                    }}
                  >
                    Save &amp; Publish Product
                  </button>
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

const fieldLabel: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-muted)",
  display: "block",
  marginBottom: "0.3rem",
};

const inpStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-sans)",
  fontSize: "0.85rem",
  padding: "0.55rem 0.85rem",
  border: "1.5px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  outline: "none",
};
