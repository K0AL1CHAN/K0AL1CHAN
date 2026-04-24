import { Instagram, Mail, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 bg-background border-t border-white/10 py-16 md:py-24 px-6 md:px-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3">
              Let's build something
            </p>
            <h2 className="brutal-text text-5xl md:text-7xl lg:text-8xl text-white">
              Get in
              <br />
              touch.
            </h2>
          </div>

          <div className="md:col-span-5 space-y-6">
            <a
              href="mailto:hello@orlandodevia.com"
              className="group flex items-center gap-3 text-white/80 hover:text-white transition"
            >
              <Mail size={18} strokeWidth={1.5} />
              <span className="text-lg md:text-xl underline-offset-4 group-hover:underline">
                hello@orlandodevia.com
              </span>
            </a>

            <div className="flex items-center gap-5 pt-2">
              {[
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Github, href: "#", label: "GitHub" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 md:gap-0 md:items-center md:justify-between font-mono text-xs uppercase tracking-widest text-white/40">
          <span>© 2026 Orlando Devia. All rights reserved.</span>
          <span>Bogotá / Worldwide</span>
        </div>
      </div>
    </footer>
  );
}
