import { profile } from "../data/cv";
import Reveal from "../components/Reveal";

/**
 * The curatorial statement — the CV summary set as a large, airy gallery wall text.
 */
export default function Statement() {
  return (
    <section
      id="statement"
      className="scroll-mt-24 border-t border-hairline/60 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
            Curatorial Statement
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-4xl font-display text-2xl font-light leading-[1.45] text-bone sm:text-[2rem] sm:leading-[1.45]">
            {profile.summary}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
