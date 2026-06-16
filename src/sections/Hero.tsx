import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { profile } from "../data/cv";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * The entrance hall. The name is lit by a soft overhead "spotlight" gradient and
 * revealed line by line on load. Mono captions frame it like an exhibition title card.
 */
export default function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const line: Variants = {
    hidden: reduce ? {} : { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-20 pt-28 sm:px-10"
    >
      {/* overhead spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 0%, rgba(223,59,52,0.10) 0%, transparent 55%), radial-gradient(80% 70% at 50% 38%, rgba(255,255,255,0.045) 0%, transparent 60%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-6xl"
      >
        <motion.div
          variants={line}
          className="mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-ash"
        >
          <span className="h-px w-10 bg-accent" />
          {profile.role}
          <span className="text-faint">/</span>
          {profile.exhibitionTitle}
        </motion.div>

        <h1 className="font-display font-light leading-[0.86] tracking-[-0.02em] text-bone">
          <motion.span variants={line} className="block text-[18vw] sm:text-[15vw] lg:text-[12rem]">
            {profile.name.first}
          </motion.span>
          <motion.span
            variants={line}
            className="block pl-[0.06em] text-[18vw] italic sm:text-[15vw] lg:text-[12rem]"
          >
            {profile.name.last}
          </motion.span>
        </h1>

        <motion.div
          variants={line}
          className="mt-10 flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md font-display text-lg leading-relaxed text-ash">
            A working catalogue of systems built, students taught, and problems solved —
            arranged as an exhibition.
          </p>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-faint">
            {profile.location}
          </span>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#statement"
        variants={line}
        initial="hidden"
        animate="show"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-faint sm:flex"
      >
        Enter
        <span className="h-10 w-px overflow-hidden bg-hairline">
          <span className="block h-1/2 w-full animate-[scrollcue_1.8s_ease-in-out_infinite] bg-accent" />
        </span>
      </motion.a>

      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
