import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { experiences, profile } from "../data/cv";
import { RAMP, hash2, levelsFromImage, scramble } from "../lib/glyphs";
import Frame from "../components/Frame";
import portrait from "../assets/profile/portrait.jpg";

const DECODE_MS = 1100;
const SUB_EVERY = 3200;
const SUB_SCRAMBLE = 400;
const COLS = 60;
const ROWS = 45; // 60 x 0.6 / 45 = a 4:5 grid
const SESSION_KEY = "hero-decoded";

// the role line rotates through the headline role and the other hats from Work Experience
const subtitles = [
  profile.role,
  ...experiences.map((e) => e.role).filter((r, i, all) => !r.startsWith(profile.role) && all.indexOf(r) === i),
];
const nameLines = [profile.name.first, profile.name.last];
const fullName = nameLines.join(" ");

function renderLevels(levels: Uint8Array, p: number, shimmer?: Map<number, number>) {
  let out = "";
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const i = y * COLS + x;
      let k = levels[i];
      if (p < 1 && hash2(x * 7, y * 13) > p) k = Math.floor(Math.random() * 10);
      else if (shimmer && k > 1 && shimmer.has(i)) k = Math.max(1, Math.min(9, k + shimmer.get(i)!));
      out += RAMP[k];
    }
    if (y < ROWS - 1) out += "\n";
  }
  return out;
}

function alreadyDecoded() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Room 00, the entrance. The name decodes out of random glyphs once per
 * session (1.1s), the role line under it rotates every 3.2s, and the first
 * piece on the wall is an ASCII self-portrait generated from the real photo,
 * which develops in 8 stepped bands on hover/focus, or toggles with a tap.
 * The real name is always in the DOM (an invisible copy holds the width, the
 * h1 carries aria-label). Reduced motion: everything renders final and still.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  // read once on mount, so finishing the decode doesn't restart the effects
  const [seen] = useState(alreadyDecoded);
  const skip = !!reduce || seen;
  const [shown, setShown] = useState<string[]>(nameLines);
  const [sub, setSub] = useState(subtitles[0]);
  const [revealed, setRevealed] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  const pieceRef = useRef<HTMLButtonElement>(null);
  const paused = useRef(false);
  const subIndex = useRef(0);
  const advance = useRef<() => void>(() => {});

  // name decode + subtitle rotation, one 50ms ticker
  useEffect(() => {
    if (reduce) {
      setShown(nameLines);
      setSub(subtitles[0]);
      return;
    }
    const t0 = performance.now() - (skip ? DECODE_MS : 0);
    let subStart = t0 + DECODE_MS;
    let decoded = skip;
    let rotated = false;
    const timer = window.setInterval(() => {
      const now = performance.now();
      const el = now - t0;
      if (!decoded) {
        const p = Math.min(1, el / DECODE_MS);
        setShown(p >= 1 ? nameLines : nameLines.map((l) => scramble(l, p)));
        setSub(p >= 1 ? subtitles[0] : scramble(subtitles[0], p));
        if (p >= 1) {
          decoded = true;
          try {
            sessionStorage.setItem(SESSION_KEY, "1");
          } catch {
            // no storage, it will just decode again next load
          }
        }
        return;
      }
      if (subtitles.length < 2) return;
      // hovering/focusing the line, or a hidden tab, holds it still
      if (paused.current || document.hidden) {
        subStart += 50;
        return;
      }
      if (now - subStart >= SUB_EVERY) {
        subIndex.current = (subIndex.current + 1) % subtitles.length;
        subStart = now;
        rotated = true;
      }
      // the new phrase resolves over 400ms, then holds
      const ph = now - subStart;
      const target = subtitles[subIndex.current];
      setSub(rotated && ph < SUB_SCRAMBLE ? scramble(target, 0.25 + (ph / SUB_SCRAMBLE) * 0.75) : target);
    }, 50);
    advance.current = () => {
      subStart = performance.now() - SUB_EVERY;
    };
    return () => clearInterval(timer);
  }, [reduce, skip]);

  // ASCII portrait: sample the photo once, develop it with the name, then a faint shimmer
  useEffect(() => {
    let cancelled = false;
    let decodeTimer = 0;
    let shimmerTimer = 0;
    let visible = true;
    let levels: Uint8Array | null = null;
    const pre = preRef.current;
    const write = (s: string) => {
      if (pre) pre.textContent = s;
    };

    const startShimmer = () => {
      if (reduce || shimmerTimer || !levels) return;
      shimmerTimer = window.setInterval(() => {
        if (!visible || document.hidden || !levels) return;
        const sh = new Map<number, number>();
        for (let j = 0; j < 18; j++) sh.set(Math.floor(Math.random() * COLS * ROWS), Math.random() < 0.5 ? -1 : 1);
        write(renderLevels(levels, 1, sh));
      }, 180);
    };

    const img = new Image();
    img.decoding = "async";
    img.src = portrait;
    img.onload = () => {
      if (cancelled) return;
      levels = levelsFromImage(img, COLS, ROWS);
      if (!levels) return;
      const lv = levels;
      if (skip) {
        write(renderLevels(lv, 1));
        startShimmer();
        return;
      }
      const t0 = performance.now();
      decodeTimer = window.setInterval(() => {
        const p = Math.min(1, (performance.now() - t0) / DECODE_MS);
        write(renderLevels(lv, p));
        if (p >= 1) {
          clearInterval(decodeTimer);
          startShimmer();
        }
      }, 50);
    };

    const io = new IntersectionObserver((e) => {
      visible = e[0]?.isIntersecting ?? true;
    });
    if (pieceRef.current) io.observe(pieceRef.current);

    return () => {
      cancelled = true;
      img.onload = null;
      clearInterval(decodeTimer);
      clearInterval(shimmerTimer);
      io.disconnect();
    };
  }, [reduce, skip]);

  return (
    <section
      id="top"
      aria-label="Entrance"
      className="dot-wall relative z-10 -mt-16 pt-16 lg:-mt-[72px] lg:pt-[72px]"
    >
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[1440px] grid-cols-1 gap-y-7 px-5 pb-8 pt-6 lg:min-h-[calc(100svh-72px)] lg:grid-cols-[minmax(0,1fr)_300px] lg:grid-rows-[auto_1fr_auto] lg:gap-x-16 lg:gap-y-8 lg:px-16 lg:pb-14 lg:pt-8 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-wrap justify-between gap-x-4 gap-y-2 font-label text-label uppercase tracking-[0.06em] text-fg-2 lg:col-span-2">
          <span>Exhibit {profile.years} / Entrance</span>
          <span>{profile.location}</span>
        </div>

        <div className="relative self-center py-6 pl-5 lg:col-start-1 lg:row-start-2 lg:py-10 lg:pl-11">
          <span aria-hidden="true" className="absolute left-0 top-0 h-3.5 w-3.5 border-l-2 border-t-2 border-line-strong lg:h-5 lg:w-5" />
          <span aria-hidden="true" className="absolute bottom-0 left-0 h-3.5 w-3.5 border-b-2 border-l-2 border-line-strong lg:h-5 lg:w-5" />

          <h1 aria-label={fullName} className="m-0 font-display text-display font-semibold tracking-[-0.01em]">
            {nameLines.map((line, i) => (
              <span key={i} className="relative block">
                <span aria-hidden="true" className="invisible">
                  {line}
                </span>
                <span aria-hidden="true" className="absolute inset-0 whitespace-nowrap">
                  {shown[i] ?? line}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="mt-5 flex min-h-6 items-center gap-1.5 font-label text-sub uppercase tracking-[0.06em] lg:mt-7"
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") paused.current = true;
            }}
            onPointerLeave={() => (paused.current = false)}
            onClick={() => advance.current()}
          >
            <span aria-hidden="true">{sub}</span>
            <span aria-hidden="true" className="inline-block h-3.5 w-2 animate-blink bg-accent lg:h-[18px] lg:w-2.5" />
            <span className="sr-only">{subtitles.join(", ")}</span>
          </p>

          <p className="mt-5 max-w-[600px] text-lead text-fg-2">{profile.tagline}</p>
        </div>

        <div className="w-full max-w-[420px] lg:col-start-2 lg:row-start-2 lg:max-w-none lg:self-center">
          <Frame>
            <button
              ref={pieceRef}
              type="button"
              aria-pressed={revealed}
              aria-label={`Show photo of ${fullName}`}
              onClick={() => setRevealed((v) => !v)}
              className="develop-trigger relative block aspect-[4/5] w-full cursor-pointer overflow-hidden bg-surface-2 [container-type:inline-size]"
            >
              <pre
                ref={preRef}
                aria-hidden="true"
                className="absolute inset-0 m-0 flex items-center justify-center overflow-hidden font-mono text-[calc(100cqw/36)] leading-[calc(100cqw/36)] text-ink"
              />
              <img
                src={portrait}
                alt=""
                className={`develop absolute inset-0 h-full w-full object-cover object-[50%_60%] ${revealed ? "on" : ""}`}
              />
              <span
                aria-hidden="true"
                className="absolute bottom-2.5 right-2.5 border border-line-strong bg-surface px-2 py-1 font-label text-label uppercase tracking-[0.06em] text-fg"
              >
                {revealed ? (
                  "Showing photo"
                ) : (
                  <>
                    <span className="hint-pointer">Hover to develop</span>
                    <span className="hint-touch">Tap to reveal</span>
                  </>
                )}
              </span>
            </button>
          </Frame>
        </div>

        <div className="lg:col-start-1 lg:row-start-3 lg:self-end">
          <a href="#statement" className="inline-flex min-h-11 items-center gap-3 text-fg-2 transition-colors duration-150 hover:text-fg">
            <svg width="16" height="16" viewBox="0 0 16 16" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true" className="animate-bob">
              <path d="M7 1h2v9h2V8h2v2h-1v1h-1v1h-1v1H9v1H7v-1H6v-1H5v-1H4v-1H3V8h2v2h2z" />
            </svg>
            <span className="font-label text-label uppercase tracking-[0.06em]">Scroll to enter</span>
          </a>
        </div>
      </div>
    </section>
  );
}
