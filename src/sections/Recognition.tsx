import { Award, BadgeCheck } from "lucide-react";
import { accolades } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import Frame from "../components/Frame";
import Reveal from "../components/Reveal";

/**
 * Certifications and awards as recognition plaques — the gallery's accolade wall.
 */
export default function Recognition() {
  return (
    <section
      id="recognition"
      className="scroll-mt-24 border-t border-hairline/60 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader room="V" kicker="Accolades" title="Recognition" />

        <div className="grid gap-8 md:grid-cols-2">
          {accolades.map((a, i) => {
            const Icon = a.kind === "certification" ? BadgeCheck : Award;
            return (
              <Reveal key={a.name} delay={i * 0.06}>
                <Frame className="h-full">
                  <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <Icon className="h-6 w-6 text-accent" strokeWidth={1.4} />
                      <span className="font-mono text-[12px] tracking-[0.15em] text-ash">
                        {a.year}
                      </span>
                    </div>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-faint">
                      {a.kind}
                    </p>
                    <h3 className="mt-4 font-display text-xl font-light leading-snug text-bone">
                      {a.name}
                    </h3>
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
