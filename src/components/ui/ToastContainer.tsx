"use client";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { useToast, ToastType } from "@/context/ToastContext";

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={16} />,
  error: <XCircle size={16} />,
  info: <Info size={16} />,
};

const colors: Record<ToastType, string> = {
  success: "var(--color-success)",
  error: "var(--color-error)",
  info: "var(--color-green)",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Notifications"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        pointerEvents: "none",
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            style={{
              background: "#fff",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-lg)",
              padding: "0.75rem 1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              minWidth: "260px",
              maxWidth: "360px",
              pointerEvents: "all",
              borderLeft: `3px solid ${colors[toast.type]}`,
            }}
          >
            <span style={{ color: colors[toast.type], flexShrink: 0 }}>
              {icons[toast.type]}
            </span>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.85rem",
                color: "var(--color-chocolate)",
                flex: 1,
              }}
            >
              {toast.message}
            </span>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-muted)",
                padding: "0",
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
