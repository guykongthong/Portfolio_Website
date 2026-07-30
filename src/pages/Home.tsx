import Nav from "../components/Nav";
import GrainOverlay from "../components/GrainOverlay";
import Footer from "../components/Footer";
import Hero from "../sections/Hero";
import Statement from "../sections/Statement";
import Exhibitions from "../sections/Exhibitions";
import Projects from "../sections/Projects";
import Materials from "../sections/Materials";
import Provenance from "../sections/Provenance";
import Recognition from "../sections/Recognition";
import Activities from "../sections/Activities";

/**
 * "The Exhibition" — a software engineering CV arranged as a minimalist gallery.
 */
export default function Home() {
  return (
    <div className="relative min-h-screen bg-ink text-bone">
      <GrainOverlay />
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Exhibitions />
        <Projects />
        <Materials />
        <Provenance />
        <Recognition />
        <Activities />
      </main>
      <Footer />
    </div>
  );
}
