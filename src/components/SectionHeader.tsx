import type { ReactNode } from "react";
import { numeral } from "../lib/glyphs";

interface SectionHeaderProps {
  /** room number, "01" to "07" */
  room: string;
  /** right-hand label on the rule, e.g. "4 roles" */
  meta?: string;
  title: string;
  /** id for the h2, so the section can be aria-labelledby it */
  id?: string;
  /** optional line(s) under the title */
  children?: ReactNode;
}

/**
 * The room sign every section opens with: "Room 02" and a count on a hairline
 * rule, the pixel-face title, and the room number drawn in ink glyphs on the
 * right (decorative, hidden from screen readers).
 */
export default function SectionHeader({ room, meta, title, id, children }: SectionHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-4 font-label text-label uppercase tracking-[0.06em] text-fg-2">
        <span>Room {room}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        {meta && <span>{meta}</span>}
      </div>
      <div className="flex items-end justify-between gap-6">
        <h2 id={id} className="mt-5 font-display text-h2 font-medium">
          {title}
        </h2>
        <pre
          aria-hidden="true"
          className="m-0 shrink-0 font-mono text-[6px] leading-[6px] text-ink sm:text-[10px] sm:leading-[10px]"
        >
          {numeral(room)}
        </pre>
      </div>
      {children}
    </div>
  );
}
