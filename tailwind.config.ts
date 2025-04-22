import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", "dark"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Colores base del sistema
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        
        // Colores primarios - Paleta verde Libélulas
        primary: {
          DEFAULT: "#CFE2C3", // Color principal (verde claro)
          foreground: "#162310",
          50: "#F7F9F4",
          100: "#EAF3E5",
          200: "#CFE2C3",
          300: "#B5D2A3",
          400: "#8CB573",
          500: "#6A9750",
          600: "#547C3D",
          700: "#446233",
          800: "#394F2C",
          900: "#2F4126",
          950: "#162310",
        },
        
        // Colores secundarios - Dorado
        secondary: {
          DEFAULT: "#B5935F", // Color dorado
          foreground: "#FFFFFF",
          50: "#F9F5EF",
          100: "#F0E9D9",
          200: "#E2D3B4",
          300: "#D3BD8F",
          400: "#C4A76A",
          500: "#B5935F", // Base
          600: "#9A7A4E",
          700: "#7F623D",
          800: "#64492C",
          900: "#49311B",
          950: "#2F1E0A",
        },
        
        // Colores de estado y feedback
        destructive: {
          DEFAULT: "#E54D2E",
          foreground: "#FFFFFF",
          50: "#FDEFED",
          100: "#F9D8D3",
          200: "#F5B3A7",
          300: "#F08E7C",
          400: "#EC6950",
          500: "#E54D2E", // Base
          600: "#C73A1F",
          700: "#A32A15",
          800: "#7F1D0C",
          900: "#5C1103",
          950: "#3A0800",
        },
        
        // Colores de interfaz
        muted: {
          DEFAULT: "#F2F2F0",
          foreground: "#71716F",
          50: "#FBFBFA",
          100: "#F2F2F0",
          200: "#E5E5E2",
          300: "#D9D9D4",
          400: "#BDBDB7",
          500: "#A1A19A",
          600: "#85857D",
          700: "#71716F",
          800: "#4D4D4B",
          900: "#292928",
        },
        accent: {
          DEFAULT: "#E6EFE0",
          foreground: "#162310",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;