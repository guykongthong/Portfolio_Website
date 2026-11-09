import { experiences } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

/**
 * Work experience as a vertical timeline, newest at the top: a thin rail on
 * the left with one ochre marker per role, and each role's placard details and
 * bullets always visible beside it. A role with no bullets yet (an incoming
 * internship) shows just its heading.
 */
export default function Exhibitions() {
  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-hairline/60 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader room="I" kicker="The Collection" title="Work Experience" />

        {experiences.length > 0 && (
          <ol className="relative ml-2 border-l border-hairline sm:ml-3">
            {experiences.map((exp, i) => (
              <li key={`${exp.role}-${exp.institution}`} className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
                <span
                  aria-hidden="true"
                  className="absolute -left-[5.5px] top-2 h-2.5 w-2.5 rounded-full border border-accent bg-ink"
                />
                <Reveal>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="font-display text-xl font-medium leading-tight text-bone sm:text-2xl">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-[12px] tracking-[0.12em] text-ash sm:whitespace-nowrap">
                      {exp.date}
                    </span>
                  </div>

                  <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.18em] text-ash">
                    <span className="text-faint">{String(i + 1).padStart(2, "0")}</span>
                    &nbsp;·&nbsp;{exp.institution}
                  </p>

                  {exp.medium && (
                    <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-faint">
                      <span className="text-accent">Medium</span> &nbsp;/&nbsp; {exp.medium}
                    </p>
                  )}

                  {exp.context && (
                    <p className="mt-4 border-l border-hairline pl-4 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-ash">
                      {exp.context}
                    </p>
                  )}

                  {exp.bullets.length > 0 && (
                    <ul className="mt-5 flex flex-col gap-3">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-ash">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
