import { useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type { ProjectMedia as ProjectMediaItem } from "../data/cv";

interface ProjectMediaProps {
  media: ProjectMediaItem[];
  name: string;
  orientation?: "landscape" | "portrait";
  /** set false when hosted inside Frame's full-bleed topMedia slot, which supplies its own edge */
  bordered?: boolean;
}

function clampPercent(n: number) {
  return Math.min(100, Math.max(0, Math.round(n)));
}

async function saveMediaPosition(alt: string, position: string | null) {
  await fetch("/__set-media-position", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ alt, position }),
  });
}

/**
 * The image/video wall for a project. Renders a same-sized dashed
 * placeholder when a project has no media yet, a single frame when it has
 * exactly one, or a carousel with arrow/dot navigation when it has several.
 * Frame shape follows `orientation` so an all-portrait media set (phone
 * photos/video) gets a portrait frame instead of letterboxing into a wide one.
 *
 * In dev only (`npm run dev`), each media item also gets a reposition
 * overlay: click the pencil, drag on the image to set its focal point, Save
 * writes the resulting `position` straight into cv.ts via a dev-server-only
 * endpoint (see vite.config.js). None of this exists in the production build.
 */
export default function ProjectMedia({ media, name, orientation = "landscape", bordered = true }: ProjectMediaProps) {
  const [index, setIndex] = useState(0);
  const item = media[index];
  const aspectClass = orientation === "portrait" ? "aspect-[3/4]" : "aspect-[16/10]";

  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (!item) {
    return (
      <div className={`flex ${aspectClass} w-full items-center justify-center border border-dashed border-hairline bg-wall-2`}>
        <div className="flex flex-col items-center gap-2 px-6 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-faint">
            Image coming soon
          </span>
          <span className="font-display text-sm text-ash">{name}</span>
        </div>
      </div>
    );
  }

  const goTo = (i: number) => setIndex((i + media.length) % media.length);
  const fit = item.fit ?? "cover";
  const objectPosition = editing ? (pending ?? item.position ?? "50% 50%") : item.position;

  const startEditing = () => {
    setPending(item.position ?? "50% 50%");
    setEditing(true);
  };

  const cancelEditing = () => {
    setEditing(false);
    setPending(null);
  };

  const drag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = clampPercent(((e.clientX - rect.left) / rect.width) * 100);
    const y = clampPercent(((e.clientY - rect.top) / rect.height) * 100);
    setPending(`${x}% ${y}%`);
  };

  const save = async () => {
    setSaving(true);
    await saveMediaPosition(item.alt, pending);
    setSaving(false);
    setEditing(false);
    setPending(null);
  };

  const reset = async () => {
    setSaving(true);
    await saveMediaPosition(item.alt, null);
    setSaving(false);
    setEditing(false);
    setPending(null);
  };

  return (
    <div className="group relative">
      <div
        onPointerDown={editing ? drag : undefined}
        onPointerMove={editing ? drag : undefined}
        className={`flex ${aspectClass} w-full items-center justify-center overflow-hidden ${
          bordered ? "border border-hairline" : ""
        } ${fit === "contain" ? "bg-wall-2" : ""} ${editing ? "cursor-crosshair" : ""}`}
      >
        {item.type === "video" ? (
          <video
            className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
            style={{ objectPosition }}
            src={item.src}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
            style={{ objectPosition }}
            src={item.src}
            alt={item.alt}
          />
        )}
      </div>

      {import.meta.env.DEV && !editing && (
        <button
          type="button"
          aria-label={`Reposition ${item.alt}`}
          onClick={startEditing}
          className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center border border-hairline bg-wall/80 font-mono text-sm text-bone opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:border-accent/60 hover:text-accent group-hover:opacity-100"
        >
          ✥
        </button>
      )}

      {import.meta.env.DEV && editing && (
        <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
          <span className="rounded-sm bg-wall/90 px-2 py-1 font-mono text-[10px] tracking-[0.15em] text-bone backdrop-blur-sm">
            {pending ?? item.position ?? "50% 50%"}
          </span>
          <div className="flex gap-2">
            {item.position && (
              <button
                type="button"
                onClick={reset}
                disabled={saving}
                className="rounded-sm bg-wall/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ash backdrop-blur-sm hover:text-accent disabled:opacity-50"
              >
                Reset
              </button>
            )}
            <button
              type="button"
              onClick={cancelEditing}
              disabled={saving}
              className="rounded-sm bg-wall/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ash backdrop-blur-sm hover:text-bone disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="rounded-sm bg-accent px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-wall backdrop-blur-sm disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      )}

      {media.length > 1 && !editing && (
        <>
          <button
            type="button"
            aria-label={`Previous image for ${name}`}
            onClick={() => goTo(index - 1)}
            className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-hairline bg-wall/80 font-mono text-sm text-bone opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:border-accent/60 hover:text-accent group-hover:opacity-100"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label={`Next image for ${name}`}
            onClick={() => goTo(index + 1)}
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-hairline bg-wall/80 font-mono text-sm text-bone opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:border-accent/60 hover:text-accent group-hover:opacity-100"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {media.map((m, i) => (
              <button
                key={m.src}
                type="button"
                aria-label={`Show image ${i + 1} of ${media.length} for ${name}`}
                onClick={() => goTo(i)}
                className={`h-1.5 w-1.5 rounded-full border border-hairline transition-colors duration-300 ${
                  i === index ? "bg-accent" : "bg-wall/80 hover:bg-ash"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
