import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  category: string;
  year: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Halcyon Optics",
    category: "Brand Identity",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Nocturne Studios",
    category: "Art Direction",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Monolith Type Co.",
    category: "Typography",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Pilgrim Coffee",
    category: "Packaging",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Vantage Film Lab",
    category: "Editorial",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Echo Architecture",
    category: "Web Design",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=80",
  },
];

export function Projects() {
  return (
    <section id="work" className="relative z-10 bg-background py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12 md:mb-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3">
              Selected Work / 2023 — 2025
            </p>
            <h2 className="brutal-text text-5xl md:text-8xl text-white">
              Archive
            </h2>
          </div>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white transition"
          >
            View All
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((p) => (
            <a
              key={p.title}
              href="#"
              className="group block"
            >
              <div className="relative overflow-hidden aspect-[4/5] mb-4 bg-smoke">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1200ms] ease-out"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-background/0 transition-colors duration-700" />
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ArrowUpRight size={16} className="text-white" />
                </div>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:translate-x-1 transition-transform duration-500">
                  {p.title}
                </h3>
                <span className="font-mono text-xs text-white/40">{p.year}</span>
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-white/50 mt-1">
                {p.category}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
