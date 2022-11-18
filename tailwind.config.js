/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#041c32",
        secondary: "#04293a",
        tertiary: "#064663",
        quaternary: "#ecb365",
      },
    },
    plugins: [],
  },
};
