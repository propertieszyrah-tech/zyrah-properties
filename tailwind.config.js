/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Trust teal/green — the core brand color (land, calm, premium)
        brand: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0F766E',
          700: '#115E59',
          800: '#134E4A',
          900: '#0C3B38',
        },
        // Warm earthy gold — the "strong accent" for highlights & premium touches
        gold: {
          300: '#E8CC8F',
          400: '#D9B266',
          500: '#C2884E',
          600: '#A66E3A',
          700: '#855730',
        },
        cream: '#FAFAF7',
        ink: '#13211E',
      },
      fontFamily: {
        // Cinzel = luxury display (brand + big headings); Plus Jakarta Sans = clean UI/body
        display: ['Cinzel', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(19, 33, 30, 0.06), 0 8px 24px -8px rgba(19, 33, 30, 0.12)',
        'card-hover': '0 12px 32px -8px rgba(15, 118, 110, 0.28)',
        cta: '0 8px 20px -6px rgba(15, 118, 110, 0.45)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.12) translate(-1.5%, -1.5%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite',
        kenburns: 'kenburns 18s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}
