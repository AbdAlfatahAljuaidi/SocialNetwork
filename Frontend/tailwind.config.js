/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#1D4ED8', // تخصيص اللون الأزرق المخصص
      },
    },
  },
  plugins: [],
}
