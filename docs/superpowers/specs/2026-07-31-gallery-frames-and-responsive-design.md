# Gallery Frames, Always-Visible Materials Labels, and Responsive Pass

## Context

Following the off-white gallery redesign, three polish requests came in together: (1) make every framed card look like a literal picture frame hanging in a gallery — black frame, white interior, a museum-style plaque at the bottom — (2) make the Materials tech-stack labels always visible instead of hover-only, with icon and icon-less items visually grouped, and (3) make the whole site work properly on tablet and mobile, including a real mobile nav menu (currently missing entirely).

These are small, related UI polish items on the same codebase rather than independent subsystems, so they're covered in one spec/plan.

## Part 1: Frame Component — Black Frame, White Interior, Bottom Plaque

`src/components/Frame.tsx` currently renders a hairline-bordered, cream-colored (`bg-wall`) card. It changes to a literal black picture frame:

- A new design token, `--color-frame: #141414`, is added to the `@theme` block in `src/index.css` (distinct from `--color-ink`, which is the page's light background token in this codebase's naming — reusing it here would be confusing since it no longer means "dark").
- The frame's outer border becomes thick and black: `border-[10px] border-frame` (was `border border-hairline`).
- The interior background becomes pure white: `bg-white` (was `bg-wall`).
- The inner mat border (`border-black/[0.03]`) and padding stay as-is — they read fine against white.
- The ochre hover-glow and lift effect are unchanged in mechanism, just visually re-tuned if needed against the new black/white combination (kept subtle).
- A new optional prop, `plaque?: string`. When provided, a small absolutely-positioned mono-type label renders centered at the bottom edge of the frame, overlapping it slightly (like a museum plaque screwed to a picture frame): dark background matching the frame color, light text, small uppercase mono type, horizontally centered via `left-1/2 -translate-x-1/2`, vertically straddling the frame's bottom border (`-bottom-3` or similar, tuned visually). When `plaque` is omitted, nothing renders — no layout reservation, no empty space.

**Consumers:**
- `src/sections/Projects.tsx` passes `plaque={\`${p.name.toUpperCase()} · ${p.tag.toUpperCase()} · ${p.date}\`}` for each project (e.g. "CORE&CO · COURSEWORK · 2025").
- `src/sections/Exhibitions.tsx` (Work Experience), `src/sections/Recognition.tsx`, and `src/sections/Activities.tsx` do not pass `plaque` — they keep displaying their own internal `Placard`/header content as today, just inside the new black-frame/white-interior shell. No redundant duplicate label is added to these.

## Part 2: Materials — Always-Visible Labels, Grouped Layout

`src/components/TechIcon.tsx`: the label `<span>` changes from `opacity-0 transition-opacity duration-300 group-hover:opacity-100` to always visible (drop the opacity-0/hover-reveal, keep the element always rendered at full opacity). The icon's hover-lift (`-translate-y-1`) and hover accent-color stay as a secondary interaction, but reading the label never requires hovering.

`src/sections/Materials.tsx`: within each skill row, items currently render in their original array order via a single `.map()`, which interleaves icon and icon-less (text-pill) items in whatever order they happen to sit in `src/data/cv.ts`. This changes to a two-group render: partition `row.items` into `withIcon` (items present in `iconMap`) and `withoutIcon` (items absent from `iconMap`), render all `withIcon` items first (preserving their relative order), then — only if `withoutIcon` is non-empty — a thin vertical hairline divider (`h-8 w-px bg-hairline`), then all `withoutIcon` items as the existing text-pill style. This groups every row into two clean visual clusters (icons, then a divider, then plain-text terms) instead of an alternating pattern, without changing the underlying `skills` data in `cv.ts`.

## Part 3: Responsive Pass

**Mobile nav menu** (`src/components/Nav.tsx`): currently the link list is `hidden md:flex`, and the only thing visible below `md` is a static year label — there is no way to navigate via nav links on a phone or narrow tablet at all. This adds a real mobile menu:
- Below `md`, a hamburger icon button (`Menu`/`X` from the existing `lucide-react` dependency) replaces the static year label.
- Tapping it toggles (local `useState<boolean>`) a full-width dropdown panel anchored below the header, listing all 7 links from the existing `links` array in the same order, styled consistently with the site's mono/uppercase link treatment.
- Tapping any link in the panel closes it (in addition to the browser's native anchor-scroll behavior).
- No new dependency — `useState` and the existing `lucide-react` icons are sufficient.

**Audit pass, not a redesign.** After the above two structural changes, the implementer manually checks every section at three widths — 375px (phone), 768px (tablet), 1024px (small desktop) — using the browser dev tools device toolbar (or Playwright viewport emulation) against the running dev server, and fixes concrete breakage found (text overflow, cramped padding, horizontal scroll, a grid that doesn't collapse). This is not a license to rewrite layouts that already stack correctly via existing `grid-cols-1`/`sm:`/`lg:` breakpoints — only fix what's actually observed broken. Two specific risk spots called out for closest attention going in:
- Hero's viewport-scaled name (`text-[18vw] sm:text-[15vw]`) on short/narrow phone and tablet-portrait screens — verify it doesn't overflow or collide with the scroll-cue element.
- The new 10px-thick black Frame border (Part 1) eating into usable content width/padding at 375px — verify `p-7 sm:p-9` inner mat padding still reads comfortably once the outer border is that much thicker.

Any additional breakage found during the audit gets fixed inline as part of this task and noted in the implementer's report; it does not need to be pre-enumerated here since the whole point of the audit is to find what an exhaustive breakpoint list can't predict in advance.

## Non-goals

- No redesign of section layouts that already collapse correctly (e.g. Projects' `grid-cols-1 lg:grid-cols-2` already stacks on mobile).
- No new npm dependencies.
- No change to the `skills`/`projects` data shape in `cv.ts` — Parts 1 and 2 are purely presentational.

## Testing / Verification

No test suite exists in this repo. Verification is manual:
- `npm run dev`, visually confirm every `Frame` usage (Projects, Work Experience, Recognition, Activities) now shows a thick black border and white interior, and that only Projects cards show a bottom plaque with the correct "NAME · TAG · DATE" text.
- Confirm Materials rows show every icon's label without hovering, and that icon-less items are visually grouped to the right of a divider within each row.
- Confirm the mobile nav hamburger appears below `md`, opens/closes correctly, and every link scrolls to and closes the menu.
- Manually resize/emulate 375px, 768px, and 1024px viewports across every section and fix any breakage found.
- `npx tsc --noEmit` and `npm run build` for a final clean check (per this repo's documented local-build-hang caveat in `CLAUDE.md`, rely on the dev-server check if the local build hangs).
