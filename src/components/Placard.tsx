interface PlacardProps {
  title: string;
  institution?: string;
  medium?: string;
  year: string;
}

/**
 * The little wall label beside each piece. Title in serif, the technical "medium"
 * and year in mono so the placard reads like a spec sheet — the engineering nod.
 */
export default function Placard({ title, institution, medium, year }: PlacardProps) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <div>
        <h3 className="font-display text-xl font-medium leading-tight text-bone sm:text-2xl">
          {title}
        </h3>
        {institution && (
          <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.18em] text-ash">
            {institution}
          </p>
        )}
        {medium && (
          <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-faint">
            <span className="text-accent">Medium</span> &nbsp;/&nbsp; {medium}
          </p>
        )}
      </div>
      <span className="shrink-0 font-mono text-[12px] tracking-[0.12em] text-ash">{year}</span>
    </div>
  );
}
