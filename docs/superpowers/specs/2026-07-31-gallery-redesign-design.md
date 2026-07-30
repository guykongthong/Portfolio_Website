# Gallery Redesign — Minimalist Off-White Exhibition

## Context

The portfolio is a single-page CV presented as an art-gallery exhibition (React 19, TypeScript, Tailwind v4, framer-motion, deployed on Vercel). The current visual identity is a dark gallery: near-black background, off-white text, crimson accent (`#0b0b0b` / `#ededed` / `#df3b34`). This reads "gamer/tech-startup" rather than "minimalist art exhibition."

This redesign keeps the gallery *concept* (frames, placards, room numbers, exhibition language) but changes the *palette* to warm neutral off-white/charcoal/ochre, adds real project media (with placeholders until assets exist), restructures Projects into a richer, tag-labeled gallery separate from Work Experience, and makes the tech stack section an interactive icon grid.

## Goals

- Replace the dark/crimson palette with a warm off-white, charcoal, and soft-ochre palette used sparingly.
- Add an image/video slot to every project, with a clear placeholder state when no media exists yet.
- Separate **Work Experience** (roles, brief) from **Projects** (built things, full detail), with three of the CV's freelance/internship roles reappearing in Projects as deeper, project-specific write-ups.
- Tag each project (Coursework / Freelance / Internship / Personal) directly under its title.
- Make the Tech Stack section an interactive icon grid (real brand icons, hover-reveal captions) instead of plain text pills.
- Preserve the existing component architecture (`Frame`, `Placard`, `SectionHeader`, `Reveal`, data-driven sections) and motion language; this is a reskin + content restructure, not a rebuild from scratch.

## Non-goals

- No CMS or admin UI for managing project media — media paths are still hardcoded in `src/data/cv.ts`, same as all other content.
- No new pages/routing — still a single-page site.
- No sourcing of actual screenshots/videos in this pass — placeholders are shipped; real media is dropped in later by editing `cv.ts`.

## Color & Typography Tokens

`src/index.css` `@theme` block token values change; token **names** stay the same to avoid touching every component's class names:

```css
@theme {
  --color-ink: #f5f1ea;       /* was near-black bg, now warm off-white bg */
  --color-wall: #ece6da;      /* raised panel / card surface, deeper cream */
  --color-wall-2: #e3dbca;    /* secondary panel, one step deeper */
  --color-hairline: #d8d0c0;  /* frame borders */
  --color-bone: #1c1b19;      /* was off-white text, now soft charcoal text */
  --color-ash: #6b6862;       /* muted text */
  --color-faint: #9c968a;     /* faintest text / dividers */
  --color-accent: #b8863b;    /* soft ochre, was crimson */
  --color-accent-dim: #8f6a2e;

  --font-display: "Fraunces", Georgia, "Times New Roman", serif; /* unchanged */
  --font-mono: "IBM Plex Mono", ui-monospace, "SF Mono", monospace; /* unchanged */
}
```

Base styles (`:root`, `body`, `::selection`, scrollbar) reference the same variables and need no structural change, only the values above flow through.

`.grain::before` opacity drops from `0.045` to roughly `0.03` so it reads as paper texture on cream rather than noise on black. `.vignette::after` (the dark edge-shadow radial gradient) is removed entirely — it's a dark-room lighting effect that looks wrong on a light wall. `GrainOverlay.tsx` renders `className="grain"` only (drop `vignette`).

## Data Model (`src/data/cv.ts`)

`experiences` (used by Work Experience section) is unchanged in shape and content.

`projects` is extended and repopulated:

```ts
export interface Project {
  name: string;
  tag: "Coursework" | "Freelance" | "Internship" | "Personal";
  institution?: string;
  date: string;
  meta: string; // existing field, e.g. "4-Person Team · End-of-Semester Project"
  stack: string[];
  liveHref?: string;
  bullets: string[];
  media: ProjectMedia[]; // empty array = render placeholder
}

export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt: string;
}
```

Populated entries, newest first:

1. **CCMX 2027** — tag `Freelance`, institution "Chiang Mai University", detail pulled from the existing CCMX 2027 experience bullets plus the layered-architecture/three-layer-security framing, stack: Cloudflare Workers, Hono, Supabase, Postgres RLS. `media: []`.
2. **TU: The Public Platform** — tag `Freelance`, detail on the Figma → bilingual React 18/TypeScript build, stack: React 18, TypeScript, TanStack Router, Tailwind v4, React Hook Form, Zod, Axios. `media: []`.
3. **CompLaunch Tournament Management System** — tag `Internship`, detail on the 20+ REST endpoints and bracket logic unit tests, stack: Python, REST APIs, Unit Testing. `media: []`.
4. **Core&Co Online Webstore** — tag `Coursework` (existing entry, content unchanged), `media: []`.
5. **Laptop Keyboard Comparison Report** — tag `Personal`, `liveHref` to the existing GitHub repo, stack: Python, data analysis. `media: []`.
6. **This Portfolio Website** — tag `Personal`, `liveHref` to the live Vercel URL, stack: React 19, TypeScript, Tailwind v4, framer-motion. `media: []`.

`skills` array shape is unchanged. A new lookup table (in the Materials component file, not in `cv.ts`) maps each skill-item string to a `react-icons/si` icon component; items with no matching brand icon (e.g. "REST APIs", "Row Level Security") fall back to a small generic glyph or are simply rendered as text without an icon slot.

## Sections & Components

**Nav** — link list becomes `Statement, Work, Projects, Materials, Provenance, Activities, Visit`; anchors updated to match renamed section ids (`#work`, `#projects`).

**Hero, Statement, Provenance, Recognition, Activities, Footer, Placard, SectionHeader** — no structural changes, palette flows through automatically via the token swap. `Frame`'s hover glow changes from a crimson blur to a soft warm-gray drop-shadow lift (a glow reads oddly on a light background); the cast shadow becomes lighter (`rgba(28,27,25,0.12)`-ish) instead of the current heavy black shadow.

**Exhibitions.tsx → renamed conceptually to "Work Experience" content** (file can keep its name or be renamed to `WorkExperience.tsx`; section id becomes `work`) — same placard-list structure, recolored.

**Featured.tsx → replaced by `Projects.tsx`** — full-width, one-project-at-a-time layout, alternating media side (left/right) per project as you scroll down:

- Each project renders inside `Frame`, split into a media column and a placard/detail column, order alternating via `i % 2`.
- Media column renders `ProjectMedia` (new component): if `media.length > 0`, shows the image (`<img>`) or video (`<video autoPlay muted loop playsInline>` for a self-playing demo clip); if empty, shows a dashed-border box in `wall-2` with a small centered mono caption "Image coming soon" and the project name, sized to the same aspect ratio (16:10) so layout doesn't jump once media is added.
- Placard column: project name (serif), a small mono tag pill under the title (e.g. `FREELANCE`, colored via `text-accent` on a `border-hairline` pill, matching the existing stack-pill style), meta line, stack pills (existing style), and numbered bullets (existing style).
- All six entries get equal visual weight, ordered by recency (list order above).

**Materials.tsx → rebuilt as icon grid**:

- Still grouped by category label (`Languages`, `Spoken`, `Web`, `Databases`, `DevOps / Cloud`, `Tools`) per existing `skills` data.
- Each item renders as a `TechIcon` (new component): a fixed-size tile with the `react-icons/si` icon centered, `text-ash` by default; on hover, the icon lifts (`-translate-y-1`) and recolors to `text-accent`, and a small mono caption fades in below the tile showing the item label (for items that are already just plain skill names, the "caption" is simply the label appearing on hover instead of always-on, satisfying "interactive" without needing per-item usage metadata that doesn't exist in the data model). Items without a mapped icon (spoken languages, "REST APIs", "Row Level Security", etc.) render as a text-only pill in the existing style, mixed into the same flex-wrap row as the icon tiles.

## New Components

- `src/components/ProjectMedia.tsx` — props `{ media: ProjectMedia[]; name: string }`; renders first media item or the placeholder box described above.
- `src/components/TechIcon.tsx` — props `{ icon?: IconType; label: string }`; renders the hover-interactive tile, or falls back to a plain pill if `icon` is undefined.

## Dependencies

Add `react-icons` (for `react-icons/si` brand logos). `lucide-react` stays for the non-brand outline icons already used in Recognition/Activities/Footer.

## Testing / Verification

No test suite exists in this repo (per `CLAUDE.md`). Verification is manual:
- `npm run dev` and visually check every section renders with the new palette, no leftover dark/crimson classes.
- Confirm nav anchors scroll to the renamed sections.
- Confirm the Projects gallery renders all six entries with placeholders sized correctly and no layout shift.
- Confirm Materials icon grid shows real icons for at least Java, Python, JavaScript, TypeScript, React, Node.js, Docker, PostgreSQL, Figma; verify hover states.
- `npm run build` to confirm no TypeScript errors from the `cv.ts` type changes propagating through `Projects.tsx`/`ProjectMedia.tsx`.
- Rely on Vercel's cloud build as the authoritative build check per the documented local-build-hang caveat in `CLAUDE.md`.
