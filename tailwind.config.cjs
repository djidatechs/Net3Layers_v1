/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors : {
         'midnight' : '#121212',
         'darknight' : '#051e2e',
         'night' : '#06283D',
         'evening' : '#1363DF',
         'morning' : '#47B5FF',
         'light' : '#DFF6FF',
      },
      minWidth: {
        'desktop-config': '800px',
      },
      minHeight: {
        'desktop-config': '600px',
      },
    },
  },
  daisyui: {
    themes: false ,
  },
  plugins: [require('tailwind-scrollbar'),require("daisyui")],
}
// #06283D
// #1363DF
// #47B5FF
// #DFF6FF
