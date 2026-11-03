import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Project } from "../data/cv";
import ProjectMedia from "./ProjectMedia";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const STACK_PREVIEW = 3;

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function slugFromHash() {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace(/^#/, "");
  return hash.startsWith("other-") ? hash.slice("other-".length) : null;
}

/** The expanded write-up for one row: media (if any), meta, full stack, bullets, link. */
function OtherProjectPanel({ p }: { p: Project }) {
  const portrait = p.mediaOrientation === "portrait";

  return (
    <div
      className={`grid gap-8 pb-8 pt-2 ${
        p.media.length > 0 && portrait ? "md:grid-cols-[minmax(0,18rem)_1fr]" : ""
      }`}
    >
      {p.media.length > 0 && (
        <ProjectMedia media={p.media} name={p.name} orientation={p.mediaOrientation} />
      )}

      <div className="flex min-w-0 flex-col">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="w-fit rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            {p.tag}
          </span>
          <p className="font-mono text-[12px] tracking-[0.08em] text-ash">{p.meta}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-hairline px-3 py-1 font-mono text-[11px] tracking-[0.04em] text-ash"
            >
              {s}
            </span>
          ))}
        </div>

        <ul className="mt-6 flex flex-col gap-4">
          {p.bullets.map((b, j) => (
            <li key={j} className="flex gap-4 text-[15px] leading-relaxed text-ash">
              <span className="mt-1 font-mono text-[11px] text-faint">
                {String(j + 1).padStart(2, "0")}
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {p.liveHref && (
          <a
            href={p.liveHref}
            target="_blank"
            rel="noreferrer"
            className="mt-6 w-fit border-b border-accent/60 font-mono text-[11px] uppercase tracking-[0.2em] text-accent transition-colors duration-300 hover:border-bone hover:text-bone"
          >
            {p.liveLabel ?? "View project"} ↗
          </a>
        )}
      </div>
    </div>
  );
}

/**
 * The smaller pieces in the back room: a list of wall labels, one per
 * project, each opening in place to show the full piece. One label is open
 * at a time, and #other-<slug> opens (and scrolls to) a given piece.
 */
export default function OtherProjects({ items }: { items: Project[] }) {
  const reduce = useReducedMotion();
  const slugs = items.map((p) => slugify(p.name));
  const [open, setOpen] = useState<string | null>(() => {
    const s = slugFromHash();
    return s && slugs.includes(s) ? s : null;
  });

  useEffect(() => {
    const scrollToHash = () => {
      const s = slugFromHash();
      const row = s && document.getElementById(`other-${s}`);
      if (!row) return;
      setOpen(s);
      row.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    };
    if (slugFromHash()) scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [reduce]);

  const toggle = (slug: string) => {
    const next = open === slug ? null : slug;
    setOpen(next);
    const url = window.location.pathname + window.location.search;
    if (next) window.history.replaceState(null, "", `#other-${next}`);
    else if (slugFromHash() === slug) window.history.replaceState(null, "", url);
  };

  return (
    <ul className="border-t border-hairline">
      {items.map((p, i) => {
        const slug = slugs[i];
        const isOpen = open === slug;
        const buttonId = `other-${slug}-label`;
        const panelId = `other-${slug}-panel`;
        const stackSummary = p.stack.slice(0, STACK_PREVIEW).join(" · ") + (p.stack.length > STACK_PREVIEW ? " · …" : "");

        return (
          <li key={p.name} id={`other-${slug}`} className="scroll-mt-24 border-b border-hairline">
            <h4>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(slug)}
                className="group flex w-full items-start gap-4 py-5 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:items-baseline"
              >
                <span className="mt-1 shrink-0 font-mono text-[11px] tracking-[0.25em] text-faint transition-colors duration-300 group-hover:text-accent sm:mt-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="font-display text-lg font-medium leading-tight text-bone sm:text-xl">
                    {p.name}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.08em] text-faint">
                    {stackSummary}
                  </span>
                </span>
                <span className="shrink-0 whitespace-nowrap font-mono text-[12px] tracking-[0.12em] text-ash">
                  {p.date}
                </span>
                <ChevronDown
                  size={16}
                  aria-hidden="true"
                  className={`mt-0.5 shrink-0 self-start text-ash transition-transform duration-300 group-hover:text-accent sm:self-center ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h4>

            <div id={panelId}>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="panel"
                    role="region"
                    aria-labelledby={buttonId}
                    initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0.15 : 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <OtherProjectPanel p={p} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
