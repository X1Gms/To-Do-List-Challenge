/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'lobster':['Lobster']
    },
    screens:{
      xs:"325px",
      sm:"576px",
      md:"768px",
      lg:"992px",
      xl:"1200px",
      xxl:"1400px"
    }
  },
  plugins: [],
}

