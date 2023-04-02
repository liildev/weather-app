/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },

      borderRadius: {
        10: "10px",
      },

      colors: {
        nav: "rgba(255, 255, 255, 0.3)",
        main: "#1f2a3f",
        purple: "#555ecc",
      },
    },
  },
  plugins: [],
};
