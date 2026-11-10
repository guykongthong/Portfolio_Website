import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { contacts, profile } from "../data/cv";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import GlyphSky from "./GlyphSky";

const icons: Record<string, typeof Mail> = { Email: Mail, GitHub: Github, LinkedIn: Linkedin, Phone, Location: MapPin };

function Icon({ label }: { label: string }) {
  const I = icons[label] ?? Mail;
  return (
    <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center border border-line bg-surface-2 text-ink">
      <I size={18} strokeWidth={2} />
    </span>
  );
}

function Arrow() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      shapeRendering="crispEdges"
      fill="currentColor"
      aria-hidden="true"
      className="text-fg-2 transition-transform duration-150 [transition-timing-function:steps(2)] group-hover:translate-x-[3px] group-hover:text-fg"
    >
      <path d="M6 1h2v2h1v1h1v1h2v2h-2v1H9v1H8v2H6V9h1V8H0V4h7V3H6z" />
    </svg>
  );
}

const email = contacts.find((c) => c.label === "Email");
const others = contacts.filter((c) => c.label !== "Email");
// phone has no href in cv.ts; dialling it is the obvious action on a phone
const hrefFor = (label: string, value: string, href?: string) =>
  href ?? (label === "Phone" ? `tel:${value.replace(/[^\d+]/g, "")}` : undefined);

const btnClass =
  "inline-flex min-h-11 flex-1 items-center justify-center gap-2 border px-4 font-label text-label uppercase tracking-[0.06em] md:flex-none";

/**
 * Room 07, the way out: contact cards like a visitor information desk, then
 * the sky, a live one-ink ASCII field drifting behind a solid plate of links,
 * so link contrast never depends on the glyphs behind it. Cards firm their
 * border on hover and fill with surface-2 on :active for touch; email has
 * explicit Copy and Write buttons so neither depends on hover.
 */
export default function Footer() {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(0);
  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const copy = async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email.value);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked (insecure context or permission); Write still works
    }
  };

  const plateLinks = contacts.filter((c) => c.href);

  return (
    <footer id="visit" aria-labelledby="visit-h" className="relative scroll-mt-16">
      <div className="px-5 pb-16 pt-[72px] sm:px-16 sm:pb-24 sm:pt-28">
        <div className="mx-auto max-w-[1056px]">
          <SectionHeader room="07" meta="Visitor information" title="Visit" id="visit-h">
            <p className="mb-0 mt-4 max-w-[620px] text-[18px] leading-normal text-fg-2 md:text-[20px]">
              The gallery is open for new work and conversation.
            </p>
          </SectionHeader>

          <Reveal>
            <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-3 p-0 md:mt-12 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {email && (
                <li className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-3.5 border border-line bg-surface p-4 md:col-span-2 md:min-h-[104px] md:grid-cols-[44px_minmax(0,1fr)_auto] md:gap-4 md:p-5">
                  <Icon label="Email" />
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="font-label text-label uppercase tracking-[0.06em] text-fg-2">{email.label}</span>
                    <span className="text-[17px] font-medium leading-snug [overflow-wrap:anywhere] md:font-display md:text-[24px] md:leading-tight">
                      {email.value}
                    </span>
                  </div>
                  <div className="col-span-2 flex gap-2 md:col-span-1">
                    <button type="button" onClick={copy} className={`${btnClass} border-line-strong bg-surface text-fg hover:border-fg`}>
                      {copied ? "Copied" : "Copy"}
                    </button>
                    {email.href && (
                      <a href={email.href} className={`${btnClass} border-fg bg-fg text-bg`}>
                        Write
                      </a>
                    )}
                  </div>
                  <span className="sr-only" aria-live="polite">
                    {copied ? "Email address copied" : ""}
                  </span>
                </li>
              )}

              {others.map((c) => {
                const href = hrefFor(c.label, c.value, c.href);
                const body = (
                  <>
                    <Icon label={c.label} />
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="font-label text-label uppercase tracking-[0.06em] text-fg-2">{c.label}</span>
                      <span className="text-[17px] font-medium leading-snug [overflow-wrap:anywhere] lg:text-[16px]">{c.value}</span>
                    </span>
                    {href ? <Arrow /> : <span />}
                  </>
                );
                const cls =
                  "grid min-h-[88px] grid-cols-[44px_minmax(0,1fr)_20px] items-center gap-3.5 border border-line bg-surface p-4 md:min-h-[104px] md:gap-4 md:p-5";
                return (
                  <li key={c.label}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noreferrer" : undefined}
                        className={`group ${cls} h-full transition-colors duration-150 hover:border-line-strong active:bg-surface-2`}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={`${cls} h-full`}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* the sky, full ink, with a solid plate of links over it */}
      <div className="relative h-[420px] overflow-hidden border-t border-line bg-bg sm:h-[340px]">
        <GlyphSky variant="band" className="absolute inset-0" />
        <div className="absolute inset-x-4 bottom-4 mx-auto flex max-w-[1056px] flex-col items-start gap-1 border border-line bg-surface px-4 py-2.5 sm:inset-x-16 sm:bottom-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-3">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 sm:gap-x-6">
            {plateLinks.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href?.startsWith("http") ? "_blank" : undefined}
                rel={c.href?.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex min-h-11 items-center border-b-2 border-transparent font-label text-label uppercase tracking-[0.06em] hover:border-ink"
              >
                {c.label}
              </a>
            ))}
            <a href="#top" className="inline-flex min-h-11 items-center border-b-2 border-transparent font-label text-label uppercase tracking-[0.06em] hover:border-ink">
              Back to entrance
            </a>
          </nav>
          <span className="pb-1 font-label text-label uppercase tracking-[0.06em] text-fg-2 sm:pb-0">
            {profile.name.first} {profile.name.last}, {profile.exhibitionTitle} {profile.years}
          </span>
        </div>
      </div>
    </footer>
  );
}
