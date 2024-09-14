module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'poppins': ["poppins","sans-serif"],
      },
      backgroundColor:{
        'button-green':'#1ed760',
        "navbar-black":"#121212",
        "songsdeck-black":"#272829",
      },
      height:{
        "1/10":"10%",
        "9/10":"90%",
      },
      textColor:{
        'green':'#1ed760'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
