// ──────────────────────────────────────────────────────────────────────────
// CV content — single source of truth for the exhibition.
// Mirrors Virawit_Kongthong_CV.html. Edit here to update the whole site.
// ──────────────────────────────────────────────────────────────────────────

export interface ContactLink {
  label: string;
  value: string;
  href?: string;
}

export interface Experience {
  role: string;
  institution: string;
  date: string;
  context?: string; // course list / freelance tag shown under the title
  medium?: string; // tech "medium" line for the placard
  bullets: string[];
}

export interface EducationEntry {
  school: string;
  date: string;
  detail?: string;
}

export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt: string;
}

export interface Project {
  name: string;
  tag: "Coursework" | "Freelance" | "Internship" | "Personal";
  institution?: string;
  date: string;
  meta: string; // "4-Person Team · End-of-Semester Project"
  stack: string[];
  liveHref?: string;
  bullets: string[];
  media: ProjectMedia[]; // empty array renders a placeholder
}

export interface SkillRow {
  label: string;
  items: string[];
}

export interface Accolade {
  name: string;
  year: string;
  kind: "certification" | "award";
}

export interface Extracurricular {
  role: string;
  organization: string;
  institution: string;
  icon: "users" | "trophy" | "camera"; // each entry names its own placard icon
}

export const profile = {
  name: { first: "Virawit", nick: "Guy", last: "Kongthong" },
  role: "Software Engineer",
  exhibitionTitle: "Selected Works",
  years: "2024 — 2026",
  location: "Chiang Mai, Thailand",
  summary:
    "Third-year Software Engineering student at Chiang Mai University with hands-on " +
    "backend experience across three freelance/internship roles, three Teaching Assistant " +
    "positions, and a national ACM ICPC Thailand round. Build and deploy backend systems " +
    "with Node.js, Express, MySQL, Docker, and AWS EC2, and I'm picking up more of the " +
    "infrastructure and cloud side as I go.",
};

export const contacts: ContactLink[] = [
  { label: "Email", value: "guykongthong@gmail.com", href: "mailto:guykongthong@gmail.com" },
  { label: "GitHub", value: "github.com/guykongthong", href: "https://github.com/guykongthong" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/virawit-kongthong",
    href: "https://linkedin.com/in/virawit-kongthong",
  },
  { label: "Phone", value: "+66 98 261 1258" },
  { label: "Location", value: "Chiang Mai, Thailand" },
];

export const experiences: Experience[] = [
  {
    role: "Teaching Assistant",
    institution: "Chiang Mai University",
    date: "Nov 2025 — Present",
    context:
      "SE102: Abstract Data Types & Problem Solving · SE233: Advanced Programming · 953212: Database Systems & Design",
    medium: "Java · JavaFX · SQL · ER Modeling",
    bullets: [
      "Teach and mentor 90+ students across three courses: ADTs and Java design, advanced programming (JavaFX, multithreading, testing, build automation), and relational database systems.",
      "Run lab sessions on Java implementation, SQL queries, and ER modeling, and grade assignments/exams with feedback on code quality and design correctness.",
    ],
  },
  {
    role: "Backend Developer Intern",
    institution: "CompLaunch",
    date: "Oct 2025 — Dec 2025",
    medium: "Python · REST APIs · Unit Testing",
    bullets: [
      "Built a Python-based tournament management system with 20+ REST endpoints covering single elimination, double elimination, and round-robin bracket logic.",
      "Wrote unit tests for the bracket logic to catch edge cases before they hit production.",
    ],
  },
  {
    role: "Frontend Developer",
    institution: "TU: The Public Platform",
    date: "Freelance · May 2026 — Present",
    medium: "React 18 · TypeScript · TanStack · Tailwind v4",
    bullets: [
      "Building the frontend for a public-interest content platform where submissions go through an AI-assisted review pipeline before publishing.",
      "Designed Figma wireframes and prototypes for the end-to-end user flows, then built a bilingual (i18n) UI in React 18, TypeScript, TanStack Router, and Tailwind CSS v4.",
      "Handling form validation (React Hook Form + Zod), file uploads, and authenticated API calls via Axios interceptors, in a weekly Agile sprint cycle.",
    ],
  },
  {
    role: "Backend Developer",
    institution: "CCMX 2027 (Chiang Mai University)",
    date: "Freelance · Jul 2026 — Aug 2026",
    medium: "Cloudflare Workers · Hono · Supabase · Postgres RLS",
    bullets: [
      "Backend developer on CCMX 2027, a conference registration and abstract submission platform for a CMU-affiliated academic conference serving 300-600 medical professionals.",
      "Implementing the Cloudflare Workers + Hono API within the project's layered architecture and three-layer security model (Supabase Auth JWT, in-app RBAC checks, Postgres RLS as a backstop).",
      "Built the shared request/response scaffolding (request-id middleware, error handling, response envelope) and endpoints for registration, invite codes, payment-slip review, and abstract submission, tracked in Jira.",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    school: "B.Sc. Software Engineering, Chiang Mai University",
    date: "2024 — Expected 2028",
    detail: "College of Arts, Media and Technology · 3rd Year",
  },
  {
    school: "Lanna International School of Thailand",
    date: "2017 — 2024",
  },
];

export const projects: Project[] = [
  {
    name: "CCMX 2027 Conference Platform",
    tag: "Freelance",
    institution: "Chiang Mai University",
    date: "Jul 2026 — Aug 2026",
    meta: "Freelance · Conference Registration & Abstract Submission Platform",
    stack: ["Cloudflare Workers", "Hono", "Supabase", "Postgres RLS"],
    bullets: [
      "Backend developer on CCMX 2027, a conference registration and abstract submission platform for a CMU-affiliated academic conference serving 300-600 medical professionals.",
      "Implemented the Cloudflare Workers + Hono API within the project's layered architecture and three-layer security model: Supabase Auth JWT, in-app RBAC checks, and Postgres RLS as a backstop.",
      "Built the shared request/response scaffolding (request-id middleware, error handling, response envelope) and endpoints for registration, invite codes, payment-slip review, and abstract submission, tracked in Jira.",
    ],
    media: [],
  },
  {
    name: "TU: The Public Platform",
    tag: "Freelance",
    institution: "TU: The Public Platform",
    date: "May 2026 — Present",
    meta: "Freelance · Public-Interest Content Platform",
    stack: ["React 18", "TypeScript", "TanStack Router", "Tailwind CSS v4", "React Hook Form", "Zod", "Axios"],
    bullets: [
      "Building the frontend for a public-interest content platform where submissions go through an AI-assisted review pipeline before publishing.",
      "Designed Figma wireframes and prototypes for the end-to-end user flows, then built a bilingual (i18n) UI in React 18, TypeScript, TanStack Router, and Tailwind CSS v4.",
      "Handling form validation (React Hook Form + Zod), file uploads, and authenticated API calls via Axios interceptors, in a weekly Agile sprint cycle.",
    ],
    media: [],
  },
  {
    name: "CompLaunch Tournament Management System",
    tag: "Internship",
    institution: "CompLaunch",
    date: "Oct 2025 — Dec 2025",
    meta: "Backend Engineering Internship",
    stack: ["Python", "REST APIs", "Unit Testing"],
    bullets: [
      "Built a Python-based tournament management system with 20+ REST endpoints covering single elimination, double elimination, and round-robin bracket logic.",
      "Wrote unit tests for the bracket logic to catch edge cases before they hit production.",
    ],
    media: [],
  },
  {
    name: "Core&Co Online Webstore",
    tag: "Coursework",
    date: "2025",
    meta: "4-Person Team · End-of-Semester Project",
    stack: ["Node.js", "Express", "EJS", "MySQL", "Docker Compose", "GitHub Actions", "AWS EC2"],
    bullets: [
      "Sole backend/infrastructure owner on a 4-person team; teammates handled UI/UX and frontend.",
      "Built a REST API with token-based auth (email verification, password reset), product catalog, cart/checkout, and order management, deployed to production on AWS.",
      "Indexed frequently-queried fields to cut down query time, and used Supabase Storage with URL references in MySQL to keep product images out of the database.",
      "Containerized with Docker Compose and set up a GitHub Actions pipeline to auto-deploy to AWS EC2 on every push to main.",
    ],
    media: [],
  },
  {
    name: "This Portfolio Website",
    tag: "Personal",
    date: "2026",
    meta: "Personal · Self-Referential Exhibit",
    liveHref: "https://portfoliowebsite-teal-ten.vercel.app",
    stack: ["React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
    bullets: [
      "This CV, presented as a minimalist gallery exhibition rather than a typical developer portfolio.",
      "Built with React 19, TypeScript, and Tailwind CSS v4, with framer-motion handling scroll reveals and transitions.",
    ],
    media: [],
  },
];

export const skills: SkillRow[] = [
  { label: "Languages", items: ["Java", "Python", "JavaScript", "TypeScript", "C++"] },
  { label: "Spoken", items: ["Thai — Native", "English — Fluent (IELTS 7.5)"] },
  {
    label: "Web",
    items: [
      "Node.js",
      "Express",
      "Hono",
      "React",
      "Vue.js",
      "REST APIs",
      "OpenAPI",
      "Bootstrap",
      "EJS",
    ],
  },
  { label: "Databases", items: ["MySQL", "PostgreSQL", "Supabase (Auth, Storage, Row Level Security)"] },
  {
    label: "DevOps / Cloud",
    items: [
      "Docker",
      "Docker Compose",
      "Containerization",
      "GitHub Actions",
      "CI/CD",
      "AWS EC2",
      "Cloudflare Workers",
      "Linux",
    ],
  },
  { label: "Tools", items: ["Git", "GitHub", "GitLab", "Postman", "Figma", "Jira"] },
];

export const extracurriculars: Extracurricular[] = [
  {
    role: "President",
    organization: "CAMT Badminton Club",
    institution: "Chiang Mai University",
    icon: "users",
  },
  {
    role: "Head of Creative Production",
    organization: "CAMT Student Council",
    institution: "Chiang Mai University",
    icon: "trophy",
  },
  {
    role: "Head of Photography",
    organization: "Lanna International School",
    institution: "Lanna International School",
    icon: "camera",
  },
];

export const accolades: Accolade[] = [
  { name: "Claude Code Certification, Anthropic", year: "2026", kind: "certification" },
  {
    name: "ACM ICPC Northern Thailand Regional Round — competed as part of a 3-person team and advanced to the National Round",
    year: "2026",
    kind: "award",
  },
  {
    name: "ACM ICPC Thailand National Round — competed as part of a 3-person team against universities across Thailand at King Mongkut's University of Technology Ladkrabang",
    year: "2025",
    kind: "award",
  },
];
