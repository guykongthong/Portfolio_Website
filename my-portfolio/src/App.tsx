import { useMemo, useState, useEffect } from "react";
import { Github, Linkedin, Mail, Phone, Globe, ExternalLink, FileText, MapPin, Calendar, Moon, Sun, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "./components/ThemeToggle";

// ==============================
// Quick config — edit these
// ==============================
const PROFILE = {
  name: "Virawit Guy Kongthong",
  title: "Full-Stack Developer",
  blurb: "I design and deliver full-stack web applications using React, Tailwind, and Node.js. Passionate about creating seamless user experiences backed by efficient and maintainable code.",
  location: "Chiang Mai, Thailand",
  email: "guykongthong@gmail.com",
  phone: "+662612258",
  social: {
    github: "https://github.com/guykongthong",
    linkedin: "https://www.linkedin.com/in/your-linkedin/",
    website: "https://yourdomain.dev",
    resume: "/resume.pdf", // drop a PDF at public/resume.pdf
  },
};

// Projects — add/edit freely
const PROJECTS = [
  {
    title: "RPG Inventory Manager (JavaFX)",
    description:
      "Drag‑and‑drop equipment system with type‑safe rules, and ESC‑to‑close doc viewer.",
    tags: ["JavaFX", "OOP", "DnD"],
    links: {
      github: "https://github.com/guykongthong/RPG_Inventory_Manager",
      live: "",
    },
    highlights: [
      "Custom drag handlers + slot validation",
      "Drag & Drop Functionalities"
    ],
  },
  {
    title: "JavaFX Snake Game",
    description:
      "A simple snake game made with JavaFX, including unit-testing",
    tags: ["JavaFX", "OOP", "Concurrency", "Unit-Testing"],
    links: {
      github: "https://github.com/guykongthong/JavaFX_Snake_Game",
    }
  },
  {
    title: "JavaFX Currency Watcher",
    description:
      "A currency watcher fetching data from an API + customizable alerts. Users can choose to display multiple currencies simultaneously.",
    tags: ["JavaFX", "OOP", "API"],
    links: {
      github: "https://github.com/guykongthong/JavaFX_Currency_Watcher"
    },
    highlights: ["API Fetching", "Customizable Alerts"]
  },
  {
    title: "Data Analysis & Data Visualization tool in Python",
    description:
      "Data visualization dashboard with cards, tables, and dynamic charts. Clean theming and keyboard navigation.",
    tags: ["React", "Charts", "Accessibility"],
    links: {
      github: "https://github.com/your-github/stats-dashboard",
      live: "",
    },
    highlights: ["Number cards", "Sortable table", "Keyboard shortcuts"],
  },
];

const SKILLS = [
  { group: "Front‑End", items: ["React", "TypeScript", "Tailwind CSS", "Vite", "Zustand/Context", "Framer Motion"] },
  { group: "Back‑End", items: ["Node.js", "Express", "MySQL", "REST"] },
  { group: "Languages", items: ["Java", "C++", "Python", "HTML", "CSS", "JavaScript"] }
];

const EXPERIENCES = [
  {
    role: "Student Projects (SE @ CAMT)",
    company: "Chiang Mai University",
    period: "2024 — current",
    location: "Chiang Mai, TH",
    bullets: [
      "JavaFX RPG inventory (drag‑and‑drop, equip rules)",
      "PDF word‑frequency pipeline (map/reduce, concurrency)",
      "Data analysis mini‑apps in R/Excel (stats, CI, ANOVA)",
    ],
  },
];

const COMPETITIVE_PROGRAMMING = [
  {
    bullets: [
      "Competed in the 2025 ICPC Competitive Programming Competition @ KMITL"
    ]
  }
];

// ==============================
// Helpers
// ==============================
const Section = ({ id, title, children }: { id: string; title: string; children: any }) => (
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

const Tag = ({ children }: { children: any }) => (
  <span className="text-xs rounded-full border px-3 py-1 leading-6 mr-2 mb-2 inline-block">
    {children}
  </span>
);

const ProjectCard = ({ p }: { p: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative rounded-[28px] p-6 border border-zinc-200/70 dark:border-zinc-800/70 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl transition-shadow overflow-hidden"
  >
    {/* Accent blob */}
    <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-zinc-100 dark:bg-zinc-800 blur-2xl opacity-60 group-hover:opacity-80" />

    {/* Header */}
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          {p.title}
          {p.links?.live && (
            <a href={p.links.live} target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100">
              <ExternalLink size={18} />
            </a>
          )}
        </h3>
        <p className="mt-2 text-sm opacity-80">{p.description}</p>
      </div>
      <div className="flex gap-3 shrink-0">
        {p.links?.github && (
          <a className="inline-flex items-center gap-1 text-sm hover:underline" href={p.links.github} target="_blank" rel="noreferrer">
            <Github size={18} /> Code
          </a>
        )}
        {p.links?.live && (
          <a className="inline-flex items-center gap-1 text-sm hover:underline" href={p.links.live} target="_blank" rel="noreferrer">
            <Globe size={18} /> Live
          </a>
        )}
      </div>
    </div>

    {/* Tags */}
    <div className="mt-4 flex flex-wrap">
      {p.tags?.map((t: string) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>

    {/* Bubble highlight list */}
    {p.highlights?.length ? (
      <div className="mt-5 rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-zinc-50/80 dark:bg-zinc-800/40 p-4">
        <ul className="space-y-2 text-sm">
          {p.highlights.map((h: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              <span className="opacity-90">{h}</span>
            </li>
          ))}
        </ul>
      </div>
    ) : null}
  </motion.div>
);

function useTheme() {
  type Theme = "light" | "dark";


  const getInitial = (): Theme => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved === "dark" || saved === "light") return saved as Theme;
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    }
    return "light";
  };


  const [theme, setTheme] = useState<Theme>(() => getInitial());


  // apply to <html> and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);


  // react to OS theme changes if user hasn't chosen manually
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const saved = localStorage.getItem("theme");
    const onChange = () => {
      if (!saved) setTheme(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);


  return {
    dark: theme === "dark",
    theme,
    setTheme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    className: useMemo(() => (theme === "dark" ? "dark" : ""), [theme]),
  };
}

// ==============================
// Main component
// ==============================
export default function PortfolioSite() {
  const theme = useTheme();

  return (
    <div className="font-sans">
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100" style={{ transition: 'background-color 0.3s ease' }}>
        {/* Nav */}
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

        {/* Hero */}
        <a id="top" />
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

            {/* Right: large rounded info card (inspired by the screenshot) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-[32px] p-6 bg-blue-600 text-white shadow-lg"
            >
              <div className="text-sm uppercase tracking-wide opacity-90">About</div>
              <h3 className="mt-2 text-2xl font-bold">Hi, I’m {PROFILE.name.split(" ")[1]} 👋</h3>
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

        {/* Projects */}
        <Section id="projects" title="Projects">
          {/* Rounded card grid inspired by the testimonials layout */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <div key={p.title} className={i % 5 === 0 ? "lg:col-span-1" : ""}>
                <ProjectCard p={p} />
              </div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" title="Skills">
          <div className="grid md:grid-cols-3 gap-6">
            {SKILLS.map((s) => (
              <div key={s.group} className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-6">
                <h3 className="font-semibold mb-3">{s.group}</h3>
                <div className="flex flex-wrap">
                  {s.items.map((i) => (
                    <Tag key={i}>{i}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" title="Experience">
          <div className="space-y-6">
            {EXPERIENCES.map((e) => (
              <div key={e.role} className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{e.role} · {e.company}</h3>
                    <div className="opacity-75 text-sm flex items-center gap-3">
                      <span className="inline-flex items-center gap-1"><Calendar size={16} /> {e.period}</span>
                      <span className="inline-flex items-center gap-1"><MapPin size={16} /> {e.location}</span>
                    </div>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm list-disc pl-5">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="cp" title="Competitive Programming">
          {COMPETITIVE_PROGRAMMING.map((item, idx) => (
            <div key={idx} className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800 rounded-2xl p-6">
              <ul className="space-y-2 text-sm list-disc pl-5">
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        {/* Contact */}
        <Section id="contact" title="Contact">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="text-sm opacity-90">I’m open to feedback and opportunities. Reach out via email or phone, or book a quick call.</div>
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

        {/* Footer */}
        <footer className="py-10 text-center opacity-70 text-sm">
          © {new Date().getFullYear()} {PROFILE.name}. Built with React & Tailwind.
        </footer>
      </div>
    </div>
  );
}

// ==============================
// Usage notes (delete in prod):
// 1) Create a Vite + React project
//    npm create vite@latest my-portfolio -- --template react
//    cd my-portfolio && npm i && npm i -D tailwindcss postcss autoprefixer && npx tailwindcss init -p
// 2) Configure Tailwind (content array includes src/**/*.{js,ts,jsx,tsx})
// 3) npm i lucide-react framer-motion
// 4) Replace App.jsx with this component or import it.
// 5) Add a resume.pdf in public/ if you want the Resume button to work.
// 6) Deploy to Vercel/Netlify.
