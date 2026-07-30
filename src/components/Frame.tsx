import type { ReactNode } from "react";

interface FrameProps {
  children: ReactNode;
  /** exhibit number shown on the frame, e.g. "01" */
  index?: string;
  className?: string;
}

/**
 * A piece hung on the gallery wall: hairline outer frame, inner mat, soft cast
 * shadow, and an ochre edge that lights up on hover. The exhibit number sits in
 * the top-left like a wall label.
 */
export default function Frame({ children, index, className = "" }: FrameProps) {
  return (
    <div className={`group relative ${className}`}>
      {/* ochre glow that fades in on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[2px] bg-accent/0 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-20"
        style={{ background: "var(--color-accent)" }}
      />

      <div className="relative rounded-[2px] border border-hairline bg-wall shadow-[0_18px_40px_-24px_rgba(28,27,25,0.18)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-accent/60">
        {/* inner mat */}
        <div className="rounded-[1px] border border-black/[0.03] p-7 sm:p-9">
          {index && (
            <span className="pointer-events-none absolute right-5 top-4 font-mono text-[11px] tracking-[0.25em] text-faint transition-colors duration-500 group-hover:text-accent">
              {index}
            </span>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
