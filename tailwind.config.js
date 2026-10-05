/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        // Base canvas & surfaces (from client Hygge design palette)
        'brand-dark': '#FAF8F3',     // Base warm linen cream canvas
        'brand-gray': '#EFECE4',     // Soft card & panel background
        'brand-cream': '#F5F2EA',    // Subtle warm accent surface
        
        // Exact client swatches:
        'brand-sage': '#8C9D79',     // #8c9d79 (Olive Sage green)
        'brand-earth': '#755852',    // #755852 (Earthy chestnut brown)
        'brand-sand': '#E2C694',     // #e2c694 (Warm golden wheat sand)
        
        // Semantic aliases
        'brand-accent': '#755852',   // Primary earthy CTA button & accent
        'brand-primary': '#8C9D79',  // Primary wellness & active indicator
        'brand-charcoal': '#362C28', // Deep espresso brown for headings & text
        'brand-muted': '#685A55',    // Secondary body text
        'brand-orange': '#755852',   // Fallback for legacy orange class
      },
      fontFamily: {
        heading: ['"Special Gothic Condensed One"', 'sans-serif'],
        primary: ['"Special Gothic Condensed One"', 'sans-serif'],
        display: ['"Special Gothic Condensed One"', 'sans-serif'],
        special: ['"Special Gothic Condensed One"', 'sans-serif'],
        sans: ['"Nata Sans"', 'sans-serif'],
        info: ['"Nata Sans"', 'sans-serif'],
        body: ['"Nata Sans"', 'sans-serif'],
        // Legacy class aliases mapped to primary / info
        bogle: ['"Special Gothic Condensed One"', 'sans-serif'],
        hegarty: ['"Special Gothic Condensed One"', 'sans-serif'],
        bartle: ['"Special Gothic Condensed One"', 'sans-serif'],
        accent: ['"Special Gothic Condensed One"', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulseSlow 6s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.7, transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(140,157,121,0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(140,157,121,0.5)' },
        }
      }
    },
  },
  plugins: [],
}
