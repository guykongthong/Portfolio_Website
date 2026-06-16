import { education } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

/**
 * Education as provenance — the documented history behind the work, set on a
 * vertical timeline rail.
 */
export default function Provenance() {
  return (
    <section
      id="provenance"
      className="scroll-mt-24 border-t border-hairline/60 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader room="IV" kicker="History & Training" title="Provenance" />

        <div className="relative ml-2 border-l border-hairline pl-8 sm:pl-12">
          {education.map((e, i) => (
            <Reveal key={e.school} delay={i * 0.06}>
              <div className="relative pb-12 last:pb-0">
                <span className="absolute -left-[39px] top-1.5 h-2.5 w-2.5 rounded-full border border-accent bg-ink sm:-left-[55px]" />
                <p className="font-mono text-[12px] tracking-[0.12em] text-ash">{e.date}</p>
                <h3 className="mt-2 font-display text-2xl font-light text-bone">{e.school}</h3>
                {e.detail && (
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-faint">
                    {e.detail}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
