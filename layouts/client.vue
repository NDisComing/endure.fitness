<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEndureStore } from '~/composables/useEndureStore'

const route = useRoute()
const router = useRouter()
const store = useEndureStore()

const showInstallBanner = ref(false)
const deferredPrompt = ref<any>(null)
const isInstalled = ref(false)

onMounted(() => {
  // Check if launched in standalone mode (already installed PWA)
  if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
    isInstalled.value = true
  }

  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault()
    deferredPrompt.value = e
    if (!isInstalled.value) {
      showInstallBanner.value = true
    }
  })
})

const installPwa = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    const choice = await deferredPrompt.value.userChoice
    if (choice.outcome === 'accepted') {
      showInstallBanner.value = false
      isInstalled.value = true
    }
    deferredPrompt.value = null
  } else {
    // Show instruction tooltip for iOS / manual browsers
    alert('To install Endure PWA:\n1. Tap the Share button in Safari/Chrome\n2. Select "Add to Home Screen" [➕]')
  }
}

const navTabs = [
  { name: 'Today', path: '/client', icon: 'ph:lightning-fill' },
  { name: 'AI Meals', path: '/client/food', icon: 'ph:camera-fill', highlight: true },
  { name: 'Workouts', path: '/client/workouts', icon: 'ph:barbell-fill' },
  { name: 'Progress', path: '/client/metrics', icon: 'ph:chart-line-up-fill' }
]

const switchToCoach = () => {
  store.switchRole('coach')
  router.push('/coach')
}
</script>

<template>
  <div class="min-h-screen bg-brand-dark text-white font-sans flex flex-col selection:bg-brand-accent selection:text-black">
    <!-- Top Client Bar -->
    <header class="sticky top-0 z-40 bg-brand-gray/95 backdrop-blur-md border-b border-white/10 px-4 py-3">
      <div class="max-w-md mx-auto flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="relative">
            <img 
              :src="store.currentUser.value.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'" 
              :alt="store.currentUser.value.full_name"
              class="w-10 h-10 rounded-full object-cover border-2 border-brand-accent shadow-[0_0_10px_rgba(204,255,0,0.3)]"
            />
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-brand-accent rounded-full ring-2 ring-brand-gray"></span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h2 class="font-heading font-bold text-sm tracking-tight">{{ store.currentUser.value.full_name }}</h2>
              <span class="bg-brand-accent/20 text-brand-accent text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                PWA Client
              </span>
            </div>
            <p class="text-xs text-gray-400 truncate max-w-[170px]">
              Coach: Marcus Vance
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <!-- Role Switcher -->
          <button 
            @click="switchToCoach"
            class="text-[11px] font-bold bg-white/10 hover:bg-white/20 text-gray-200 px-2.5 py-1.5 rounded-lg border border-white/10 transition-all flex items-center gap-1 active:scale-95"
            title="Switch to Coach Portal"
          >
            <Icon name="ph:arrows-clockwise-bold" class="w-3.5 h-3.5 text-brand-accent" />
            <span class="hidden sm:inline">PT</span> View
          </button>
        </div>
      </div>
    </header>

    <!-- PWA Installation Banner -->
    <div 
      v-if="showInstallBanner && !isInstalled"
      class="bg-gradient-to-r from-brand-gray to-brand-dark border-b border-brand-accent/30 px-4 py-2.5 animate-fade-in-up"
    >
      <div class="max-w-md mx-auto flex items-center justify-between gap-3">
        <div class="flex items-center gap-2.5 text-xs text-gray-200">
          <div class="w-8 h-8 rounded-lg bg-brand-accent/20 border border-brand-accent flex items-center justify-center shrink-0">
            <Icon name="ph:download-simple-bold" class="w-4 h-4 text-brand-accent" />
          </div>
          <div>
            <p class="font-bold text-white leading-tight">Install Endure PWA</p>
            <p class="text-[11px] text-gray-400">Add to home screen for native full-screen feel</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button 
            @click="installPwa"
            class="bg-brand-accent text-black font-heading font-black text-xs px-3 py-1.5 rounded-md hover:bg-white transition-all shadow-[0_0_10px_rgba(204,255,0,0.4)] whitespace-nowrap"
          >
            Install
          </button>
          <button 
            @click="showInstallBanner = false"
            class="text-gray-400 hover:text-white p-1"
          >
            <Icon name="ph:x-bold" class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Main Mobile Content Area -->
    <main class="flex-grow max-w-md mx-auto w-full px-4 pt-4 pb-28">
      <slot />
    </main>

    <!-- Bottom Floating PWA Navigation Bar -->
    <nav class="fixed bottom-0 left-0 right-0 z-40 bg-brand-gray/95 backdrop-blur-xl border-t border-white/10 pb-safe">
      <div class="max-w-md mx-auto flex items-center justify-around py-2 px-3">
        <NuxtLink
          v-for="tab in navTabs"
          :key="tab.path"
          :to="tab.path"
          class="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all relative group"
          :class="route.path === tab.path ? 'text-brand-accent' : 'text-gray-400 hover:text-gray-200'"
        >
          <!-- Special highlight styling for AI food scanner camera -->
          <div 
            v-if="tab.highlight"
            class="w-11 h-11 -mt-5 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
            :class="route.path === tab.path ? 'bg-brand-accent text-black shadow-[0_0_20px_rgba(204,255,0,0.6)]' : 'bg-brand-accent/20 border border-brand-accent text-brand-accent'"
          >
            <Icon :name="tab.icon" class="w-6 h-6" />
          </div>

          <Icon 
            v-else
            :name="tab.icon" 
            class="w-6 h-6 transition-transform duration-200 group-active:scale-90" 
          />

          <span 
            class="text-[10px] font-bold tracking-tight mt-1"
            :class="tab.highlight && '-mt-0.5'"
          >
            {{ tab.name }}
          </span>

          <!-- Active dot indicator -->
          <span 
            v-if="route.path === tab.path && !tab.highlight" 
            class="w-1.5 h-1.5 bg-brand-accent rounded-full absolute -bottom-0.5"
          ></span>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 0.75rem);
}
</style>
