/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '1px 1px 5px #dcdec7, -5px 5px 10px #ffffff;',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
