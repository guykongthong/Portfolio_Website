import { useState, useEffect, useMemo } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const getInitial = (): Theme => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved === "dark" || saved === "light") return saved as Theme;
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    }
    return "light";
  };

  const [theme, setTheme] = useState<Theme>(() => getInitial());

  // apply to <html> and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // react to OS theme changes if user hasn't chosen manually
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const saved = localStorage.getItem("theme");
    const onChange = () => {
      if (!saved) setTheme(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return {
    dark: theme === "dark",
    theme,
    setTheme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    className: useMemo(() => (theme === "dark" ? "dark" : ""), [theme]),
  };
}