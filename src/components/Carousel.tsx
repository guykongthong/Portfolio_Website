import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode, RefObject } from "react";
import { AnimatePresence, motion, useDragControls, useReducedMotion } from "framer-motion";
import type { PanInfo, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SWIPE_DISTANCE = 80;
const SWIPE_VELOCITY = 500;

/** "Core&Co Online Webstore" -> "core-co-online-webstore", used for #<prefix>-<slug> deep links. */
function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function indexFromHash(prefix: string, slugs: string[]) {
  if (typeof window === "undefined") return -1;
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash.startsWith(`${prefix}-`)) return -1;
  return slugs.indexOf(hash.slice(prefix.length + 1));
}

const arrowClass =
  "flex h-10 w-10 shrink-0 items-center justify-center border border-hairline bg-wall/60 text-bone transition-colors duration-300 hover:border-accent/60 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

interface CarouselProps<T> {
  items: T[];
  /** shown in the prev/next bar and read out by screen readers */
  getName: (item: T) => string;
  /** source text for the #<hashPrefix>-<slug> deep link (defaults to the name) */
  getSlugSource?: (item: T) => string;
  /** singular noun for aria labels, e.g. "project" */
  noun: string;
  /** aria label of the whole carousel, e.g. "Projects" */
  label: string;
  hashPrefix: string;
  /** scrolled into view when a deep link targets this carousel */
  sectionRef: RefObject<HTMLElement | null>;
  renderItem: (item: T, i: number) => ReactNode;
}

/**
 * A gallery room walked one piece at a time. A numbered room index jumps to
 * any piece, prev/next (buttons, arrow keys, or a swipe on touch screens)
 * walks to the neighbours, and the URL hash (#<hashPrefix>-<slug>) remembers
 * where you are so a single piece can be linked.
 */
export default function Carousel<T>({
  items,
  getName,
  getSlugSource,
  noun,
  label,
  hashPrefix,
  sectionRef,
  renderItem,
}: CarouselProps<T>) {
  const total = items.length;
  const reduce = useReducedMotion();
  const slugs = useMemo(
    () => items.map((item) => slugify((getSlugSource ?? getName)(item))),
    [items, getName, getSlugSource],
  );
  const [[current, direction], setCurrent] = useState<[number, number]>(() => {
    const fromHash = indexFromHash(hashPrefix, slugs);
    return [fromHash >= 0 ? fromHash : 0, 0];
  });
  const stageRef = useRef<HTMLDivElement>(null);
  const refocusStage = useRef(false);
  const dragControls = useDragControls();
  const Noun = noun.charAt(0).toUpperCase() + noun.slice(1);

  const go = useCallback(
    (target: number, dir?: number) => {
      if (total === 0) return;
      const next = ((target % total) + total) % total;
      // keep focus inside the carousel if it was on the slide that is leaving
      refocusStage.current = !!stageRef.current?.contains(document.activeElement);
      setCurrent(([prev]) => [next, dir ?? Math.sign(next - prev)]);
      window.history.replaceState(null, "", `#${hashPrefix}-${slugs[next]}`);
    },
    [total, hashPrefix, slugs],
  );

  // a deep link opens on its piece and brings the section into view
  useEffect(() => {
    if (indexFromHash(hashPrefix, slugs) >= 0) {
      sectionRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }
    const onHashChange = () => {
      const i = indexFromHash(hashPrefix, slugs);
      if (i >= 0) {
        setCurrent(([prev]) => [i, Math.sign(i - prev)]);
        sectionRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [reduce, hashPrefix, slugs, sectionRef]);

  useEffect(() => {
    if (refocusStage.current) {
      refocusStage.current = false;
      stageRef.current?.focus({ preventScroll: true });
    }
  }, [current]);

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") go(current + 1, 1);
    else if (e.key === "ArrowLeft") go(current - 1, -1);
    else if (e.key === "Home") go(0, -1);
    else if (e.key === "End") go(total - 1, 1);
    else return;
    e.preventDefault();
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(current + 1, 1);
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(current - 1, -1);
  };

  const variants: Variants = {
    enter: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * 48 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: reduce ? 0 : dir * -48 }),
  };

  if (total === 0) return null;

  const item = items[current];
  const name = getName(item);
  const counter = `${String(current + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      {/* room index: jump to any piece */}
      <div className="mb-10 flex flex-col gap-6">
        <nav aria-label={`Choose a ${noun}`} className="flex flex-wrap gap-x-1 gap-y-2">
          {items.map((it, i) => (
            <button
              key={slugs[i]}
              type="button"
              aria-label={`${Noun} ${i + 1} of ${total}: ${getName(it)}`}
              aria-current={i === current ? "true" : undefined}
              title={getName(it)}
              onClick={() => go(i)}
              className={`border-b-2 px-2 pb-1.5 pt-1 font-mono text-[12px] tracking-[0.2em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                i === current
                  ? "border-accent text-accent"
                  : "border-transparent text-faint hover:border-hairline hover:text-bone"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4 border-t border-hairline pt-5">
          <button type="button" aria-label={`Previous ${noun}`} onClick={() => go(current - 1, -1)} className={arrowClass}>
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] tracking-[0.25em] text-accent">{counter}</p>
            <p className="mt-1 truncate font-display text-[15px] text-ash">{name}</p>
          </div>
          <button type="button" aria-label={`Next ${noun}`} onClick={() => go(current + 1, 1)} className={arrowClass}>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {`${Noun} ${current + 1} of ${total}: ${name}`}
      </p>

      <div
        ref={stageRef}
        tabIndex={-1}
        className="scroll-mt-24 overflow-x-clip pb-4 outline-none"
      >
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={slugs[current]}
            role="group"
            aria-roledescription="slide"
            aria-label={`${current + 1} of ${total}: ${name}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0.15 : 0.45, ease: EASE }}
            drag={total > 1 ? "x" : false}
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={onDragEnd}
            onPointerDown={(e) => {
              // swipe is for touch/pen; mouse users keep text selection and use the controls
              if (e.pointerType === "mouse") return;
              if ((e.target as HTMLElement).closest("[data-no-swipe]")) return;
              dragControls.start(e);
            }}
            style={{ touchAction: "pan-y" }}
          >
            {renderItem(item, current)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
