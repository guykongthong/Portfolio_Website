import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export const Section = ({ id, title, children }: SectionProps) => (
  <section id={id} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-2xl sm:text-3xl font-bold mb-8"
    >
      {title}
    </motion.h2>
    {children}
  </section>
);