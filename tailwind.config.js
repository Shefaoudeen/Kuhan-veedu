/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        aboreto: ["Aboreto", "sans-serif"],
        garet: ["Garet", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      backgroundColor: {
        primaryBlack: "#0d0d0d",
      },
    },
  },
  plugins: [],
};
