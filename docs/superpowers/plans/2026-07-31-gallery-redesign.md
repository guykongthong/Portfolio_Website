# Minimalist Off-White Gallery Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reskin the portfolio from a dark/crimson "night gallery" to a minimalist off-white/charcoal/ochre gallery, restructure Projects into a tagged, media-ready gallery separate from Work Experience, and make the tech stack an interactive icon grid.

**Architecture:** This is a reskin + content restructure of an existing React 19 + TypeScript + Tailwind v4 + framer-motion single-page site, not a rebuild. Design tokens flow from `src/index.css` through existing component classes unchanged; new content flows from `src/data/cv.ts` through two new presentational components (`ProjectMedia`, `TechIcon`) and one rebuilt section (`Projects.tsx`, replacing `Featured.tsx`).

**Tech Stack:** React 19, TypeScript, Vite 7, Tailwind CSS v4, framer-motion, lucide-react (existing), react-icons (new, for `react-icons/si` brand logos).

## Global Constraints

- Design-token variable **names** stay the same (`ink`, `wall`, `wall-2`, `hairline`, `bone`, `ash`, `faint`, `accent`, `accent-dim`) — only their color values change. Do not rename classes across components.
- No CMS, no new routing, no admin UI — all content stays hardcoded in `src/data/cv.ts` per existing convention.
- `experiences` array/type in `cv.ts` is unchanged; only `projects` gains fields.
- Every new `Project` entry ships with `media: []` (no real assets exist yet) and must render a placeholder, not a broken image.
- There is no test suite in this repo (confirmed in `CLAUDE.md`). Verification steps in this plan are manual: `npm run dev` + visual check, and `npm run build` for type-check confirmation. Do not invent a test framework.
- `vite build` may hang locally per the documented esbuild IPC stall in `CLAUDE.md` — if a build step hangs with 0% CPU, treat it as environmental, verify via `npm run dev` instead, and note it rather than blocking on it.
- Follow existing code style: Tailwind utility classes inline, `font-mono` for labels/metadata, `font-display` for headings, `Reveal` wrapper for scroll-in animation, `Frame`/`Placard`/`SectionHeader` reused as-is.

---

## Task 1: Recolor Theme Tokens & Remove Dark-Gallery Effects

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/GrainOverlay.tsx`
- Modify: `src/components/Frame.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: recolored `--color-*` custom properties consumed by every existing component via Tailwind utilities (`bg-ink`, `text-bone`, `border-hairline`, `text-accent`, etc.) — no other task depends on new exports here, but every visual task after this one assumes these values are already in place.

- [ ] **Step 1: Replace the `@theme` token values in `src/index.css`**

Replace the existing `@theme { ... }` block with:

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

- [ ] **Step 2: Lower the grain opacity and delete the vignette rule**

In `src/index.css`, find:

```css
.grain::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  opacity: 0.045;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 160px 160px;
}

/* Edge vignette so the gallery walls fall into shadow */
.vignette::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 55;
  pointer-events: none;
  background: radial-gradient(
    120% 90% at 50% 38%,
    transparent 55%,
    rgba(0, 0, 0, 0.5) 100%
  );
}
```

Replace with (grain opacity dropped to read as paper texture; vignette rule removed entirely):

```css
.grain::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 160px 160px;
}
```

- [ ] **Step 3: Update `GrainOverlay.tsx` to drop the removed `vignette` class**

Replace the full file contents with:

```tsx
/**
 * Atmosphere layer for the whole page: a faint paper-grain texture.
 * Pure CSS pseudo-element (see .grain in index.css); sits above content but
 * ignores pointer events.
 */
export default function GrainOverlay() {
  return <div className="grain" aria-hidden="true" />;
}
```

- [ ] **Step 4: Soften `Frame.tsx`'s hover glow and shadow for a light background**

Replace the full file contents with:

```tsx
import type { ReactNode } from "react";

interface FrameProps {
  children: ReactNode;
  /** exhibit number shown on the frame, e.g. "01" */
  index?: string;
  className?: string;
}

/**
 * A piece hung on the gallery wall: hairline outer frame, inner mat, soft cast
 * shadow, and an ochre edge that lights up on hover. The exhibit number sits in
 * the top-left like a wall label.
 */
export default function Frame({ children, index, className = "" }: FrameProps) {
  return (
    <div className={`group relative ${className}`}>
      {/* ochre glow that fades in on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[2px] bg-accent/0 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-20"
        style={{ background: "var(--color-accent)" }}
      />

      <div className="relative rounded-[2px] border border-hairline bg-wall shadow-[0_18px_40px_-24px_rgba(28,27,25,0.18)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent/60">
        {/* inner mat */}
        <div className="rounded-[1px] border border-black/[0.03] p-7 sm:p-9">
          {index && (
            <span className="pointer-events-none absolute right-5 top-4 font-mono text-[11px] tracking-[0.25em] text-faint transition-colors duration-500 group-hover:text-accent">
              {index}
            </span>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Visually verify the recolor**

Run: `npm run dev`

Open the local dev URL. Expected: the page background is warm off-white, all text is dark charcoal (not white-on-black), hovering any framed card (e.g. scroll to Recognition or Activities, which use `Frame` already) shows a soft ochre-tinted lift instead of a red glow, and there's no dark vignette shadow at the screen edges.

- [ ] **Step 6: Commit**

```bash
cd "/Users/guykongthong/Desktop/software-engineering/code/personal/projects/portfolio_website"
git add src/index.css src/components/GrainOverlay.tsx src/components/Frame.tsx
git commit -m "$(cat <<'EOF'
Recolor gallery theme from dark/crimson to off-white/charcoal/ochre

Swaps the design-token values (names unchanged) so every existing
component using bg-ink/text-bone/text-accent picks up the new palette
automatically, and softens the Frame hover effect and grain texture
for a light background.
EOF
)"
```

---

## Task 2: Extend the Data Model and Repopulate Projects

**Files:**
- Modify: `src/data/cv.ts`

**Interfaces:**
- Produces: `Project` interface with new fields `tag: "Coursework" | "Freelance" | "Internship" | "Personal"`, `institution?: string`, `media: ProjectMedia[]`; new `ProjectMedia` interface `{ type: "image" | "video"; src: string; alt: string }`; `projects: Project[]` array with 6 entries. Task 5 (`ProjectMedia` component) and Task 6 (`Projects.tsx`) both import `projects` and the `ProjectMedia` type from this file.

- [ ] **Step 1: Update the `Project` and add the `ProjectMedia` interface**

In `src/data/cv.ts`, replace:

```ts
export interface Project {
  name: string;
  meta: string; // "4-Person Team · End-of-Semester Project"
  stack: string[];
  liveHref?: string;
  bullets: string[];
}
```

with:

```ts
export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt: string;
}

export interface Project {
  name: string;
  tag: "Coursework" | "Freelance" | "Internship" | "Personal";
  institution?: string;
  date: string;
  meta: string; // "4-Person Team · End-of-Semester Project"
  stack: string[];
  liveHref?: string;
  bullets: string[];
  media: ProjectMedia[]; // empty array renders a placeholder
}
```

- [ ] **Step 2: Replace the `projects` array**

Replace the existing `export const projects: Project[] = [...]` block with:

```ts
export const projects: Project[] = [
  {
    name: "CCMX 2027 Conference Platform",
    tag: "Freelance",
    institution: "Chiang Mai University",
    date: "Jul 2026 — Aug 2026",
    meta: "Freelance · Conference Registration & Abstract Submission Platform",
    stack: ["Cloudflare Workers", "Hono", "Supabase", "Postgres RLS"],
    bullets: [
      "Backend developer on CCMX 2027, a conference registration and abstract submission platform for a CMU-affiliated academic conference serving 300-600 medical professionals.",
      "Implemented the Cloudflare Workers + Hono API within the project's layered architecture and three-layer security model: Supabase Auth JWT, in-app RBAC checks, and Postgres RLS as a backstop.",
      "Built the shared request/response scaffolding (request-id middleware, error handling, response envelope) and endpoints for registration, invite codes, payment-slip review, and abstract submission, tracked in Jira.",
    ],
    media: [],
  },
  {
    name: "TU: The Public Platform",
    tag: "Freelance",
    institution: "TU: The Public Platform",
    date: "May 2026 — Present",
    meta: "Freelance · Public-Interest Content Platform",
    stack: ["React 18", "TypeScript", "TanStack Router", "Tailwind CSS v4", "React Hook Form", "Zod", "Axios"],
    bullets: [
      "Building the frontend for a public-interest content platform where submissions go through an AI-assisted review pipeline before publishing.",
      "Designed Figma wireframes and prototypes for the end-to-end user flows, then built a bilingual (i18n) UI in React 18, TypeScript, TanStack Router, and Tailwind CSS v4.",
      "Handling form validation (React Hook Form + Zod), file uploads, and authenticated API calls via Axios interceptors, in a weekly Agile sprint cycle.",
    ],
    media: [],
  },
  {
    name: "CompLaunch Tournament Management System",
    tag: "Internship",
    institution: "CompLaunch",
    date: "Oct 2025 — Dec 2025",
    meta: "Backend Engineering Internship",
    stack: ["Python", "REST APIs", "Unit Testing"],
    bullets: [
      "Built a Python-based tournament management system with 20+ REST endpoints covering single elimination, double elimination, and round-robin bracket logic.",
      "Wrote unit tests for the bracket logic to catch edge cases before they hit production.",
    ],
    media: [],
  },
  {
    name: "Core&Co Online Webstore",
    tag: "Coursework",
    date: "2025",
    meta: "4-Person Team · End-of-Semester Project",
    stack: ["Node.js", "Express", "EJS", "MySQL", "Docker Compose", "GitHub Actions", "AWS EC2"],
    bullets: [
      "Sole backend/infrastructure owner on a 4-person team; teammates handled UI/UX and frontend.",
      "Built a REST API with token-based auth (email verification, password reset), product catalog, cart/checkout, and order management, deployed to production on AWS.",
      "Indexed frequently-queried fields to cut down query time, and used Supabase Storage with URL references in MySQL to keep product images out of the database.",
      "Containerized with Docker Compose and set up a GitHub Actions pipeline to auto-deploy to AWS EC2 on every push to main.",
    ],
    media: [],
  },
  {
    name: "Laptop Keyboard Comparison Report",
    tag: "Personal",
    date: "2026",
    meta: "Personal · Data-Driven Study",
    liveHref: "https://github.com/guykongthongcmu/laptop-keyboard-comparison-report",
    stack: ["Python", "Data Analysis"],
    bullets: [
      "A data-driven typing performance study comparing typing performance across different laptop keyboards.",
    ],
    media: [],
  },
  {
    name: "This Portfolio Website",
    tag: "Personal",
    date: "2026",
    meta: "Personal · Self-Referential Exhibit",
    liveHref: "https://portfoliowebsite-teal-ten.vercel.app",
    stack: ["React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
    bullets: [
      "This CV, presented as a minimalist gallery exhibition rather than a typical developer portfolio.",
      "Built with React 19, TypeScript, and Tailwind CSS v4, with framer-motion handling scroll reveals and transitions.",
    ],
    media: [],
  },
];
```

- [ ] **Step 3: Verify the type-checks**

Run: `npx tsc --noEmit`

Expected: no errors. (This will surface immediately if `Featured.tsx`, which still references the old `Project` shape, breaks — that's expected until Task 6 rewrites it. If `tsc --noEmit` reports errors only inside `src/sections/Featured.tsx`, that's expected at this point in the plan; any error inside `src/data/cv.ts` itself must be fixed before continuing.)

- [ ] **Step 4: Commit**

```bash
cd "/Users/guykongthong/Desktop/software-engineering/code/personal/projects/portfolio_website"
git add src/data/cv.ts
git commit -m "$(cat <<'EOF'
Extend Project data model with tag/media and repopulate projects list

Adds tag (Coursework/Freelance/Internship/Personal), institution,
date, and a media slot to each project, and expands the projects
array from one entry (Core&Co) to six, pulling CCMX 2027, TU
Platform, and the CompLaunch tournament system out of experiences
into fuller project write-ups, plus the keyboard report and this
site. All media arrays are empty pending real screenshots/video.
EOF
)"
```

---

## Task 3: Add the `react-icons` Dependency

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: `react-icons/si` module available for import. Task 4 imports `IconType` from `react-icons` and specific `Si*` icons from `react-icons/si`.

- [ ] **Step 1: Install the package**

```bash
cd "/Users/guykongthong/Desktop/software-engineering/code/personal/projects/portfolio_website"
npm install react-icons
```

- [ ] **Step 2: Verify it installed correctly**

Run: `node -e "require.resolve('react-icons/si')"`

Expected: no output, exit code 0 (means the module resolved).

- [ ] **Step 3: Commit**

```bash
cd "/Users/guykongthong/Desktop/software-engineering/code/personal/projects/portfolio_website"
git add package.json package-lock.json
git commit -m "$(cat <<'EOF'
Add react-icons for brand-logo tech stack icons

Needed for the upcoming interactive Materials icon grid, which uses
real Simple Icons logos (react-icons/si) rather than plain text pills.
EOF
)"
```

---

## Task 4: Build `TechIcon` and Rebuild Materials as an Icon Grid

**Files:**
- Create: `src/components/TechIcon.tsx`
- Modify: `src/sections/Materials.tsx`

**Interfaces:**
- Consumes: `skills` from `src/data/cv.ts` (unchanged shape: `{ label: string; items: string[] }[]`); `IconType` from `react-icons`.
- Produces: `TechIcon` component with props `{ icon?: IconType; label: string }` — renders an interactive icon tile if `icon` is provided, otherwise a plain text pill. No other task consumes `TechIcon` besides `Materials.tsx` in this task.

- [ ] **Step 1: Create `src/components/TechIcon.tsx`**

```tsx
import type { IconType } from "react-icons";

interface TechIconProps {
  /** Simple Icons component from react-icons/si; omit to render a plain text pill */
  icon?: IconType;
  label: string;
}

/**
 * One tile in the Materials icon grid. With an icon: a plain gray glyph that
 * lifts and turns ochre on hover, with its label fading in beneath it like a
 * placard. Without an icon (e.g. spoken languages, generic terms): falls back
 * to the same pill style used for project stack tags, so the grid never has
 * empty holes.
 */
export default function TechIcon({ icon: Icon, label }: TechIconProps) {
  if (!Icon) {
    return (
      <span className="rounded-full border border-hairline px-3 py-1 font-mono text-[11px] tracking-[0.04em] text-ash">
        {label}
      </span>
    );
  }

  return (
    <div className="group flex w-20 flex-col items-center gap-2">
      <Icon className="h-7 w-7 text-ash transition-all duration-300 group-hover:-translate-y-1 group-hover:text-accent" />
      <span className="max-w-[80px] text-center font-mono text-[9px] uppercase leading-tight tracking-[0.08em] text-faint opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {label}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Replace `src/sections/Materials.tsx`**

```tsx
import {
  SiOpenjdk,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiNodedotjs,
  SiExpress,
  SiHono,
  SiReact,
  SiVuedotjs,
  SiBootstrap,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiDocker,
  SiGithubactions,
  SiAmazonec2,
  SiCloudflareworkers,
  SiLinux,
  SiGit,
  SiGithub,
  SiGitlab,
  SiPostman,
  SiFigma,
  SiJira,
  SiOpenapiinitiative,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { skills } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import TechIcon from "../components/TechIcon";
import Reveal from "../components/Reveal";

/**
 * Maps a skill label (as written in src/data/cv.ts) to its Simple Icons brand
 * logo. Labels with no entry here (spoken languages, generic terms like
 * "REST APIs" or "CI/CD" with no single brand mark) render as text pills.
 */
const iconMap: Record<string, IconType> = {
  Java: SiOpenjdk,
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "C++": SiCplusplus,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Hono: SiHono,
  React: SiReact,
  "Vue.js": SiVuedotjs,
  Bootstrap: SiBootstrap,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  "Supabase (Auth, Storage, Row Level Security)": SiSupabase,
  Docker: SiDocker,
  "GitHub Actions": SiGithubactions,
  "AWS EC2": SiAmazonec2,
  "Cloudflare Workers": SiCloudflareworkers,
  Linux: SiLinux,
  Git: SiGit,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  Postman: SiPostman,
  Figma: SiFigma,
  Jira: SiJira,
  OpenAPI: SiOpenapiinitiative,
};

/**
 * Skills as the artist's materials — now an interactive icon grid grouped by
 * discipline. Hovering a tile lifts the icon and reveals its label, like
 * reading a small placard next to a tool on display.
 */
export default function Materials() {
  return (
    <section
      id="materials"
      className="scroll-mt-24 border-t border-hairline/60 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader room="III" kicker="Tools & Techniques" title="Materials" />

        <div className="divide-y divide-hairline border-y border-hairline">
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
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Visually verify**

Run: `npm run dev`, scroll to the Materials section.

Expected: Languages row shows real logos for Java (openjdk mark), Python, JavaScript, TypeScript, C++; Web row shows Node.js, Express, Hono, React, Vue.js logos plus text pills for REST APIs/OpenAPI (OpenAPI should also have a logo)/Bootstrap/EJS (EJS has no icon, so it's a pill); hovering any logo tile lifts it slightly, turns it ochre, and fades in its label underneath. Spoken languages row renders as plain pills (no icons expected there).

- [ ] **Step 4: Commit**

```bash
cd "/Users/guykongthong/Desktop/software-engineering/code/personal/projects/portfolio_website"
git add src/components/TechIcon.tsx src/sections/Materials.tsx
git commit -m "$(cat <<'EOF'
Rebuild Materials as an interactive tech-stack icon grid

Replaces plain text pills with real Simple Icons brand logos where
one exists, with a hover-lift + fade-in-label interaction. Terms with
no single brand mark (REST APIs, CI/CD, spoken languages, etc.) keep
the existing text-pill treatment so the grid never has empty gaps.
EOF
)"
```

---

## Task 5: Build the `ProjectMedia` Component

**Files:**
- Create: `src/components/ProjectMedia.tsx`

**Interfaces:**
- Consumes: `ProjectMedia` type from `src/data/cv.ts` (Task 2).
- Produces: `ProjectMedia` component with props `{ media: ProjectMediaItem[]; name: string }` (note: the component is named the same as the imported type — see Step 1 for how the import is aliased to avoid a collision). Task 6 (`Projects.tsx`) renders this component for every project.

- [ ] **Step 1: Create `src/components/ProjectMedia.tsx`**

```tsx
import type { ProjectMedia as ProjectMediaItem } from "../data/cv";

interface ProjectMediaProps {
  media: ProjectMediaItem[];
  name: string;
}

/**
 * The image/video wall for a project. Renders the first media item if one
 * exists; otherwise renders a same-sized dashed placeholder so the gallery
 * layout doesn't shift once real screenshots/video are dropped into cv.ts.
 */
export default function ProjectMedia({ media, name }: ProjectMediaProps) {
  const item = media[0];

  if (!item) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center border border-dashed border-hairline bg-wall-2">
        <div className="flex flex-col items-center gap-2 px-6 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-faint">
            Image coming soon
          </span>
          <span className="font-display text-sm text-ash">{name}</span>
        </div>
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <video
        className="aspect-[16/10] w-full border border-hairline object-cover"
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return (
    <img
      className="aspect-[16/10] w-full border border-hairline object-cover"
      src={item.src}
      alt={item.alt}
    />
  );
}
```

- [ ] **Step 2: Verify the type-checks**

Run: `npx tsc --noEmit`

Expected: no errors referencing `src/components/ProjectMedia.tsx`.

- [ ] **Step 3: Commit**

```bash
cd "/Users/guykongthong/Desktop/software-engineering/code/personal/projects/portfolio_website"
git add src/components/ProjectMedia.tsx
git commit -m "$(cat <<'EOF'
Add ProjectMedia component with image/video/placeholder states

Renders a project's first media item (image or looping muted video)
at a fixed 16:10 aspect ratio, or a dashed placeholder naming the
project when no media exists yet, so layout stays stable either way.
EOF
)"
```

---

## Task 6: Rebuild the Projects Gallery (replaces `Featured.tsx`)

**Files:**
- Create: `src/sections/Projects.tsx`
- Delete: `src/sections/Featured.tsx`

**Interfaces:**
- Consumes: `projects` from `src/data/cv.ts` (Task 2); `Frame`, `Reveal`, `SectionHeader` (existing, unchanged); `ProjectMedia` (Task 5).
- Produces: `Projects` default export, a `<section id="projects">`. Task 7 wires this into `Home.tsx` in place of `Featured`.

- [ ] **Step 1: Create `src/sections/Projects.tsx`**

```tsx
import { projects } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import Frame from "../components/Frame";
import ProjectMedia from "../components/ProjectMedia";
import Reveal from "../components/Reveal";

/**
 * The gallery's main floor — every real project as its own full-width room,
 * media on one wall and the placard + write-up on the other, alternating
 * sides as you walk (scroll) from one piece to the next. All pieces get
 * equal weight, newest work first.
 */
export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-hairline/60 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader room="II" kicker="Selected Work" title="Projects" />

        <div className="flex flex-col gap-16">
          {projects.map((p, i) => (
            <Reveal key={p.name}>
              <Frame index={String(i + 1).padStart(2, "0")} className="overflow-hidden">
                <div
                  className={`grid gap-10 lg:grid-cols-2 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <ProjectMedia media={p.media} name={p.name} />

                  <div className="flex flex-col">
                    <h3 className="font-display text-3xl font-light leading-[1.05] text-bone sm:text-4xl">
                      {p.name}
                    </h3>
                    <span className="mt-3 w-fit rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                      {p.tag}
                    </span>
                    <p className="mt-3 font-mono text-[12px] tracking-[0.08em] text-ash">
                      {p.meta}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-hairline px-3 py-1 font-mono text-[11px] tracking-[0.04em] text-ash transition-colors duration-300 hover:border-accent/60 hover:text-bone"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <ul className="mt-6 flex flex-col gap-4">
                      {p.bullets.map((b, j) => (
                        <li key={j} className="flex gap-4 text-[15px] leading-relaxed text-ash">
                          <span className="mt-1 font-mono text-[11px] text-faint">
                            {String(j + 1).padStart(2, "0")}
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {p.liveHref && (
                      <a
                        href={p.liveHref}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 w-fit border-b border-accent/60 font-mono text-[11px] uppercase tracking-[0.2em] text-accent transition-colors duration-300 hover:border-bone hover:text-bone"
                      >
                        View project ↗
                      </a>
                    )}
                  </div>
                </div>
              </Frame>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Delete the old `Featured.tsx`**

```bash
cd "/Users/guykongthong/Desktop/software-engineering/code/personal/projects/portfolio_website"
git rm src/sections/Featured.tsx
```

- [ ] **Step 3: Verify the type-checks**

Run: `npx tsc --noEmit`

Expected: any remaining error should only be in `src/pages/Home.tsx` (which still imports the now-deleted `Featured` — fixed in Task 7) and possibly `src/components/Nav.tsx` if it references `#featured` (also fixed in Task 7). No errors should originate from `Projects.tsx` itself.

- [ ] **Step 4: Commit**

```bash
cd "/Users/guykongthong/Desktop/software-engineering/code/personal/projects/portfolio_website"
git add src/sections/Projects.tsx
git commit -m "$(cat <<'EOF'
Replace Featured section with a full Projects gallery

Renders all six projects (not just Core&Co) full-width, one at a
time, alternating media side left/right per project, each tagged
(Coursework/Freelance/Internship/Personal) under its title.
EOF
)"
```

---

## Task 7: Wire Up Navigation and Page Composition

**Files:**
- Modify: `src/components/Nav.tsx`
- Modify: `src/sections/Exhibitions.tsx`
- Modify: `src/pages/Home.tsx`

**Interfaces:**
- Consumes: `Projects` from `src/sections/Projects.tsx` (Task 6).
- Produces: fully wired page — no other task depends on this one; it's the integration point.

- [ ] **Step 1: Update `Nav.tsx` link labels and hrefs**

In `src/components/Nav.tsx`, replace the `links` array:

```ts
const links = [
  { label: "Statement", href: "#statement" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Materials", href: "#materials" },
  { label: "Provenance", href: "#provenance" },
  { label: "Activities", href: "#activities" },
  { label: "Visit", href: "#visit" },
];
```

- [ ] **Step 2: Rename the Work Experience section's anchor id**

In `src/sections/Exhibitions.tsx`, change:

```tsx
    <section
      id="exhibitions"
      className="scroll-mt-24 border-t border-hairline/60 px-6 py-24 sm:px-10 sm:py-32"
    >
```

to:

```tsx
    <section
      id="work"
      className="scroll-mt-24 border-t border-hairline/60 px-6 py-24 sm:px-10 sm:py-32"
    >
```

(Leave the `SectionHeader` text — `room="I"`, `kicker="The Collection"`, `title="Exhibitions"` — unchanged; only the anchor id moves so the nav link works.)

- [ ] **Step 3: Swap `Featured` for `Projects` in `Home.tsx`**

Replace the full file contents of `src/pages/Home.tsx`:

```tsx
import Nav from "../components/Nav";
import GrainOverlay from "../components/GrainOverlay";
import Footer from "../components/Footer";
import Hero from "../sections/Hero";
import Statement from "../sections/Statement";
import Exhibitions from "../sections/Exhibitions";
import Projects from "../sections/Projects";
import Materials from "../sections/Materials";
import Provenance from "../sections/Provenance";
import Recognition from "../sections/Recognition";
import Activities from "../sections/Activities";

/**
 * "The Exhibition" — a software engineering CV arranged as a minimalist gallery.
 */
export default function Home() {
  return (
    <div className="relative min-h-screen bg-ink text-bone">
      <GrainOverlay />
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Exhibitions />
        <Projects />
        <Materials />
        <Provenance />
        <Recognition />
        <Activities />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 4: Full type-check**

Run: `npx tsc --noEmit`

Expected: no errors anywhere in `src/`.

- [ ] **Step 5: Full manual verification**

Run: `npm run dev`

Walk through the whole page top to bottom and confirm:
- Every nav link scrolls to the correct section (`Work` lands on the Work Experience placards, `Projects` lands on the new six-project gallery).
- The Projects gallery shows all six entries in the order: CCMX 2027, TU Platform, CompLaunch, Core&Co, Laptop Keyboard Report, Portfolio Website — each with a tag pill, a placeholder media box, and (for the last two) a "View project ↗" link that opens in a new tab.
- Media sides alternate left/right down the page.
- No leftover references to dark/crimson classes or broken imports in the browser console.

- [ ] **Step 6: Commit**

```bash
cd "/Users/guykongthong/Desktop/software-engineering/code/personal/projects/portfolio_website"
git add src/components/Nav.tsx src/sections/Exhibitions.tsx src/pages/Home.tsx
git commit -m "$(cat <<'EOF'
Wire Projects gallery into nav and page composition

Renames the Work Experience anchor from #exhibitions to #work,
updates nav labels/hrefs to Work/Projects, and swaps Featured for
the new Projects section in the page tree.
EOF
)"
```

---

## Task 8: Final Build Verification

**Files:** none (verification only).

**Interfaces:** none.

- [ ] **Step 1: Run a full production build**

Run: `npm run build`

Expected: build succeeds with no TypeScript errors. Per `CLAUDE.md`, if this hangs at "transforming..." at 0% CPU, that's the known environmental esbuild IPC stall — stop it, rely on Step 2 instead, and note in your final report that the local build hung for the documented environmental reason rather than claiming a build failure.

- [ ] **Step 2: Preview the production build**

Run: `npm run preview` (or, if Step 1 hung, `npm run dev` again)

Open the preview URL and re-check the same walkthrough from Task 7 Step 5 once more against the production bundle: palette, nav anchors, all six projects, tag pills, placeholders, icon grid hover states.

- [ ] **Step 3: Report status**

No commit needed for this task — it's verification-only. Summarize in your final report: whether `npm run build` succeeded or hit the known environmental hang, and confirm the preview/dev walkthrough passed.
