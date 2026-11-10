import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { RAMP, hash2 } from "../lib/glyphs";
import { onThemeChange, readToken } from "../lib/theme";

// Geist Mono at 12px: 0.6em advance, 12px line, same grid as the design's <pre>.
const FONT_PX = 12;
const CELL_W = FONT_PX * 0.6;
const CELL_H = FONT_PX;

function vn(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/** One sprite per ramp glyph, drawn once per colour/DPR, then stamped with drawImage. */
function buildAtlas(color: string, dpr: number) {
  const w = Math.ceil(CELL_W * dpr);
  const h = Math.ceil(CELL_H * dpr);
  const atlas = document.createElement("canvas");
  atlas.width = w * RAMP.length;
  atlas.height = h;
  const ctx = atlas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = color;
    ctx.font = `${FONT_PX * dpr}px "Geist Mono", ui-monospace, monospace`;
    ctx.textBaseline = "middle";
    for (let i = 1; i < RAMP.length; i++) ctx.fillText(RAMP[i], i * w, h / 2);
  }
  return { atlas, w, h };
}

type Variant = "haze" | "band";

interface GlyphSkyProps {
  /**
   * haze: the pale sky that runs behind every room, fixed to the viewport, a
   * little denser the further down you scroll, parallax at 0.15x.
   * band: the full-ink cloud bank in the footer, drifting left ~1 cell/s at 8fps.
   */
  variant: Variant;
  className?: string;
}

/**
 * The one-ink ASCII sky. Drawn to a canvas from a glyph atlas instead of a
 * giant <pre>, so a redraw is a few thousand drawImage calls and blank cells
 * cost nothing. Pauses when off screen or in a hidden tab; under reduced
 * motion it renders one still frame.
 */
export default function GlyphSky({ variant, className = "" }: GlyphSkyProps) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const token = variant === "haze" ? "--color-haze" : "--color-ink";
    let W = 0, H = 0, dpr = 1, cols = 0, rows = 0;
    let sprites = buildAtlas(readToken(token), 1);
    let t = 0; // drift in noise units
    let visible = false;
    let raf = 0;
    let timer = 0;
    let disposed = false;
    let lastKey = "";

    const draw = () => {
      if (!W || !H) return;
      // haze: parallax offset and scroll-progress density
      let offPx = 0;
      let bias = 0;
      if (variant === "haze") {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        offPx = reduce ? 0 : window.scrollY * 0.15;
        bias = 0.04 + (window.scrollY / max) * 0.24;
      }
      const rowOff = Math.floor(offPx / CELL_H);
      const frac = offPx - rowOff * CELL_H;
      // skip the redraw if nothing visible would change
      const key = `${rowOff}|${frac.toFixed(1)}|${bias.toFixed(3)}|${t.toFixed(4)}`;
      if (key === lastKey) return;
      lastKey = key;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { atlas, w, h } = sprites;
      for (let y = 0; y < rows; y++) {
        const gy = y + rowOff;
        const py = Math.round((y * CELL_H - frac) * dpr);
        const hNorm = y / Math.max(1, rows - 1);
        for (let x = 0; x < cols; x++) {
          let c: number;
          if (variant === "haze") {
            const g = bias + 0.05 * hNorm;
            const nx = x * 0.06 + t;
            const ny = (gy + 400) * 0.16;
            const n = vn(nx, ny) * 0.65 + vn(nx * 2.2 + 3, ny * 2.2) * 0.35;
            c = (n - 0.62 + g) * 2.2;
          } else {
            const nx = x * 0.07 + t;
            const ny = y * 0.22;
            const n = vn(nx, ny) * 0.65 + vn(nx * 2.1 + 7, ny * 2.1) * 0.35;
            c = n * 1.05 + hNorm * 0.6 - 0.55;
          }
          if (c <= 0.1) continue; // level 0 is a space
          const k = Math.min(9, Math.floor(Math.min(0.999, c) * 10));
          ctx.drawImage(atlas, k * w, 0, w, h, Math.round(x * CELL_W * dpr), py, w, h);
        }
      }
    };

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      W = r.width;
      H = r.height;
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      if (nextDpr !== dpr) {
        dpr = nextDpr;
        sprites = buildAtlas(readToken(token), dpr);
      }
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      cols = Math.ceil(W / CELL_W);
      rows = Math.ceil(H / CELL_H) + 1;
      lastKey = "";
      draw();
    };

    // haze redraws on scroll (one rAF per frame at most) and drifts a step every 400ms.
    // band drifts at 8fps. Both only while visible and the tab is shown.
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        draw();
      });
    };
    const startTimer = () => {
      if (reduce || timer || !visible || document.hidden) return;
      const every = variant === "haze" ? 400 : 125;
      const step = variant === "haze" ? 0.006 : 0.07 / 8;
      timer = window.setInterval(() => {
        t += step;
        draw();
      }, every);
    };
    const stopTimer = () => {
      clearInterval(timer);
      timer = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const io = new IntersectionObserver((entries) => {
      visible = entries[0]?.isIntersecting ?? false;
      if (visible) {
        draw();
        startTimer();
      } else stopTimer();
    });
    io.observe(wrap);
    const onVis = () => (document.hidden ? stopTimer() : startTimer());
    document.addEventListener("visibilitychange", onVis);
    if (variant === "haze") window.addEventListener("scroll", onScroll, { passive: true });

    const offTheme = onThemeChange(() => {
      sprites = buildAtlas(readToken(token), dpr);
      lastKey = "";
      draw();
    });

    // the atlas needs Geist Mono, redo it once the font is in
    document.fonts?.load(`${FONT_PX}px "Geist Mono"`).then(() => {
      if (disposed) return;
      sprites = buildAtlas(readToken(token), dpr);
      lastKey = "";
      draw();
    });

    return () => {
      disposed = true;
      stopTimer();
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      offTheme();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("scroll", onScroll);
    };
  }, [variant, reduce]);

  return (
    <div ref={wrapRef} aria-hidden="true" className={`pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
