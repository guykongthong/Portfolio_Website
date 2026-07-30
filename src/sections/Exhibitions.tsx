import { experiences } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import Frame from "../components/Frame";
import Placard from "../components/Placard";
import Reveal from "../components/Reveal";

/**
 * Work experience as a hung collection — one framed piece per role, each with a
 * museum placard and a descriptive wall text (the bullets).
 */
export default function Exhibitions() {
  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-hairline/60 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader room="I" kicker="The Collection" title="Exhibitions" />

        <div className="flex flex-col gap-8">
          {experiences.map((exp, i) => (
            <Reveal key={exp.role + exp.institution} delay={i * 0.05}>
              <Frame index={String(i + 1).padStart(2, "0")}>
                <Placard
                  title={exp.role}
                  institution={exp.institution}
                  medium={exp.medium}
                  year={exp.date}
                />

                {exp.context && (
                  <p className="mt-5 border-l border-hairline pl-4 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-ash">
                    {exp.context}
                  </p>
                )}

                <ul className="mt-6 flex flex-col gap-3">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-ash">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Frame>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
