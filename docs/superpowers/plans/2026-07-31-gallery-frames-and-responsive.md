# Gallery Frames, Always-Visible Materials Labels, and Responsive Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn every framed card on the site into a literal black-and-white picture frame with an optional museum plaque, make Materials tech-stack labels always visible and visually grouped (icons vs. text-only terms), and fix the site's responsive behavior including a real mobile nav menu.

**Architecture:** This is a presentational and responsive-polish pass on the existing React 19 + TypeScript + Tailwind v4 site. It touches the shared `Frame` component (used by four sections), the `TechIcon`/`Materials` pairing, `Nav`, and finishes with a manual cross-viewport audit that fixes any concrete breakage found.

**Tech Stack:** React 19, TypeScript, Vite 7, Tailwind CSS v4, framer-motion, lucide-react (existing, used for the new mobile menu icons — no new dependency).

## Global Constraints

- No new npm dependencies. `lucide-react` (already installed) covers the mobile menu icons.
- A new design token `--color-frame: #141414` is added to the `@theme` block in `src/index.css` — do not reuse `--color-ink` (that token means the page's light background in this codebase, not black).
- `Frame`'s new `plaque?: string` prop renders nothing when omitted — no reserved space, no empty element.
- Only `src/sections/Projects.tsx` passes `plaque`. `Exhibitions.tsx`, `Recognition.tsx`, `Activities.tsx` keep their existing internal headers unchanged and do not pass `plaque`.
- There is no test suite in this repo (confirmed in `CLAUDE.md`). Verification is manual: `npm run dev` + visual check, and `npx tsc --noEmit` / `npm run build` for a final clean check. Per `CLAUDE.md`, if a local `vite build` hangs at "transforming..." at 0% CPU, that's a documented environmental esbuild IPC stall — rely on the dev-server check instead of treating it as a code defect.
- Materials grouping (icons first, then a divider, then icon-less text pills) must not change the underlying `skills` data in `src/data/cv.ts` — it's a render-order change only.
- The responsive audit (Task 5) fixes only concrete breakage found at 375px/768px/1024px — it is not a license to redesign layouts that already stack correctly via existing `grid-cols-1`/`sm:`/`lg:` breakpoints.

---

## Task 1: Frame Component — Black Frame, White Interior, Plaque Prop

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Frame.tsx`

**Interfaces:**
- Produces: `Frame` component gains a new optional prop `plaque?: string`, rendered as a centered bottom-edge label when present. The component's existing `index`/`className`/`children` props are unchanged. Task 2 (`Projects.tsx`) is the only consumer that will pass `plaque`.

- [ ] **Step 1: Add the `--color-frame` token to `src/index.css`**

Find the `@theme` block:

```css
@theme {
  --color-ink: #f5f1ea; /* gallery wall / page background — warm off-white */
  --color-wall: #ece6da; /* raised panel / card surface */
  --color-wall-2: #e3dbca; /* secondary panel */
  --color-hairline: #d8d0c0; /* frame borders */
  --color-bone: #1c1b19; /* primary text — soft charcoal */
  --color-ash: #6b6862; /* muted text */
  --color-faint: #9c968a; /* faintest text / dividers */
  --color-accent: #b8863b; /* soft ochre */
  --color-accent-dim: #8f6a2e;

  --font-display: "Fraunces", Georgia, "Times New Roman", serif;
  --font-mono: "IBM Plex Mono", ui-monospace, "SF Mono", monospace;
}
```

Replace with (one new line added after `--color-accent-dim`):

```css
@theme {
  --color-ink: #f5f1ea; /* gallery wall / page background — warm off-white */
  --color-wall: #ece6da; /* raised panel / card surface */
  --color-wall-2: #e3dbca; /* secondary panel */
  --color-hairline: #d8d0c0; /* frame borders */
  --color-bone: #1c1b19; /* primary text — soft charcoal */
  --color-ash: #6b6862; /* muted text */
  --color-faint: #9c968a; /* faintest text / dividers */
  --color-accent: #b8863b; /* soft ochre */
  --color-accent-dim: #8f6a2e;
  --color-frame: #141414; /* black picture-frame border */

  --font-display: "Fraunces", Georgia, "Times New Roman", serif;
  --font-mono: "IBM Plex Mono", ui-monospace, "SF Mono", monospace;
}
```

- [ ] **Step 2: Replace `src/components/Frame.tsx`**

```tsx
import type { ReactNode } from "react";

interface FrameProps {
  children: ReactNode;
  /** exhibit number shown on the frame, e.g. "01" */
  index?: string;
  /** museum-plaque text centered at the bottom of the frame, e.g. "CORE&CO · COURSEWORK · 2025" */
  plaque?: string;
  className?: string;
}

/**
 * A piece hung on the gallery wall: a thick black picture frame around a white
 * mat, with an ochre edge that lights up on hover. The exhibit number sits in
 * the top-left like a wall label; an optional plaque is mounted at the
 * bottom-center of the frame like a museum label screwed to the frame itself.
 */
export default function Frame({ children, index, plaque, className = "" }: FrameProps) {
  return (
    <div className={`group relative ${className}`}>
      {/* ochre glow that fades in on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[2px] bg-accent/0 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-20"
        style={{ background: "var(--color-accent)" }}
      />

      <div className="relative rounded-[2px] border-[10px] border-frame bg-white shadow-[0_18px_40px_-24px_rgba(28,27,25,0.18)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent/60">
        {/* inner mat */}
        <div className="relative rounded-[1px] border border-black/[0.03] p-7 sm:p-9">
          {index && (
            <span className="pointer-events-none absolute right-5 top-4 font-mono text-[11px] tracking-[0.25em] text-faint transition-colors duration-500 group-hover:text-accent">
              {index}
            </span>
          )}
          {children}
        </div>
      </div>

      {plaque && (
        <div className="absolute -bottom-3 left-1/2 max-w-[85%] -translate-x-1/2 rounded-sm bg-frame px-4 py-1.5 text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white shadow-[0_4px_10px_-2px_rgba(0,0,0,0.4)]">
          {plaque}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Visually verify**

Run: `npm run dev`. Scroll to any section using `Frame` that does NOT pass `plaque` yet (e.g. Recognition or Activities, since Task 2 hasn't wired Projects yet). Expected: every card now shows a thick black border around a white interior (not the old cream `bg-wall`), and no plaque renders anywhere yet (since no caller passes the prop until Task 2).

- [ ] **Step 4: Commit**

```bash
cd "/Users/guykongthong/Desktop/software-engineering/code/personal/projects/portfolio_website"
git add src/index.css src/components/Frame.tsx
git commit -m "$(cat <<'EOF'
Turn Frame into a black-and-white picture frame with an optional plaque

Adds a --color-frame token, switches the border to a thick black
frame around a white interior (was hairline-bordered cream), and
adds an optional plaque prop that renders a museum-style label
centered at the frame's bottom edge when provided.
EOF
)"
```

---

## Task 2: Wire the Plaque into Projects

**Files:**
- Modify: `src/sections/Projects.tsx`

**Interfaces:**
- Consumes: `Frame`'s new `plaque?: string` prop (Task 1); `projects` from `src/data/cv.ts` (existing — `name: string`, `tag: string`, `date: string` fields already present).

- [ ] **Step 1: Pass a plaque to every project's `Frame` and stop clipping the frame's overflow**

In `src/sections/Projects.tsx`, find:

```tsx
            <Reveal key={p.name}>
              <Frame index={String(i + 1).padStart(2, "0")} className="overflow-hidden">
```

Replace with:

```tsx
            <Reveal key={p.name}>
              <Frame
                index={String(i + 1).padStart(2, "0")}
                plaque={`${p.name.toUpperCase()} · ${p.tag.toUpperCase()} · ${p.date}`}
              >
```

(The `className="overflow-hidden"` is removed — it would clip the plaque, which is positioned just below the frame's bottom edge. Nothing inside the frame relies on that clipping: `ProjectMedia`'s image/video/placeholder already has its own `border` and no rounded corners that need containment.)

- [ ] **Step 2: Visually verify**

Run: `npm run dev`, scroll to the Projects section. Expected: every one of the 6 project cards shows a black-bordered white frame with a small dark plaque centered at the bottom edge reading "PROJECT NAME · TAG · DATE" (e.g. "CORE&CO ONLINE WEBSTORE · COURSEWORK · 2025"), fully visible (not clipped).

- [ ] **Step 3: Commit**

```bash
cd "/Users/guykongthong/Desktop/software-engineering/code/personal/projects/portfolio_website"
git add src/sections/Projects.tsx
git commit -m "$(cat <<'EOF'
Add museum plaques to Projects gallery cards

Each project's frame now shows a bottom-center plaque with its name,
tag, and date, matching the new picture-frame treatment.
EOF
)"
```

---

## Task 3: Materials — Always-Visible Labels, Grouped by Icon Presence

**Files:**
- Modify: `src/components/TechIcon.tsx`
- Modify: `src/sections/Materials.tsx`

**Interfaces:**
- No interface changes — `TechIcon`'s existing props (`icon?: IconType`, `label: string`) are unchanged, only its internal rendering changes. `Materials.tsx`'s render logic changes but it still consumes `skills`/`iconMap` exactly as before.

- [ ] **Step 1: Make the `TechIcon` label always visible**

In `src/components/TechIcon.tsx`, find:

```tsx
      <span className="max-w-[80px] text-center font-mono text-[9px] uppercase leading-tight tracking-[0.08em] text-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {label}
      </span>
```

Replace with:

```tsx
      <span className="max-w-[80px] text-center font-mono text-[9px] uppercase leading-tight tracking-[0.08em] text-faint">
        {label}
      </span>
```

(The label is now always rendered at full opacity — no hover required to read it. The icon's hover-lift and hover accent-color, defined earlier in the same file on the `<Icon>` element, are untouched.)

- [ ] **Step 2: Group icon and icon-less items in `src/sections/Materials.tsx`**

Find:

```tsx
          {skills.map((row, i) => (
            <Reveal key={row.label} delay={i * 0.04}>
              <div className="grid grid-cols-1 gap-5 py-8 sm:grid-cols-[200px_1fr] sm:gap-8">
                <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-accent">
                  {row.label}
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                  {row.items.map((item) => (
                    <TechIcon key={item} icon={iconMap[item]} label={item} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
```

Replace with:

```tsx
          {skills.map((row, i) => {
            const withIcon = row.items.filter((item) => iconMap[item]);
            const withoutIcon = row.items.filter((item) => !iconMap[item]);
            return (
              <Reveal key={row.label} delay={i * 0.04}>
                <div className="grid grid-cols-1 gap-5 py-8 sm:grid-cols-[200px_1fr] sm:gap-8">
                  <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-accent">
                    {row.label}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                    {withIcon.map((item) => (
                      <TechIcon key={item} icon={iconMap[item]} label={item} />
                    ))}
                    {withoutIcon.length > 0 && (
                      <>
                        {withIcon.length > 0 && (
                          <span aria-hidden="true" className="h-8 w-px bg-hairline" />
                        )}
                        <div className="flex flex-wrap items-center gap-2">
                          {withoutIcon.map((item) => (
                            <TechIcon key={item} icon={undefined} label={item} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
```

- [ ] **Step 3: Visually verify**

Run: `npm run dev`, scroll to Materials. Expected: every icon's label is visible without hovering. Within each row, icon tiles appear first (in their original order), followed by a thin vertical divider, followed by the icon-less text pills (e.g. in the Web row: Node.js/Express/Hono/React/Vue.js icons, then a divider, then "REST APIs"/"Bootstrap"/"EJS" pills grouped together). The Spoken row (no icons at all) shows no divider, just its two text pills.

- [ ] **Step 4: Commit**

```bash
cd "/Users/guykongthong/Desktop/software-engineering/code/personal/projects/portfolio_website"
git add src/components/TechIcon.tsx src/sections/Materials.tsx
git commit -m "$(cat <<'EOF'
Make Materials labels always visible and group by icon presence

Labels no longer require a hover to read. Within each skill row,
icon tiles render first, then a divider, then icon-less text pills
grouped together — instead of interleaving icon and non-icon items.
EOF
)"
```

---

## Task 4: Mobile Nav Menu

**Files:**
- Modify: `src/components/Nav.tsx`

**Interfaces:**
- No external interface changes — `Nav` remains a no-props component rendered once from `Home.tsx`. Internal state (`open: boolean`) is local to this component.

- [ ] **Step 1: Replace `src/components/Nav.tsx`**

```tsx
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
```

(Note: the `profile` import and the static year-label span from the old file are removed entirely — the hamburger button replaces that space below `md`.)

- [ ] **Step 2: Verify the type-check**

Run: `npx tsc --noEmit`. Expected: no errors (no unused-import errors, since `profile` is no longer imported).

- [ ] **Step 3: Visually verify at a mobile width**

Run: `npm run dev`. Using the browser's device toolbar (or resizing below 768px), confirm: the desktop link row disappears and a hamburger icon appears in its place; tapping it opens a full-width dropdown listing all 7 links; tapping any link closes the dropdown and scrolls to that section; tapping the hamburger again (now showing an X) closes it without navigating.

- [ ] **Step 4: Commit**

```bash
cd "/Users/guykongthong/Desktop/software-engineering/code/personal/projects/portfolio_website"
git add src/components/Nav.tsx
git commit -m "$(cat <<'EOF'
Add a mobile nav menu

Below md, the nav previously showed no way to navigate at all (just
a static year label). A hamburger button now toggles a dropdown
panel listing all 7 section links.
EOF
)"
```

---

## Task 5: Responsive Audit Pass

**Files:** Potentially any of `src/sections/Hero.tsx`, `src/components/Frame.tsx`, or others — only if concrete breakage is found. No files are guaranteed to change in this task.

**Interfaces:** None — this task only adjusts Tailwind classes on existing elements if breakage is found; it does not add or change any component's props or exported interface.

- [ ] **Step 1: Start the dev server**

```bash
cd "/Users/guykongthong/Desktop/software-engineering/code/personal/projects/portfolio_website"
npm run dev
```

Leave it running (note the local URL, typically `http://localhost:5173`).

- [ ] **Step 2: Run the horizontal-overflow check script**

In a second terminal, from the same directory, run (this uses `npx playwright`, a one-off dev-time check — it is NOT added to `package.json`):

```bash
node -e "
const { chromium } = require('playwright');
(async () => {
  const widths = [375, 768, 1024];
  const url = 'http://localhost:5173';
  const browser = await chromium.launch();
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(url, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    console.log('width=' + width + 'px horizontal-overflow-px=' + overflow);
    await page.screenshot({ path: '/tmp/audit-' + width + '.png', fullPage: true });
    await page.close();
  }
  await browser.close();
})();
"
```

If this fails because `playwright` isn't resolvable, run `npx playwright install chromium` first (one-time browser download, not a project dependency), then re-run the script above with `npx playwright` prefixing is not needed since `node -e` resolves `require('playwright')` once the package is fetched — if `require('playwright')` still fails to resolve as a CommonJS module, use `npx --yes playwright@latest screenshot --viewport-size=375,900 http://localhost:5173 /tmp/audit-375.png` (and repeat for 768 and 1024) as a fallback to at least capture screenshots for manual inspection, and check for overflow visually in each screenshot instead of via the `scrollWidth` check.

Expected: `horizontal-overflow-px` is `0` (or very close to it, e.g. due to a scrollbar) at all three widths. Any value clearly greater than 0 (tens of pixels or more) indicates real horizontal overflow — note which width(s).

- [ ] **Step 3: Inspect the three screenshots and fix the two known risk spots if they show a problem**

Open `/tmp/audit-375.png`, `/tmp/audit-768.png`, `/tmp/audit-1024.png` (via the Read tool, since they're image files) and check specifically:

**Risk spot A — Hero name sizing.** Look at the Hero section (top of each screenshot). If "Kongthong" or "Virawit" appears clipped, overlapping the scroll-cue arrow, or overflowing horizontally at 375px:

In `src/sections/Hero.tsx`, find:

```tsx
          <motion.span variants={line} className="block text-[18vw] sm:text-[15vw] lg:text-[12rem]">
            {profile.name.first}
          </motion.span>
          <motion.span
            variants={line}
            className="block pl-[0.06em] text-[18vw] italic sm:text-[15vw] lg:text-[12rem]"
          >
            {profile.name.last}
          </motion.span>
```

Replace `text-[18vw]` in both spans with `text-[15vw] min-[400px]:text-[16vw]` (a smaller base size on the narrowest phones, stepping up slightly just past 400px, before the existing `sm:text-[15vw] lg:text-[12rem]` breakpoints take over). If the screenshots show no clipping/overflow at 375px, leave `Hero.tsx` untouched — do not change it speculatively.

**Risk spot B — Frame padding at 375px.** Look at any framed card (Projects, Work Experience, Recognition, Activities) in the 375px screenshot. If the content inside the black frame looks cramped against the frame border, or the frame's total width plus the page's `px-6` side padding causes horizontal overflow:

In `src/components/Frame.tsx`, find:

```tsx
      <div className="relative rounded-[2px] border-[10px] border-frame bg-white shadow-[0_18px_40px_-24px_rgba(28,27,25,0.18)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent/60">
        {/* inner mat */}
        <div className="relative rounded-[1px] border border-black/[0.03] p-7 sm:p-9">
```

Replace with:

```tsx
      <div className="relative rounded-[2px] border-[6px] border-frame bg-white shadow-[0_18px_40px_-24px_rgba(28,27,25,0.18)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent/60 sm:border-[10px]">
        {/* inner mat */}
        <div className="relative rounded-[1px] border border-black/[0.03] p-5 sm:p-7 lg:p-9">
```

(Thinner 6px frame and tighter padding below `sm`, stepping up to the original 10px/9px at larger sizes.) If the screenshots show no cramping/overflow at 375px, leave `Frame.tsx` untouched.

- [ ] **Step 4: Fix any other concrete overflow found**

If the overflow-check script reported nonzero overflow at any width for a reason other than the two risk spots above, identify the specific offending element (use the screenshot plus browser dev tools inspection against the running dev server if needed), and fix it by adjusting that element's existing Tailwind classes to add or tighten a responsive breakpoint (e.g. reducing a fixed width/padding value below `sm`, or adding `flex-wrap` where a row doesn't already wrap) — following the same pattern as Risk spots A and B. Do not restructure the section's layout or introduce new components. Record the exact file:line and class change in your report.

- [ ] **Step 5: Re-run the overflow check after any fixes**

Repeat Step 2. Expected: `horizontal-overflow-px` is `0` (or near-0) at all three widths.

- [ ] **Step 6: Final full-project verification**

```bash
cd "/Users/guykongthong/Desktop/software-engineering/code/personal/projects/portfolio_website"
npx tsc --noEmit
npm run build
```

Expected: `tsc --noEmit` is clean. `npm run build` succeeds — if it hangs at "transforming..." at 0% CPU, that's the documented environmental esbuild stall (see `CLAUDE.md`); stop it and rely on the dev-server checks above instead of treating it as a failure.

- [ ] **Step 7: Commit (only if Steps 3-4 made any code changes)**

If no files changed (both risk spots checked out fine and no other overflow was found), skip this step and say so clearly in your report — there is nothing to commit.

If changes were made, stage exactly the files you edited (e.g. `src/sections/Hero.tsx`, `src/components/Frame.tsx`, or whatever Step 4 touched) and commit with a message describing the specific fix, for example:

```bash
cd "/Users/guykongthong/Desktop/software-engineering/code/personal/projects/portfolio_website"
git add src/sections/Hero.tsx src/components/Frame.tsx
git commit -m "$(cat <<'EOF'
Fix responsive breakage found in the 375/768/1024px audit pass

Shrinks the Hero name's viewport-scaled font size below 400px wide
(was overflowing at 375px) and reduces Frame's border thickness and
inner padding below sm (was cramping content against the black
border at 375px).
EOF
)"
```

Write the actual commit body yourself based on what Step 4 found and fixed — the example above covers only the two pre-identified risk spots; if Step 4 found and fixed something else instead or in addition, describe that specifically.
