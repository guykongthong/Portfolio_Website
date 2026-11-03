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
import coolsenseAppDemo from "../assets/projects/coolsense/app-demo.mp4";
import coolsenseOverview from "../assets/projects/coolsense/ui-overview.jpg";
import coolsensePeople from "../assets/projects/coolsense/ui-analytics-people.jpg";
import coolsenseCarbon from "../assets/projects/coolsense/ui-analytics-carbon.jpg";
import corecoClientShop from "../assets/projects/coreco/client-shop.mp4";
import corecoClientCheckout from "../assets/projects/coreco/client-checkout.mp4";
import corecoAdminDashboard from "../assets/projects/coreco/admin-dashboard.mp4";
import reportCover from "../assets/projects/coreco-report/page-01.jpg";
import reportStack from "../assets/projects/coreco-report/page-43.jpg";
import reportQuality from "../assets/projects/coreco-report/page-45.jpg";
import reportBeforeAfter from "../assets/projects/coreco-report/page-47.jpg";
import ccmxLanding from "../assets/projects/ccmx/landing.png";
import portfolioHero from "../assets/projects/portfolio/hero.png";
import airGuitarTop from "../assets/projects/air-guitar/guitar-top.jpg";
import airGuitarAngle from "../assets/projects/air-guitar/guitar-angle.jpg";
import airGuitarBreadboard from "../assets/projects/air-guitar/breadboard.jpg";
import airGuitarBlock from "../assets/projects/air-guitar/block-diagram.png";
import airGuitarFlow from "../assets/projects/air-guitar/strum-flowchart.png";
import airGuitarMatrix from "../assets/projects/air-guitar/chord-confusion-matrix.png";
import airGuitarHistory from "../assets/projects/air-guitar/history.png";
import airGuitarTutor from "../assets/projects/air-guitar/tutor.png";
import airGuitarTrain from "../assets/projects/air-guitar/train.png";
import airGuitarTest from "../assets/projects/air-guitar/test.png";
import lineBotFlow from "../assets/projects/line-bot/flow.png";
import showproDemo from "../assets/projects/showpro/demo.mp4";

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
  coursework?: string[];
  featuredCoursework?: string[]; // subset of coursework shown with the highlighted border
}

export interface ProjectMedia {
  type: "image" | "video" | "embed"; // "embed" is an iframe URL, e.g. a YouTube embed
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
  liveLabel?: string; // link text, defaults to "View project"
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
  kind: "certification" | "award" | "competition";
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
    "Third-year Software Engineering student at Chiang Mai University, most interested in everything " +
    "around the code: requirements, design, process, and what happens after it ships. Competitive " +
    "programming (ACM ICPC National Round, 2025 and 2026) taught me to reach a working solution fast, " +
    "and Software Metrics taught me to measure whether it is any good. I adapt to the people I work " +
    "with, from leading a hackathon team through a language barrier to shipping backend work on " +
    "deadline. Seeking an internship to grow toward design and architecture.",
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
      "953102: Abstract Data Types & Problem Solving · 953233: Advanced Programming · 953212: Database Systems & Design",
    medium: "Java · JavaFX · SQL · ER Modeling",
    bullets: [
      "Mentor 90+ students across three courses: ADTs and Java design, advanced programming (JavaFX, multithreading, testing, build automation), and relational database systems.",
      "Deliver lab sessions on Java implementation, SQL queries, and ER modeling; grade assignments and exams with feedback on code quality and design correctness.",
    ],
  },
  {
    role: "Frontend Developer",
    institution: "TU: The Public Platform",
    date: "Freelance · May 2026 to Oct 2026",
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
      "Software Metrics",
      "Mobile Application Development",
      "Natural Language Processing for Software Engineering",
      "Information Retrieval",
    ],
    featuredCoursework: ["Software Design & Architecture", "Software Metrics", "DevOps", "Algorithms Design & Analysis"],
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
      "Led a 5-person team to 1st place, building a smart AC system that adjusts temperature and fan speed in real time based on room occupancy, including live webcam headcounting via Gemini vision. Now competing at the New Gen Energy Research Showcase, scaling it up with multi-room support and hardware integration.",
      "Designed and built the core calculation engine (occupancy density → AC mode → weather-adjusted BTU/hr → power draw), iterating it through three revisions to align with real HVAC/SEER physics.",
      "Overcame a language barrier with teammates, most of them Korean speakers with limited English, by listening closely to how they spoke and adjusting how I pronounced words, so they could understand me far more easily.",
      "Built the mock data generator and 168-hour simulation engine comparing the smart system against a static baseline, and led QA/testing that validated a ~30% reduction in energy use and CO₂ emissions.",
    ],
    media: [
      { type: "video", src: coolsenseAppDemo, alt: "CoolSense: screen recording of the dashboard demo", fit: "contain" },
      { type: "image", src: coolsenseOverview, alt: "CoolSense proposal design: overview with all floors collapsed", fit: "contain" },
      { type: "image", src: coolsensePeople, alt: "CoolSense proposal design: analytics, people today", fit: "contain" },
      { type: "image", src: coolsenseCarbon, alt: "CoolSense proposal design: analytics, carbon emissions", fit: "contain" },
      { type: "video", src: coolsenseDemo, alt: "CoolSense: live demo at K-CAMT'26 Hackathon", fit: "contain" },
      { type: "image", src: coolsenseTeam, alt: "CoolSense team accepting the K-CAMT'26 Hackathon win on stage", fit: "contain" },
      { type: "image", src: coolsenseAward, alt: "Net-Zero Grand Champion Award, K-CAMT'26 Hackathon", fit: "contain" },
    ],
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
    date: "May 2026 to Oct 2026",
    meta: "Freelance · Public-Interest Content Platform",
    stack: ["React 18", "TypeScript", "TanStack Router", "Tailwind CSS v4", "React Hook Form", "Zod", "Axios"],
    bullets: [
      "Led frontend delivery on a 3-person team to ship a public-interest content platform used by four distinct user roles (member, reviewer, sponsor, admin).",
      "Migrated all five role-based dashboards from mocked data to a live staging API, redesigning the email verification flow around a real link-token model and replacing silent failure states with real backend error feedback in toasts and alerts.",
      "Designed Figma wireframes and prototypes for the end-to-end user flows, then implemented a bilingual (i18n) UI in React 18, TypeScript, TanStack Router, and Tailwind CSS v4, with form validation (React Hook Form + Zod), file uploads, and authenticated API calls via Axios interceptors, in weekly Agile sprints.",
    ],
    media: [
      { type: "image", src: tuExplore, alt: "TU: The Public Platform — Explore page with domain browsing", fit: "cover", position: "50% 0%" },
      { type: "image", src: tuThreads, alt: "TU: The Public Platform — Threads page listing community-posted issues", fit: "contain" },
      { type: "image", src: tuRewards, alt: "TU: The Public Platform — Reward Marketplace page", fit: "contain" },
    ],
  },
  {
    name: "Core&Co Re-engineering: Metrics-Driven Stack Selection",
    tag: "Coursework",
    date: "2026",
    meta: "2-Person Team · Backend & Database · Software Metrics Term Project",
    liveHref: "/software-metrics-report.pdf",
    liveLabel: "Read the report",
    stack: ["Django REST Framework", "PostgreSQL", "React", "Tailwind CSS", "SonarQube Cloud", "GitHub Actions"],
    bullets: [
      "Re-engineered the Core&Co store onto React, Tailwind CSS, Django REST Framework, and PostgreSQL, choosing each with a weighted-criteria measurement process (COCOMO experience multipliers, test tooling, community size, structure, functional fit) tied to goals checkable after the rebuild.",
      "Baselined the original with function point analysis (213 UFP) and SonarQube, then re-measured the rebuild with the same tools: coverage 0% to 98.7%, bugs 8 to 0, code smells 9.18 to 0.43 per KLOC, backend peak cyclomatic complexity 66 to 19.",
      "Scoring ranked Spring Boot (78) above Django (75) and FastAPI (47); chose Django anyway for its built-in features under the deadline, then compared those predictions with how the build went.",
      "Set up SonarQube Cloud in GitHub Actions with coverage import and a PR quality gate, and directed and reviewed an AI-assisted DRF backend with 578 tests on PostgreSQL.",
    ],
    media: [
      { type: "image", src: reportCover, alt: "Software Metrics report: cover page", fit: "contain" },
      { type: "image", src: reportStack, alt: "Software Metrics report: original and chosen tech stack", fit: "contain" },
      { type: "image", src: reportQuality, alt: "Software Metrics report: SonarQube setup, coverage, and quality gate", fit: "contain" },
      { type: "image", src: reportBeforeAfter, alt: "Software Metrics report: before and after measurements", fit: "contain" },
    ],
    mediaOrientation: "portrait",
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
    name: "CAMT AI Passport: Level-Based Learning & Exam Platform",
    tag: "Coursework",
    date: "Oct 2026 to Nov 2026",
    meta: "3-Person Team · Backend, Database & Deployment · Course 953331",
    stack: ["Vue 3", "TypeScript", "Tailwind CSS", "Spring Boot", "PostgreSQL", "Supabase Storage (S3)", "Docker", "GitHub Actions"],
    bullets: [
      "Built the Spring Boot backend and PostgreSQL database for a platform where users study eLearning videos and pass exams to upgrade through four access levels, with admin control of users, levels, and exam questions: 19 REST endpoints and 8 JPA entities.",
      "Implemented JWT authentication with role-based access (admin and user) through Spring Security, plus server-side pagination and combined filters by level, province, and name using JPA Pageable.",
      "Handled profile image uploads to Supabase Storage (S3) and deployed with multi-stage Docker images and Docker Compose on a VM, auto-deployed by GitHub Actions on push to the prod branch.",
    ],
    media: [
      { type: "embed", src: "https://www.youtube-nocookie.com/embed/f58dJyE3wNI", alt: "CAMT AI Passport: Phase 1 demo (frontend only)" },
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

// Smaller projects, shown as a compact expandable list under the featured carousel.
export const otherProjects: Project[] = [
  {
    name: "LINE Arrival Notification Bot",
    tag: "Personal",
    date: "2026",
    meta: "Personal · iOS Shortcut Triggered LINE Push Notifications",
    stack: ["Supabase Edge Functions", "Deno", "Postgres", "LINE Messaging API"],
    liveHref: "https://github.com/guykongthong/location-bot",
    liveLabel: "View repo",
    bullets: [
      "Built a LINE bot that messages friends and family groups when I get home or reach uni. An iOS Shortcut calls the bot the moment my phone joins a Wi-Fi network.",
      "Wrote five Supabase Edge Functions in Deno (webhook, arrived-home, arrived-uni, recipients, health) over a Postgres schema, with shared-secret auth, HMAC-SHA256 verification of LINE webhook signatures, and a 30-minute cooldown per trigger.",
      "Started on Express, SQLite, and Railway, then migrated the whole bot to Supabase Edge Functions and Postgres.",
      "Recipients are added and deactivated automatically from LINE follow, unfollow, join, and leave events. Each push is logged, and the bot warns at 400 of the 500 free-tier messages per month.",
    ],
    media: [
      { type: "image", src: lineBotFlow, alt: "LINE Arrival Notification Bot: flowchart of the arrival trigger and the recipient webhook", fit: "contain" },
    ],
  },
  {
    name: "Air Guitar",
    tag: "Coursework",
    institution: "Chiang Mai University",
    date: "Nov 2026",
    meta: "Solo Project · IoT & Embedded Programming (953362)",
    stack: ["ESP8266", "Arduino C++", "US-100 Ultrasonic Sensor", "MQTT", "Vue 3", "Vite", "MediaPipe Hand Landmarker", "Web Audio"],
    bullets: [
      "Built an air guitar so people can try playing without owning one: the left hand shows a chord shape to a webcam, the right hand strums over an ultrasonic sensor, and a Vue 3 dashboard plays the sound, shows the next chord of a song to play along to, and scores chord and timing.",
      "Wrote the ESP8266 firmware (Arduino C++) that reads the US-100 sensor every 25 ms, filters it with a median of 3 plus smoothing, computes hand speed, and publishes down and up strum events with speed over MQTT, with a last-will status topic.",
      "Built chord recognition from MediaPipe hand landmarks: 210 pairwise distances normalised by hand size, fed to a k-nearest-neighbours classifier (k = 5) written in plain JavaScript with a majority vote over 7 frames, covering 6 chords plus idle. It scored 98.6% (138 of 140 test frames) on a separate test take, same person and lighting, with 373 training samples.",
      "Built the dashboard with a song mode (play-along and wait), in-browser training and test tabs, session history, and a live status bar for board, sensor, and MQTT. Measured a 46 ms median strum-to-sound delay against a 200 ms target.",
      "Wrote the project report with SRS, SDD, diagrams, and test results. Strum direction detection with a single sensor was a known limitation.",
    ],
    media: [
      { type: "image", src: airGuitarTop, alt: "Air Guitar: cardboard guitar body with the ultrasonic sensor facing out of the sound hole", fit: "contain" },
      { type: "image", src: airGuitarAngle, alt: "Air Guitar: guitar body from a second angle", fit: "contain" },
      { type: "image", src: airGuitarBreadboard, alt: "Air Guitar: US-100 sensor and NodeMCU ESP8266 wired on a breadboard inside the guitar body", fit: "contain" },
      { type: "image", src: airGuitarTutor, alt: "Air Guitar: main dashboard view with the detected chord, last strum, and live status bar", fit: "contain" },
      { type: "image", src: airGuitarTrain, alt: "Air Guitar: Train tab with 373 recorded training samples", fit: "contain" },
      { type: "image", src: airGuitarTest, alt: "Air Guitar: Test tab with 20 trials per chord", fit: "contain" },
      { type: "image", src: airGuitarHistory, alt: "Air Guitar: History tab with two logged play-along sessions", fit: "contain" },
      { type: "image", src: airGuitarBlock, alt: "Air Guitar: system block diagram from the sensor board through MQTT to the Vue dashboard", fit: "contain" },
      { type: "image", src: airGuitarFlow, alt: "Air Guitar: strum detection flowchart of the firmware loop", fit: "contain" },
      { type: "image", src: airGuitarMatrix, alt: "Air Guitar: chord classifier confusion matrix, 138 of 140 test frames correct", fit: "contain" },
    ],
  },
  {
    name: "CAMT ShowPro: Capstone Showcase Website",
    tag: "Personal",
    date: "Sep 2026",
    meta: "Personal · 18th CAMT ShowPro Capstone Exhibition",
    stack: ["Vue 3", "Vite", "Supabase Storage", "Vercel"],
    liveHref: "https://camt-18th-showpro.vercel.app",
    liveLabel: "Visit the site",
    bullets: [
      "Built the showcase website for the 18th CAMT ShowPro capstone exhibition, styled as a retro arcade.",
    ],
    media: [
      { type: "video", src: showproDemo, alt: "CAMT ShowPro: demo of the capstone showcase website", fit: "contain" },
    ],
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
      "Django",
      "Django REST Framework",
      "Spring Boot",
      "FastAPI",
      "React",
      "Vue.js",
      "REST APIs",
      "OpenAPI",
      "Tailwind CSS",
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
  { label: "Tools", items: ["Git", "GitHub", "GitLab", "SonarQube", "Postman", "Figma", "Jira"] },
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
    kind: "competition",
  },
  {
    name: "ACM ICPC Thailand National Round — placed 36th of about 100 teams as part of a 3-person team at Kasetsart University, the first CAMT team to score points",
    year: "2026",
    kind: "competition",
  },
  {
    name: "ACM ICPC Thailand National Round — competed as part of a 3-person team against universities across Thailand at King Mongkut's University of Technology Ladkrabang",
    year: "2025",
    kind: "competition",
  },
];
