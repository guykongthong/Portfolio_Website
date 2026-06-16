import { profile } from "../data/cv";

const links = [
  { label: "Statement", href: "#statement" },
  { label: "Exhibitions", href: "#exhibitions" },
  { label: "Featured", href: "#featured" },
  { label: "Materials", href: "#materials" },
  { label: "Provenance", href: "#provenance" },
  { label: "Visit", href: "#visit" },
];

/**
 * Sticky gallery masthead: monogram on the left, room directory on the right.
 * Mono type throughout to read like exhibition signage.
 */
export default function Nav() {
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

        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint md:hidden">
          {profile.years.split(" ").pop()}
        </span>
      </div>
    </header>
  );
}
