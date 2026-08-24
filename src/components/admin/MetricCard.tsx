import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: React.ReactNode;
  trend?: string;
  isPositive?: boolean;
}

export default function MetricCard({ title, value, subtext, icon, trend, isPositive = true }: MetricCardProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "var(--radius-lg)",
        padding: "1.25rem 1.5rem",
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            marginBottom: "0.4rem",
          }}
        >
          {title}
        </p>
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1.6rem",
            fontWeight: 700,
            color: "var(--color-green)",
            lineHeight: 1.1,
            marginBottom: "0.35rem",
          }}
        >
          {value}
        </h3>
        {subtext && (
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              color: "var(--color-chocolate-light)",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            {trend && (
              <span
                style={{
                  fontWeight: 700,
                  color: isPositive ? "var(--color-success)" : "var(--color-error)",
                }}
              >
                {trend}
              </span>
            )}
            {subtext}
          </p>
        )}
      </div>

      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "var(--radius-md)",
          background: "rgba(24,63,58,0.06)",
          color: "var(--color-green)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
    </div>
  );
}
