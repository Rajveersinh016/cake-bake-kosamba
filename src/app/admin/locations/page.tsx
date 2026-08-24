"use client";
import { useState } from "react";
import { MapPin, Phone, Clock, Store, CheckCircle, ToggleRight, ToggleLeft } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { locations } from "@/data/locations";

export default function AdminLocationsPage() {
  const [storeStatus, setStoreStatus] = useState<Record<string, boolean>>({
    "loc-1": true,
    "loc-2": true,
    "loc-3": true,
    "loc-4": true,
    "loc-5": true,
  });

  const toggleStore = (id: string) => {
    setStoreStatus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <AdminHeader title="Store Locations & Outlets" />

      <main style={{ padding: "2rem", flex: 1, overflowY: "auto" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "var(--color-green)", margin: 0 }}>
            Connected Bakery Outlets ({locations.length})
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "var(--color-muted)", margin: 0 }}>
            Manage online order acceptance and operating hours for each Cake &amp; Bake branch.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {locations.map((loc) => {
            const isOpen = storeStatus[loc.id] ?? true;
            return (
              <div
                key={loc.id}
                style={{
                  background: "#fff",
                  borderRadius: "var(--radius-xl)",
                  border: `1px solid ${loc.isMain ? "var(--color-blush)" : "var(--color-border)"}`,
                  padding: "1.5rem",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-green)", margin: 0 }}>
                        {loc.name}
                      </h3>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-muted)", margin: 0 }}>
                        {loc.city} {loc.isMain && "· Central Kitchen"}
                      </p>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        padding: "0.2rem 0.6rem",
                        borderRadius: "var(--radius-full)",
                        background: isOpen ? "rgba(58,125,68,0.12)" : "rgba(192,57,43,0.12)",
                        color: isOpen ? "var(--color-success)" : "var(--color-error)",
                      }}
                    >
                      {isOpen ? "Accepting Orders" : "Paused"}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem", fontFamily: "var(--font-sans)", fontSize: "0.8rem", color: "var(--color-chocolate-light)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <Clock size={14} color="var(--color-coral)" /> {loc.hours}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <Phone size={14} color="var(--color-coral)" /> {loc.phone}
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--color-chocolate)", fontWeight: 500 }}>
                    Online Ordering Status
                  </span>
                  <button
                    onClick={() => toggleStore(loc.id)}
                    aria-label={`Toggle store status for ${loc.name}`}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {isOpen ? <ToggleRight size={28} color="var(--color-success)" /> : <ToggleLeft size={28} color="var(--color-muted)" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
