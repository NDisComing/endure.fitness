import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger)

  // Ensure ScrollTrigger updates alongside Lenis
  nuxtApp.hook('page:transition:finish', () => {
    ScrollTrigger.refresh()
  })

  return {
    provide: {
      gsap,
      ScrollTrigger
    }
  }
})
