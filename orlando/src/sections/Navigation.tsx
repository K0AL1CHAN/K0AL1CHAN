import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-6 mix-blend-difference">
        <span className="font-mono text-xs tracking-widest text-white/80">
          OD/2026
        </span>
        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-3 text-white/90 hover:text-white transition"
        >
          <span className="font-mono text-xs tracking-widest hidden sm:inline">
            {open ? "CLOSE" : "MENU"}
          </span>
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </header>

      <nav
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-xl transition-all duration-500",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="h-full flex flex-col justify-center px-10 md:px-20">
          <ul className="space-y-6 md:space-y-10">
            {[
              ["01", "WORK"],
              ["02", "ABOUT"],
              ["03", "PROCESS"],
              ["04", "CONTACT"],
            ].map(([num, label]) => (
              <li key={num}>
                <a
                  href={`#${label.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-6 text-white/80 hover:text-white transition"
                >
                  <span className="font-mono text-xs md:text-sm text-white/40">
                    {num}
                  </span>
                  <span className="brutal-text text-5xl md:text-8xl lg:text-9xl group-hover:translate-x-4 transition-transform duration-500">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
