"use client";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const defaultSize = product.sizes[1] ?? product.sizes[0];
    addItem({
      id: `${product.id}-${defaultSize.label}-egg`,
      productId: product.id,
      name: product.name,
      image: product.images[0],
      price: defaultSize.price,
      size: defaultSize.label,
      weight: defaultSize.weight,
      eggOption: product.hasEgglessOption ? "Egg" : "Standard",
      quantity: 1,
      slug: product.slug,
    });
    showToast(`${product.name} added to cart!`, "success");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product.id);
    showToast(
      wishlisted ? "Removed from wishlist" : "Added to wishlist",
      "info"
    );
  };

  return (
    <Link href={`/shop/${product.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <article
        style={{
          background: "#fff",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          border: "1px solid var(--color-border)",
          transition: "all var(--transition-base)",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            aspectRatio: "4/3",
            background: "var(--color-cream-dark)",
            overflow: "hidden",
          }}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s ease",
            }}
            onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.04)")}
            onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
          />

          {/* Badges */}
          <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem", display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
            {product.isBestseller && (
              <Badge text="Bestseller" color="var(--color-green)" />
            )}
            {product.isNew && (
              <Badge text="New" color="var(--color-coral)" />
            )}
            {product.isEggless && (
              <Badge text="Eggless" color="#5a8a5a" />
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            style={{
              position: "absolute",
              top: "0.75rem",
              right: "0.75rem",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#fff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow-sm)",
              transition: "transform var(--transition-fast)",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.1)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
          >
            <Heart
              size={15}
              fill={wishlisted ? "var(--color-coral)" : "none"}
              color={wishlisted ? "var(--color-coral)" : "var(--color-muted)"}
            />
          </button>
        </div>

        {/* Info */}
        <div style={{ padding: "1rem" }}>
          {/* Category */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-coral)",
              marginBottom: "0.3rem",
            }}
          >
            {product.subcategory ?? product.category}
          </p>

          {/* Name */}
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1rem",
              fontWeight: 500,
              color: "var(--color-green)",
              marginBottom: "0.25rem",
              lineHeight: 1.25,
            }}
          >
            {product.name}
          </h3>

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              color: "var(--color-muted)",
              marginBottom: "0.75rem",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as any,
              overflow: "hidden",
            }}
          >
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.75rem" }}>
            <Star size={12} fill="var(--color-warning)" color="var(--color-warning)" />
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-chocolate)" }}>
              {product.rating}
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-muted)" }}>
              ({product.reviewCount})
            </span>
          </div>

          {/* Price + CTA */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
            <div>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.7rem", color: "var(--color-muted)" }}>From </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 700, color: "var(--color-green)" }}>
                ₹{product.basePrice.toLocaleString("en-IN")}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              aria-label={`Add ${product.name} to cart`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                background: "var(--color-green)",
                color: "var(--color-cream)",
                border: "none",
                borderRadius: "var(--radius-full)",
                padding: "0.45rem 0.9rem",
                cursor: "pointer",
                minHeight: "36px",
                transition: "background var(--transition-base)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-green-dark)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--color-green)")}
            >
              <ShoppingBag size={13} />
              Add
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "0.6rem",
        fontWeight: 600,
        letterSpacing: "0.07em",
        textTransform: "uppercase",
        background: color,
        color: "#fff",
        padding: "0.15rem 0.5rem",
        borderRadius: "var(--radius-full)",
      }}
    >
      {text}
    </span>
  );
}
