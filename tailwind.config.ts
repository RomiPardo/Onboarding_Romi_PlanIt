/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xxxxs: "383px",
        xxxs: "520px",
        xxs: "700px",
        xs: "880px",
        sm: "1050px",
        ms: "1190px",
        md: "1250px",
        lg: "1430px",
      },
      gradientColorStops: {
        "blue-300": "#0f58b7",
        "blue-500": "#62d9ff",
      },
      boxShadow: {
        xs: "0px 1.7px 17px 0px rgba(0, 0, 0, 0.04)",
        sm: "2px 2px 10px 0px rgba(0, 0, 0, 0.25)",
        md: "2px 2px 10px 10px rgba(0, 0, 0, 0.05)",
        lg: "5px 5px 30px 0px rgba(0, 0, 0, 0.10)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      width: {
        "11/12": "90%",
        "5/4": "125%",
      },
      padding: {
        "17": "68px",
        "34": "134px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        black: "#1C1C1C",
        "dark-gray": "#7D7D7D80",
        "blue-300": "#0F58B7",
        "light-blue": "#9BC7FF",
        "light-gray": "#FBFBFB",
        gray: "#7D7D7D",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
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
