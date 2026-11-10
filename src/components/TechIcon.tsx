import type { IconType } from "react-icons";

interface TechIconProps {
  /** brand mark from react-icons; omit and a two-letter monogram stands in */
  icon?: IconType;
  label: string;
}

// cv.ts writes spoken languages as "Thai <long dash> Native"; show those as name + note
const LONG_DASH = ` ${String.fromCharCode(0x2014)} `;
function splitLabel(label: string) {
  const parts = label.split(LONG_DASH);
  return parts.length > 1 ? [parts[0], parts.slice(1).join(" ")] : [label, ""];
}

function monogram(name: string) {
  const letters = name.replace(/[^A-Za-z0-9+#]/g, "");
  return letters.slice(0, 2).toUpperCase();
}

/**
 * One keycap in a Materials display case: a pixel-keyboard key with the mark
 * (or monogram) in the single ink colour and the name under it. It presses
 * down 2px on hover, and on :active so a tap gets the same feedback; nothing
 * is hidden behind the press.
 */
export default function TechIcon({ icon: Icon, label }: TechIconProps) {
  const [name, note] = splitLabel(label);
  return (
    <li className="keycap flex min-h-[88px] flex-col justify-between gap-2 border-2 border-line-strong bg-surface p-2.5 md:min-h-[112px] md:p-3">
      {Icon ? (
        <Icon aria-hidden="true" className="h-6 w-6 text-ink md:h-7 md:w-7" />
      ) : (
        <span aria-hidden="true" className="font-display text-[24px] font-semibold leading-none text-ink md:text-[30px]">
          {monogram(name)}
        </span>
      )}
      <span className="flex flex-col">
        <span className="text-[13px] font-medium leading-tight break-words hyphens-auto md:text-[14px]">{name}</span>
        {note && <span className="text-[12px] leading-tight text-fg-2">{note}</span>}
      </span>
    </li>
  );
}
