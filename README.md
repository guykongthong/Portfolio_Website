# Portfolio Website

My personal portfolio, designed as a minimalist gallery exhibition. Each CV section is an "exhibit" and each role or project is a framed "piece" with a museum-style placard, on a warm off-white and charcoal palette with a soft ochre accent.

**Live site:** https://portfoliowebsite-teal-ten.vercel.app

## Highlights

- **Content as data.** Every CV fact (profile, experience, projects, skills, awards) lives in one typed file, `src/data/cv.ts`. Sections render from it, so updating the site means editing one file.
- **Project galleries.** Each project can carry screenshots, photos, or demo video in a framed viewer, with portrait and landscape layouts.
- **Motion with restraint.** Scroll reveals and transitions use framer-motion and respect `prefers-reduced-motion`.
- **Responsive.** Checked at phone, tablet, and desktop widths, with a mobile nav menu.

## Tech stack

- React 19 and TypeScript
- Vite 7
- Tailwind CSS v4 (design tokens in the `@theme` block of `src/index.css`)
- framer-motion for animation, lucide-react and react-icons for icons
- Fraunces and IBM Plex Mono, loaded from Google Fonts
- Deployed on Vercel

## Project structure

```
src/
  data/cv.ts          all CV content
  sections/           Hero, Statement, Exhibitions, Projects, Materials,
                      Provenance, Recognition, Activities
  components/         Frame, Placard, ProjectMedia, TechIcon, Reveal, Nav, Footer, ...
  pages/Home.tsx      composes the full page
  index.css           theme tokens and base styles
  assets/             portrait and project media
public/               static files, including the Software Metrics report PDF
```

## Running locally

```bash
npm install
npm run dev        # Vite dev server
npm run build      # production build to dist/
npm run preview    # serve the production build locally
npm run lint
```

## Deployment

The site is a static Vite build deployed on Vercel. `vercel.json` sets the framework, build command, and output directory, so importing the repo into Vercel needs no extra configuration. Every merge to `main` deploys to production.

## Branch workflow

`main` is production. Work happens on `feature/*` branches and lands through pull requests.
