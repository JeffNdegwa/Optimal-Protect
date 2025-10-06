import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#19A0EC",
        secondary: "#FFDF26",
        blackCustom: "#131313",
        offWhite: "#f1f1f1",
        lightGray: "#f8f8f8",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [forms],
};
