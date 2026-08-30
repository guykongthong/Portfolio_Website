import type { Project } from "../data/cv";
import { projects } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import Frame from "../components/Frame";
import ProjectMedia from "../components/ProjectMedia";
import Reveal from "../components/Reveal";

/** The name/tag/meta/stack/bullets/link write-up, shared by both card layouts below. */
function ProjectDetails({ p }: { p: Project }) {
  return (
    <div className="flex flex-col">
      <h3 className="font-display text-3xl font-light leading-[1.05] text-bone sm:text-4xl">
        {p.name}
      </h3>
      <span className="mt-3 w-fit rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
        {p.tag}
      </span>
      <p className="mt-3 font-mono text-[12px] tracking-[0.08em] text-ash">{p.meta}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-hairline px-3 py-1 font-mono text-[11px] tracking-[0.04em] text-ash transition-colors duration-300 hover:border-accent/60 hover:text-bone"
          >
            {s}
          </span>
        ))}
      </div>

      <ul className="mt-6 flex flex-col gap-4">
        {p.bullets.map((b, j) => (
          <li key={j} className="flex gap-4 text-[15px] leading-relaxed text-ash">
            <span className="mt-1 font-mono text-[11px] text-faint">
              {String(j + 1).padStart(2, "0")}
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {p.liveHref && (
        <a
          href={p.liveHref}
          target="_blank"
          rel="noreferrer"
          className="mt-6 w-fit border-b border-accent/60 font-mono text-[11px] uppercase tracking-[0.2em] text-accent transition-colors duration-300 hover:border-bone hover:text-bone"
        >
          View project ↗
        </a>
      )}
    </div>
  );
}

/**
 * The gallery's main floor — every real project as its own full-width room.
 * A project with landscape media (or none yet) gets media and write-up
 * side by side, alternating sides as you walk (scroll) from piece to piece.
 * A project with portrait media (a phone photo/video set, e.g. a hackathon)
 * keeps that same side-by-side frame instead of stacking, since a tall
 * portrait frame already reads as its own "piece" next to the text.
 */
export default function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-hairline/60 px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader room="II" kicker="Selected Work" title="Projects" />

        <div className="flex flex-col gap-16">
          {projects.map((p, i) => {
            const stacked = p.media.length > 0 && p.mediaOrientation !== "portrait";
            const index = String(i + 1).padStart(2, "0");
            const plaque = `${p.name.toUpperCase()} · ${p.tag.toUpperCase()} · ${p.date}`;

            return (
              <Reveal key={p.name}>
                {stacked ? (
                  <Frame
                    index={index}
                    plaque={plaque}
                    topMedia={<ProjectMedia media={p.media} name={p.name} orientation={p.mediaOrientation} bordered={false} />}
                  >
                    <ProjectDetails p={p} />
                  </Frame>
                ) : (
                  <Frame index={index} plaque={plaque}>
                    <div
                      className={`grid items-center gap-10 lg:grid-cols-2 ${
                        i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      <ProjectMedia media={p.media} name={p.name} orientation={p.mediaOrientation} />
                      <ProjectDetails p={p} />
                    </div>
                  </Frame>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
