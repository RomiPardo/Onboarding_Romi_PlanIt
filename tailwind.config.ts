import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "393px",
        md: "1250px",
      },
      gradientColorStops: {
        "blue-300": "#0f58b7",
        "blue-500": "#62d9ff",
      },
      colors: {
        black: "#1C1C1C",
        gray: "#7D7D7D80",
        "blue-300": "#0F58B7",
      },
      boxShadow: {
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
    },
  },
  plugins: [],
} satisfies Config;
