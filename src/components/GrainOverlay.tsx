/**
 * Atmosphere layer for the whole page: film grain + edge vignette.
 * Both effects are pure CSS pseudo-elements (see .grain / .vignette in index.css)
 * and sit above content but ignore pointer events.
 */
export default function GrainOverlay() {
  return <div className="grain vignette" aria-hidden="true" />;
}
