/** @type {import('tailwindcss').Config} */
export default {
  // Specifies which files Tailwind should scan for class names to generate the necessary CSS
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      // Custom colors that you defined for your project
      colors: {
        'primary-gray-border': '#DBDBDB', // Light gray for borders
        'secondary-gray-background': '#F3F3F3', // Light gray for background sections
        'primary-text-100': '#021526', // Dark text color
        'primary-text-80': 'rgba(2, 21, 38, 0.80)', // Slightly transparent version of the dark text
        'primary-text-70': 'rgba(2, 21, 38, 0.70)', // More transparent dark text
        'primary-text-50': 'rgba(2, 21, 38, 0.50)', // Half-transparent dark text
        'primary-text-40': 'rgba(2, 21, 38, 0.40)', // Lighter dark text
        'gray-text-color': '#808A93', // Standard gray text
        'secondary-text-100': '#1A1A1F', // Secondary dark text color
        'primary-orange': '#F93B1D', // Bright orange (primary color)
        'primary-orange-hover': '#DF3014', // Darker orange for hover states
        'primary-white': '#FFFFFF', // Pure white for text or backgrounds
        'valid-green': '#45A849', // Green color indicating valid status
        'invalid-red': '#F93B1D', // Red color indicating invalid status
      },

      // Custom spacing scale, adding a specific spacing size of 162px
      spacing: {
        globalPx: '162px',
      },

      // Custom box shadow definition for your project
      boxShadow: {
        'primary-shadow': '5px 5px 12px 0px rgba(2, 21, 38, 0.08)', // Light shadow with a slight blur
      },

      // Custom keyframe for a fade-in-up animation
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' }, // Initial state: hidden and moved down
          '100%': { opacity: '1', transform: 'translateY(0)' }, // Final state: fully visible and at original position
        },
      },

      fontFamily: {
        firaGO: ['FiraGO', 'sans-serif'],
        helvetica: ['"Helvetica Neue"', 'sans-serif'],
      },

      // Animation shortcut for fade-in-up
      animation: {
        'fade-in-up': 'fadeInUp 0.2s ease-in-out', // The fade-in animation lasts for 0.2s with easing
      },
    },
  },

  // You can include additional Tailwind plugins here if needed
  plugins: [],
}
