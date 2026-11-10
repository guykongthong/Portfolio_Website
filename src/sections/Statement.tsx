import { education, experiences, profile } from "../data/cv";
import Reveal from "../components/Reveal";
import SectionHeader from "../components/SectionHeader";

// the summary's first sentence is the big wall text, the rest is the quieter paragraph
const cut = profile.summary.indexOf(". ");
const lead = cut > 0 ? profile.summary.slice(0, cut + 1) : profile.summary;
const rest = cut > 0 ? profile.summary.slice(cut + 2) : "";

function withHighlight(text: string, phrase?: string) {
  const at = phrase ? text.indexOf(phrase) : -1;
  if (!phrase || at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <mark className="mark-accent">{phrase}</mark>
      {text.slice(at + phrase.length)}
    </>
  );
}

// fact card, built from the data so it never drifts from the CV
const next = experiences[0];
const nextParts = next?.date.split(" · ") ?? [];
const facts = [
  { k: "Based in", v: profile.location },
  education[0] && { k: "Studying", v: education[0].school },
  education[0]?.detail && { k: "College", v: education[0].detail },
  next && { k: nextParts.length > 1 ? nextParts[0] : "Currently", v: `${next.role}, ${next.institution}` },
].filter(Boolean) as { k: string; v: string }[];

/**
 * Room 01, the curator's wall text: the CV summary as one large paragraph and
 * one quieter one, with a short fact card beside it (below it on a phone, as a
 * 2 by 2 grid). One coral underline marks the phrase worth remembering.
 */
export default function Statement() {
  return (
    <section id="statement" aria-labelledby="statement-h" className="relative scroll-mt-16 px-5 py-[72px] sm:px-16 sm:py-28">
      <div className="mx-auto max-w-[1056px]">
        <SectionHeader room="01" meta="Wall text" title="Statement" id="statement-h" />

        <div className="mt-8 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-[260px_minmax(0,1fr)] md:gap-[72px]">
          <Reveal className="order-2 md:order-1">
            <dl className="m-0 grid grid-cols-2 border border-line bg-surface md:grid-cols-1">
              {facts.map((f, i) => (
                <div
                  key={f.k}
                  className={`flex flex-col gap-0.5 px-[18px] py-3.5 ${i >= 2 ? "border-t border-line" : ""} ${
                    i === 1 ? "md:border-t md:border-line" : ""
                  } ${i % 2 === 0 ? "border-r border-line md:border-r-0" : ""}`}
                >
                  <dt className="font-label text-label uppercase tracking-[0.06em] text-fg-2">{f.k}</dt>
                  <dd className="m-0 text-[15px] leading-normal">{f.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="order-1 md:order-2">
            <p className="m-0 max-w-[760px] text-[20px] leading-normal tracking-[-0.005em] [text-wrap:pretty] md:text-[28px] md:leading-[1.45]">
              {withHighlight(lead, profile.summaryHighlight)}
            </p>
            {rest && <p className="mb-0 mt-5 max-w-[640px] text-body text-fg-2 [text-wrap:pretty] md:mt-7">{rest}</p>}
            <p className="mb-0 mt-8 flex items-center gap-3 font-label text-label uppercase tracking-[0.06em] text-fg-2">
              <span aria-hidden="true" className="h-px w-5 bg-fg-2" />
              {profile.name.first} {profile.name.last}, {profile.location}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
