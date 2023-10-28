/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./src/**/*.{js,jsx,ts,tsx}",
 ],
 theme: {
   extend: {
    screens: {
      'lg': '1400px',
      'xl': '1600px',
      '2xl': '2300px',
    },
     colors: {
       primary: {
         blueLight: "#27a8e0",
         blueDark: "#27265f",
       },
       secondary: {
         blueLight: "#9ed1f1",
         blueDark: "#334e9e",
         green: "#9cca3b",
       }
     },
     fontFamily: {
      "green-tea": ["Green Tea", "sans-serif"],
      "montserrat": ["Montserrat", "sans-serif"],
     }
   },
 },
 plugins: [
  require('@tailwindcss/forms')
 ],
}


