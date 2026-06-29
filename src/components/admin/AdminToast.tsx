"use client";

import React, { useState, useCallback } from "react";

export interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
  visible: boolean;
}

export function useAdminToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, visible: false }]);

    // Animate in
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: true } : t))
      );
    }, 50);

    // Animate out after 4 seconds
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 4000);
  }, []);

  return { toasts, showToast };
}

interface AdminToastsProps {
  toasts: Toast[];
}

export function AdminToasts({ toasts }: AdminToastsProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        pointerEvents: "none",
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            background: "rgba(18, 18, 18, 0.95)",
            backdropFilter: "blur(8px)",
            color: "#ffffff",
            padding: "14px 22px",
            borderRadius: "10px",
            borderLeft: `4px solid ${t.type === "success" ? "#a3e635" : "#ef4444"}`,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            opacity: t.visible ? 1 : 0,
            transform: t.visible ? "translateX(0)" : "translateX(100px)",
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            pointerEvents: "auto",
            maxWidth: "320px",
            lineHeight: "1.4",
          }}
        >
          <span style={{ fontSize: "16px", flexShrink: 0 }}>
            {t.type === "success" ? "✔️" : "❌"}
          </span>
          <span style={{ fontWeight: "500" }}>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
