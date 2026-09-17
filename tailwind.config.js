/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07080c",
          900: "#0b0c11",
          850: "#0e1016",
        },
        fog: {
          50: "#f3f4f8",
          100: "#d5d8e0",
          200: "#c3c8d4",
          300: "#b4b9c6",
          400: "#9ba1af",
          500: "#7e8494",
          600: "#5f6579",
          700: "#4a4f5e",
        },
        accent: {
          DEFAULT: "#2541d8",
          hover: "#3050e6",
          ink: "#8ea2ff",
        },
      },
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", '"Times New Roman"', "serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
