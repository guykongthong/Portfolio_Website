/**
 * Atmosphere layer for the whole page: a faint paper-grain texture.
 * Pure CSS pseudo-element (see .grain in index.css); sits above content but
 * ignores pointer events.
 */
export default function GrainOverlay() {
  return <div className="grain" aria-hidden="true" />;
}
