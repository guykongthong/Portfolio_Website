import { experiences } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

/** "Freelance · May 2026 to Oct 2026" -> { range, note: "Freelance" } */
function splitDate(date: string) {
  const parts = date.split(" · ");
  return parts.length > 1 ? { note: parts[0], range: parts.slice(1).join(" · ") } : { note: "", range: date };
}

const chipClass =
  "border border-line bg-surface-2 px-2.5 py-1 font-label text-label uppercase tracking-[0.04em] text-fg";

/**
 * Room 02, the chronology: a vertical rail, newest first. Dates hang on the
 * wall to the left like exhibition years; the latest role wears the coral
 * node. On a phone the date folds into one line above each card and the rail
 * slims to 14px. The rail and nodes are decorative; the "Latest" label carries
 * the meaning of the coral node.
 */
export default function Exhibitions() {
  return (
    <section id="work" aria-labelledby="work-h" className="relative scroll-mt-16 px-5 py-[72px] sm:px-16 sm:py-28">
      <div className="mx-auto max-w-[1056px]">
        <SectionHeader
          room="02"
          meta={`${experiences.length} ${experiences.length === 1 ? "role" : "roles"}`}
          title="Work Experience"
          id="work-h"
        />

        <ol className="m-0 mt-8 flex list-none flex-col p-0 md:mt-14">
          {experiences.map((exp, i) => {
            const { note, range } = splitDate(exp.date);
            const first = i === 0;
            const last = i === experiences.length - 1;
            return (
              <li
                key={`${exp.role}-${exp.institution}`}
                className="grid grid-cols-[14px_minmax(0,1fr)] gap-x-3.5 md:grid-cols-[200px_24px_minmax(0,1fr)] md:gap-x-6"
              >
                <div className="col-start-2 row-start-1 flex flex-wrap gap-x-2.5 gap-y-1 pb-2 font-label text-label uppercase tracking-[0.06em] md:col-start-1 md:flex-col md:pb-0 md:pt-7">
                  <span>{range}</span>
                  {note && <span className="text-fg-2">{note}</span>}
                </div>

                {/* rail + node */}
                <div aria-hidden="true" className="relative col-start-1 row-span-2 row-start-1 flex justify-center md:col-start-2 md:row-span-1">
                  <span
                    className={`absolute left-1/2 -ml-px w-0.5 bg-line ${first ? "top-2 md:top-[34px]" : "top-0"} ${
                      last ? "h-2 md:h-[34px]" : "bottom-0"
                    }`}
                  />
                  <span
                    className={`relative mt-[3px] h-3 w-3 border-2 md:mt-7 md:h-3.5 md:w-3.5 ${
                      first ? "border-accent bg-accent" : "border-line-strong bg-bg"
                    }`}
                  />
                </div>

                <Reveal className="col-start-2 row-start-2 md:col-start-3 md:row-start-1">
                  <article className="mb-6 border border-line bg-surface p-[18px] transition-colors duration-150 hover:border-line-strong md:px-7 md:py-6">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-4">
                      <h3 className="m-0 font-display text-h3 font-medium">{exp.role}</h3>
                      {first && (
                        <span className="flex items-center gap-2 whitespace-nowrap font-label text-label uppercase tracking-[0.06em] text-fg-2">
                          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="mb-0 mt-1.5 text-[14px] leading-normal text-fg-2 md:text-[15px]">{exp.institution}</p>

                    {exp.context && (
                      <p className="mb-0 mt-3 border-l-2 border-line pl-3 text-[14px] leading-normal text-fg-2">{exp.context}</p>
                    )}

                    {exp.bullets.length > 0 && (
                      <ul className="ink-bullets m-0 mt-4 flex list-none flex-col gap-2 p-0 text-body">
                        {exp.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    )}

                    {exp.medium && (
                      <ul aria-label="Medium" className="m-0 mt-[18px] flex list-none flex-wrap gap-2 p-0">
                        {exp.medium.split(" · ").map((m) => (
                          <li key={m} className={chipClass}>
                            {m}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
