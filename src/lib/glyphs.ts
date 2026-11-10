// Shared glyph helpers for the ASCII moments: the hero name decode, the
// portrait, the room numerals and the skies all use the same ramp, so every
// generated texture reads as one family.

export const RAMP = " .:-=+*#%@";

const POOL = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+=/<>";

/** Integer hash to [0,1). Deterministic, so textures don't jump between renders. */
export function hash2(x: number, y: number) {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

/**
 * Partially decoded text. p runs 0..1; letters lock left to right, the first
 * one near p=0.25 and the last at p=0.95. Spaces stay spaces so words keep shape.
 */
export function scramble(text: string, p: number) {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === " ") {
      out += " ";
      continue;
    }
    const at = (i / text.length) * 0.7 + 0.25;
    out += p >= at ? ch : POOL[Math.floor(Math.random() * POOL.length)];
  }
  return out;
}

// 5x7 digits for the room numerals
const DIGITS: Record<string, string[]> = {
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11111", "00010", "00100", "00010", "00001", "10001", "01110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
};
const INK_PAIRS = ["#@", "@%", "%#", "##", "@@", "%%"];

/** "02" drawn as a 7-line block of glyphs, two characters per pixel. */
export function numeral(n: string) {
  const lines: string[] = [];
  for (let y = 0; y < 7; y++) {
    let s = "";
    for (let d = 0; d < n.length; d++) {
      const rows = DIGITS[n[d]];
      if (!rows) continue;
      if (d > 0) s += "  ";
      for (let x = 0; x < 5; x++) {
        const gx = d * 6 + x;
        if (rows[y][x] === "1") s += INK_PAIRS[Math.floor(hash2(gx, y) * INK_PAIRS.length)];
        else s += hash2(gx * 3, y * 5) < 0.18 ? ". " : "  ";
      }
    }
    lines.push(s.replace(/\s+$/, ""));
  }
  return lines.join("\n");
}

/**
 * Samples an image into a cols x rows grid of ramp levels (0..9), dark pixels
 * dense. Cover-crops to the grid's shape (a monospace cell is ~0.6 wide), and
 * stretches contrast so a pale studio background drops to blank.
 */
export function levelsFromImage(img: HTMLImageElement, cols: number, rows: number, cellAspect = 0.6) {
  const c = document.createElement("canvas");
  c.width = cols;
  c.height = rows;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  const target = (cols * cellAspect) / rows; // width / height of the grid
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  let sw = iw;
  let sh = ih;
  if (iw / ih > target) sw = ih * target;
  else sh = iw / target;
  // keep the crop a little low so the head isn't cut, the shoulders matter less
  const sx = (iw - sw) / 2;
  const sy = (ih - sh) * 0.6;
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);

  const data = ctx.getImageData(0, 0, cols, rows).data;
  const lum = new Float32Array(cols * rows);
  for (let i = 0; i < lum.length; i++) {
    lum[i] = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;
  }
  const sorted = Array.from(lum).sort((a, b) => a - b);
  const lo = sorted[Math.floor(sorted.length * 0.02)];
  const hi = sorted[Math.floor(sorted.length * 0.8)];
  const span = Math.max(0.05, hi - lo);

  const levels = new Uint8Array(cols * rows);
  for (let i = 0; i < lum.length; i++) {
    const v = Math.min(1, Math.max(0, (lum[i] - lo) / span));
    // a touch of gamma keeps skin light and hair/clothes solid
    const dark = Math.pow(1 - v, 0.9);
    levels[i] = Math.min(9, Math.floor(dark * 10));
  }
  return levels;
}
