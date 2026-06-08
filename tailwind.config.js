/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f2f7ff',
          100: '#e3efff',
          200: '#bfd8ff',
          300: '#93bbff',
          400: '#6093ff',
          500: '#3d6df4',
          600: '#284fd8',
          700: '#213fb0',
          800: '#21368b',
          900: '#22326d',
        },
        accent: {
          50: '#effcf6',
          100: '#d9f8e7',
          500: '#16a34a',
          600: '#15803d',
        },
      },
      boxShadow: {
        soft: '0 18px 45px rgba(15, 23, 42, 0.08)',
        panel: '0 10px 30px rgba(15, 23, 42, 0.07)',
      },
      backgroundImage: {
        mesh:
          'radial-gradient(circle at top left, rgba(61,109,244,0.14), transparent 35%), radial-gradient(circle at bottom right, rgba(22,163,74,0.12), transparent 32%), linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
      },
    },
  },
  plugins: [],
};
