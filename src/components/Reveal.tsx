import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevealProps {
  children: ReactNode;
  /** seconds of stagger delay */
  delay?: number;
  /** travel distance in px */
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}

/**
 * Fades + lifts its children into view as the visitor scrolls down the gallery.
 * Collapses to a no-op when the OS requests reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  // all variants share the same motion props we use; coerce to one known type
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
