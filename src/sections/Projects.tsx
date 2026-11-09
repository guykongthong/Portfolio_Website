import { otherProjects, projects } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import OtherProjects from "../components/OtherProjects";

const subheadClass =
  "mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ash";

/**
 * The gallery's main floor: featured and smaller pieces both hang as wall
 * labels. Each opens in place to show its bullets, one at a time, so the
 * section stays short on a phone. #project-<slug> and #other-<slug> open a
 * given piece.
 */
export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-hairline/60 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader room="II" kicker="Selected Work" title="Projects" />

        {projects.length > 0 && (
          <Reveal>
            <h3 className={subheadClass}>
              <span>Featured Projects</span>
              <span className="h-px flex-1 bg-hairline" />
            </h3>
            <OtherProjects items={projects} prefix="project" />
          </Reveal>
        )}

        {otherProjects.length > 0 && (
          <Reveal className="mt-24">
            <h3 className={subheadClass}>
              <span>Other Projects</span>
              <span className="h-px flex-1 bg-hairline" />
            </h3>
            <OtherProjects items={otherProjects} />
          </Reveal>
        )}
      </div>
    </section>
  );
}
