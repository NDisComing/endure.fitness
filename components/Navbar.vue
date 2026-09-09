<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur-md border-b border-brand-charcoal/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="inline-flex items-center gap-2.5 group">
            <div class="w-10 h-10 rounded-xl bg-brand-gray border border-brand-accent/40 flex items-center justify-center group-hover:border-brand-accent shadow-sm transition-all">
              <Icon name="ph:barbell-fill" class="w-6 h-6 text-brand-accent" />
            </div>
            <span class="font-heading font-black text-2xl tracking-tighter uppercase text-brand-charcoal">
              Endure<span class="text-brand-accent">Fitness</span>
            </span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center space-x-7">
          <NuxtLink to="/" class="text-xs uppercase font-bold tracking-wider text-brand-charcoal/80 hover:text-brand-accent transition-colors">Home</NuxtLink>
          <NuxtLink to="/#bio" class="text-xs uppercase font-bold tracking-wider text-brand-charcoal/80 hover:text-brand-accent transition-colors">Trainer Bio</NuxtLink>
          <NuxtLink to="/#transformations" class="text-xs uppercase font-bold tracking-wider text-brand-charcoal/80 hover:text-brand-accent transition-colors">Results</NuxtLink>
          <NuxtLink to="/#programs" class="text-xs uppercase font-bold tracking-wider text-brand-charcoal/80 hover:text-brand-accent transition-colors">Programs</NuxtLink>
          <NuxtLink to="/#faq" class="text-xs uppercase font-bold tracking-wider text-brand-charcoal/80 hover:text-brand-accent transition-colors">FAQ</NuxtLink>
        </nav>

        <!-- Right Portals & CTA -->
        <div class="hidden sm:flex items-center gap-3">
          <!-- Direct App Portals -->
          <NuxtLink 
            to="/client" 
            class="text-xs font-bold text-brand-charcoal hover:bg-brand-gray px-3 py-2 rounded-lg border border-brand-charcoal/15 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Icon name="ph:device-mobile-camera-bold" class="w-4 h-4 text-brand-accent" />
            <span>Client PWA</span>
          </NuxtLink>

          <NuxtLink 
            to="/coach" 
            class="text-xs font-bold text-brand-charcoal hover:bg-brand-gray px-3 py-2 rounded-lg border border-brand-charcoal/15 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Icon name="ph:shield-star-bold" class="w-4 h-4 text-brand-accent" />
            <span>Coach Admin</span>
          </NuxtLink>

          <!-- Primary Booking CTA -->
          <NuxtLink 
            to="/book" 
            class="bg-brand-accent text-white px-5 py-2.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider hover:bg-brand-charcoal transition-all shadow-[0_2px_15px_rgba(250,129,18,0.35)] active:scale-95 flex items-center gap-1.5"
          >
            <Icon name="ph:calendar-check-bold" class="w-4 h-4" />
            <span>Book Assessment</span>
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <div class="lg:hidden flex items-center gap-2">
          <NuxtLink 
            to="/book" 
            class="sm:hidden bg-brand-accent text-white px-3 py-1.5 rounded-lg font-heading font-black text-xs uppercase shadow-sm"
          >
            Book
          </NuxtLink>
          <button @click="toggleMobileMenu" class="text-brand-charcoal hover:text-brand-accent p-2">
            <Icon :name="isMobileMenuOpen ? 'ph:x-bold' : 'ph:list-bold'" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div v-show="isMobileMenuOpen" class="lg:hidden bg-brand-gray border-b border-brand-charcoal/10 shadow-lg">
      <div class="px-4 pt-3 pb-6 space-y-2">
        <NuxtLink @click="isMobileMenuOpen = false" to="/" class="block px-3 py-2.5 text-sm font-bold uppercase text-brand-charcoal hover:text-brand-accent">Home</NuxtLink>
        <NuxtLink @click="isMobileMenuOpen = false" to="/#bio" class="block px-3 py-2.5 text-sm font-bold uppercase text-brand-charcoal hover:text-brand-accent">Trainer Bio & Credentials</NuxtLink>
        <NuxtLink @click="isMobileMenuOpen = false" to="/#transformations" class="block px-3 py-2.5 text-sm font-bold uppercase text-brand-charcoal hover:text-brand-accent">Transformations Slider</NuxtLink>
        <NuxtLink @click="isMobileMenuOpen = false" to="/#programs" class="block px-3 py-2.5 text-sm font-bold uppercase text-brand-charcoal hover:text-brand-accent">Training Programs</NuxtLink>
        <NuxtLink @click="isMobileMenuOpen = false" to="/#faq" class="block px-3 py-2.5 text-sm font-bold uppercase text-brand-charcoal hover:text-brand-accent">FAQ</NuxtLink>
        
        <div class="pt-4 border-t border-brand-charcoal/10 grid grid-cols-2 gap-2">
          <NuxtLink 
            @click="isMobileMenuOpen = false" 
            to="/client" 
            class="text-center py-2.5 px-3 rounded-lg bg-brand-dark border border-brand-charcoal/15 text-xs font-bold text-brand-charcoal hover:bg-brand-gray"
          >
            📱 Client PWA
          </NuxtLink>
          <NuxtLink 
            @click="isMobileMenuOpen = false" 
            to="/coach" 
            class="text-center py-2.5 px-3 rounded-lg bg-brand-dark border border-brand-charcoal/15 text-xs font-bold text-brand-charcoal hover:bg-brand-gray"
          >
            👔 Coach Portal
          </NuxtLink>
        </div>

        <div class="pt-2">
          <NuxtLink 
            @click="isMobileMenuOpen = false" 
            to="/book" 
            class="block text-center bg-brand-accent text-white py-3 rounded-xl font-heading font-black text-xs uppercase tracking-wider shadow-md"
          >
            Book Free Assessment Slot
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
