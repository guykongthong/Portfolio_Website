import type { IconType } from "react-icons";

interface TechIconProps {
  /** Brand icon component from react-icons; omit to render a plain text pill */
  icon?: IconType;
  /** Brand hex colour for the glyph; falls back to the muted text colour */
  color?: string;
  label: string;
}

/**
 * One tile in the Materials icon grid. With an icon: a glyph in its brand
 * colour that lifts on hover, with its label beneath it like a placard.
 * Without an icon (e.g. spoken languages, generic terms): falls back to the
 * same pill style used for project stack tags, so the grid never has empty
 * holes.
 */
export default function TechIcon({ icon: Icon, color, label }: TechIconProps) {
  if (!Icon) {
    return (
      <span className="rounded-full border border-hairline px-3 py-1 font-mono text-[11px] tracking-[0.04em] text-ash">
        {label}
      </span>
    );
  }

  return (
    <div className="group flex w-20 flex-col items-center gap-2">
      <Icon
        className="h-7 w-7 text-ash transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-80"
        style={color ? { color } : undefined}
      />
      <span className="max-w-[80px] text-center font-mono text-[9px] uppercase leading-tight tracking-[0.08em] text-faint transition-colors duration-300 group-hover:text-ash">
        {label}
      </span>
    </div>
  );
}
