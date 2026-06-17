import { Camera, Trophy, Users } from "lucide-react";
import { extracurriculars } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import Frame from "../components/Frame";
import Reveal from "../components/Reveal";

const icons = [Users, Trophy, Camera];

/**
 * Extracurricular leadership as side-room exhibits — brief, framed, typographic.
 */
export default function Activities() {
  return (
    <section
      id="activities"
      className="scroll-mt-24 border-t border-hairline/60 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader room="VI" kicker="Leadership & Activities" title="Beyond the Studio" />

        <div className="grid gap-8 md:grid-cols-3">
          {extracurriculars.map((a, i) => {
            const Icon = icons[i] ?? Users;
            return (
              <Reveal key={a.role + a.organization} delay={i * 0.06}>
                <Frame className="h-full">
                  <div className="flex h-full flex-col">
                    <Icon className="h-6 w-6 text-accent" strokeWidth={1.4} />
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-faint">
                      {a.organization}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-light leading-snug text-bone">
                      {a.role}
                    </h3>
                    <p className="mt-auto pt-6 font-mono text-[11px] tracking-[0.12em] text-ash">
                      {a.institution}
                    </p>
                  </div>
                </Frame>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
