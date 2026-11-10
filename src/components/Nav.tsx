import { useEffect, useRef, useState } from "react";
import { contacts, profile } from "../data/cv";
import { useTheme } from "../lib/theme";

// the floor plan: short label for the desktop bar, full room name for the menu sheet
const rooms = [
  { id: "top", n: "00", short: "", name: "Entrance" },
  { id: "statement", n: "01", short: "Statement", name: "Statement" },
  { id: "work", n: "02", short: "Work", name: "Work Experience" },
  { id: "projects", n: "03", short: "Projects", name: "Projects" },
  { id: "materials", n: "04", short: "Materials", name: "Materials" },
  { id: "education", n: "05", short: "Education", name: "Education" },
  { id: "activities", n: "06", short: "Awards", name: "Activities and Awards" },
  { id: "visit", n: "07", short: "Visit", name: "Visit" },
];

const initials = profile.name.first[0] + profile.name.last[0];
const email = contacts.find((c) => c.label === "Email");

/** Pixel sun and moon. The button shows the mode you will switch to, so it reads as a theme switch. */
function ModeIcon({ to }: { to: "light" | "dark" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 16 16" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      {to === "light" ? (
        <>
          <rect x="5" y="5" width="6" height="6" />
          <rect x="6" y="4" width="4" height="8" />
          <rect x="4" y="6" width="8" height="4" />
          <rect x="7" y="0" width="2" height="2" />
          <rect x="7" y="14" width="2" height="2" />
          <rect x="0" y="7" width="2" height="2" />
          <rect x="14" y="7" width="2" height="2" />
          <rect x="2" y="2" width="2" height="2" />
          <rect x="12" y="2" width="2" height="2" />
          <rect x="2" y="12" width="2" height="2" />
          <rect x="12" y="12" width="2" height="2" />
        </>
      ) : (
        <path d="M4 2h3v1h-3zM3 3h3v1h-3zM2 4h3v1h-3zM2 5h3v1h-3zM1 6h4v1h-4zM1 7h4v1h-4zM1 8h5v1h-5zM1 9h6v1h-6zM2 10h6v1h-6zM2 11h11v1h-11zM3 12h9v1h-9zM4 13h7v1h-7z" />
      )}
    </svg>
  );
}

/** Which room is in view, by watching a band across the upper middle of the screen. */
function useActiveRoom() {
  const [active, setActive] = useState("top");
  useEffect(() => {
    const els = rooms.map((r) => document.getElementById(r.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

/**
 * Sticky wayfinding bar. Transparent over the hero, then a solid surface with
 * a hairline once you scroll 24px. The coral dot marks the room in view (never
 * hover, so touch loses nothing). Below 1024px the links collapse into a
 * Menu button that opens the floor plan as a full-screen sheet, which traps
 * focus, closes on Escape / Close / picking a room, and hands focus back.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveRoom();
  const { theme, setTheme } = useTheme();
  const menuBtn = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // sheet: lock page scroll, trap Tab, Escape closes, focus goes back to Menu
  useEffect(() => {
    if (!open) {
      if (wasOpen.current) menuBtn.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const root = sheet.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(root?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    // the sheet only exists below lg; if the window grows past it, close
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-150 ${
        solid ? "border-line bg-surface" : "border-transparent bg-transparent"
      }`}
    >
      <div className="flex h-16 items-center justify-between gap-6 px-4 lg:h-[72px] lg:px-8">
        <a href="#top" className="flex min-h-11 items-center gap-3" aria-label={`${profile.name.first} ${profile.name.last}, back to top`}>
          <span aria-hidden="true" className="pixel-tile grid h-9 w-9 place-items-center bg-fg font-display text-base font-semibold text-bg">
            {initials}
          </span>
          <span aria-hidden="true" className="hidden font-label text-label uppercase tracking-[0.06em] xl:inline">
            {profile.name.first} {profile.name.last}
          </span>
        </a>

        <nav aria-label="Rooms" className="hidden items-center gap-6 lg:flex xl:gap-7">
          {rooms
            .filter((r) => r.short)
            .map((r) => {
              const on = active === r.id;
              return (
                <a
                  key={r.id}
                  href={`#${r.id}`}
                  aria-current={on ? "location" : undefined}
                  className={`flex min-h-11 items-center gap-2 border-b-2 border-transparent font-label text-label uppercase tracking-[0.06em] transition-colors duration-150 hover:border-ink hover:text-fg ${
                    on ? "text-fg" : "text-fg-2"
                  }`}
                >
                  {on && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />}
                  {r.short}
                </a>
              );
            })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-11 w-11 place-items-center border border-line bg-surface text-fg transition-colors duration-150 hover:border-line-strong"
          >
            <ModeIcon to={theme === "dark" ? "light" : "dark"} />
          </button>
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="floor-plan"
            className="flex h-11 items-center gap-2.5 border border-line-strong bg-surface px-3.5 font-label text-label uppercase tracking-[0.06em] text-fg lg:hidden"
          >
            <svg width="14" height="12" viewBox="0 0 14 12" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
              <rect x="0" y="0" width="14" height="2" />
              <rect x="0" y="5" width="14" height="2" />
              <rect x="0" y="10" width="14" height="2" />
            </svg>
            Menu
          </button>
        </div>
      </div>

      {open && (
        <div
          ref={sheet}
          id="floor-plan"
          role="dialog"
          aria-modal="true"
          aria-label="Floor plan"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-bg lg:hidden"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line bg-surface px-4">
            <span aria-hidden="true" className="pixel-tile grid h-9 w-9 place-items-center bg-fg font-display text-base font-semibold text-bg">
              {initials}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-11 items-center gap-2.5 border border-line-strong bg-surface px-3.5 font-label text-label uppercase tracking-[0.06em] text-fg"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
                <path d="M0 0h2v2h2v2h4V2h2V0h2v2h-2v2H8v4h2v2h2v2h-2v-2H8V8H4v2H2v2H0v-2h2V8h2V4H2V2H0z" />
              </svg>
              Close
            </button>
          </div>

          <p className="mx-4 mt-6 font-label text-label uppercase tracking-[0.06em] text-fg-2">Floor plan</p>
          <ol className="mx-4 mt-2 flex flex-col">
            {rooms.map((r) => {
              const on = active === r.id;
              return (
                <li key={r.id}>
                  <a
                    href={`#${r.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={on ? "location" : undefined}
                    className="grid min-h-[52px] grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-2 border-b border-line active:bg-surface-2"
                  >
                    <span className="font-label text-label text-fg-2">{r.n}</span>
                    <span className="font-display text-[22px] font-medium leading-tight">{r.name}</span>
                    {on ? <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" /> : <span />}
                  </a>
                </li>
              );
            })}
          </ol>

          <div className="mx-4 mb-6 mt-auto flex flex-col gap-4 pt-8">
            <div role="group" aria-label="Colour mode" className="grid grid-cols-2 border border-line-strong">
              {(["light", "dark"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={theme === m}
                  onClick={() => setTheme(m)}
                  className={`flex h-11 items-center justify-center gap-2 font-label text-label uppercase tracking-[0.06em] ${
                    theme === m ? "bg-fg text-bg" : "text-fg-2"
                  }`}
                >
                  <ModeIcon to={m} />
                  {m}
                </button>
              ))}
            </div>
            {email?.href && (
              <a href={email.href} className="w-fit text-[14px] font-medium underline underline-offset-[3px]">
                {email.value}
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
