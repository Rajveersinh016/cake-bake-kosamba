interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subtext?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  heading,
  subtext,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      style={{
        textAlign: centered ? "center" : "left",
        marginBottom: "3rem",
      }}
    >
      {eyebrow && (
        <p
          className="eyebrow"
          style={{
            marginBottom: "0.75rem",
            color: light ? "var(--color-blush)" : "var(--color-coral)",
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 500,
          color: light ? "var(--color-cream)" : "var(--color-green)",
          lineHeight: 1.15,
          maxWidth: centered ? "700px" : undefined,
          margin: centered ? "0 auto" : undefined,
        }}
      >
        {heading}
      </h2>
      {subtext && (
        <p
          style={{
            marginTop: "0.9rem",
            fontSize: "0.95rem",
            color: light ? "rgba(248,241,234,0.7)" : "var(--color-muted)",
            maxWidth: centered ? "560px" : undefined,
            margin: centered ? "0.9rem auto 0" : "0.9rem 0 0",
            lineHeight: 1.7,
          }}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}
