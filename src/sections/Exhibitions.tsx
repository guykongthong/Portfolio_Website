import { useRef } from "react";
import type { Experience } from "../data/cv";
import { experiences } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import Frame from "../components/Frame";
import Placard from "../components/Placard";
import Reveal from "../components/Reveal";
import Carousel from "../components/Carousel";

const roleName = (exp: Experience) => exp.role;
const roleSlugSource = (exp: Experience) => `${exp.role} ${exp.institution}`;

/**
 * Work experience as a hung collection: one framed piece per role, each with a
 * museum placard and a descriptive wall text (the bullets). Hung one at a
 * time in the same carousel as Projects, linkable via #work-<slug>.
 */
export default function Exhibitions() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="scroll-mt-24 border-t border-hairline/60 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader room="I" kicker="The Collection" title="Work Experience" />

        {experiences.length > 0 && (
          <Reveal>
            <Carousel
              items={experiences}
              getName={roleName}
              getSlugSource={roleSlugSource}
              noun="role"
              label="Work Experience"
              hashPrefix="work"
              sectionRef={sectionRef}
              renderItem={(exp, i) => (
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
              )}
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
