import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { Section } from "../layout/Section";
import { PROFILE } from "../../config/portfolioData";

export const Contact = () => (
  <Section id="contact" title="Contact">
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="text-sm opacity-90">I'm open to feedback and opportunities. Reach out via email or phone, or book a quick call.</div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2"><Mail size={18} /> {PROFILE.email}</a>
          <a href={`tel:${PROFILE.phone}`} className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2"><Phone size={18} /> {PROFILE.phone}</a>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a href={PROFILE.social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 opacity-80 hover:opacity-100"><Github size={18} /> GitHub</a>
          <a href={PROFILE.social.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 opacity-80 hover:opacity-100"><Linkedin size={18} /> LinkedIn</a>
        </div>
      </div>
      <div className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-6">
        <h3 className="font-semibold">Why me?</h3>
        <p className="mt-3 text-sm opacity-90">
          I value clean code, reliability, and fast iteration. I document decisions, write accessible UIs, and ship.
        </p>
        <ul className="mt-4 space-y-2 text-sm list-disc pl-5">
          <li>Strong fundamentals in JS/TS + React</li>
          <li>Pragmatic with component design & state</li>
          <li>Comfortable pairing and doing code reviews</li>
        </ul>
      </div>
    </div>
  </Section>
);