import { accolades, extracurriculars } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

type Kind = "award" | "competition" | "certification" | "activity";

// pixel marks in the one ink colour; the kind is also written out, so shape is never the only cue
function KindIcon({ kind }: { kind: Kind }) {
  if (kind === "activity") {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="12" height="12" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (kind === "competition") {
    // stepped diamond
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
        <path d="M7 1h2v2h2v2h2v2h2v2h-2v2h-2v2H9v2H7v-2H5v-2H3V9H1V7h2V5h2V3h2z" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <path d="M7 0h2v4h2v1h5v2h-2v1h-1v2h1v4h-2v-1h-2v-1H8v1H6v1H4v1H2v-4h1V8H2V7H0V5h5V4h2z" />
    </svg>
  );
}

const kindLabel: Record<Kind, string> = {
  award: "Award",
  competition: "Competition",
  certification: "Certification",
  activity: "Activity",
};

const LONG_DASH = ` ${String.fromCharCode(0x2014)} `;

// accolades in cv.ts read "Title <long dash> detail"; split them into the two lines of a row
const rows = [
  ...accolades.map((a) => {
    const at = a.name.indexOf(LONG_DASH);
    return {
      key: a.name,
      kind: a.kind as Kind,
      title: at > 0 ? a.name.slice(0, at) : a.name,
      detail: at > 0 ? a.name.slice(at + LONG_DASH.length) : "",
      when: a.year,
    };
  }),
  ...extracurriculars.map((x) => ({
    key: x.role + x.organization,
    kind: "activity" as Kind,
    title: `${x.role}, ${x.organization}`,
    detail: x.institution,
    when: "",
  })),
];

const legendKinds = Array.from(new Set(rows.map((r) => r.kind)));

/**
 * Room 06, the catalogue checklist: compact rows, awards and competitions
 * first (newest first, as written in cv.ts), then activities. A pixel mark
 * shows the kind and the kind is also written out; on a phone the kind column
 * hides (the mark plus its text alternative carry it). Rows have nothing to
 * click, so there is no hover state to replace on touch.
 */
export default function Activities() {
  return (
    <section id="activities" aria-labelledby="activities-h" className="relative scroll-mt-16 px-5 py-[72px] sm:px-16 sm:py-28">
      <div className="mx-auto max-w-[1056px]">
        <SectionHeader room="06" meta={`${rows.length} entries`} title="Activities and Awards" id="activities-h">
          <ul aria-label="Key" className="m-0 mt-4 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 font-label text-label uppercase tracking-[0.06em] text-fg-2">
            {legendKinds.map((k) => (
              <li key={k} className="flex items-center gap-2">
                <span className="text-ink">
                  <KindIcon kind={k} />
                </span>
                {kindLabel[k]}
              </li>
            ))}
          </ul>
        </SectionHeader>

        <Reveal>
          <ul className="m-0 mt-6 list-none border-b border-line p-0 md:mt-10">
            {rows.map((r) => (
              <li
                key={r.key}
                className="grid grid-cols-[20px_minmax(0,1fr)_auto] items-start gap-3 border-t border-line py-4 md:min-h-[76px] md:grid-cols-[28px_minmax(0,1fr)_120px_96px] md:items-center md:gap-5 md:py-3.5"
              >
                <span className="mt-0.5 grid h-5 w-5 place-items-center text-ink md:mt-0 md:h-7 md:w-7">
                  <KindIcon kind={r.kind} />
                  <span className="sr-only">{kindLabel[r.kind]}:</span>
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-[16px] font-medium leading-snug md:text-[17px]">{r.title}</span>
                  {r.detail && <span className="text-[14px] leading-normal text-fg-2">{r.detail}</span>}
                </span>
                <span aria-hidden="true" className="hidden font-label text-label uppercase tracking-[0.06em] text-fg-2 md:block">
                  {kindLabel[r.kind]}
                </span>
                <span className="max-w-24 text-right font-label text-label uppercase tracking-[0.06em]">{r.when}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
