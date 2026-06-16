import { skills } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";

/**
 * Skills as the artist's materials — a typographic index of techniques, grouped
 * by discipline and laid out like a supply ledger.
 */
export default function Materials() {
  return (
    <section
      id="materials"
      className="scroll-mt-24 border-t border-hairline/60 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader room="III" kicker="Tools & Techniques" title="Materials" />

        <div className="divide-y divide-hairline border-y border-hairline">
          {skills.map((row, i) => (
            <Reveal key={row.label} delay={i * 0.04}>
              <div className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-[200px_1fr] sm:gap-8">
                <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-accent">
                  {row.label}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {row.items.map((item) => (
                    <span
                      key={item}
                      className="font-display text-lg text-bone transition-colors duration-300 hover:text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
