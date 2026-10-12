import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0D0C",
        surface: {
          DEFAULT: "#141715",
          muted: "#181D1A",
          elevated: "#1D231F",
        },
        primary: {
          DEFAULT: "#F4F5F0",
          muted: "#D2D6CE",
        },
        secondary: {
          DEFAULT: "#A0A69F",
          muted: "#737A72",
        },
        accent: {
          DEFAULT: "#C5F467",
          hover: "#B4E654",
          subtle: "#1B2A12",
          text: "#0B0D0C",
        },
        border: {
          DEFAULT: "#222824",
          subtle: "#191E1B",
          highlight: "#303A33",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(197, 244, 103, 0.15)",
        "glow-lg": "0 0 50px -10px rgba(197, 244, 103, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
