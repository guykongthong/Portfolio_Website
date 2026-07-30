import { projects } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import Frame from "../components/Frame";
import Reveal from "../components/Reveal";

/**
 * The centerpiece — the flagship project presented as the main attraction of the
 * gallery, larger and more detailed than the surrounding works.
 */
export default function Featured() {
  return (
    <section
      id="featured"
      className="scroll-mt-24 border-t border-hairline/60 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader room="II" kicker="Featured Work" title="The Centerpiece" />

        {projects.map((p, i) => (
          <Reveal key={p.name}>
            <Frame index={String(i + 1).padStart(2, "0")} className="overflow-hidden">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                {/* placard column */}
                <div className="lg:border-r lg:border-hairline lg:pr-10">
                  <h3 className="font-display text-4xl font-light leading-[1.02] text-bone sm:text-5xl">
                    {p.name}
                  </h3>
                  <p className="mt-3 font-mono text-[12px] tracking-[0.08em] text-ash">{p.meta}</p>

                  <div className="mt-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                      Medium
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-hairline px-3 py-1 font-mono text-[11px] tracking-[0.04em] text-ash transition-colors duration-300 hover:border-accent/60 hover:text-bone"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* description column */}
                <ul className="flex flex-col gap-4">
                  {p.bullets.map((b, j) => (
                    <li key={j} className="flex gap-4 text-[15px] leading-relaxed text-ash">
                      <span className="mt-1 font-mono text-[11px] text-faint">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Frame>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
