import { education } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

/** "2024 to Expected 2028" -> years + whether it's still in progress */
function readDate(date: string) {
  const years = date.match(/\d{4}/g) ?? [];
  const expected = /expected/i.test(date);
  return { from: years[0] ?? date, to: years[1] ?? "", expected };
}

/** "B.Sc. Software Engineering, Chiang Mai University" -> title + school line */
function splitSchool(school: string) {
  const at = school.indexOf(", ");
  return at > 0 ? [school.slice(0, at), school.slice(at + 2)] : [school, ""];
}

/**
 * Room 05, provenance: the same rail as Work Experience so the two rooms feel
 * related, with the years set large in the pixel face like dates on a
 * provenance record. The degree still in progress gets a filled ink node (no
 * coral in this room). Coursework chips are static labels, no hover.
 */
export default function Education() {
  return (
    <section id="education" aria-labelledby="education-h" className="relative scroll-mt-16 px-5 py-[72px] sm:px-16 sm:py-28">
      <div className="mx-auto max-w-[1056px]">
        <SectionHeader
          room="05"
          meta={`${education.length} ${education.length === 1 ? "record" : "records"}`}
          title="Education"
          id="education-h"
        />

        <ol className="m-0 mt-8 flex list-none flex-col p-0 md:mt-14">
          {education.map((e, i) => {
            const { from, to, expected } = readDate(e.date);
            const [title, place] = splitSchool(e.school);
            const first = i === 0;
            const last = i === education.length - 1;
            return (
              <li key={e.school} className="grid grid-cols-[14px_minmax(0,1fr)] gap-x-3.5 md:grid-cols-[200px_24px_minmax(0,1fr)] md:gap-x-6">
                <div className="col-start-2 row-start-1 flex flex-wrap items-baseline gap-x-2 pb-2.5 font-display text-[22px] font-medium leading-[1.05] md:col-start-1 md:flex-col md:pb-0 md:pt-[22px] md:text-[32px]">
                  <span>{from}</span>
                  {to && (
                    <>
                      <span className="font-label text-label uppercase tracking-[0.06em] text-fg-2">to</span>
                      <span className="text-fg-2">{to}</span>
                    </>
                  )}
                  <span className="ml-1 font-label text-label uppercase tracking-[0.06em] text-fg md:ml-0 md:mt-2">
                    {expected ? "Expected" : "Completed"}
                  </span>
                </div>

                <div aria-hidden="true" className="relative col-start-1 row-span-2 row-start-1 flex justify-center md:col-start-2 md:row-span-1">
                  <span
                    className={`absolute left-1/2 -ml-px w-0.5 bg-line ${first ? "top-2.5 md:top-[34px]" : "top-0"} ${
                      last ? "h-2.5 md:h-[34px]" : "bottom-0"
                    }`}
                  />
                  <span
                    className={`relative mt-1.5 h-3 w-3 border-2 md:mt-7 md:h-3.5 md:w-3.5 ${
                      expected ? "border-ink bg-ink" : "border-line-strong bg-bg"
                    }`}
                  />
                </div>

                <Reveal className="col-start-2 row-start-2 md:col-start-3 md:row-start-1">
                  <article className="mb-6 border border-line bg-surface p-[18px] md:px-7 md:py-6">
                    <h3 className="m-0 font-display text-h3 font-medium">{title}</h3>
                    {place && <p className="mb-0 mt-1.5 text-[15px] leading-normal text-fg-2">{place}</p>}
                    {e.detail && (
                      <p className="mb-0 mt-4 border-t border-dashed border-line pt-3 text-[15px] leading-normal">{e.detail}</p>
                    )}

                    {e.coursework && e.coursework.length > 0 && (
                      <div className="mt-[18px] flex flex-col gap-2.5">
                        <span className="font-label text-label uppercase tracking-[0.06em] text-fg-2">Selected coursework</span>
                        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                          {e.coursework.map((c) => {
                            const featured = e.featuredCoursework?.includes(c);
                            return (
                              <li
                                key={c}
                                className={`border bg-surface-2 px-2.5 py-1 font-label text-label uppercase tracking-[0.04em] text-fg ${
                                  featured ? "border-line-strong" : "border-line"
                                }`}
                              >
                                {c}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
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
