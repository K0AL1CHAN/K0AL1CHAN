import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ExplodedCamera } from "@/components/three/ExplodedCamera";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll("[data-char]");
      tl.from(chars, {
        yPercent: 110,
        duration: 1.2,
        stagger: 0.04,
      });
    }
    if (subRef.current) {
      tl.from(
        subRef.current.children,
        { opacity: 0, y: 20, duration: 1, stagger: 0.08 },
        "-=0.6"
      );
    }
  }, []);

  const renderBrutalText = (text: string) =>
    text.split("").map((c, i) => (
      <span
        key={`${c}-${i}`}
        className="inline-block overflow-hidden leading-none"
      >
        <span data-char className="inline-block">
          {c === " " ? " " : c}
        </span>
      </span>
    ));

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layer 1: Brand typography behind 3D */}
      <h1
        ref={titleRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 brutal-text text-white/90"
        aria-label="Orlando Devia"
      >
        <span className="text-[18vw] md:text-[15vw] leading-[0.85]">
          {renderBrutalText("ORLANDO")}
        </span>
        <span className="text-[18vw] md:text-[15vw] leading-[0.85] text-white/40">
          {renderBrutalText("DEVIA")}
        </span>
      </h1>

      {/* Layer 2: 3D camera on top of text */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <ExplodedCamera />
      </div>

      {/* Layer 3: UI overlay */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <div
          ref={subRef}
          className="absolute bottom-10 left-6 md:left-10 right-6 md:right-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
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
            <span>Explode</span>
          </div>
        </div>
      </div>
    </section>
  );
}
