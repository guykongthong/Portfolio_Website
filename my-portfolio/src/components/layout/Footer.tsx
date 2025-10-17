import { PROFILE } from "../../config/portfolioData";

export const Footer = () => (
  <footer className="py-10 text-center opacity-70 text-sm">
    © {new Date().getFullYear()} {PROFILE.name}. Built with React & Tailwind.
  </footer>
);