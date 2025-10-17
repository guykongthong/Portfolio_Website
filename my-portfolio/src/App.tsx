import { useTheme } from "./hooks/useTheme";
import {
  Header,
  Hero,
  Projects,
  Skills,
  Experience,
  CompetitiveProgramming,
  Contact,
  Footer
} from "./components";

export default function PortfolioSite() {
  const theme = useTheme();

  return (
    <div className="font-sans">
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100" style={{ transition: 'background-color 0.3s ease' }}>
        <Header theme={theme} />

        <a id="top" />
        <Hero />

        <Projects />
        <Skills />
        <Experience />
        <CompetitiveProgramming />
        <Contact />

        <Footer />
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
