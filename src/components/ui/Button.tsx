"use client";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "dark";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  as?: "button" | "a";
  href?: string;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "var(--color-green)",
    color: "var(--color-cream)",
    border: "1.5px solid var(--color-green)",
  },
  dark: {
    background: "var(--color-chocolate)",
    color: "var(--color-cream)",
    border: "1.5px solid var(--color-chocolate)",
  },
  secondary: {
    background: "var(--color-coral)",
    color: "#fff",
    border: "1.5px solid var(--color-coral)",
  },
  ghost: {
    background: "transparent",
    color: "var(--color-green)",
    border: "1.5px solid transparent",
  },
  outline: {
    background: "transparent",
    color: "var(--color-green)",
    border: "1.5px solid var(--color-green)",
  },
};

const sizes: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: "0.45rem 1rem", fontSize: "0.72rem" },
  md: { padding: "0.65rem 1.5rem", fontSize: "0.78rem" },
  lg: { padding: "0.85rem 2rem", fontSize: "0.82rem" },
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  style,
  ...props
}: ButtonProps) {
  const base: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    borderRadius: "var(--radius-full)",
    cursor: "pointer",
    transition: "all var(--transition-base)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    minHeight: "44px",
    width: fullWidth ? "100%" : undefined,
    textDecoration: "none",
    ...variants[variant],
    ...sizes[size],
    ...style,
  };

  return (
    <button style={base} {...props}>
      {children}
    </button>
  );
}
