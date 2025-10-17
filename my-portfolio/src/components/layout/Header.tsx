import { Github, Linkedin, FileText, Moon, Sun } from "lucide-react";
import { PROFILE } from "../../config/portfolioData";

interface HeaderProps {
  theme: {
    dark: boolean;
    toggle: () => void;
  };
}

export const Header = ({ theme }: HeaderProps) => (
  <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-zinc-950/50 border-b border-zinc-200/60 dark:border-zinc-800">
    <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
      <a href="#top" className="font-semibold">{PROFILE.name}</a>
      <div className="hidden sm:flex items-center gap-6 text-sm">
        <a href="#projects" className="opacity-80 hover:opacity-100">Projects</a>
        <a href="#skills" className="opacity-80 hover:opacity-100">Skills</a>
        <a href="#experience" className="opacity-80 hover:opacity-100">Experience</a>
        <a href="#cp" className="opacity-80 hover:opacity-100">Competitive Programming</a>
        <a href="#contact" className="opacity-80 hover:opacity-100">Contact</a>
        <button
          onClick={theme.toggle}
          className="rounded-xl border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-xs"
          aria-label="Toggle theme"
        >
          <span className="inline-flex items-center gap-2">
            {theme.dark ? <Sun size={16} /> : <Moon size={16} />}
            {theme.dark ? "Light" : "Dark"}
          </span>
        </button>
      </div>
    </nav>
  </header>
);