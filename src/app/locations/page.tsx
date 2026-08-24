import type { Metadata } from "next";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import { locations } from "@/data/locations";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Locations",
  description: "Find your nearest Cake & Bake — The Live Bakery across 5 locations in Gujarat.",
};

export default function LocationsPage() {
  return (
    <div style={{ background: "var(--color-cream)", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "var(--color-green)", padding: "3rem 0 2.5rem", textAlign: "center" }}>
        <p className="eyebrow" style={{ color: "var(--color-blush)", marginBottom: "0.5rem" }}>Our Locations</p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "var(--color-cream)", marginBottom: "0.75rem" }}>
          Find Your Nearest Cake &amp; Bake
        </h1>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9rem", color: "rgba(248,241,234,0.7)" }}>
          5 locations across Gujarat — freshly baked at every one.
        </p>
      </div>

      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "3.5rem 1.5rem" }}>
        {/* Map embed area */}
        <div
          style={{
            borderRadius: "var(--radius-xl)",
            overflow: "hidden",
            height: "320px",
            marginBottom: "3rem",
            background: "var(--color-cream-dark)",
            border: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <MapPin size={36} color="var(--color-green)" strokeWidth={1.5} />
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--color-green)" }}>
            Interactive Map
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--color-muted)", textAlign: "center", maxWidth: "300px" }}>
            Google Maps embed will be added here in the production version.
          </p>
          <a
            href={siteConfig.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", background: "var(--color-green)", color: "var(--color-cream)", padding: "0.65rem 1.5rem", borderRadius: "var(--radius-full)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            Open in Google Maps <ExternalLink size={13} />
          </a>
        </div>

        {/* Location Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {locations.map((loc) => (
            <div
              key={loc.id}
              style={{
                background: "#fff",
                borderRadius: "var(--radius-lg)",
                border: `1px solid ${loc.isMain ? "var(--color-blush)" : "var(--color-border)"}`,
                padding: "1.5rem",
                position: "relative",
                boxShadow: loc.isMain ? "var(--shadow-sm)" : "none",
              }}
            >
              {loc.isMain && (
                <span style={{ position: "absolute", top: "1rem", right: "1rem", fontFamily: "var(--font-sans)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", background: "var(--color-green)", color: "var(--color-cream)", padding: "0.2rem 0.6rem", borderRadius: "var(--radius-full)" }}>
                  Main
                </span>
              )}
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 500, color: "var(--color-green)", marginBottom: "1rem" }}>
                {loc.name}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.25rem" }}>
                <InfoRow icon={<MapPin size={14} />} text={loc.city} />
                <InfoRow icon={<Clock size={14} />} text={loc.hours} />
                <InfoRow icon={<Phone size={14} />} text={loc.phone} />
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-muted)", marginBottom: "1rem", fontStyle: "italic" }}>
                {loc.address}
              </p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <a
                  href={`tel:${loc.phone.replace(/\s/g, "")}`}
                  style={{ flex: 1, fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", background: "var(--color-green)", color: "var(--color-cream)", padding: "0.6rem 0", borderRadius: "var(--radius-full)", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}
                >
                  <Phone size={12} /> Call
                </a>
                <a
                  href={loc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ flex: 1, fontFamily: "var(--font-sans)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", border: "1.5px solid var(--color-green)", color: "var(--color-green)", padding: "0.6rem 0", borderRadius: "var(--radius-full)", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}
                >
                  <ExternalLink size={12} /> Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.83rem", color: "var(--color-chocolate-light)" }}>
      <span style={{ color: "var(--color-coral)", marginTop: "1px", flexShrink: 0 }}>{icon}</span>
      {text}
    </div>
  );
}
