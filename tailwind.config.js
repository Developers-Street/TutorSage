module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'mobile': '490px',
      },
      colors: {
        secondary: {
          "extra-dark": "#827100",
          dark: "#b59f0b",
          medium: "#e3c50b",
          light: "#FFEC70",
          "extra-light": "#FFF8C2"
        },
        primary: {
          "extra-dark": "#163750",
          dark: "#014c85",
          medium: "#0e75c4",
          light: "#47AFFF",
          "extra-light": "#C2E4FF",
        },
        success: {
          dark: "#046304",
          light: "#1abc9c"
        },
        danger: {
          dark: "#87100c",
          light: "#e7515a"
        },
      },
      fill: theme => ({
        'primary-light': theme('colors.primary.light'),
      }),
      stroke: theme => ({
        'primary-dark': theme('colors.primary.dark'),
      }),
      borderRadius: {
        '4px': '0.25rem'
      },
      borderWidth: {
        '3': '3px',
        '0.5': '0.5px'
      },
      boxShadow: {
        primary: '0 10px 20px -10px #4361ee',
        secondary: '0 10px 20px -10px #e3c50b',
        success: '0 10px 20px -10px #046304',
        danger: '0 10px 20px -10px #87100c',
        gray: '5px 5px 10px gray'
      },
      maxWidth: {
        '26rem': '26rem'
      },
      width: {
        '8.5': '34px',
        '14': '56px',
        '1.5x': "180%"
      },
      height: {
        '4.5': '18px',
        '14': '56px',
        '1.5x': "180%"
      },
      margin: {
        '26': '104px'
      },
      fontSize: {
        '2xs': '0.5rem'
      },
      inset: {
        '22': '5.5rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
