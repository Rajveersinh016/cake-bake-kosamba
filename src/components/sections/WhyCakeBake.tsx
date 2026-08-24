"use client";
import { motion } from "framer-motion";
import { Leaf, Star, Heart, Egg, Users } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const reasons = [
  {
    icon: <Leaf size={22} />,
    title: "Fresh Ingredients",
    description: "Thoughtfully selected ingredients that go into every creation.",
  },
  {
    icon: <Star size={22} />,
    title: "Crafted With Care",
    description: "Every cake receives individual attention and skill.",
  },
  {
    icon: <Heart size={22} />,
    title: "Made For You",
    description: "Custom creations tailored to your special moments.",
  },
  {
    icon: <Egg size={22} />,
    title: "Eggless Options",
    description: "Delicious options made for everyone to enjoy.",
  },
  {
    icon: <Users size={22} />,
    title: "Local & Trusted",
    description: "Proudly serving our community across 5 locations.",
  },
];

export default function WhyCakeBake() {
  return (
    <section
      style={{
        background: "var(--color-green)",
        padding: "5rem 0",
      }}
      aria-label="Why choose Cake & Bake"
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeading
          eyebrow="Why Choose Us"
          heading="Baked with Intention."
          subtext="Every cake we make carries our promise of quality, care and creativity."
          light
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "2rem",
          }}
        >
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              style={{
                background: "rgba(248,241,234,0.06)",
                border: "1px solid rgba(248,241,234,0.12)",
                borderRadius: "var(--radius-lg)",
                padding: "1.75rem 1.5rem",
                transition: "background var(--transition-base)",
              }}
              whileHover={{ backgroundColor: "rgba(248,241,234,0.1)" }}
            >
              <div
                style={{
                  color: "var(--color-blush)",
                  marginBottom: "1rem",
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: "1px solid rgba(233,164,160,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {r.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  color: "var(--color-cream)",
                  marginBottom: "0.5rem",
                }}
              >
                {r.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  color: "rgba(248,241,234,0.65)",
                  lineHeight: 1.65,
                }}
              >
                {r.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
