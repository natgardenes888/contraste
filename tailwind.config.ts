import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#151412",
        paper: "#fbfaf7",
        graphite: "#2f3437",
        line: "#e7e2d9",
        sage: "#6d8a72",
        cobalt: "#3657d8",
        coral: "#df755f",
        gold: "#c29b3b"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(24, 24, 20, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
