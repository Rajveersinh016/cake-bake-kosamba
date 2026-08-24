"use client";
import { motion } from "framer-motion";
import { Leaf, Sparkles, Egg, MousePointer, Truck } from "lucide-react";

const features = [
  { icon: <Leaf size={20} />, title: "Freshly Baked", description: "Made fresh with care every day." },
  { icon: <Sparkles size={20} />, title: "Custom Creations", description: "Your idea, our craft." },
  { icon: <Egg size={20} />, title: "Eggless Options", description: "Made for everyone." },
  { icon: <MousePointer size={20} />, title: "Easy Ordering", description: "Simple online ordering." },
  { icon: <Truck size={20} />, title: "Pickup & Delivery", description: "Convenient for every occasion." },
];

export default function FeatureStrip() {
  return (
    <section
      style={{
        background: "var(--color-green)",
        padding: "2.5rem 0",
      }}
      aria-label="Key features"
    >
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "0.5rem",
              flex: "1 1 140px",
              maxWidth: "180px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(233,164,160,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-blush)",
                marginBottom: "0.35rem",
              }}
            >
              {f.icon}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--color-cream)",
                letterSpacing: "0.02em",
              }}
            >
              {f.title}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.74rem",
                color: "rgba(248,241,234,0.6)",
                lineHeight: 1.5,
              }}
            >
              {f.description}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
