import { motion } from "framer-motion";
import { Github, Globe, ExternalLink } from "lucide-react";
import { Tag } from "./Tag";

interface Project {
  title: string;
  description: string;
  tags: string[];
  links: {
    github?: string;
    live?: string;
  };
  highlights?: string[];
}

interface ProjectCardProps {
  p: Project;
}

export const ProjectCard = ({ p }: ProjectCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative rounded-[28px] p-6 border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl transition-shadow overflow-hidden"
  >
    {/* Accent blob */}
    <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-zinc-100 dark:bg-zinc-800 blur-2xl opacity-60 group-hover:opacity-80" />

    {/* Header */}
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          {p.title}
          {p.links?.live && (
            <a href={p.links.live} target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100">
              <ExternalLink size={18} />
            </a>
          )}
        </h3>
        <p className="mt-2 text-sm opacity-80">{p.description}</p>
      </div>
      <div className="flex gap-3 shrink-0">
        {p.links?.github && (
          <a className="inline-flex items-center gap-1 text-sm hover:underline" href={p.links.github} target="_blank" rel="noreferrer">
            <Github size={18} /> Code
          </a>
        )}
        {p.links?.live && (
          <a className="inline-flex items-center gap-1 text-sm hover:underline" href={p.links.live} target="_blank" rel="noreferrer">
            <Globe size={18} /> Live
          </a>
        )}
      </div>
    </div>

    {/* Tags */}
    <div className="mt-4 flex flex-wrap">
      {p.tags?.map((t: string) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>

    {/* Bubble highlight list */}
    {p.highlights?.length ? (
      <div className="mt-5 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/80 dark:bg-zinc-800/40 p-4">
        <ul className="space-y-2 text-sm">
          {p.highlights.map((h: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              <span className="opacity-90">{h}</span>
            </li>
          ))}
        </ul>
      </div>
    ) : null}
  </motion.div>
);