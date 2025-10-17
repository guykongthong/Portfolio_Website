import { Calendar, MapPin } from "lucide-react";
import { Section } from "../layout/Section";
import { EXPERIENCES } from "../../config/portfolioData";

export const Experience = () => (
  <Section id="experience" title="Experience">
    <div className="space-y-6">
      {EXPERIENCES.map((e) => (
        <div key={e.role} className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">{e.role} · {e.company}</h3>
              <div className="opacity-75 text-sm flex items-center gap-3">
                <span className="inline-flex items-center gap-1"><Calendar size={16} /> {e.period}</span>
                <span className="inline-flex items-center gap-1"><MapPin size={16} /> {e.location}</span>
              </div>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm list-disc pl-5">
            {e.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);