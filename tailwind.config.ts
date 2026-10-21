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
        background: "rgb(var(--background) / <alpha-value>)",
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          muted: "rgb(var(--surface-muted) / <alpha-value>)",
          elevated: "rgb(var(--surface-elevated) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "rgb(var(--text-primary) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--text-secondary) / <alpha-value>)",
          muted: "rgb(var(--text-secondary-muted) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          hover: "rgb(var(--accent-hover) / <alpha-value>)",
          solid: "rgb(var(--accent-solid) / <alpha-value>)",
          "solid-hover": "rgb(var(--accent-solid-hover) / <alpha-value>)",
          subtle: "rgb(var(--accent-subtle) / <alpha-value>)",
          text: "rgb(var(--accent-text) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--border) / <alpha-value>)",
          subtle: "rgb(var(--border-subtle) / <alpha-value>)",
          highlight: "rgb(var(--border-highlight) / <alpha-value>)",
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
        glow: "0 0 35px -5px rgb(var(--accent) / 0.15)",
        "glow-lg": "0 0 50px -10px rgb(var(--accent) / 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
