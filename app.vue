<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNuxtApp } from '#app'
import { useEndureStore } from '~/composables/useEndureStore'

const route = useRoute()
const router = useRouter()
const cursor = ref<HTMLElement | null>(null)

onMounted(() => {
  const nuxtApp = useNuxtApp()
  const $gsap = nuxtApp.$gsap

  // Desktop custom cursor logic
  if (window.matchMedia('(pointer: fine)').matches && $gsap) {
    window.addEventListener('mousemove', (e) => {
      if (cursor.value) {
        $gsap.to(cursor.value, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: 'power2.out'
        })
      }
    })

    const attachHover = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .magnetic')
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          if (cursor.value) cursor.value.classList.add('cursor-hover')
        })
        el.addEventListener('mouseleave', () => {
          if (cursor.value) cursor.value.classList.remove('cursor-hover')
        })
      })
    }

    attachHover()
  }
})
</script>

<template>
  <div class="min-h-screen bg-brand-dark text-brand-charcoal font-sans flex flex-col selection:bg-brand-accent selection:text-white">
    <!-- Subtle Custom Cursor for Desktop -->
    <div ref="cursor" class="custom-cursor hidden md:block"></div>

    <!-- Layout and Page Router -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nata+Sans:wght@100..900&family=Special+Gothic+Condensed+One&display=swap');

/* Font Smoothing & Baseline */
html, body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: 'Nata Sans', sans-serif;
}

/* Custom Font Utilities: Special Gothic Condensed One (Primary) & Nata Sans (Info) */
.font-primary,
.font-heading,
.font-special,
.font-bogle,
.font-hegarty,
.font-bartle {
  font-family: 'Special Gothic Condensed One', sans-serif;
  letter-spacing: 0.02em;
}

.font-info,
.font-body,
.font-sans {
  font-family: 'Nata Sans', sans-serif;
}

/* Custom Cursor Styling */
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  background-color: #22396F;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  opacity: 0.9;
  box-shadow: 0 0 12px rgba(252, 241, 208, 0.85);
  transition: width 0.2s, height 0.2s, background-color 0.2s;
}

.custom-cursor.cursor-hover {
  width: 38px;
  height: 38px;
  background-color: rgba(34, 57, 111, 0.2);
  border: 2px solid #010736;
}

/* Page & Layout Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
