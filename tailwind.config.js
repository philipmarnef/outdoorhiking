module.exports = {
  purge: {
    content: [
    './html/site/**/*.php',
    ],
    options: {
      safelist: [
        // include classes used in panel textinputs here
      ],
    },
  },
  theme: {
    colors: {
      red: "#f24343",
      green: "#2ee6a8",
      white: "#fff",
      grey: "#e6e7e8",
      black: "#282829",
    },
    fontFamily: {
      sans: ['helvetica', 'arial', 'sans-serif'],
    },
    fontSize: {
      sm: ['0.75rem', '1.08rem'],
      base: ['1.125rem', '1.375rem'],
      lg: ['1.6875rem', '2.0625rem'],
      xl: ['2.25rem', '2.75rem'],
    },
    lineHeight: {
      none: '0.9',
      tight: '1',
      snug: '1.112',
      normal: '1.225',
      relaxed: '1.337',
      loose: '1.5',
      '3': '.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
      '9': '2.25rem',
      '10': '2.5rem',
    },
    zIndex: {
      '-100': '-100',
      '-10': '-10',
      '-1': '-1',
      '0': '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5',
      '10': '10',
      '20': '20',
      '30': '30',
      '40': '40',
      '50': '50',
      '100': '100',
      'auto': 'auto',
    },
    extend: {
      screens: {
        '2xl': '1400px',
        'landscape': {'raw': '(orientation: landscape)'},
      },  
      spacing: {
        '80': '20rem',
        '96': '24rem',
        '128': '32rem',
      },
      height: {
        'screen': 'calc(100 * var(--vh, 1vh))',
      }
    },
  },
  variants: {},
  plugins: [],
}
