import { Mail, Github, Linkedin, Phone, MapPin } from "lucide-react";
import { contacts, profile } from "../data/cv";
import Reveal from "./Reveal";

const iconFor: Record<string, typeof Mail> = {
  Email: Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
  Phone: Phone,
  Location: MapPin,
};

/**
 * Closing plaque — the gallery's "Visitor Information" board with all the ways
 * to get in touch, styled as an engraved wall sign.
 */
export default function Footer() {
  return (
    <footer id="visit" className="scroll-mt-24 border-t border-hairline bg-wall/40">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
            Visitor Information
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-light leading-[1.05] text-bone sm:text-5xl">
            The gallery is <em className="italic text-bone">open</em> for new work and
            conversation.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[2px] border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {contacts.map((c) => {
              const Icon = iconFor[c.label] ?? Mail;
              const body = (
                <div className="flex items-center gap-4 bg-wall px-6 py-6 transition-colors duration-300 group-hover:bg-wall-2">
                  <Icon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.6} />
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                      {c.label}
                    </p>
                    <p className="truncate font-display text-[15px] text-bone">{c.value}</p>
                  </div>
                </div>
              );
              return (
                <li key={c.label} className="group">
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noreferrer" className="block">
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-hairline/60 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-faint sm:flex-row sm:items-center">
          <span>
            {profile.name.first} {profile.name.last} — {profile.exhibitionTitle}
          </span>
          <span>{profile.years}</span>
        </div>
      </div>
    </footer>
  );
}
