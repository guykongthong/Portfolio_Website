import type { ProjectMedia as ProjectMediaItem } from "../data/cv";

interface ProjectMediaProps {
  media: ProjectMediaItem[];
  name: string;
}

/**
 * The image/video wall for a project. Renders the first media item if one
 * exists; otherwise renders a same-sized dashed placeholder so the gallery
 * layout doesn't shift once real screenshots/video are dropped into cv.ts.
 */
export default function ProjectMedia({ media, name }: ProjectMediaProps) {
  const item = media[0];

  if (!item) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center border border-dashed border-hairline bg-wall-2">
        <div className="flex flex-col items-center gap-2 px-6 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-faint">
            Image coming soon
          </span>
          <span className="font-display text-sm text-ash">{name}</span>
        </div>
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <video
        className="aspect-[16/10] w-full border border-hairline object-cover"
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }

  return (
    <img
      className="aspect-[16/10] w-full border border-hairline object-cover"
      src={item.src}
      alt={item.alt}
    />
  );
}
