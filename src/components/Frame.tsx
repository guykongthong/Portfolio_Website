import type { ReactNode } from "react";

interface FrameProps {
  children: ReactNode;
  /** small caption row under the piece, e.g. "No. 01 / Hackathon" */
  caption?: ReactNode;
  className?: string;
}

/**
 * A piece hung on the wall: white (or lifted navy) mount with a strong 1px
 * edge and a 14px mat around the work. No shadow, no rounding; the gallery
 * stays flat and the frame edge does the work.
 */
export default function Frame({ children, caption, className = "" }: FrameProps) {
  return (
    <figure className={`m-0 border border-line-strong bg-surface p-2.5 sm:p-3.5 ${className}`}>
      {children}
      {caption && (
        <figcaption className="mt-3 flex flex-wrap justify-between gap-x-3 gap-y-1 font-label text-label uppercase tracking-[0.06em] text-fg-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
