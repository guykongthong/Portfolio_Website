import {
  SiOpenjdk,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiNodedotjs,
  SiExpress,
  SiHono,
  SiReact,
  SiVuedotjs,
  SiBootstrap,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiDocker,
  SiGithubactions,
  SiCloudflareworkers,
  SiLinux,
  SiGit,
  SiGithub,
  SiGitlab,
  SiPostman,
  SiFigma,
  SiJira,
  SiOpenapiinitiative,
  SiDjango,
  SiSpringboot,
  SiFastapi,
  SiTailwindcss,
  SiSonarqubeserver,
  SiEjs,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { skills } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import TechIcon from "../components/TechIcon";
import Reveal from "../components/Reveal";

/**
 * Maps a skill label (as written in src/data/cv.ts) to its brand logo, mostly
 * Simple Icons from react-icons/si. Labels with no entry here (spoken
 * languages, generic terms like "REST APIs", "CI/CD" or "Containerization"
 * with no single brand mark) get a two-letter monogram keycap.
 *
 * Simple Icons no longer ships an Amazon/AWS mark, so "AWS EC2" borrows the
 * Font Awesome AWS logo. "Django REST Framework" reuses the Django glyph and
 * "Docker Compose" reuses the Docker whale, since neither has its own icon.
 */
const iconMap: Record<string, IconType> = {
  Java: SiOpenjdk,
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "C++": SiCplusplus,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Hono: SiHono,
  React: SiReact,
  "Vue.js": SiVuedotjs,
  Bootstrap: SiBootstrap,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  "Supabase (Auth, Storage, Row Level Security)": SiSupabase,
  Docker: SiDocker,
  "GitHub Actions": SiGithubactions,
  "Cloudflare Workers": SiCloudflareworkers,
  Linux: SiLinux,
  Git: SiGit,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  Postman: SiPostman,
  Figma: SiFigma,
  Jira: SiJira,
  OpenAPI: SiOpenapiinitiative,
  Django: SiDjango,
  "Django REST Framework": SiDjango,
  "Spring Boot": SiSpringboot,
  FastAPI: SiFastapi,
  "Tailwind CSS": SiTailwindcss,
  EJS: SiEjs,
  "Docker Compose": SiDocker,
  "AWS EC2": FaAws,
  SonarQube: SiSonarqubeserver,
};

/**
 * Room 04, display cases: each skill row from cv.ts is a case of pixel
 * keycaps, the marks all in the one ink colour so the cases read as a single
 * family. A skill with no brand mark gets a two-letter monogram instead.
 */
export default function Materials() {
  return (
    <section id="materials" aria-labelledby="materials-h" className="relative scroll-mt-16 px-5 py-[72px] sm:px-16 sm:py-28">
      <div className="mx-auto max-w-[1056px]">
        <SectionHeader room="04" meta={`${skills.length} cases`} title="Materials" id="materials-h">
          <p className="mb-0 mt-4 max-w-[600px] text-body text-fg-2">What the pieces in this exhibit are made from.</p>
        </SectionHeader>

        <div className="mt-8 flex flex-col md:mt-14">
          {skills.map((row, i) => (
            <Reveal key={row.label}>
              <div className="grid grid-cols-1 gap-3.5 border-t border-line py-[22px] md:grid-cols-[220px_minmax(0,1fr)] md:gap-8 md:py-7">
                <div className="flex items-baseline justify-between gap-1 md:flex-col md:justify-start md:pt-1.5">
                  <h3 className="m-0 font-display text-[20px] font-medium leading-tight md:text-h3">{row.label}</h3>
                  <span className="font-label text-label uppercase tracking-[0.06em] text-fg-2">
                    Case {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <ul className="m-0 grid list-none grid-cols-3 gap-2.5 p-0 pb-1 sm:grid-cols-[repeat(auto-fill,minmax(112px,1fr))] sm:gap-4">
                  {row.items.map((item) => (
                    <TechIcon key={item} icon={iconMap[item]} label={item} />
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
