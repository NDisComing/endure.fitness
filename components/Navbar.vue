<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const isMobileMenuOpen = ref(false)
const route = useRoute()
const isScrolledPastHero = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleScroll = () => {
  if (route.path !== '/') {
    isScrolledPastHero.value = true
    return
  }
  // On homepage, only show navbar after scrolling past the hero (e.g. 70% of viewport height)
  const heroThreshold = typeof window !== 'undefined' ? window.innerHeight * 0.7 : 500
  isScrolledPastHero.value = window.scrollY > heroThreshold
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll)
  }
})

watch(() => route.path, () => {
  handleScroll()
})
</script>

<template>
  <header 
    class="z-50 bg-brand-dark/95 backdrop-blur-md border-b border-brand-earth/10 transition-all duration-300"
    :class="[
      route.path === '/'
        ? 'fixed top-0 inset-x-0 transform ' + (isScrolledPastHero ? 'translate-y-0 opacity-100 shadow-md pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none')
        : 'sticky top-0 translate-y-0 opacity-100'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20 gap-4">
        <!-- Logo with uploaded Logo-icon.jpeg -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="inline-flex items-center gap-3 group">
            <div class="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-brand-earth/20 group-hover:border-brand-sage transition-all bg-black flex items-center justify-center shrink-0">
              <img 
                src="/images/Logo-icon.jpeg" 
                alt="Endure Fitness" 
                class="w-full h-full object-cover"
              />
            </div>
            <div class="flex flex-col">
              <span class="font-heading font-black text-xl tracking-tighter uppercase text-brand-charcoal leading-none">
                Endure<span class="text-brand-sage">Fitness</span>
              </span>
              <span class="text-[9px] font-primary uppercase tracking-widest text-brand-muted mt-1 leading-none">
                KL & Selangor Doorstep PT
              </span>
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden xl:flex items-center space-x-5 lg:space-x-6 font-primary text-sm tracking-wider">
          <NuxtLink to="/" class="uppercase text-brand-charcoal/80 hover:text-brand-sage transition-colors py-1">Home</NuxtLink>
          <NuxtLink to="/#bio" class="uppercase text-brand-charcoal/80 hover:text-brand-sage transition-colors py-1 whitespace-nowrap">Coach Yondy</NuxtLink>
          <NuxtLink to="/#how-it-works" class="uppercase text-brand-charcoal/80 hover:text-brand-sage transition-colors py-1 whitespace-nowrap">How It Works</NuxtLink>
          <NuxtLink to="/#services" class="uppercase text-brand-charcoal/80 hover:text-brand-sage transition-colors py-1 whitespace-nowrap">Services & Rates</NuxtLink>
          <NuxtLink to="/#why-in-home" class="uppercase text-brand-charcoal/80 hover:text-brand-sage transition-colors py-1 whitespace-nowrap">Why In-Home</NuxtLink>
          <NuxtLink to="/#transformations" class="uppercase text-brand-charcoal/80 hover:text-brand-sage transition-colors py-1 whitespace-nowrap">Transformations</NuxtLink>
          <NuxtLink to="/#faq" class="uppercase text-brand-charcoal/80 hover:text-brand-sage transition-colors py-1">FAQ</NuxtLink>
        </nav>

        <!-- Right CTA -->
        <div class="hidden sm:flex items-center gap-3">
          <!-- Primary Booking CTA in Hygge Earth Tone -->
          <NuxtLink 
            to="/book" 
            class="bg-brand-earth hover:bg-brand-sage text-white px-5 py-2.5 rounded-full font-primary text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-1.5"
          >
            <Icon name="ph:calendar-check-bold" class="w-4 h-4" />
            <span>Book Assessment</span>
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <div class="xl:hidden flex items-center gap-2">
          <NuxtLink 
            to="/book" 
            class="sm:hidden bg-brand-earth text-white px-3.5 py-1.5 rounded-full font-heading font-black text-xs uppercase shadow-sm"
          >
            Book
          </NuxtLink>
          <button @click="toggleMobileMenu" class="text-brand-charcoal hover:text-brand-sage p-2" aria-label="Toggle navigation menu">
            <Icon :name="isMobileMenuOpen ? 'ph:x-bold' : 'ph:list-bold'" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div v-show="isMobileMenuOpen" class="xl:hidden bg-brand-gray border-b border-brand-earth/10 shadow-lg">
      <div class="px-4 pt-3 pb-6 space-y-2">
        <NuxtLink @click="isMobileMenuOpen = false" to="/" class="block px-3 py-2.5 text-sm font-bold uppercase text-brand-charcoal hover:text-brand-sage">Home</NuxtLink>
        <NuxtLink @click="isMobileMenuOpen = false" to="/#bio" class="block px-3 py-2.5 text-sm font-bold uppercase text-brand-charcoal hover:text-brand-sage">About Coach Yondy</NuxtLink>
        <NuxtLink @click="isMobileMenuOpen = false" to="/#how-it-works" class="block px-3 py-2.5 text-sm font-bold uppercase text-brand-charcoal hover:text-brand-sage">How It Works (3 Steps)</NuxtLink>
        <NuxtLink @click="isMobileMenuOpen = false" to="/#services" class="block px-3 py-2.5 text-sm font-bold uppercase text-brand-charcoal hover:text-brand-sage">Services & Rates</NuxtLink>
        <NuxtLink @click="isMobileMenuOpen = false" to="/#why-in-home" class="block px-3 py-2.5 text-sm font-bold uppercase text-brand-charcoal hover:text-brand-sage">Why In-Home Coaching</NuxtLink>
        <NuxtLink @click="isMobileMenuOpen = false" to="/#transformations" class="block px-3 py-2.5 text-sm font-bold uppercase text-brand-charcoal hover:text-brand-sage">Client Results</NuxtLink>
        <NuxtLink @click="isMobileMenuOpen = false" to="/#faq" class="block px-3 py-2.5 text-sm font-bold uppercase text-brand-charcoal hover:text-brand-sage">FAQ</NuxtLink>
        
        <div class="pt-4 border-t border-brand-earth/10">
          <NuxtLink 
            @click="isMobileMenuOpen = false" 
            to="/book" 
            class="block text-center bg-brand-earth hover:bg-brand-sage text-white py-3 rounded-full font-heading font-black text-xs uppercase tracking-wider shadow-md"
          >
            Book In-Home Assessment
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
