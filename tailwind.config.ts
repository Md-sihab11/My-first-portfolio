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
  			background: 'rgb(var(--background) / <alpha-value>)',
  			foreground: 'rgb(var(--text-primary) / <alpha-value>)',
  			surface: {
  				DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
  				muted: 'rgb(var(--surface-muted) / <alpha-value>)',
  				elevated: 'rgb(var(--surface-elevated) / <alpha-value>)'
  			},
  			card: {
  				DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
  				foreground: 'rgb(var(--text-primary) / <alpha-value>)'
  			},
  			popover: {
  				DEFAULT: 'rgb(var(--surface-elevated) / <alpha-value>)',
  				foreground: 'rgb(var(--text-primary) / <alpha-value>)'
  			},
  			muted: {
  				DEFAULT: 'rgb(var(--surface-muted) / <alpha-value>)',
  				foreground: 'rgb(var(--text-secondary) / <alpha-value>)'
  			},
  			primary: {
  				DEFAULT: 'rgb(var(--text-primary) / <alpha-value>)',
  				foreground: 'rgb(var(--background) / <alpha-value>)',
  				muted: 'rgb(var(--text-muted) / <alpha-value>)'
  			},
  			secondary: {
  				DEFAULT: 'rgb(var(--text-secondary) / <alpha-value>)',
  				foreground: 'rgb(var(--text-primary) / <alpha-value>)',
  				muted: 'rgb(var(--text-secondary-muted) / <alpha-value>)'
  			},
  			accent: {
  				DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
  				foreground: 'rgb(var(--accent-text) / <alpha-value>)',
  				hover: 'rgb(var(--accent-hover) / <alpha-value>)',
  				solid: 'rgb(var(--accent-solid) / <alpha-value>)',
  				'solid-hover': 'rgb(var(--accent-solid-hover) / <alpha-value>)',
  				subtle: 'rgb(var(--accent-subtle) / <alpha-value>)',
  				text: 'rgb(var(--accent-text) / <alpha-value>)'
  			},
  			border: {
  				DEFAULT: 'rgb(var(--border) / <alpha-value>)',
  				subtle: 'rgb(var(--border-subtle) / <alpha-value>)',
  				highlight: 'rgb(var(--border-highlight) / <alpha-value>)'
  			},
  			input: 'rgb(var(--border) / <alpha-value>)',
  			ring: 'rgb(var(--accent) / <alpha-value>)',
  			destructive: {
  				DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
  				foreground: 'rgb(var(--destructive-foreground) / <alpha-value>)'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-sans)',
  				'system-ui',
  				'sans-serif'
  			],
  			heading: [
  				'var(--font-sans)',
  				'system-ui',
  				'sans-serif'
  			],
  			display: [
  				'var(--font-display)',
  				'var(--font-sans)',
  				'sans-serif'
  			],
  			mono: [
  				'var(--font-mono)',
  				'monospace'
  			]
  		},
  		borderRadius: {
  			lg: '0.75rem',
  			md: '0.5rem',
  			sm: '0.25rem'
  		},
  		boxShadow: {
  			glow: '0 0 35px -5px rgb(var(--accent) / 0.15)',
  			'glow-lg': '0 0 50px -10px rgb(var(--accent) / 0.25)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [],
};

export default config;
