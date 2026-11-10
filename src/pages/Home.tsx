import Nav from "../components/Nav";
import Footer from "../components/Footer";
import GlyphSky from "../components/GlyphSky";
import Hero from "../sections/Hero";
import Statement from "../sections/Statement";
import Exhibitions from "../sections/Exhibitions";
import Projects from "../sections/Projects";
import Materials from "../sections/Materials";
import Education from "../sections/Education";
import Activities from "../sections/Activities";

/**
 * "Gallery Exhibit": a software engineering CV hung as rooms of a quiet,
 * cool-blue gallery. The hero keeps its own dot wall; every room after it sits
 * over one continuous pale ASCII sky (fixed behind the content, a little
 * denser as you scroll down), and the footer ends in the full-ink sky.
 */
export default function Home() {
  return (
    <div className="relative min-h-screen text-fg">
      <Nav />
      <main>
        <Hero />
        <div className="relative isolate">
          <GlyphSky variant="haze" className="haze-mask fixed inset-0 -z-10" />
          <Statement />
          <Exhibitions />
          <Projects />
          <Materials />
          <Education />
          <Activities />
        </div>
      </main>
      <Footer />
    </div>
  );
}
