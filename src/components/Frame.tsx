import type { ReactNode } from "react";

interface FrameProps {
  children: ReactNode;
  /** exhibit number shown on the frame, e.g. "01" */
  index?: string;
  /** museum-plaque text centered at the bottom of the frame, e.g. "CORE&CO · COURSEWORK · 2025" */
  plaque?: string;
  /** optional full-bleed media rendered above the mat, edge-to-edge within the frame border */
  topMedia?: ReactNode;
  className?: string;
}

/**
 * A piece hung on the gallery wall: a thick black picture frame around a white
 * mat that lifts slightly on hover, with a soft ochre glow behind it — the
 * frame itself stays black. The exhibit number sits in the top-left like a
 * wall label; an optional plaque is mounted at the bottom-center of the frame
 * like a museum label screwed to the frame itself. When `topMedia` is given,
 * it bleeds to the frame's edges above the mat, and the exhibit number floats
 * on the media instead of the mat corner.
 */
export default function Frame({ children, index, plaque, topMedia, className = "" }: FrameProps) {
  return (
    <div className={`group relative ${className}`}>
      {/* ochre glow that fades in on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[2px] bg-accent/0 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-20"
        style={{ background: "var(--color-accent)" }}
      />

      <div className="relative flex h-full flex-col rounded-[2px] border-[10px] border-frame bg-white shadow-[0_18px_40px_-24px_rgba(28,27,25,0.18)] transition-all duration-500 group-hover:-translate-y-1">
        {topMedia && (
          <div className="relative shrink-0 border-b border-hairline">
            {topMedia}
            {index && (
              <span className="pointer-events-none absolute right-3 top-3 rounded-sm bg-frame px-2 py-1 font-mono text-[11px] tracking-[0.25em] text-white transition-colors duration-500 group-hover:text-accent">
                {index}
              </span>
            )}
          </div>
        )}

        {/* inner mat */}
        <div className="relative flex-1 rounded-[1px] border border-black/[0.03] p-7 sm:p-9">
          {index && !topMedia && (
            <span className="pointer-events-none absolute right-5 top-4 font-mono text-[11px] tracking-[0.25em] text-faint transition-colors duration-500 group-hover:text-accent">
              {index}
            </span>
          )}
          {children}
        </div>
      </div>

      {plaque && (
        <div className="absolute -bottom-3 left-1/2 max-w-[85%] -translate-x-1/2 rounded-sm bg-frame px-4 py-1.5 text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white shadow-[0_4px_10px_-2px_rgba(0,0,0,0.4)]">
          {plaque}
        </div>
      )}
    </div>
  );
}
