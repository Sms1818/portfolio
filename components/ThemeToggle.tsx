"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme | null) || "system";
    setTheme(saved);
    apply(saved);
  }, []);

  function apply(next: Theme) {
    const isDark = next === "dark" || (next === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }

  function cycle() {
    const next: Theme = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(next);
    localStorage.setItem("theme", next);
    apply(next);
  }

  return <button className="themeToggle" onClick={cycle} aria-label={`Theme: ${theme}`}>{theme === "light" ? "☀" : theme === "dark" ? "☾" : "◐"}</button>;
}
