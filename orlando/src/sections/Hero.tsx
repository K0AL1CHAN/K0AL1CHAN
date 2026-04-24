import { useEffect, useState } from "react";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";

function useResponsiveFontSize() {
  const [size, setSize] = useState(180);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setSize(56);
      else if (w < 768) setSize(88);
      else if (w < 1280) setSize(140);
      else if (w < 1600) setSize(180);
      else setSize(220);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

export function Hero() {
  const fontSize = useResponsiveFontSize();

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
        <div className="w-full h-[60vh]">
          <VaporizeTextCycle
            texts={["ORLANDO", "DEVIA", "DESIGNER"]}
            font={{
              fontFamily: '"Inter", sans-serif',
              fontSize: `${fontSize}px`,
              fontWeight: 900,
            }}
            color="rgb(245, 245, 245)"
            spread={5}
            density={6}
            animation={{
              vaporizeDuration: 2.2,
              fadeInDuration: 1,
              waitDuration: 1.4,
            }}
            direction="left-to-right"
            alignment="center"
            tag={Tag.H1}
          />
        </div>
      </div>

      <div className="absolute inset-0 z-30 pointer-events-none">
        <div className="absolute bottom-10 left-6 md:left-10 right-6 md:right-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xs">
            <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-2">
              Creative Director · Photographer
            </p>
            <p className="text-sm md:text-base text-white/80 leading-snug">
              Building visual systems and art direction for brands
              that refuse to blend in.
            </p>
          </div>
          <div className="flex items-center gap-4 font-mono text-xs text-white/60 uppercase tracking-widest">
            <span>Scroll</span>
            <span className="h-px w-16 bg-white/30" />
            <span>Discover</span>
          </div>
        </div>
      </div>
    </section>
  );
}
