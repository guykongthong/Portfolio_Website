import { Section } from "../layout/Section";
import { ProjectCard } from "../ui/ProjectCard";
import { PROJECTS } from "../../config/portfolioData";

export const Projects = () => (
  <Section id="projects" title="Projects">
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {PROJECTS.map((p, i) => (
        <div key={p.title} className={i % 5 === 0 ? "lg:col-span-1" : ""}>
          <ProjectCard p={p} />
        </div>
      ))}
    </div>
  </Section>
);