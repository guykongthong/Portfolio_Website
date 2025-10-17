import { motion } from "framer-motion";
import { Github, Linkedin, FileText, MapPin, Calendar } from "lucide-react";
import { PROFILE } from "../../config/portfolioData";

export const Hero = () => (
  <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
    <div className="grid md:grid-cols-3 gap-8 items-stretch">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:col-span-2"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {PROFILE.title}
        </h1>
        <p className="mt-4 text-base sm:text-lg opacity-90">
          {PROFILE.blurb}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={PROFILE.social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm">
            <Github size={18} /> GitHub
          </a>
          <a href={PROFILE.social.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm">
            <Linkedin size={18} /> LinkedIn
          </a>
          {PROFILE.social.resume && (
            <a href={PROFILE.social.resume} className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm">
              <FileText size={18} /> Resume
            </a>
          )}
        </div>
        <div className="mt-6 flex items-center gap-4 text-sm opacity-80">
          <span className="inline-flex items-center gap-1"><MapPin size={16} /> {PROFILE.location}</span>
          <span className="inline-flex items-center gap-1"><Calendar size={16} /> Available for feature work</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-[32px] p-6 bg-blue-600 text-white shadow-lg"
      >
        <div className="text-sm uppercase tracking-wide opacity-90">About</div>
        <h3 className="mt-2 text-2xl font-bold">Hi, I'm {PROFILE.name.split(" ")[1]} 👋</h3>
        <p className="mt-3 text-white/90 text-sm">
          I design and build fast, accessible applications. Curious by default, pragmatic in delivery.
        </p>
        <ul className="mt-4 space-y-2 text-white/90 text-sm list-disc pl-5">
          <li>React + Tailwind specialist</li>
          <li>Great with dashboards</li>
          <li>Comfortable with Node/Express APIs</li>
        </ul>
      </motion.div>
    </div>
  </section>
);