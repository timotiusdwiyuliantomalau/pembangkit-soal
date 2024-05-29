/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        custom:['Poppins','sans-serif'],
        title:['Lilita One','sans-serif']
      },
        colors:{
          blackMore:"#252A34",
          whiteText:"#EEEEEE",
          tosca:"#08D9D6",
          redd:"#FF2E63"
        }
    },
  },
  plugins: [],
}

