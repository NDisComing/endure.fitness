<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNuxtApp } from '#app'
import { useEndureStore } from '~/composables/useEndureStore'

const route = useRoute()
const router = useRouter()
const store = useEndureStore()
const cursor = ref<HTMLElement | null>(null)
const showQuickSwitcher = ref(false)

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

const navigateToView = (path: string, role?: 'client' | 'coach') => {
  if (role) {
    store.switchRole(role)
  }
  router.push(path)
  showQuickSwitcher.value = false
}
</script>

<template>
  <div class="min-h-screen bg-brand-dark text-white font-sans flex flex-col">
    <!-- Subtle Custom Cursor for Desktop -->
    <div ref="cursor" class="custom-cursor hidden md:block"></div>

    <!-- Layout and Page Router -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Floating Platform Quick-Switcher (Bottom Right) -->
    <div class="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50">
      <div class="relative">
        <button
          @click="showQuickSwitcher = !showQuickSwitcher"
          class="w-12 h-12 rounded-full bg-brand-dark border-2 border-brand-accent text-brand-accent shadow-[0_0_20px_rgba(204,255,0,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300"
          title="Switch Platform Space"
        >
          <Icon name="ph:arrows-left-right-bold" class="w-6 h-6" />
        </button>

        <div
          v-if="showQuickSwitcher"
          class="absolute bottom-14 right-0 w-64 bg-brand-gray border border-white/20 rounded-2xl p-3 shadow-2xl space-y-2 backdrop-blur-xl animate-fade-in-up"
        >
          <div class="flex items-center justify-between pb-2 border-b border-white/10 px-1">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-400">Endure Spaces</span>
            <button @click="showQuickSwitcher = false" class="text-gray-400 hover:text-white">
              <Icon name="ph:x-bold" class="w-4 h-4" />
            </button>
          </div>

          <button
            @click="navigateToView('/')"
            class="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors"
            :class="route.path === '/' ? 'bg-brand-accent text-black font-bold' : 'text-gray-300 hover:bg-white/10'"
          >
            <Icon name="ph:globe-bold" class="w-4 h-4" />
            <div>
              <p class="font-bold">Public Marketing</p>
              <p class="text-[10px] opacity-75">Landing page & Bio</p>
            </div>
          </button>

          <button
            @click="navigateToView('/book')"
            class="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors"
            :class="route.path === '/book' ? 'bg-brand-accent text-black font-bold' : 'text-gray-300 hover:bg-white/10'"
          >
            <Icon name="ph:calendar-check-bold" class="w-4 h-4" />
            <div>
              <p class="font-bold">Booking Engine</p>
              <p class="text-[10px] opacity-75">Slot picker & Intake</p>
            </div>
          </button>

          <button
            @click="navigateToView('/client', 'client')"
            class="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors"
            :class="route.path.startsWith('/client') ? 'bg-brand-accent text-black font-bold' : 'text-gray-300 hover:bg-white/10'"
          >
            <Icon name="ph:device-mobile-camera-bold" class="w-4 h-4" />
            <div>
              <p class="font-bold">Client PWA Portal</p>
              <p class="text-[10px] opacity-75">AI food scanner & Workouts</p>
            </div>
          </button>

          <button
            @click="navigateToView('/coach', 'coach')"
            class="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors"
            :class="route.path.startsWith('/coach') ? 'bg-brand-accent text-black font-bold' : 'text-gray-300 hover:bg-white/10'"
          >
            <Icon name="ph:shield-star-bold" class="w-4 h-4" />
            <div>
              <p class="font-bold">Coach PT Admin</p>
              <p class="text-[10px] opacity-75">CRM, Meal review, Slots</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Custom Cursor Styling */
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 16px;
  height: 16px;
  background-color: var(--tw-color-brand-accent, #ccff00);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  transition: width 0.25s, height 0.25s;
}

.custom-cursor.cursor-hover {
  width: 48px;
  height: 48px;
  background-color: #ffffff;
  mix-blend-mode: difference;
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
