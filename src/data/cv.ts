// ──────────────────────────────────────────────────────────────────────────
// CV content — single source of truth for the exhibition.
// Mirrors Virawit_Kongthong_CV.html. Edit here to update the whole site.
// ──────────────────────────────────────────────────────────────────────────

import tuExplore from "../assets/projects/tu-frontend/explore.png";
import tuThreads from "../assets/projects/tu-frontend/threads.png";
import tuRewards from "../assets/projects/tu-frontend/rewards.png";
import coolsenseAward from "../assets/projects/coolsense/award-photo.jpg";
import coolsenseTeam from "../assets/projects/coolsense/team-photo.jpg";
import coolsenseDemo from "../assets/projects/coolsense/demo.mp4";
import corecoClientShop from "../assets/projects/coreco/client-shop.mp4";
import corecoClientCheckout from "../assets/projects/coreco/client-checkout.mp4";
import corecoAdminDashboard from "../assets/projects/coreco/admin-dashboard.mp4";
import ccmxLanding from "../assets/projects/ccmx/landing.png";
import portfolioHero from "../assets/projects/portfolio/hero.png";

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
  coursework?: string[]; // ordered with the most relevant/featured courses first
}

export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt: string;
  fit?: "cover" | "contain"; // "contain" letterboxes portrait-oriented media instead of cropping it
  position?: string; // CSS object-position, e.g. "50% 20%" — set via the dev-only reposition overlay
}

export interface Project {
  name: string;
  tag: "Coursework" | "Freelance" | "Internship" | "Personal" | "Hackathon";
  institution?: string;
  date: string;
  meta: string; // "4-Person Team · End-of-Semester Project"
  stack: string[];
  liveHref?: string;
  bullets: string[];
  media: ProjectMedia[]; // empty array renders a placeholder
  mediaOrientation?: "landscape" | "portrait"; // frame shape; default landscape (16:10)
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
    "Third-year Software Engineering student at Chiang Mai University, focused on the " +
    "full software development lifecycle, especially software architecture and design, " +
    "and backend systems. Comfortable across every stage, from requirement analysis and " +
    "system design through implementation, testing, and deployment, with the most " +
    "hands-on time spent building and deploying backend systems and REST APIs. Two " +
    "freelance roles, three Teaching Assistant positions, two national ACM ICPC Thailand " +
    "rounds, and a 1st-place win at the K-CAMT'26 Hackathon, to round out the experience.",
};

export const contacts: ContactLink[] = [
  { label: "Email", value: "guykongthong@gmail.com", href: "mailto:guykongthong@gmail.com" },
  { label: "GitHub", value: "github.com/guykongthong", href: "https://github.com/guykongthong" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/virawit-kongthong",
    href: "https://linkedin.com/in/virawit-kongthong",
  },
  { label: "Phone", value: "+66 98 261 2258" },
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
      "Mentor 90+ students across three courses: ADTs and Java design, advanced programming (JavaFX, multithreading, testing, build automation), and relational database systems.",
      "Deliver lab sessions on Java implementation, SQL queries, and ER modeling; grade assignments and exams with feedback on code quality and design correctness.",
    ],
  },
  {
    role: "Frontend Developer",
    institution: "TU: The Public Platform",
    date: "Freelance · May 2026 — Present",
    medium: "React 18 · TypeScript · TanStack · Tailwind v4",
    bullets: [
      "Led frontend delivery on a 3-person team to ship a public-interest content platform used by four distinct user roles (member, reviewer, sponsor, admin).",
      "Migrated all five role-based dashboards from mocked data to a live staging API, redesigning the email verification flow around a real link-token model and replacing silent failure states with real backend error feedback in toasts and alerts.",
      "Designed Figma wireframes and prototypes for the end-to-end user flows, then implemented a bilingual (i18n) UI in React 18, TypeScript, TanStack Router, and Tailwind CSS v4, with form validation (React Hook Form + Zod), file uploads, and authenticated API calls via Axios interceptors, in weekly Agile sprints.",
    ],
  },
  {
    role: "Backend Developer",
    institution: "CCMX 2027 (Chiang Mai University)",
    date: "Freelance · Jul 2026 — Aug 2026",
    medium: "Cloudflare Workers · Hono · Supabase · Postgres RLS",
    bullets: [
      "Delivered the backend for a conference registration and abstract submission platform serving 300-600 medical professionals at a CMU-affiliated academic conference.",
      "Implemented the Cloudflare Workers + Hono API within the project's layered architecture and three-layer security model (Supabase Auth JWT, in-app RBAC checks, Postgres RLS as a backstop).",
      "Engineered the shared request/response scaffolding (request-id middleware, error handling, response envelope) and endpoints for registration, invite codes, payment-slip review, and abstract submission, tracked in Jira.",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    school: "B.Sc. Software Engineering, Chiang Mai University",
    date: "2024 — Expected 2028",
    detail: "College of Arts, Media and Technology · 3rd Year",
    coursework: [
      "Software Design & Architecture",
      "Software Requirement Analysis",
      "Component-Based Software Development",
      "Database Systems & Design",
      "Algorithms Design & Analysis",
      "DevOps",
    ],
  },
  {
    school: "Lanna International School of Thailand",
    date: "2017 — 2024",
  },
];

export const projects: Project[] = [
  {
    name: "CoolSense — Smart AC Occupancy Optimization",
    tag: "Hackathon",
    date: "Aug 2026",
    meta: "5-Person Team · Project Lead · K-CAMT'26 Hackathon: Net-Zero Carbon · Winner",
    stack: ["Vue.js", "TypeScript", "Supabase", "Deno Edge Functions", "Gemini Vision API", "Vercel"],
    bullets: [
      "Led a 5-person team to 1st place, building a smart AC system that adjusts temperature and fan speed in real time based on room occupancy, including live webcam headcounting via Gemini vision.",
      "Designed and built the core calculation engine (occupancy density → AC mode → weather-adjusted BTU/hr → power draw), iterating it through three revisions to align with real HVAC/SEER physics.",
      "Built the mock data generator and 168-hour simulation engine comparing the smart system against a static baseline, and led QA/testing that validated a ~30% reduction in energy use and CO₂ emissions.",
    ],
    media: [
      { type: "video", src: coolsenseDemo, alt: "CoolSense — live demo at K-CAMT'26 Hackathon" },
      { type: "image", src: coolsenseTeam, alt: "CoolSense team accepting the K-CAMT'26 Hackathon win on stage" },
      { type: "image", src: coolsenseAward, alt: "Net-Zero Grand Champion Award, K-CAMT'26 Hackathon" },
    ],
    mediaOrientation: "portrait",
  },
  {
    name: "CCMX 2027 Conference Platform",
    tag: "Freelance",
    institution: "Chiang Mai University",
    date: "Jul 2026 — Aug 2026",
    meta: "Freelance · Conference Registration & Abstract Submission Platform",
    stack: ["Cloudflare Workers", "Hono", "Supabase", "Postgres RLS"],
    liveHref: "https://ccmxcmu.com/",
    bullets: [
      "Delivered the backend for a conference registration and abstract submission platform serving 300-600 medical professionals at a CMU-affiliated academic conference.",
      "Implemented the Cloudflare Workers + Hono API within the project's layered architecture and three-layer security model: Supabase Auth JWT, in-app RBAC checks, and Postgres RLS as a backstop.",
      "Engineered the shared request/response scaffolding (request-id middleware, error handling, response envelope) and endpoints for registration, invite codes, payment-slip review, and abstract submission, tracked in Jira.",
    ],
    media: [{ type: "image", src: ccmxLanding, alt: "CCMX 2027 — conference landing page" }],
  },
  {
    name: "TU: The Public Platform",
    tag: "Freelance",
    institution: "TU: The Public Platform",
    date: "May 2026 — Present",
    meta: "Freelance · Public-Interest Content Platform",
    stack: ["React 18", "TypeScript", "TanStack Router", "Tailwind CSS v4", "React Hook Form", "Zod", "Axios"],
    bullets: [
      "Led frontend delivery on a 3-person team to ship a public-interest content platform used by four distinct user roles (member, reviewer, sponsor, admin).",
      "Migrated all five role-based dashboards from mocked data to a live staging API, redesigning the email verification flow around a real link-token model and replacing silent failure states with real backend error feedback in toasts and alerts.",
      "Designed Figma wireframes and prototypes for the end-to-end user flows, then implemented a bilingual (i18n) UI in React 18, TypeScript, TanStack Router, and Tailwind CSS v4, with form validation (React Hook Form + Zod), file uploads, and authenticated API calls via Axios interceptors, in weekly Agile sprints.",
    ],
    media: [
      { type: "image", src: tuExplore, alt: "TU: The Public Platform — Explore page with domain browsing", fit: "contain" },
      { type: "image", src: tuThreads, alt: "TU: The Public Platform — Threads page listing community-posted issues", fit: "contain" },
      { type: "image", src: tuRewards, alt: "TU: The Public Platform — Reward Marketplace page", fit: "contain" },
    ],
  },
  {
    name: "Core&Co Online Webstore",
    tag: "Coursework",
    date: "2025",
    meta: "4-Person Team · End-of-Semester Project",
    stack: ["Node.js", "Express", "EJS", "MySQL", "Docker Compose", "GitHub Actions", "AWS EC2"],
    bullets: [
      "Owned backend and infrastructure solo on a 4-person team while teammates handled UI/UX and frontend.",
      "Built a REST API with token-based auth (email verification, password reset), product catalog, cart/checkout, and order management, deployed to production on AWS.",
      "Indexed frequently-queried fields to reduce query time and integrated Supabase Storage with URL references in MySQL to keep product images out of the database.",
      "Containerized with Docker Compose and set up a GitHub Actions pipeline to auto-deploy to AWS EC2 on every push to main.",
    ],
    media: [
      { type: "video", src: corecoClientShop, alt: "Core&Co — customer-facing product browsing and search" },
      { type: "video", src: corecoClientCheckout, alt: "Core&Co — customer checkout flow" },
      { type: "video", src: corecoAdminDashboard, alt: "Core&Co — role-restricted admin dashboard" },
    ],
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
    media: [{ type: "image", src: portfolioHero, alt: "This portfolio's own gallery-exhibit hero" }],
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
      "Spring Boot",
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
];

export const accolades: Accolade[] = [
  { name: "1st Place, K-CAMT'26 Hackathon: Net-Zero Carbon — led a 5-person team", year: "2026", kind: "award" },
  {
    name: "ACM ICPC Northern Thailand Regional Round — competed as part of a 3-person team and advanced to the National Round",
    year: "2026",
    kind: "award",
  },
  {
    name: "ACM ICPC Thailand National Round — competed as part of a 3-person team against universities across Thailand at Kasetsart University",
    year: "2026",
    kind: "award",
  },
  {
    name: "ACM ICPC Thailand National Round — competed as part of a 3-person team against universities across Thailand at King Mongkut's University of Technology Ladkrabang",
    year: "2025",
    kind: "award",
  },
];
