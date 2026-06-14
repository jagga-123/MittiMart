/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-brown': '#5c3d2e',
        'brand-orange': '#d4622a',
        'brand-cream': '#faf6f1',
        'brand-green': '#4a7c59',
        'brand-dark': '#1a1a1a',
        'brand-muted': '#6b6b6b',
        'brand-card': 'rgba(255, 252, 248, 0.82)',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'Poppins', 'sans-serif'],
      },
      borderRadius: {
        'xl': '28px',
        'lg': '22px',
        'md': '16px',
        'sm': '12px',
      },
      boxShadow: {
        'premium': '0 24px 60px rgba(52, 28, 17, 0.15)',
      }
    },
  },
  plugins: [],
}
