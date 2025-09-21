/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        gray: {
           50: "rgba(255,255,255,0.5)",
          100: "#eeeeef",
          200: "#e6e9ed",
          300:"#f3f3f5",
          600: "#95989c"
        },
        purple: {
          100: "#efecf6",
          200: "#e0e6fe",
          500: "#9492db",
          600: "#5046e4"
          
        }

      }
    },
  },
  plugins: [],
}

