import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Cal Sans", "Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        bg: "#07080f",
        "bg-2": "#0a0b16",
        card: "#0c0e1c",
        "card-border": "#1a1d35",
        "purple-brand": "#7c3aed",
        "violet-brand": "#a78bfa",
        "indigo-brand": "#6366f1",
        "blue-brand": "#3b82f6",
        "blue-light": "#93c5fd",
        muted: "#6b7280",
      },
      backgroundImage: {
        grad: "linear-gradient(135deg,#7c3aed,#6366f1,#3b82f6)",
        "grad-r": "linear-gradient(90deg,#7c3aed,#3b82f6)",
      },
      keyframes: {
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
