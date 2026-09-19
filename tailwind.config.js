/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05060a",
          900: "#090b12",
          850: "#0d1018",
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
          DEFAULT: "#2f5bff",
          hover: "#4a70ff",
          ink: "#8fb0ff",
          cyan: "#67d7e8",
        },
      },
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
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
