/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBg: "#DBFEB8",
        textPrimary: "#7A918D",
        hoverPrimary: "#99C2A2",
        hoverSecondary: "#C5EDAC",
        borderPrimary: "#93B1A7",
        cardBg: "#FFFFFF",
        footerBg: "#7A918D",
        footerText: "#DBFEB8",
      },
    },
  },
  plugins: [],
};
