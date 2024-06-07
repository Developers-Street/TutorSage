module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'xs': '400px',
        'mobile': '350px',
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
          "extra-dark": "#046304",
          dark: "#0c820c",
          medium: "#08cc36",
          light: "#4fe071",
          "extra-light": "#a1edb3"
        },
        danger: {
          "extra-dark": "#780808",
          dark: "#99121d",
          medium: "#bf1d2b",
          light: "#e7515a",
          "extra-light": "#eda8ae"
        },
      },
      fill: theme => ({
        'primary-extra-light': theme('colors.primary.extra-light'),
        'secondary-extra-light': theme('colors.secondary.extra-light'),
        'danger-extra-light': theme('colors.danger.extra-light'),
        'success-extra-light': theme('colors.success.extra-light')
      }),
      stroke: theme => ({
        'primary-dark': theme('colors.primary.dark'),
        'secondary-dark': theme('colors.secondary.dark'),
        'danger-dark': theme('colors.danger.dark'),
        'success-dark': theme('colors.success.dark')
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
      minWidth: {
        '7': "28px",
        '10': "40px",
        '14': "56px",
        '20': "80px",
        '28': "112px",
        '40': "160px",
        '50': "200px",
        '60': '240px',
        '70': '280px',
        '80': '320px',
        '90': '360px',
        '100': '400px',
        '110': '440px',
        '120': '480px'
      },
      width: {
        '8.5': '34px',
        '14': '56px',
        '1.5x': "180%"
      },
      minHeight: {
        '7': "28px",
        '10': "40px",
        '14': "56px",
        '20': "80px",
        '28': "112px",
        '40': "160px",
        '50': "200px",
        '60': '240px',
        '70': '280px',
        '80': '320px',
        '90': '360px',
        '100': '400px',
        '110': '440px',
        '120': '480px'
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
