import { SmokeBackground } from "@/components/ui/spooky-smoke-animation";
import { Navigation } from "@/sections/Navigation";
import { Hero } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { Footer } from "@/sections/Footer";

function App() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Atmospheric fixed smoke background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <SmokeBackground smokeColor="#1A1A1A" />
        {/* Vignette to deepen edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.85)_100%)]" />
      </div>

      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Projects />
        <Footer />
      </div>
    </div>
  );
}

export default App;
