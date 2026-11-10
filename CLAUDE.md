# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page personal portfolio that presents a software engineering CV as a quiet, cool-blue "Gallery Exhibit": the page is a run of numbered rooms, each CV section a room with a room sign, framed pieces and placards. Pale sky blue by day, ink navy by night, with one coral accent dot. React 19 + TypeScript + Vite 7 + Tailwind CSS v4, motion by framer-motion, icons by lucide-react and react-icons, diagrams by mermaid, analytics by Vercel Analytics. Deployed as a static site on Vercel.

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # production build to dist/
npm run preview  # serve the built dist/ locally
npm run lint     # eslint over the repo
```

There is no test suite. Type checking happens through the editor / `tsc`; `npm run build` runs `vite build` directly.

## Architecture

- **Content is data, not markup.** Every CV fact (profile, contacts, experiences, education, projects, skills, accolades) lives in `src/data/cv.ts` as typed exports. This is the single source of truth — edit it to change site content. Sections in `src/sections/` render from these exports; do not hardcode CV text into components.
- **Composition.** `src/pages/Home.tsx` composes `Nav`, the Hero, then one continuous `GlyphSky` haze fixed behind the remaining rooms, then `Footer` (which ends in a full-ink sky). `src/sections/` holds one file per room (Hero, Statement, Exhibitions, Projects, Materials, Education, Activities). Each room opens with `SectionHeader`, which draws the "Room 0N" sign and numeral. `src/components/` holds reusable pieces: `Frame` (framed card), `Placard` (label), `ProjectMedia` (image/video/embed/diagram gallery), `MermaidDiagram`, `TechIcon`, `Reveal` (scroll-in wrapper), `GlyphSky` (ASCII canvas skies), `Nav` (includes the theme toggle), `Footer`, `SectionHeader`. `src/lib/glyphs.ts` has the glyph helpers and `src/lib/theme.ts` the theme hook and canvas color readers.
- **Diagrams.** Project flowcharts are mermaid sources in `src/data/diagrams.ts`, built as functions of the current theme colors so they re-render on a theme switch. A media item with `type: "diagram"` uses `src` as the diagram id.
- **Entry point** is `src/main.jsx` (mixed `.jsx`/`.tsx` in the tree is intentional and fine). It imports the fontsource CSS.

## Tailwind v4 — important

This is **Tailwind v4** (`@tailwindcss/postcss`, `@import "tailwindcss"`). v4 does **not** auto-load `tailwind.config.js`. Design tokens are defined in the `@theme` block in `src/index.css`, which generates utilities such as `bg-bg`, `bg-surface`, `bg-surface-2`, `text-fg`, `text-fg-2`, `text-accent`, `text-ink`, `border-line`, `border-line-strong`, `font-display`, `font-label`. To add or change a color or font, edit the `@theme` block, not `tailwind.config.js`.

Palette: pale blue `bg` wall, white `surface` frames, navy `fg` text, `fg-2` secondary text, `line` hairlines, a single blue `ink` for ASCII, dither and pixel icons, and a coral `accent` used sparingly (use `accent-ink` when it must be text).

**Theme toggle.** `:root[data-theme="dark"]` in `src/index.css` swaps the same token names to the navy night palette, so components never need `dark:` variants. An inline script in `index.html` sets `data-theme` before first paint (saved choice in localStorage, else the system setting); the toggle lives in `Nav` via `src/lib/theme.ts`. Canvas code reads resolved colors with `readToken` and re-reads on `onThemeChange`.

Fonts are self-hosted through `@fontsource` (latin subsets, imported in `src/main.jsx`): **Pixelify Sans** (display), **Silkscreen** (labels), **Geist** (body) and **Geist Mono**. Do not add Google Fonts links.

## Motion

framer-motion with `prefers-reduced-motion` support. Note a v12 typing gotcha: cubic-bezier ease arrays must be typed as a fixed-length tuple, e.g. `const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];`, and variant objects typed as `Variants` — a bare `number[]` is rejected by the `Easing` type. See `src/sections/Hero.tsx` and `src/components/Reveal.tsx`.

## Deployment

Vercel, linked via `vercel.json` (`framework: vite`, build `npm run build`, output `dist`). Deploy with `npx vercel --prod` from this directory (requires `vercel login` once per machine). Live URL: https://guykongthong-portfolio.vercel.app

If you add a dependency, keep `package-lock.json` in sync (`npm install --package-lock-only`) so Vercel's install step does not fail.

## Build caveat

`vite build` may hang at "transforming..." at 0% CPU in some local/background-job sessions due to an esbuild service-mode IPC stall — this is environmental, not a code defect. When a local build hangs, verify via the dev server and rely on the Vercel cloud build for real verification rather than assuming the code is broken.

## Branch workflow

`main` = production-ready, `development` = integration, `feature/*` = one branch per feature merged into `development`. Do not push directly to `main`; open a PR. The `origin` remote is `guykongthong/Portfolio_Website`.
