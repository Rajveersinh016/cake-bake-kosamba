import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Cake & Bake — The Live Bakery. Our story, philosophy and commitment to freshness and quality.",
};

export default function AboutPage() {
  return (
    <div style={{ background: "var(--color-cream)", minHeight: "100vh" }}>
      {/* Hero */}
      <div
        style={{
          background: "var(--color-green)",
          padding: "5rem 0",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
          <p className="eyebrow" style={{ color: "var(--color-blush)", marginBottom: "0.75rem" }}>About Us</p>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 500,
              color: "var(--color-cream)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            More Than a Bakery.
            <br />
            <em style={{ color: "var(--color-blush)", fontStyle: "italic" }}>A Celebration in Every Bite.</em>
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "rgba(248,241,234,0.75)", lineHeight: 1.7 }}>
            At Cake &amp; Bake, we believe that a delicious cake is the heart of every celebration.
          </p>
        </div>
      </div>

      {/* Story */}
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "3rem",
            alignItems: "center",
            marginBottom: "5rem",
          }}
        >
          <div>
            <div style={{ borderRadius: "var(--radius-xl)", overflow: "hidden", aspectRatio: "4/5", background: "var(--color-cream-dark)" }}>
              <img src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&q=85" alt="Cake & Bake bakery team" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div>
            <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Our Story</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 500, color: "var(--color-green)", lineHeight: 1.15, marginBottom: "1.25rem" }}>
              Crafted With Heart. Shared With Joy.
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--color-chocolate-light)", lineHeight: 1.8, marginBottom: "1rem" }}>
              Cake &amp; Bake was born from a simple idea — that every celebration deserves something truly handcrafted. We started with a passion for baking and a commitment to bringing people together through the joy of fresh, beautiful cakes.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--color-chocolate-light)", lineHeight: 1.8, marginBottom: "1rem" }}>
              Today, we serve customers across 5 locations in Gujarat — each one a neighbourhood bakery where freshness, quality and warmth are always on the menu.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--color-muted)", fontStyle: "italic" }}>
              * Detailed brand history to be added by the client.
            </p>
          </div>
        </div>

        {/* Philosophy */}
        <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 5rem" }}>
          <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>Our Philosophy</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 500, color: "var(--color-green)", marginBottom: "1.25rem" }}>
            Fresh. Personal. Crafted With Care.
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--color-chocolate-light)", lineHeight: 1.8 }}>
            We don&apos;t believe in mass production. Every cake that leaves our bakery is made fresh to order, with thoughtfully selected ingredients and crafted by skilled hands. Whether it&apos;s a simple birthday cake or an elaborate custom creation, it receives the same care and attention.
          </p>
        </div>

        {/* Values Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", marginBottom: "5rem" }}>
          {[
            { title: "Freshness First", body: "All our cakes are baked fresh to order — never frozen, never rushed." },
            { title: "Quality Ingredients", body: "We source thoughtfully selected ingredients that go into every creation." },
            { title: "Custom Creations", body: "Your vision matters. We bring your cake ideas to life with skill and care." },
            { title: "For Everyone", body: "Eggless options available across our menu — because everyone deserves great cake." },
          ].map((v) => (
            <div key={v.title} style={{ background: "#fff", borderRadius: "var(--radius-lg)", padding: "1.75rem", border: "1px solid var(--color-border)" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 500, color: "var(--color-green)", marginBottom: "0.6rem" }}>{v.title}</h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--color-muted)", lineHeight: 1.65 }}>{v.body}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: "var(--color-green)", borderRadius: "var(--radius-xl)", padding: "3.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 500, color: "var(--color-cream)", marginBottom: "0.75rem" }}>
            Ready to Order?
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "rgba(248,241,234,0.7)", marginBottom: "2rem" }}>
            Whether it&apos;s a standard order or a custom dream cake — we&apos;re here for every celebration.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <a href="/shop" style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", background: "var(--color-coral)", color: "#fff", padding: "0.85rem 2rem", borderRadius: "var(--radius-full)", textDecoration: "none", minHeight: "44px", display: "inline-flex", alignItems: "center" }}>
              Shop Now
            </a>
            <a href="/custom-cake" style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", border: "1.5px solid rgba(248,241,234,0.4)", color: "var(--color-cream)", padding: "0.85rem 2rem", borderRadius: "var(--radius-full)", textDecoration: "none", minHeight: "44px", display: "inline-flex", alignItems: "center" }}>
              Custom Cake
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
