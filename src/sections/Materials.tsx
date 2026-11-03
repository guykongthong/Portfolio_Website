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
 * with no single brand mark) render as text pills.
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
 * Brand colour per icon (Simple Icons hex values where available). Brands
 * whose official colour is near-white or very pale on the off-white wall
 * (JavaScript, React, Supabase, EJS) are darkened a step so they stay legible;
 * black or near-black marks (Express, GitHub, Linux) use the charcoal text
 * token so they sit with the rest of the type. Any icon missing here falls
 * back to the muted ash colour.
 */
const BONE = "var(--color-bone)";
const brandColor: Record<string, string> = {
  Java: "#ED8B00",
  Python: "#3776AB",
  JavaScript: "#C9A90A",
  TypeScript: "#3178C6",
  "C++": "#00599C",
  "Node.js": "#5FA04E",
  Express: BONE,
  Hono: "#E36002",
  Django: "#092E20",
  "Django REST Framework": "#A30000",
  "Spring Boot": "#6DB33F",
  FastAPI: "#009688",
  React: "#149ECA",
  "Vue.js": "#4FC08D",
  OpenAPI: "#6BA539",
  "Tailwind CSS": "#06B6D4",
  Bootstrap: "#7952B3",
  EJS: "#8DA03C",
  MySQL: "#4479A1",
  PostgreSQL: "#4169E1",
  "Supabase (Auth, Storage, Row Level Security)": "#2FB47C",
  Docker: "#2496ED",
  "Docker Compose": "#2496ED",
  "GitHub Actions": "#2088FF",
  "AWS EC2": "#FF9900",
  "Cloudflare Workers": "#F38020",
  Linux: BONE,
  Git: "#F05032",
  GitHub: BONE,
  GitLab: "#FC6D26",
  SonarQube: "#4E9BCD",
  Postman: "#FF6C37",
  Figma: "#F24E1E",
  Jira: "#0052CC",
};

/**
 * Skills as the artist's materials, now an interactive icon grid grouped by
 * discipline. Hovering a tile lifts the icon and reveals its label, like
 * reading a small placard next to a tool on display.
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
          {skills.map((row, i) => {
            const withIcon = row.items.filter((item) => iconMap[item]);
            const withoutIcon = row.items.filter((item) => !iconMap[item]);
            return (
              <Reveal key={row.label} delay={i * 0.04}>
                <div className="grid grid-cols-1 gap-5 py-8 sm:grid-cols-[200px_1fr] sm:gap-8">
                  <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-accent">
                    {row.label}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                    {withIcon.map((item) => (
                      <TechIcon key={item} icon={iconMap[item]} color={brandColor[item]} label={item} />
                    ))}
                    {withoutIcon.length > 0 && (
                      <>
                        {withIcon.length > 0 && (
                          <span aria-hidden="true" className="h-8 w-px bg-hairline" />
                        )}
                        <div className="flex flex-wrap items-center gap-2">
                          {withoutIcon.map((item) => (
                            <TechIcon key={item} icon={undefined} label={item} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
