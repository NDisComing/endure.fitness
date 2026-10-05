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
        // Base canvas & surfaces (Luxury Athletic Navy & Vanilla Palette)
        'brand-dark': '#FCF1D0',     // Warm vanilla champagne canvas
        'brand-gray': '#F3E5BE',     // Rich vanilla card & panel background
        'brand-cream': '#FFFFFF',    // Crisp white surface pop
        
        // Exact client swatches:
        'brand-sage': '#22396F',     // #22396F (Steel Athletic Blue - active accents, badges, checkmarks)
        'brand-earth': '#010736',    // #010736 (Obsidian Deep Navy - primary CTA buttons & deep surfaces)
        'brand-sand': '#FCF1D0',     // #FCF1D0 (Warm Vanilla Champagne Sand - hero CTA & highlights)
        
        // Semantic aliases
        'brand-accent': '#22396F',   // Steel Athletic Blue
        'brand-primary': '#0D1C42',  // Midnight Marine Blue
        'brand-charcoal': '#010736', // Obsidian Deep Navy for headings & text
        'brand-muted': '#48577D',    // Slate navy-tinted secondary text
        'brand-orange': '#22396F',   // Fallback for legacy class
        
        // Direct named swatches
        'brand-obsidian': '#010736',
        'brand-marine': '#0D1C42',
        'brand-steel': '#22396F',
        'brand-vanilla': '#FCF1D0',
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
          '0%': { boxShadow: '0 0 5px rgba(34,57,111,0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(34,57,111,0.45)' },
        }
      }
    },
  },
  plugins: [],
}
