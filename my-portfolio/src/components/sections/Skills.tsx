import { Section } from "../layout/Section";
import { Tag } from "../ui/Tag";
import { SKILLS } from "../../config/portfolioData";

export const Skills = () => (
  <Section id="skills" title="Skills">
    <div className="grid md:grid-cols-3 gap-6">
      {SKILLS.map((s) => (
        <div key={s.group} className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-6">
          <h3 className="font-semibold mb-3">{s.group}</h3>
          <div className="flex flex-wrap">
            {s.items.map((i) => (
              <Tag key={i}>{i}</Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);