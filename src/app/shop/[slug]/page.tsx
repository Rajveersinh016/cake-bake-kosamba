"use client";
import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Heart, ChevronLeft, ChevronRight, Minus, Plus, Zap } from "lucide-react";
import Link from "next/link";
import { getProductBySlug, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import ProductCard from "@/components/product/ProductCard";

interface Props {
  params: { slug: string };
}

export default function ProductDetailPage({ params }: Props) {
  const router = useRouter();
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  const [selectedSize, setSelectedSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [eggOption, setEggOption] = useState(product.hasEgglessOption ? "Egg" : "Standard");
  const [quantity, setQuantity] = useState(1);
  const [imageIdx, setImageIdx] = useState(0);
  const [message, setMessage] = useState("");
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">("pickup");

  const wishlisted = isWishlisted(product.id);
  const totalPrice = selectedSize.price * quantity;

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize.label}-${eggOption}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      image: product.images[0],
      price: selectedSize.price,
      size: selectedSize.label,
      weight: selectedSize.weight,
      eggOption,
      message,
      quantity,
      slug: product.slug,
    });
    showToast(`${product.name} added to cart!`, "success");
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={{ background: "var(--color-cream)", minHeight: "100vh" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "2rem", fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--color-muted)", display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Link href="/" style={{ textDecoration: "none", color: "var(--color-muted)" }}>Home</Link>
          <span>/</span>
          <Link href="/shop" style={{ textDecoration: "none", color: "var(--color-muted)" }}>Shop</Link>
          <span>/</span>
          <span style={{ color: "var(--color-chocolate)" }}>{product.name}</span>
        </nav>

        {/* Main Content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            marginBottom: "4rem",
          }}
          className="product-detail-grid"
        >
          {/* Image Gallery */}
          <div>
            <div
              style={{
                borderRadius: "var(--radius-xl)",
                overflow: "hidden",
                aspectRatio: "1",
                background: "var(--color-cream-dark)",
                marginBottom: "0.75rem",
                position: "relative",
              }}
            >
              <motion.img
                key={imageIdx}
                src={product.images[imageIdx]}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImageIdx((i) => (i - 1 + product.images.length) % product.images.length)}
                    aria-label="Previous image"
                    style={{ ...imgNavBtn, left: "0.75rem" }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setImageIdx((i) => (i + 1) % product.images.length)}
                    aria-label="Next image"
                    style={{ ...imgNavBtn, right: "0.75rem" }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIdx(i)}
                    aria-label={`View image ${i + 1}`}
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      border: `2px solid ${i === imageIdx ? "var(--color-green)" : "var(--color-border)"}`,
                      background: "var(--color-cream-dark)",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-coral)", marginBottom: "0.5rem" }}>
              {product.subcategory ?? product.category}
            </p>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 500,
                color: "var(--color-green)",
                marginBottom: "0.75rem",
                lineHeight: 1.15,
              }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.round(product.rating) ? "var(--color-warning)" : "var(--color-border)"} color={i < Math.round(product.rating) ? "var(--color-warning)" : "var(--color-border)"} />
                ))}
              </div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-chocolate)" }}>{product.rating}</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--color-muted)" }}>({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--color-muted)" }}>From </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "1.6rem", fontWeight: 700, color: "var(--color-green)" }}>₹{selectedSize.price.toLocaleString("en-IN")}</span>
            </div>

            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "var(--color-chocolate-light)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
              {product.description}
            </p>

            {/* Size */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={optionLabel}>Size / Weight</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {product.sizes.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      padding: "0.45rem 0.9rem",
                      borderRadius: "var(--radius-full)",
                      border: `1.5px solid ${selectedSize.label === s.label ? "var(--color-green)" : "var(--color-border)"}`,
                      background: selectedSize.label === s.label ? "var(--color-green)" : "transparent",
                      color: selectedSize.label === s.label ? "var(--color-cream)" : "var(--color-chocolate)",
                      cursor: "pointer",
                      transition: "all var(--transition-fast)",
                    }}
                  >
                    {s.label} — ₹{s.price}
                  </button>
                ))}
              </div>
            </div>

            {/* Egg Option */}
            {product.hasEgglessOption && (
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={optionLabel}>Egg Preference</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {["Egg", "Eggless"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setEggOption(opt)}
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.78rem",
                        fontWeight: 500,
                        padding: "0.45rem 1rem",
                        borderRadius: "var(--radius-full)",
                        border: `1.5px solid ${eggOption === opt ? "var(--color-green)" : "var(--color-border)"}`,
                        background: eggOption === opt ? "var(--color-green)" : "transparent",
                        color: eggOption === opt ? "var(--color-cream)" : "var(--color-chocolate)",
                        cursor: "pointer",
                        transition: "all var(--transition-fast)",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={optionLabel} htmlFor="cake-message">Message on Cake (optional)</label>
              <input
                id="cake-message"
                type="text"
                placeholder="e.g. Happy Birthday Mom ❤️"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={50}
                style={{
                  width: "100%",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  padding: "0.65rem 1rem",
                  border: "1.5px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  background: "#fff",
                  color: "var(--color-chocolate)",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Delivery */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={optionLabel}>Delivery / Pickup</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {(["pickup", "delivery"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setDeliveryType(opt)}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      padding: "0.45rem 1rem",
                      borderRadius: "var(--radius-full)",
                      border: `1.5px solid ${deliveryType === opt ? "var(--color-green)" : "var(--color-border)"}`,
                      background: deliveryType === opt ? "var(--color-green)" : "transparent",
                      color: deliveryType === opt ? "var(--color-cream)" : "var(--color-chocolate)",
                      cursor: "pointer",
                      transition: "all var(--transition-fast)",
                      textTransform: "capitalize",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Actions */}
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
              {/* Quantity */}
              <div style={{ display: "flex", alignItems: "center", border: "1.5px solid var(--color-border)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease" style={qtyBtn}><Minus size={14} /></button>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", fontWeight: 600, padding: "0 1rem", minWidth: "36px", textAlign: "center" }}>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase" style={qtyBtn}><Plus size={14} /></button>
              </div>

              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  background: "var(--color-green)",
                  color: "var(--color-cream)",
                  border: "none",
                  borderRadius: "var(--radius-full)",
                  padding: "0.75rem 1.25rem",
                  cursor: "pointer",
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  transition: "background var(--transition-base)",
                }}
              >
                <ShoppingBag size={15} />
                Add to Cart — ₹{totalPrice.toLocaleString("en-IN")}
              </button>

              <button
                onClick={() => {
                  handleAddToCart();
                  router.push("/checkout");
                }}
                style={{
                  flex: 1,
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  background: "var(--color-coral)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "var(--radius-full)",
                  padding: "0.75rem 1.25rem",
                  cursor: "pointer",
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  transition: "background var(--transition-base)",
                }}
              >
                <Zap size={15} />
                Buy Now
              </button>

              <button
                onClick={() => { toggle(product.id); showToast(wishlisted ? "Removed from wishlist" : "Added to wishlist", "info"); }}
                aria-label="Add to wishlist"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "1.5px solid var(--color-border)",
                  background: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Heart size={18} fill={wishlisted ? "var(--color-coral)" : "none"} color={wishlisted ? "var(--color-coral)" : "var(--color-muted)"} />
              </button>
            </div>

            {/* Eggless badge */}
            {product.hasEgglessOption && (
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--color-success)", marginBottom: "0.5rem" }}>
                ✓ Eggless option available
              </p>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 500, color: "var(--color-green)", marginBottom: "1.5rem" }}>
              You May Also Like
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem" }} className="related-grid">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .related-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}

const optionLabel: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-sans)",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-muted)",
  marginBottom: "0.5rem",
};

const imgNavBtn: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.9)",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "var(--shadow-sm)",
};

const qtyBtn: React.CSSProperties = {
  width: "40px",
  height: "40px",
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--color-chocolate)",
};
