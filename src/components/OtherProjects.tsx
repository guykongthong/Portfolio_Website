import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "../data/cv";
import ProjectMedia from "./ProjectMedia";
import Frame from "./Frame";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TAGS_IN_ROW = 3;

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function slugFromHash(prefix: string) {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace(/^#/, "");
  return hash.startsWith(`${prefix}-`) ? hash.slice(prefix.length + 1) : null;
}

/** last year mentioned in "Jul 2026 to Aug 2026" style dates, for the index row */
function yearOf(date: string) {
  const all = date.match(/\d{4}/g);
  return all ? all[all.length - 1] : date;
}

const chipClass =
  "whitespace-nowrap border border-line bg-surface-2 px-2.5 py-1 font-label text-label uppercase tracking-[0.04em] text-fg";

function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="0" y="6" width="14" height="2" />
      {!open && <rect x="6" y="0" width="2" height="14" />}
    </svg>
  );
}

/** The opened piece: framed media on top, the placard text underneath. */
function ProjectPanel({ p, no }: { p: Project; no: string }) {
  const hasMedia = p.media.length > 0;
  const portrait = p.mediaOrientation === "portrait";
  const facts = [
    { k: "Type", v: p.tag },
    { k: "Date", v: p.date },
    p.institution ? { k: "With", v: p.institution } : null,
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <div className="flex flex-col gap-6 pb-8 pt-1 md:gap-8 md:pb-12 md:pt-2">
      {hasMedia && (
        // image on top, full width of the list. portrait pieces get a narrower cap so they don't tower
        <div className={portrait ? "w-full max-w-[26rem] self-start" : "w-full"}>
          <Frame
            caption={
              <>
                <span>
                  No. {no} / {p.tag}
                </span>
                {p.media.length > 1 && <span>{p.media.length} pieces</span>}
              </>
            }
          >
            <ProjectMedia media={p.media} name={p.name} orientation={p.mediaOrientation} bordered={false} />
          </Frame>
        </div>
      )}

      <div className="flex min-w-0 max-w-[48rem] flex-col gap-[18px]">
        <p className="m-0 text-[18px] leading-normal [text-wrap:pretty] md:text-[20px]">{p.meta}</p>

        <dl className="m-0 grid grid-cols-1 border border-line bg-surface sm:grid-cols-3">
          {facts.map((f, i) => (
            <div
              key={f.k}
              className={`flex flex-row justify-between gap-3 px-3.5 py-3 sm:flex-col sm:justify-start sm:gap-0.5 ${
                i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : ""
              }`}
            >
              <dt className="font-label text-label uppercase tracking-[0.06em] text-fg-2">{f.k}</dt>
              <dd className="m-0 text-right text-[14px] leading-snug sm:text-left">{f.v}</dd>
            </div>
          ))}
        </dl>

        <ul className="ink-bullets m-0 flex list-none flex-col gap-2 p-0 text-body">
          {p.bullets.map((b, j) => (
            <li key={j}>{b}</li>
          ))}
        </ul>

        <div className="flex flex-col gap-2">
          <span className="font-label text-label uppercase tracking-[0.06em] text-fg-2">Medium</span>
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {p.stack.map((s) => (
              <li key={s} className={chipClass}>
                {s}
              </li>
            ))}
          </ul>
        </div>

        {p.liveHref && (
          <div className="flex flex-wrap gap-3">
            <a
              href={p.liveHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2.5 border border-fg bg-fg px-4 font-label text-label uppercase tracking-[0.06em] text-bg sm:flex-none"
            >
              {p.liveLabel ?? "Visit live"}
              <svg width="12" height="12" viewBox="0 0 12 12" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
                <path d="M4 0h8v8h-2V3.5L1.5 12 0 10.5 8.5 2H4z" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Projects as an index of works. A collapsed row reads like a catalogue line
 * (number, title, medium, year); opening one hangs the piece with its placard.
 * One open at a time. Each row is a real button with aria-expanded inside an
 * h3, and #<prefix>-<slug> opens and scrolls to a piece. `start` continues the
 * numbering when a second list follows the first.
 */
export default function OtherProjects({
  items,
  prefix = "other",
  start = 1,
}: {
  items: Project[];
  prefix?: string; // hash/id prefix, so two lists on one page don't collide
  start?: number;
}) {
  const reduce = useReducedMotion();
  const slugs = items.map((p) => slugify(p.name));
  const [open, setOpen] = useState<string | null>(() => {
    const s = slugFromHash(prefix);
    return s && slugs.includes(s) ? s : null;
  });

  useEffect(() => {
    const scrollToHash = () => {
      const s = slugFromHash(prefix);
      const row = s && document.getElementById(`${prefix}-${s}`);
      if (!row) return;
      setOpen(s);
      row.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    };
    if (slugFromHash(prefix)) scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [reduce, prefix]);

  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const toggle = (slug: string) => {
    const next = open === slug ? null : slug;
    setOpen(next);
    const url = window.location.pathname + window.location.search;
    if (next) window.history.replaceState(null, "", `#${prefix}-${next}`);
    else if (slugFromHash(prefix) === slug) window.history.replaceState(null, "", url);

    // the old piece collapses above while the new one opens, so the page shifts.
    // wait for that to settle, then bring the new row to the top of the view.
    window.clearTimeout(timer.current);
    if (next) {
      timer.current = window.setTimeout(
        () => document.getElementById(`${prefix}-${next}`)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }),
        reduce ? 0 : 340,
      );
    }
  };

  return (
    <ol className="m-0 list-none border-b border-line p-0">
      {items.map((p, i) => {
        const slug = slugs[i];
        const isOpen = open === slug;
        const no = String(start + i).padStart(2, "0");
        const buttonId = `${prefix}-${slug}-label`;
        const panelId = `${prefix}-${slug}-panel`;

        return (
          <li key={p.name} id={`${prefix}-${slug}`} className={`scroll-mt-20 border-t ${isOpen ? "border-fg" : "border-line"}`}>
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(slug)}
                className="group grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_44px] items-center gap-x-3 gap-y-2 py-[18px] text-left text-fg [grid-template-areas:'no_ico'_'title_ico'_'tags_tags'] md:min-h-[88px] md:grid-cols-[96px_minmax(0,1fr)_auto_56px_44px] md:gap-x-6 md:py-4 md:[grid-template-areas:'no_title_tags_date_ico']"
              >
                <span className="font-label text-label uppercase tracking-[0.06em] [grid-area:no]">No. {no}</span>
                <span className="font-display text-[22px] font-medium leading-[1.15] decoration-ink decoration-2 underline-offset-[6px] [grid-area:title] group-hover:underline md:text-[28px]">
                  {p.name}
                </span>
                <span className="mt-1 flex flex-wrap gap-2 [grid-area:tags] md:mt-0 md:max-w-[22rem] md:justify-end">
                  {p.stack.slice(0, TAGS_IN_ROW).map((s) => (
                    <span key={s} className={chipClass}>
                      {s}
                    </span>
                  ))}
                </span>
                <span className="hidden text-right font-label text-label tracking-[0.06em] [grid-area:date] md:block">{yearOf(p.date)}</span>
                <span className="grid h-11 w-11 place-items-center self-start border border-line bg-surface transition-colors duration-150 [grid-area:ico] group-hover:border-line-strong md:self-center">
                  <PlusMinus open={isOpen} />
                </span>
              </button>
            </h3>

            <div id={panelId}>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="panel"
                    role="region"
                    aria-labelledby={buttonId}
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <ProjectPanel p={p} no={no} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
