export const PROFILE = {
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

export const PROJECTS = [
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
  {
    title: "Weather Forecast Application",
    description:
      "A weather forecast application fetching real-time data from WeatherAPI",
      tags: ["React", "API Fetching"]
  }
];

export const SKILLS = [
  { group: "Front‑End", items: ["React", "TypeScript", "Tailwind CSS", "Vite", "Zustand/Context", "Framer Motion"] },
  { group: "Back‑End", items: ["Node.js", "Express", "MySQL", "REST"] },
  { group: "Languages", items: ["Java", "C++", "Python", "HTML", "CSS", "JavaScript"] }
];

export const EXPERIENCES = [
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

export const COMPETITIVE_PROGRAMMING = [
  {
    bullets: [
      "Competed in the 2025 ICPC Competitive Programming Competition @ KMITL"
    ]
  }
];