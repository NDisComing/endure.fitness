// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  ssr: true,
  routeRules: {
    '/': { prerender: true },
    '/book': { prerender: true },
    '/api/**': { cors: true },
    '/client/**': { ssr: false },
    '/coach/**': { ssr: false }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vite-pwa/nuxt'
  ],

  pwa: {
    manifest: {
      name: 'Endure Fitness Coaching Portal',
      short_name: 'EndurePT',
      description: 'Elite coaching portal, AI nutrition scanner, and automated booking engine.',
      theme_color: '#0a0a0a',
      background_color: '#0a0a0a',
      display: 'standalone',
      orientation: 'portrait',
      icons: [
        {
          src: '/icons/icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/icons/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/'
    },
    client: {
      installPrompt: true
    },
    devOptions: {
      enabled: false
    }
  },

  runtimeConfig: {
    geminiApiKey: process.env.GEMINI_API_KEY || '',
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    public: {
      supabaseUrl: process.env.SUPABASE_URL || '',
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY || ''
    }
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      title: 'EndureFitness | Elite Personal Training & PWA Portal',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
        { hid: 'description', name: 'description', content: 'EndureFitness - Elite personal training, AI nutrition scanning, and automated session booking. Push your limits and endure the grind.' },
        { name: 'theme-color', content: '#0a0a0a' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/icons/icon-192.png' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  }
})
