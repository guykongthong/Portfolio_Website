import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Statement", href: "#statement" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Materials", href: "#materials" },
  { label: "Provenance", href: "#provenance" },
  { label: "Activities", href: "#activities" },
  { label: "Visit", href: "#visit" },
];

/**
 * Sticky gallery masthead: monogram on the left, room directory on the right.
 * Mono type throughout to read like exhibition signage. Below `md`, the link
 * list collapses into a hamburger-triggered dropdown panel.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline/60 bg-ink/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          <span className="font-mono text-[12px] uppercase tracking-[0.28em] text-bone">
            V. Kongthong
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-ash transition-colors duration-300 hover:text-bone"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="text-bone md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-hairline/60 bg-ink px-6 py-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-hairline/40 py-3 font-mono text-[12px] uppercase tracking-[0.2em] text-ash last:border-none"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
