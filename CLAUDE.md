# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page personal portfolio that presents a software engineering CV through the design language of a minimalist gallery exhibit: each CV section is an "exhibit," each role/project a framed "piece" with a museum-style placard, on a warm off-white/charcoal palette with a soft ochre accent. React 19 + TypeScript + Vite 7 + Tailwind CSS v4, motion by framer-motion, icons by lucide-react and react-icons. Deployed as a static site on Vercel.

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
- **Composition.** `src/pages/Home.tsx` composes `Nav` + `GrainOverlay` + all sections + `Footer` inside a `bg-ink text-bone` shell. `src/sections/` holds one file per exhibit (Hero, Statement, Exhibitions, Projects, Materials, Provenance, Recognition, Activities). `src/components/` holds reusable pieces: `Frame` (picture-frame card), `Placard` (museum label), `ProjectMedia` (project image/video/placeholder), `TechIcon` (Materials icon tile), `Reveal` (scroll-in wrapper), `Nav`, `Footer`, `GrainOverlay`, `SectionHeader`.
- **Entry point** is `src/main.jsx` (mixed `.jsx`/`.tsx` in the tree is intentional and fine).

## Tailwind v4 — important

This is **Tailwind v4** (`@tailwindcss/postcss`, `@import "tailwindcss"`). v4 does **not** auto-load `tailwind.config.js`. Design tokens are defined in the `@theme` block in `src/index.css`, which is what generates utilities like `bg-ink`, `bg-wall`, `text-bone`, `text-ash`, `text-faint`, `text-accent`, `font-display`, `font-mono`. To add or change a color/font, edit the `@theme` block — not `tailwind.config.js`. The palette is warm off-white/charcoal (`--color-ink: #f5f1ea` background, `--color-bone: #1c1b19` text) with a soft ochre accent (`--color-accent: #b8863b`), used sparingly.

Fonts: **Fraunces** (display/body serif) and **IBM Plex Mono** (placards, labels, metadata), loaded from Google Fonts in `index.html`. Do not reintroduce the old `Anantason` font — it does not exist on Google Fonts and silently falls back to sans-serif.

## Motion

framer-motion with `prefers-reduced-motion` support. Note a v12 typing gotcha: cubic-bezier ease arrays must be typed as a fixed-length tuple, e.g. `const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];`, and variant objects typed as `Variants` — a bare `number[]` is rejected by the `Easing` type. See `src/sections/Hero.tsx` and `src/components/Reveal.tsx`.

## Deployment

Vercel, linked via `vercel.json` (`framework: vite`, build `npm run build`, output `dist`). Deploy with `npx vercel --prod` from this directory (requires `vercel login` once per machine). Live URL: https://portfoliowebsite-teal-ten.vercel.app

If you add a dependency, keep `package-lock.json` in sync (`npm install --package-lock-only`) so Vercel's install step does not fail.

## Build caveat

`vite build` may hang at "transforming..." at 0% CPU in some local/background-job sessions due to an esbuild service-mode IPC stall — this is environmental, not a code defect. When a local build hangs, verify via the dev server and rely on the Vercel cloud build for real verification rather than assuming the code is broken.

## Branch workflow

`main` = production-ready, `development` = integration, `feature/*` = one branch per feature merged into `development`. Do not push directly to `main`; open a PR. The `origin` remote is `guykongthong/Portfolio_Website`.
