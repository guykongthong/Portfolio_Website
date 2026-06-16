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
                        #   Provenance, Recognition
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

## Deployment (Railway)

The repo is configured to deploy as a static site on **Railway** via Nixpacks.

- `railway.json` sets the build command (`npm run build`) and start command
  (`serve -s dist -l tcp://0.0.0.0:$PORT`).
- `serve` is a runtime dependency; `npm start` serves `dist/` on `$PORT`.

### First-time setup

1. Push this repo to GitHub (see branch workflow below).
2. In Railway: **New Project → Deploy from GitHub repo** and pick this repository.
3. Railway reads `railway.json` automatically — no extra config needed. It will run
   `npm install`, `npm run build`, then `npm start`.
4. Under the service **Settings → Networking**, click **Generate Domain** to get a
   public URL.

### Or via the Railway CLI

```bash
npm i -g @railway/cli
railway login
railway init        # create/link a project
railway up          # build & deploy
railway domain      # attach a public domain
```

## Branch workflow

- `main` — production-ready.
- `development` — integration branch.
- `feature/*` — one branch per feature, merged into `development`.
