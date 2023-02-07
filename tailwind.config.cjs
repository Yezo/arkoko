/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ['"Be Vietnam Pro"'],
        secondary: ['"Noto Sans JP", sans-serif;'],
        numbers: ['"Chivo Mono", monospace;'],
      },
      colors: {
        // 20232b
        primary: "#15181D",
        secondary: "#1C1F26",
        text: "#c2c2cc",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
