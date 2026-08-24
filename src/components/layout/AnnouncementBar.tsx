"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

const messages = siteConfig.announcements;

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  // Cycle announcements every 4 s
  // (simple: just use static for SSR safety, cycle on client)
  if (!visible) return null;

  const msg = messages[idx % messages.length];

  return (
    <div
      className="announcement-bar"
      style={{
        background: "var(--color-green)",
        color: "var(--color-cream)",
        padding: "0.45rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        position: "relative",
        zIndex: 100,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.68rem",
          letterSpacing: "0.14em",
          fontWeight: 500,
          textTransform: "uppercase",
          display: "flex",
          gap: "1.5rem",
          alignItems: "center",
        }}
      >
        {messages.map((m, i) => (
          <span key={i} style={{ opacity: i === idx % messages.length ? 1 : 0.45 }}>
            {m}
          </span>
        ))}
      </span>
      <button
        onClick={() => setVisible(false)}
        aria-label="Dismiss announcement"
        style={{
          position: "absolute",
          right: "1rem",
          background: "none",
          border: "none",
          color: "var(--color-cream)",
          opacity: 0.6,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: "0.25rem",
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
