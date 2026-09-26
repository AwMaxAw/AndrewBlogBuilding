import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["var(--ds-fs-xs)", { lineHeight: "var(--ds-lh-normal)" }],
        sm: ["var(--ds-fs-sm)", { lineHeight: "var(--ds-lh-normal)" }],
        base: ["var(--ds-fs-base)", { lineHeight: "var(--ds-lh-relaxed)" }],
        lg: ["var(--ds-fs-lg)", { lineHeight: "var(--ds-lh-snug)" }],
        xl: ["var(--ds-fs-xl)", { lineHeight: "var(--ds-lh-snug)" }],
        "2xl": ["var(--ds-fs-2xl)", { lineHeight: "var(--ds-lh-tight)" }],
        "3xl": ["var(--ds-fs-3xl)", { lineHeight: "var(--ds-lh-tight)" }],
        "4xl": ["var(--ds-fs-4xl)", { lineHeight: "var(--ds-lh-tight)" }],
        "5xl": ["var(--ds-fs-5xl)", { lineHeight: "var(--ds-lh-tight)" }],
      },
      borderRadius: {
        sm: "var(--ds-radius-sm)",
        md: "var(--ds-radius-md)",
        lg: "var(--ds-radius-lg)",
        xl: "var(--ds-radius-xl)",
        full: "var(--ds-radius-full)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
