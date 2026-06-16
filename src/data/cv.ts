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

export interface Project {
  name: string;
  meta: string; // "4-Person Team · End-of-Semester Project"
  stack: string[];
  liveHref?: string;
  bullets: string[];
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

export const profile = {
  name: { first: "Virawit", nick: "Guy", last: "Kongthong" },
  role: "Software Engineer",
  exhibitionTitle: "Selected Works",
  years: "2024 — 2026",
  location: "Chiang Mai, Thailand",
  summary:
    "Third-year Software Engineering student at Chiang Mai University with production " +
    "backend experience, three Teaching Assistant roles, and a national-level ACM ICPC " +
    "Thailand competitor. Designs and deploys RESTful backend systems using Node.js, " +
    "Express, MySQL, Docker, and AWS EC2 with automated CI/CD pipelines. Comfortable " +
    "across the backend-to-infrastructure stack with a growing focus on cloud and DevOps " +
    "practices.",
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
      "Mentor and instruct 90+ students across three courses spanning ADTs and modular Java design, advanced programming concepts (JavaFX, multithreading, exception handling, unit testing, build automation), and relational database systems.",
      "Lead lab sessions guiding students through Java implementation, event-driven GUI programming, thread synchronization, SQL queries, ER modeling, and schema normalization.",
      "Evaluate and grade assignments and exams, providing structured feedback on algorithmic design, code quality, and database design correctness.",
    ],
  },
  {
    role: "Backend Engineering Intern",
    institution: "CompLaunch",
    date: "Oct 2025 — Dec 2025",
    medium: "Python · REST APIs · Unit Testing",
    bullets: [
      "Engineered a Python-based tournament management system with 20+ RESTful API endpoints handling single elimination, double elimination, and round-robin bracket logic.",
      "Developed unit tests to validate core tournament logic and bracket generation across multiple edge cases.",
    ],
  },
  {
    role: "Frontend Developer",
    institution: "TU: The Public Platform",
    date: "Freelance · May 2026 — Present",
    medium: "React 18 · TypeScript · TanStack · Tailwind v4",
    bullets: [
      "Building the frontend for a public-interest content platform where submissions are verified through an AI-assisted review pipeline before publishing.",
      "Designed wireframes and interactive prototypes in Figma, covering end-to-end user flows before implementation.",
      "Developing a responsive, bilingual (i18n) UI using React 18, TypeScript, TanStack Router, and Tailwind CSS v4 with file-based routing and server state managed via TanStack Query.",
      "Implementing form validation with React Hook Form + Zod and file upload flows with authentication-aware API integration via Axios interceptors.",
      "Working in an Agile development workflow with weekly team meetings for sprint planning, progress reviews, and iterative feedback.",
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
    name: "Core&Co Online Webstore",
    meta: "4-Person Team · End-of-Semester Project",
    stack: ["Node.js", "Express", "EJS", "MySQL", "Docker Compose", "GitHub Actions", "AWS EC2"],
    bullets: [
      "Solely responsible for the entire backend, database, and infrastructure on a 4-person team; teammates handled UI/UX and frontend.",
      "Engineered a RESTful API with token-based authentication covering user auth (email verification + password reset), product catalog, cart/checkout, and order management, deployed live and fully functional in production.",
      "Optimized database performance by indexing frequently queried fields, resulting in near-instant API responses; product additions via the admin dashboard reflected on the customer side in real time.",
      "Architected image storage using Supabase Storage with URL references in MySQL, avoiding binary data in the relational database and keeping queries lean.",
      "Containerized the application with Docker Compose and built a GitHub Actions CI/CD pipeline automating deployment to AWS EC2 on every push to main.",
    ],
  },
];

export const skills: SkillRow[] = [
  { label: "Languages", items: ["Java", "Python", "JavaScript", "TypeScript", "C++"] },
  {
    label: "Web",
    items: [
      "Node.js",
      "Express",
      "React",
      "REST APIs",
      "TanStack Query",
      "Zustand",
      "Zod",
      "Tailwind CSS",
      "Bootstrap",
      "EJS",
    ],
  },
  { label: "Databases", items: ["MySQL", "PostgreSQL", "Supabase"] },
  {
    label: "DevOps / Cloud",
    items: [
      "Docker",
      "Docker Compose",
      "Containerization",
      "GitHub Actions",
      "CI/CD",
      "AWS EC2",
      "Linux",
    ],
  },
  { label: "Tools", items: ["Git", "GitHub", "GitLab", "Postman", "Figma"] },
];

export const accolades: Accolade[] = [
  { name: "Claude Code Certification, Anthropic", year: "2026", kind: "certification" },
  {
    name: "ACM ICPC Thailand National Round — competed as part of a 3-person team against universities across Thailand at King Mongkut's University of Technology Ladkrabang",
    year: "2025",
    kind: "award",
  },
];
