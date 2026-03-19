import { heroui } from "@heroui/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--heroui-background) / <alpha-value>)",
        foreground: "hsl(var(--heroui-foreground) / <alpha-value>)",
        // ── Brand pastel palette ──────────────────────────────
        brand: {
          bg:        "#F8F9FA",
          primary:   "#A0C4FF",
          secondary: "#BDB2FF",
          accent:    "#FFC6FF",
          success:   "#CAFFBF",
          warning:   "#FFD6A5",
          text:      "#2D3748",
          muted:     "#718096",
        },
        danger: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        focus: "#6366f1",
        divider: "#e2e8f0",
        content1: "#ffffff",
        content2: "#f8fafc",
        content3: "#f1f5f9",
        content4: "#e2e8f0",
      }
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#eef2ff",
            foreground: "#0f172a",
            primary: {
              50: "#eef2ff",
              100: "#e0e7ff",
              200: "#c7d2fe",
              300: "#a5b4fc",
              400: "#818cf8",
              500: "#6366f1",
              600: "#4f46e5",
              700: "#4338ca",
              800: "#3730a3",
              900: "#312e81",
              DEFAULT: "#6366f1",
              foreground: "#ffffff",
            },
            secondary: {
              50: "#f8fafc",
              100: "#f1f5f9",
              200: "#e2e8f0",
              300: "#cbd5e1",
              400: "#94a3b8",
              500: "#64748b",
              600: "#475569",
              700: "#334155",
              800: "#1e293b",
              900: "#0f172a",
              DEFAULT: "#64748b",
              foreground: "#ffffff",
            },
            success: {
              DEFAULT: "#22c55e",
              foreground: "#ffffff",
            },
            warning: {
              DEFAULT: "#f59e0b",
              foreground: "#ffffff",
            },
            danger: {
              DEFAULT: "#ef4444",
              foreground: "#ffffff",
            },
            focus: "#6366f1",
            divider: "#e2e8f0",
            content1: "#ffffff",
            content2: "#f8fafc",
            content3: "#f1f5f9",
            content4: "#e2e8f0",
          },
        },
        dark: {
          colors: {
            background: "#0f172a",
            foreground: "#eef2ff",
            primary: {
              50: "#eef2ff",
              100: "#e0e7ff",
              200: "#c7d2fe",
              300: "#a5b4fc",
              400: "#818cf8",
              500: "#6366f1",
              600: "#4f46e5",
              700: "#4338ca",
              800: "#3730a3",
              900: "#312e81",
              DEFAULT: "#4f46e5",
              foreground: "#0f172a",
            },
            secondary: {
              50: "#f8fafc",
              100: "#f1f5f9",
              200: "#e2e8f0",
              300: "#cbd5e1",
              400: "#94a3b8",
              500: "#64748b",
              600: "#475569",
              700: "#334155",
              800: "#1e293b",
              900: "#0f172a",
              DEFAULT: "#94a3b8",
              foreground: "#0f172a",
            },
            success: {
              DEFAULT: "#22c55e",
              foreground: "#0f172a",
            },
            warning: {
              DEFAULT: "#f59e0b",
              foreground: "#0f172a",
            },
            danger: {
              DEFAULT: "#ef4444",
              foreground: "#ffffff",
            },
            focus: "#818cf8",
            divider: "#334155",
            content1: "#1e293b",
            content2: "#334155",
            content3: "#475569",
            content4: "#64748b",
          },
        },
      },
    }),
  ],
};