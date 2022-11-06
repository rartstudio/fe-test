/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Brandblue: "#33A6BA",
        Branddark: "#313E4F",
        Brandgray: "#989EA7",
        BrandDarkgray: "#989EA7",
        Brandred: "#FF7B92",
        BrandGreen: "#38ba33"
      },
    },
  },
  plugins: [],
}
