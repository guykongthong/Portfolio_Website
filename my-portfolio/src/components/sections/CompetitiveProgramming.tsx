import { Section } from "../layout/Section";
import { COMPETITIVE_PROGRAMMING } from "../../config/portfolioData";

export const CompetitiveProgramming = () => (
  <Section id="cp" title="Competitive Programming">
    {COMPETITIVE_PROGRAMMING.map((item, idx) => (
      <div key={idx} className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-6">
        <ul className="space-y-2 text-sm list-disc pl-5">
          {item.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    ))}
  </Section>
);