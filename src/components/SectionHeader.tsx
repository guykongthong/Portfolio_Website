import Reveal from "./Reveal";

interface SectionHeaderProps {
  /** room number, e.g. "I" or "01" */
  room: string;
  /** mono kicker, e.g. "Curatorial Statement" */
  kicker: string;
  /** serif title */
  title: string;
}

/**
 * Consistent room sign for every section: a numbered crimson kicker over a serif
 * title, with a hairline rule trailing off to the right.
 */
export default function SectionHeader({ room, kicker, title }: SectionHeaderProps) {
  return (
    <Reveal>
      <div className="mb-12">
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
          <span>{room}</span>
          <span className="h-px w-8 bg-accent/50" />
          <span className="text-ash">{kicker}</span>
        </div>
        <div className="mt-4 flex items-end gap-6">
          <h2 className="font-display text-4xl font-light leading-none text-bone sm:text-5xl">
            {title}
          </h2>
          <span className="mb-1.5 hidden h-px flex-1 bg-hairline sm:block" />
        </div>
      </div>
    </Reveal>
  );
}
