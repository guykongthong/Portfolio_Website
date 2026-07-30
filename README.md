# The Exhibition — Virawit Kongthong

A personal portfolio that presents a software engineering CV through the design
language of a dark art gallery. Each section is an "exhibit"; each role and project
is a framed "piece" with a museum-style placard.

Built with **React 19 + TypeScript + Vite + Tailwind CSS v4**, with motion by
**framer-motion** and icons by **lucide-react**.

## Stack & conventions

- **Tailwind v4** — design tokens live in the `@theme` block in `src/index.css`
  (Tailwind v4 does not auto-load `tailwind.config.js`). Utilities like `bg-ink`,
  `text-bone`, `text-accent`, `font-display`, and `font-mono` come from there.
- **Fonts** — `Fraunces` (display/body serif) and `IBM Plex Mono` (placards, labels,
  metadata), loaded from Google Fonts in `index.html`.
- **Content** — every CV fact is centralised in `src/data/cv.ts`. Edit that one file
  to update the whole site; sections render from it.

## Project structure

```
src/
  data/cv.ts            # single source of truth for all CV content
  components/           # reusable pieces (Frame, Placard, Nav, Footer, Reveal, ...)
  sections/             # Hero, Statement, Exhibitions, Featured, Materials,
                        #   Provenance, Recognition, Activities
  pages/Home.tsx        # composes the full exhibition
  index.css             # @theme tokens + base + grain/vignette
```

## Local development

```bash
npm install
npm run dev      # start the Vite dev server
npm run build    # type-safe production build to dist/
npm run preview  # preview the production build locally
```

## Deployment (Vercel)

The repo is configured to deploy as a static site on **Vercel**.

- `vercel.json` sets the framework (`vite`), build command (`npm run build`), and
  output directory (`dist`).

### First-time setup

1. Push this repo to GitHub (see branch workflow below).
2. In Vercel: **Add New → Project → Import Git Repository** and pick this repository,
   or link it from the CLI (below).
3. Vercel reads `vercel.json` automatically — no extra config needed.

### Or via the Vercel CLI

```bash
npx vercel login
npx vercel link     # create/link a project
npx vercel --prod   # build & deploy to production
```

## Branch workflow

- `main` — production-ready.
- `development` — integration branch.
- `feature/*` — one branch per feature, merged into `development`.
