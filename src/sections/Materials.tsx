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
} from "react-icons/si";
import type { IconType } from "react-icons";
import { skills } from "../data/cv";
import SectionHeader from "../components/SectionHeader";
import TechIcon from "../components/TechIcon";
import Reveal from "../components/Reveal";

/**
 * Maps a skill label (as written in src/data/cv.ts) to its Simple Icons brand
 * logo. Labels with no entry here (spoken languages, generic terms like
 * "REST APIs" or "CI/CD" with no single brand mark) render as text pills.
 *
 * Note: "AWS EC2" intentionally has no entry — Simple Icons no longer ships
 * an Amazon/AWS mark (react-icons 5.7.0 has no Amazon- or AWS-prefixed
 * export), so it falls back to the text-pill treatment like "REST APIs" or
 * "EJS".
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
};

/**
 * Skills as the artist's materials — now an interactive icon grid grouped by
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
                      <TechIcon key={item} icon={iconMap[item]} label={item} />
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
