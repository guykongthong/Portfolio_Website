import { profile } from "../data/cv";
import Reveal from "../components/Reveal";
import Frame from "../components/Frame";
import portrait from "../assets/profile/portrait.jpg";

/**
 * The curatorial statement — the CV summary set as a large, airy gallery wall
 * text, with a framed portrait standing beside it like a curator's photo
 * mounted next to their wall text.
 */
export default function Statement() {
  return (
    <section
      id="statement"
      className="scroll-mt-24 border-t border-hairline/60 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                Curatorial Statement
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-display text-2xl font-light leading-[1.45] text-bone sm:text-[2rem] sm:leading-[1.45]">
                {profile.summary}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.16}>
            <Frame className="mx-auto w-full max-w-sm lg:max-w-none" plaque="V. KONGTHONG · CHIANG MAI, THAILAND">
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src={portrait}
                  alt="Virawit Kongthong"
                  className="h-full w-full object-cover"
                />
              </div>
            </Frame>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
