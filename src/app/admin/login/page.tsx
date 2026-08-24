"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Key, ShieldCheck, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: "var(--color-green-dark)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
        Loading Admin Access…
      </div>
    }>
      <LoginFormContent />
    </Suspense>
  );
}

function LoginFormContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginAsAdmin, isAdmin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isUnauthorizedAttempt = searchParams.get("unauthorized") === "true";

  useEffect(() => {
    if (isAdmin) {
      router.replace("/admin");
    }
  }, [isAdmin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginAsAdmin(email, password);
      if (res.success) {
        router.push("/admin");
      } else {
        setError(res.error || "Authentication failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-green-dark)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: "#fff",
          borderRadius: "var(--radius-xl)",
          padding: "2.5rem",
          maxWidth: "420px",
          width: "100%",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        {/* Brand */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "var(--radius-md)",
              background: "var(--color-green)",
              color: "var(--color-cream)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: "1.4rem",
            }}
          >
            C&amp;B
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.6rem",
              fontWeight: 600,
              color: "var(--color-green)",
              margin: "0 0 0.35rem 0",
            }}
          >
            Admin Sign In
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              color: "var(--color-muted)",
              margin: 0,
            }}
          >
            Cake &amp; Bake — Bakery Owner Console
          </p>
        </div>

        {/* Security Warning banner if intercepted */}
        {isUnauthorizedAttempt && (
          <div
            style={{
              background: "rgba(217,122,120,0.12)",
              border: "1px solid var(--color-coral)",
              borderRadius: "var(--radius-md)",
              padding: "0.75rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              color: "var(--color-error)",
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>Access denied. Authenticate as an admin to proceed.</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div
            style={{
              background: "rgba(192,57,43,0.1)",
              border: "1px solid var(--color-error)",
              borderRadius: "var(--radius-md)",
              padding: "0.75rem",
              marginBottom: "1.25rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              color: "var(--color-error)",
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              htmlFor="admin-email"
              style={{
                display: "block",
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                marginBottom: "0.35rem",
              }}
            >
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={16}
                color="var(--color-muted)"
                style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                id="admin-email"
                type="email"
                required
                placeholder="admin@cakeandbake.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.88rem",
                  padding: "0.7rem 1rem 0.7rem 2.4rem",
                  borderRadius: "var(--radius-md)",
                  border: "1.5px solid var(--color-border)",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "1.75rem" }}>
            <label
              htmlFor="admin-password"
              style={{
                display: "block",
                fontFamily: "var(--font-sans)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                marginBottom: "0.35rem",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Key
                size={16}
                color="var(--color-muted)"
                style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                id="admin-password"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.88rem",
                  padding: "0.7rem 1rem 0.7rem 2.4rem",
                  borderRadius: "var(--radius-md)",
                  border: "1.5px solid var(--color-border)",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              background: "var(--color-green)",
              color: "var(--color-cream)",
              border: "none",
              borderRadius: "var(--radius-full)",
              padding: "0.85rem",
              cursor: loading ? "wait" : "pointer",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            {loading ? "Authenticating…" : "SIGN IN"}
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center", borderTop: "1px solid var(--color-border)", paddingTop: "1rem" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "var(--color-muted)", margin: 0 }}>
            Demo Credentials: <code>admin@cakeandbake.in</code> / <code>admin123</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
