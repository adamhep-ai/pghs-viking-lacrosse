/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        team: {
          blue: "var(--team-blue)",
          "blue-dark": "var(--team-blue-dark)",
          "blue-light": "var(--team-blue-light)",
          grey: "var(--team-grey)",
          "grey-light": "var(--team-grey-light)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
