"use client";
import { useState } from "react";
import { Bell, Search, MapPin, Store, ChevronDown } from "lucide-react";
import { locations } from "@/data/locations";

export default function AdminHeader({ title }: { title: string }) {
  const [selectedBranch, setSelectedBranch] = useState("All Outlets (5)");
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header
      style={{
        height: "70px",
        background: "#fff",
        borderBottom: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Title */}
      <div>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.4rem",
            fontWeight: 600,
            color: "var(--color-green)",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.72rem",
            color: "var(--color-muted)",
          }}
        >
          Cake &amp; Bake Live Dashboard · Today, {new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* Right Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        {/* Branch Selector */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              fontWeight: 500,
              color: "var(--color-chocolate)",
              background: "var(--color-cream)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-full)",
              padding: "0.45rem 0.95rem",
              cursor: "pointer",
            }}
          >
            <MapPin size={14} color="var(--color-green)" />
            <span>{selectedBranch}</span>
            <ChevronDown size={14} color="var(--color-muted)" />
          </button>

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 0.35rem)",
                right: 0,
                width: "220px",
                background: "#fff",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-md)",
                padding: "0.4rem",
                zIndex: 200,
              }}
            >
              <button
                onClick={() => { setSelectedBranch("All Outlets (5)"); setShowDropdown(false); }}
                style={branchItemStyle(selectedBranch === "All Outlets (5)")}
              >
                All Outlets (5)
              </button>
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => { setSelectedBranch(loc.name); setShowDropdown(false); }}
                  style={branchItemStyle(selectedBranch === loc.name)}
                >
                  {loc.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button
          aria-label="View notifications"
          style={{
            position: "relative",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "var(--color-cream)",
            border: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--color-chocolate)",
            cursor: "pointer",
          }}
        >
          <Bell size={18} />
          <span
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--color-coral)",
            }}
          />
        </button>
      </div>
    </header>
  );
}

const branchItemStyle = (active: boolean): React.CSSProperties => ({
  display: "block",
  width: "100%",
  textAlign: "left",
  fontFamily: "var(--font-sans)",
  fontSize: "0.78rem",
  fontWeight: active ? 600 : 400,
  padding: "0.45rem 0.75rem",
  borderRadius: "var(--radius-sm)",
  border: "none",
  background: active ? "rgba(24,63,58,0.06)" : "transparent",
  color: active ? "var(--color-green)" : "var(--color-chocolate)",
  cursor: "pointer",
});
