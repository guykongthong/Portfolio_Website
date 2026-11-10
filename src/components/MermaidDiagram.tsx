import { useEffect, useId, useState } from "react";
import { diagrams, type DiagramId, type Palette } from "../data/diagrams";
import { readToken, useTheme } from "../lib/theme";

// mermaid is big, so it is only fetched when a diagram is actually opened.
// Renders go through one queue because mermaid.initialize is global.
let queue: Promise<unknown> = Promise.resolve();

function palette(): Palette {
  return {
    bg: readToken("--color-bg"),
    surface: readToken("--color-surface"),
    surface2: readToken("--color-surface-2"),
    line: readToken("--color-line"),
    lineStrong: readToken("--color-line-strong"),
    fg: readToken("--color-fg"),
    fg2: readToken("--color-fg-2"),
    accent: readToken("--color-accent"),
    accentInk: readToken("--color-accent-ink"),
    ink: readToken("--color-ink"),
  };
}

async function renderDiagram(id: string, diagram: DiagramId) {
  const { default: mermaid } = await import("mermaid");
  const c = palette();
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: "base",
    fontFamily: "Geist, system-ui, sans-serif",
    fontSize: 15,
    flowchart: { curve: "linear", htmlLabels: true, padding: 12, nodeSpacing: 32, rankSpacing: 30, useMaxWidth: false, wrappingWidth: 420 },
    themeVariables: {
      background: c.surface2,
      primaryColor: c.surface,
      primaryBorderColor: c.lineStrong,
      primaryTextColor: c.fg,
      lineColor: c.lineStrong,
      textColor: c.fg,
      edgeLabelBackground: c.surface2,
      tertiaryColor: c.surface2,
    },
  });
  const { svg } = await mermaid.render(id, diagrams[diagram](c));
  return svg;
}

/** A project diagram drawn with mermaid in the current theme, redrawn when the theme flips. */
export default function MermaidDiagram({ diagram, label }: { diagram: DiagramId; label: string }) {
  const { theme } = useTheme();
  const uid = useId().replace(/[^a-z0-9]/gi, "");
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let dead = false;
    queue = queue
      .then(() => renderDiagram(`mmd${uid}${theme}`, diagram))
      .then((out) => {
        if (!dead) {
          setSvg(out);
          setFailed(false);
        }
      })
      .catch(() => {
        if (!dead) setFailed(true);
      });
    return () => {
      dead = true;
    };
  }, [diagram, theme, uid]);

  if (failed) {
    return <p className="m-0 p-6 text-center text-[14px] text-fg-2">The diagram could not be drawn.</p>;
  }

  return (
    <div className="w-full">
      <div
        role="img"
        aria-label={label}
        // keep the diagram readable on a phone: it scrolls sideways instead of shrinking to nothing
        className="w-full overflow-x-auto p-4 md:p-6 [&>svg]:mx-auto [&>svg]:block [&>svg]:h-auto [&>svg]:min-w-[34rem] [&>svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <p className="m-0 pb-3 text-center font-label text-label uppercase tracking-[0.06em] text-fg-2 md:hidden" aria-hidden="true">
        Scroll sideways
      </p>
    </div>
  );
}
