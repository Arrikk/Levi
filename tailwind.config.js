module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        leviplatte: 'hsla(39, 100%, 50%, 1)',
        leviplatteDark: '#e29300',
      },
    },

    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
    },

    backgroundImage: {
      'profile-bg': "url('/profile-banner.jpg')",
      spinner: "url('/spinner.svg')",
    },
  },

  screens: {
    mobile: '375px',
  },
  plugins: [require('daisyui')],
  darkMode: 'class',
}
