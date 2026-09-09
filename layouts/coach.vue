<script setup lang="ts">
import { ref } from 'vue'
import { useEndureStore } from '~/composables/useEndureStore'

const route = useRoute()
const router = useRouter()
const store = useEndureStore()

const isSidebarOpen = ref(false)

const coachNav = [
  { name: 'Client CRM', path: '/coach', icon: 'ph:users-three-fill', badge: store.clientsList.value.length },
  { name: 'Daily Nutrition Stream', path: '/coach/meals', icon: 'ph:camera-fill', badge: 'Live' },
  { name: 'Schedule & Slots', path: '/coach/schedule', icon: 'ph:calendar-check-fill', badge: store.coachUpcomingSessions.value.length },
  { name: 'Exercise & Routine CMS', path: '/coach/library', icon: 'ph:barbell-fill' }
]

const switchToClient = () => {
  store.switchRole('client')
  router.push('/client')
}
</script>

<template>
  <div class="min-h-screen bg-brand-dark text-brand-charcoal font-sans flex">
    <!-- Desktop Sidebar -->
    <aside class="hidden lg:flex flex-col w-72 bg-brand-gray border-r border-brand-charcoal/10 shrink-0">
      <!-- Brand Logo -->
      <div class="h-20 flex items-center px-6 border-b border-brand-charcoal/10 gap-3">
        <Icon name="ph:barbell-fill" class="w-8 h-8 text-brand-accent animate-pulse-slow" />
        <div>
          <span class="font-heading font-black text-xl tracking-tighter uppercase text-brand-charcoal">Endure<span class="text-brand-accent">Admin</span></span>
          <p class="text-[10px] text-brand-accent font-bold uppercase tracking-wider">Coach Command Hub</p>
        </div>
      </div>

      <!-- Coach Info Card -->
      <div class="p-5 border-b border-brand-charcoal/10">
        <div class="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80" 
            alt="Marcus Vance" 
            class="w-12 h-12 rounded-xl object-cover border border-brand-accent shadow-sm"
          />
          <div>
            <h3 class="font-heading font-bold text-sm text-brand-charcoal">Marcus Vance</h3>
            <p class="text-xs text-brand-accent font-semibold">Head PT & CSCS Coach</p>
            <div class="flex items-center gap-1.5 mt-1 text-[10px] text-brand-charcoal/60">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Available for 1-on-1</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Links -->
      <nav class="flex-grow p-4 space-y-1.5">
        <NuxtLink
          v-for="item in coachNav"
          :key="item.path"
          :to="item.path"
          class="flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 group"
          :class="route.path === item.path 
            ? 'bg-brand-accent text-white font-bold shadow-[0_4px_15px_rgba(250,129,18,0.3)]' 
            : 'text-brand-charcoal/80 hover:bg-brand-dark hover:text-brand-charcoal'"
        >
          <div class="flex items-center gap-3">
            <Icon 
              :name="item.icon" 
              class="w-5 h-5 transition-transform group-hover:scale-110" 
              :class="route.path === item.path ? 'text-white' : 'text-brand-accent'" 
            />
            <span>{{ item.name }}</span>
          </div>
          <span 
            v-if="item.badge"
            class="text-[10px] font-bold px-2 py-0.5 rounded-full"
            :class="route.path === item.path ? 'bg-white text-brand-accent' : 'bg-brand-charcoal/10 text-brand-charcoal'"
          >
            {{ item.badge }}
          </span>
        </NuxtLink>
      </nav>

      <!-- Bottom Actions -->
      <div class="p-4 border-t border-brand-charcoal/10 space-y-2">
        <button
          @click="switchToClient"
          class="w-full bg-brand-dark hover:bg-brand-charcoal/5 border border-brand-charcoal/15 text-brand-charcoal px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Icon name="ph:device-mobile-camera-bold" class="w-4 h-4 text-brand-accent" />
          <span>Switch to Client PWA</span>
        </button>
        <NuxtLink
          to="/"
          class="w-full block text-center text-brand-charcoal/60 hover:text-brand-accent text-xs py-1 transition-colors"
        >
          ← Return to Public Website
        </NuxtLink>
      </div>
    </aside>

    <!-- Mobile Slideover Navigation -->
    <div v-if="isSidebarOpen" class="lg:hidden fixed inset-0 z-50 flex">
      <div @click="isSidebarOpen = false" class="fixed inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div class="relative w-72 bg-brand-gray border-r border-brand-charcoal/10 flex flex-col h-full z-10 shadow-2xl">
        <div class="h-16 flex items-center justify-between px-6 border-b border-brand-charcoal/10">
          <span class="font-heading font-black text-lg uppercase text-brand-charcoal">Endure<span class="text-brand-accent">Admin</span></span>
          <button @click="isSidebarOpen = false" class="text-brand-charcoal/70 hover:text-brand-charcoal">
            <Icon name="ph:x-bold" class="w-6 h-6" />
          </button>
        </div>
        <nav class="flex-grow p-4 space-y-1">
          <NuxtLink
            v-for="item in coachNav"
            :key="item.path"
            :to="item.path"
            @click="isSidebarOpen = false"
            class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm"
            :class="route.path === item.path ? 'bg-brand-accent text-white font-bold' : 'text-brand-charcoal/80 hover:bg-brand-dark'"
          >
            <Icon :name="item.icon" class="w-5 h-5" :class="route.path === item.path ? 'text-white' : 'text-brand-accent'" />
            <span>{{ item.name }}</span>
          </NuxtLink>
        </nav>
        <div class="p-4 border-t border-brand-charcoal/10 space-y-2">
          <button
            @click="switchToClient(); isSidebarOpen = false"
            class="w-full bg-brand-dark text-brand-charcoal border border-brand-charcoal/15 px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2"
          >
            <Icon name="ph:device-mobile-camera-bold" class="w-4 h-4 text-brand-accent" />
            <span>Client PWA View</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Admin Workspace -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Top Workspace Bar -->
      <header class="h-16 bg-brand-gray/80 backdrop-blur-md border-b border-brand-charcoal/10 px-6 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-4">
          <button @click="isSidebarOpen = true" class="lg:hidden text-brand-charcoal/70 hover:text-brand-charcoal">
            <Icon name="ph:list-bold" class="w-6 h-6" />
          </button>
          <div class="hidden sm:flex items-center gap-2 text-xs text-brand-charcoal/60">
            <span>Admin</span>
            <span>/</span>
            <span class="text-brand-charcoal font-bold capitalize">{{ route.path.split('/')[2] || 'Clients CRM' }}</span>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <!-- Live KPI Badges -->
          <div class="hidden md:flex items-center gap-4 border-r border-brand-charcoal/10 pr-4">
            <div class="flex items-center gap-1.5 text-xs text-brand-charcoal/70">
              <span class="w-2 h-2 rounded-full bg-brand-accent"></span>
              <span class="font-bold text-brand-charcoal">{{ store.clientsList.value.length }}</span> Active Roster
            </div>
            <div class="flex items-center gap-1.5 text-xs text-brand-charcoal/70">
              <span class="w-2 h-2 rounded-full bg-amber-500"></span>
              <span class="font-bold text-brand-charcoal">{{ store.coachUpcomingSessions.value.length }}</span> Confirmed Bookings
            </div>
          </div>

          <!-- Role Toggle -->
          <button
            @click="switchToClient"
            class="bg-brand-accent text-white font-heading font-black text-xs px-3.5 py-1.5 rounded-lg hover:bg-brand-charcoal transition-all shadow-[0_2px_10px_rgba(250,129,18,0.3)] flex items-center gap-1.5 active:scale-95"
          >
            <Icon name="ph:device-mobile-camera-bold" class="w-4 h-4" />
            <span>Test Client PWA</span>
          </button>
        </div>
      </header>

      <!-- Scrollable Admin Content -->
      <main class="flex-1 overflow-y-auto p-6 md:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
