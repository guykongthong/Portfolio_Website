import { otherProjects, projects } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import Reveal from "../components/Reveal";
import OtherProjects from "../components/OtherProjects";

const subheadClass = "mb-0 flex items-center gap-4 pb-4 font-label text-label uppercase tracking-[0.06em] text-fg-2";

/**
 * Room 03, the collection: featured and smaller pieces as one numbered index
 * of works, split into two lists. Each row opens in place to hang the piece
 * with its placard. #project-<slug> and #other-<slug> open a given piece.
 */
export default function Projects() {
  const total = projects.length + otherProjects.length;
  return (
    <section id="projects" aria-labelledby="projects-h" className="relative scroll-mt-16 px-5 py-[72px] sm:px-16 sm:py-28">
      <div className="mx-auto max-w-[1056px]">
        <SectionHeader room="03" meta={`${total} works`} title="Projects" id="projects-h" />

        {projects.length > 0 && (
          <Reveal className="mt-8 md:mt-14">
            <p className={subheadClass}>Featured</p>
            <OtherProjects items={projects} prefix="project" />
          </Reveal>
        )}

        {otherProjects.length > 0 && (
          <Reveal className="mt-14 md:mt-20">
            <p className={subheadClass}>Also on the wall</p>
            <OtherProjects items={otherProjects} start={projects.length + 1} />
          </Reveal>
        )}
      </div>
    </section>
  );
}
