"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <span className="mono text-[11px] text-faint">Theme</span>;
  }

  const current = theme ?? "system";
  const cycle = current === "system" ? "light" : current === "light" ? "dark" : "system";
    const label = current === "system" ? "System" : current === "light" ? "Light" : "Dark";

  return (
    <button
      type="button"
      suppressHydrationWarning
      onClick={() => setTheme(cycle)}
      className="mono text-[11px] tracking-wide text-muted hover:text-fg"
      aria-label={`Theme: ${label}. Click to switch.`}
    >
      {label}
    </button>
  );
}
