import { useCallback, useEffect, useState } from "react";

// Helpers for canvas code that needs the current @theme colors. Canvas can't
// use var(--x) directly, so we read the resolved value off <html>.

export function readToken(name: string) {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** Calls cb whenever data-theme on <html> changes. Returns an unsubscribe fn. */
export function onThemeChange(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

export type Theme = "light" | "dark";

function current(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/**
 * Light/dark mode. index.html sets data-theme before first paint (saved choice,
 * else the system setting). Picking a mode saves it; until then we keep
 * following the system if it changes while the page is open.
 */
export function useTheme() {
  const [theme, setState] = useState<Theme>(current);

  useEffect(() => {
    const off = onThemeChange(() => setState(current()));
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("theme");
      } catch {
        // storage blocked, just follow the system
      }
      if (!saved) document.documentElement.dataset.theme = mq.matches ? "dark" : "light";
    };
    mq.addEventListener("change", onSystem);
    return () => {
      off();
      mq.removeEventListener("change", onSystem);
    };
  }, []);

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("theme", t);
    } catch {
      // fine, it just won't stick across visits
    }
  }, []);

  return { theme, setTheme };
}
