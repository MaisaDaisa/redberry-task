/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-gray-border': '#DBDBDB',
        'secondary-gray-background': '#F3F3F3',
        'primary-text-100': '#021526',
        'primary-text-80': 'rgba(2, 21, 38, 0.80)',
        'primary-text-70': 'rgba(2, 21, 38, 0.70)',
        'primary-text-50': 'rgba(2, 21, 38, 0.50)',
        'primary-text-40': 'rgba(2, 21, 38, 0.40)',
        'gray-text-color': '#808A93',
        'secondary-text-100': '#1A1A1F',
        'primary-orange': '#F93B1D',
        'primary-orange-hover': '#DF3014',
        'primary-white': '#FFFFFF',
        'valid-green': '#45A849',
        'invalid-red': '#F93B1D',
      },
      spacing: {
        /*
				can be changed later by Devs keep in mind the design states 162px,
				however the slider makes the main page smaller 
				*/
        globalPx: '161px',
      },
      boxShadow: {
        'primary-shadow': '5px 5px 12px 0px rgba(2, 21, 38, 0.08)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.2s ease-in-out',
      },
    },
  },
  plugins: [],
}
