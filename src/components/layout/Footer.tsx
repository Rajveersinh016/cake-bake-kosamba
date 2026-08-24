"use client";
import Link from "next/link";
import { Camera, Share2, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/lib/config";

const shopLinks = [
  { label: "All Cakes", href: "/shop" },
  { label: "Custom Cakes", href: "/custom-cake" },
  { label: "Desserts & Pastries", href: "/shop?category=pastries" },
  { label: "Snacks", href: "/shop?category=snacks" },
  { label: "Gift Hampers", href: "/shop?category=gift-hampers" },
  { label: "Festival Specials", href: "/shop?category=festival" },
];

const infoLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Story", href: "/about#story" },
  { label: "Gallery", href: "/gallery" },
  { label: "Locations", href: "/locations" },
  { label: "FAQ", href: "/contact#faq" },
];

const careLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping & Delivery", href: "/contact#delivery" },
  { label: "Terms & Conditions", href: "/contact#terms" },
  { label: "Privacy Policy", href: "/contact#privacy" },
  { label: "Refund Policy", href: "/contact#refund" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-green)",
        color: "var(--color-cream)",
        paddingTop: "4rem",
      }}
    >
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "3rem 2rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(248,241,234,0.12)",
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: "span 1" }}>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.6rem",
                fontWeight: 600,
                color: "var(--color-cream)",
                lineHeight: 1,
                marginBottom: "0.3rem",
              }}
            >
              cake &amp; bake
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-blush)",
                marginBottom: "1.25rem",
                fontWeight: 500,
              }}
            >
              The Live Bakery
            </div>
            <p
              style={{
                fontSize: "0.82rem",
                color: "rgba(248,241,234,0.65)",
                lineHeight: 1.7,
                maxWidth: "200px",
              }}
            >
              Fresh cakes, desserts and custom creations crafted for every celebration.
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginTop: "1.5rem",
              }}
            >
              {[
                { href: siteConfig.instagram, icon: <Camera size={16} />, label: "Instagram" },
                { href: siteConfig.facebook, icon: <Share2 size={16} />, label: "Facebook" },
                { href: siteConfig.whatsapp, icon: <MessageCircle size={16} />, label: "WhatsApp" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: "1px solid rgba(248,241,234,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-cream)",
                    transition: "border-color var(--transition-base), background var(--transition-base)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-blush)";
                    e.currentTarget.style.background = "rgba(233,164,160,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(248,241,234,0.2)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <FooterHeading>Shop</FooterHeading>
            {shopLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>
            ))}
          </div>

          {/* Info */}
          <div>
            <FooterHeading>Information</FooterHeading>
            {infoLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>
            ))}
          </div>

          {/* Care */}
          <div>
            <FooterHeading>Customer Care</FooterHeading>
            {careLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>
            ))}
          </div>

          {/* Contact */}
          <div>
            <FooterHeading>Get In Touch</FooterHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <ContactItem icon={<Phone size={13} />} text={siteConfig.phone} />
              <ContactItem icon={<Mail size={13} />} text={siteConfig.email} />
              <ContactItem icon={<MapPin size={13} />} text="5 Locations in Gujarat" />
            </div>
            <a
              href={siteConfig.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "1.25rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-blush)",
                textDecoration: "none",
                borderBottom: "1px solid var(--color-blush)",
                paddingBottom: "1px",
              }}
            >
              Find Locations →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            padding: "1.25rem 0",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "rgba(248,241,234,0.4)",
              fontFamily: "var(--font-sans)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>© {new Date().getFullYear()} Cake &amp; Bake — The Live Bakery. All rights reserved.</span>
            <Link
              href="/admin"
              title="Bakery Owner Portal"
              aria-label="Owner Access"
              style={{
                color: "rgba(248,241,234,0.25)",
                textDecoration: "none",
                fontSize: "0.68rem",
                marginLeft: "0.4rem",
                transition: "color var(--transition-fast)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-blush)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,241,234,0.25)")}
            >
              • Owner Access
            </Link>
          </p>
          <p
            style={{
              fontSize: "0.7rem",
              color: "rgba(248,241,234,0.3)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Demo website — Not live production
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "0.65rem",
        fontWeight: 600,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "rgba(248,241,234,0.5)",
        marginBottom: "1rem",
      }}
    >
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        fontFamily: "var(--font-sans)",
        fontSize: "0.83rem",
        color: "rgba(248,241,234,0.7)",
        marginBottom: "0.55rem",
        textDecoration: "none",
        transition: "color var(--transition-base)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-cream)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,241,234,0.7)")}
    >
      {children}
    </Link>
  );
}

function ContactItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.5rem",
        color: "rgba(248,241,234,0.65)",
        fontSize: "0.82rem",
        fontFamily: "var(--font-sans)",
      }}
    >
      <span style={{ opacity: 0.6, marginTop: "2px", flexShrink: 0 }}>{icon}</span>
      <span>{text}</span>
    </div>
  );
}
