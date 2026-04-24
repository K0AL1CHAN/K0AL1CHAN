/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#F5F5F5",
        smoke: "#1A1A1A",
        muted: "#8A8A8A",
        accent: "#FFFFFF",
      },
      fontFamily: {
        display: ['"Clash Display"', '"Inter"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        brutal: "-0.04em",
      },
    },
  },
  plugins: [],
};
