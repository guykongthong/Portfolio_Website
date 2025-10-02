import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm
                 border-zinc-300 dark:border-zinc-700
                 bg-white/70 dark:bg-zinc-900/50
                 hover:bg-white/90 dark:hover:bg-zinc-900"
      aria-label="Toggle theme"
      type="button"
    >
      <span className="block h-4 w-4 rounded-full bg-zinc-800 dark:bg-yellow-300" />
      {isDark ? "Light mode" : "Dark mode"}
    </button>
  );
}
