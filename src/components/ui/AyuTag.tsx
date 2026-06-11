import React from "react";

interface AyuTagProps {
  label: string;
  theme?: "dark" | "light" | "glass";
  className?: string;
}

export function AyuTag({ label, theme = "dark", className = "" }: AyuTagProps) {
  const themeClass = `ayu-tag-${theme}`;
  return (
    <span className={`ayu-tag ${themeClass} ${className}`}>
      {label}
    </span>
  );
}
