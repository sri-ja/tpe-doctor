/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // blue-500
          light: '#60A5FA', // blue-400
          dark: '#2563EB',  // blue-600
        },
        secondary: {
          DEFAULT: '#14B8A6', // teal-500
           light: '#A7F3D0', // emerald-200 (Lighter Teal/Green)
           DEFAULT: '#14B8A6', // teal-500
           dark: '#0D9488',  // teal-600
          },
          accent: {
           light: '#ECFCCB', // lime-100 (Lighter Green/Lime)
          },
          gradient: { // Define specific gradient colors
            start: '#A7F3D0', // emerald-200
            end: '#ECFCCB',   // lime-100
          },
          background: '#F9FAFB', // gray-50 (Slightly lighter than gray-100)
          surface: '#FFFFFF',    // white
         'text-primary': '#1F2937', // gray-800
        'text-secondary': '#6B7280', // gray-500
        border: '#D1D5DB',      // gray-300
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Using Inter as a clean, modern font
      },
    },
  },
  plugins: [],
}
