// tailwind.config.js
// Note: this is Tailwind v4 — primary design tokens live in the @theme block in
// src/index.css. This file is kept for content globbing and font aliases.
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
