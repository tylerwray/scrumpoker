module.exports = {
  purge: [
    './src/**/*.tsx'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
      extend: {
        boxShadow: {
          selected: "0px 0px 0px 3px #48BB78",
        },
        fontSize: {
          huge: "10rem",
        },
      },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
