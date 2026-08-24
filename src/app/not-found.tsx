import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        background: "var(--color-cream)",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <p className="eyebrow" style={{ marginBottom: "1rem" }}>404</p>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 500,
          color: "var(--color-green)",
          marginBottom: "1rem",
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.95rem",
          color: "var(--color-muted)",
          marginBottom: "2rem",
          maxWidth: "420px",
        }}
      >
        Looks like this page doesn&apos;t exist. Why not explore our cakes instead?
      </p>
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          background: "var(--color-green)",
          color: "var(--color-cream)",
          padding: "0.85rem 2rem",
          borderRadius: "var(--radius-full)",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          minHeight: "44px",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
