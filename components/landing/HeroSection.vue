<script setup lang="ts">
import { ref, onMounted } from 'vue'

const bgVideo = ref<HTMLVideoElement | null>(null)
const mainVideo = ref<HTMLVideoElement | null>(null)

const syncVideos = () => {
  if (mainVideo.value && bgVideo.value) {
    if (Math.abs(mainVideo.value.currentTime - bgVideo.value.currentTime) > 0.3) {
      bgVideo.value.currentTime = mainVideo.value.currentTime
    }
  }
}

const handleVideoError = (e: Event) => {
  const el = e.target as HTMLVideoElement
  if (el) {
    setTimeout(() => {
      el.load()
      el.play().catch(() => {})
    }, 400)
  }
}

onMounted(() => {
  if (mainVideo.value) {
    mainVideo.value.muted = true
    mainVideo.value.play().catch(() => {
      mainVideo.value?.load()
      mainVideo.value?.play().catch(() => {})
    })
  }
  if (bgVideo.value) {
    bgVideo.value.muted = true
    bgVideo.value.play().catch(() => {
      bgVideo.value?.load()
      bgVideo.value?.play().catch(() => {})
    })
  }
})

const stats = [
  { 
    value: '200+', 
    label: 'Clients Transformed',
    subtext: 'Achieved their dream physique' 
  },
  { 
    value: '200+ kg', 
    label: 'Fat & Weight Lost',
    subtext: 'Across our client roster'
  },
  { 
    value: '1,000+', 
    label: 'Hours Coached',
    subtext: 'In-home & private sessions'
  },
  { 
    value: '5–10+ Yrs', 
    label: 'Coaching Experience',
    subtext: 'FITM & AusActive aligned'
  }
]
</script>

<template>
  <div>
    <!-- Clean Minimal Video Hero Section (Matching Client Reference) -->
    <section class="relative min-h-screen h-screen flex items-center justify-center overflow-hidden bg-black select-none">
      <!-- 1. Dual Video Engine (Crisp Central Video + Ambient Blurred Desktop Sides) -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <ClientOnly>
          <!-- A. Ambient Blurred Widescreen Fill (Desktop only, uses separate stream heroVid-bg.mp4 to prevent conflict) -->
          <video
            ref="bgVideo"
            src="/images/heroVid-bg.mp4"
            autoplay
            muted
            loop
            playsinline
            preload="auto"
            aria-hidden="true"
            @error="handleVideoError"
            class="hidden md:block absolute inset-0 w-full h-full object-cover scale-125 filter blur-3xl opacity-80 brightness-95 saturate-125 transition-opacity duration-700"
          ></video>

          <!-- B. Primary Sharp Video Track (100% Crisp, Never Blurred) -->
          <div class="absolute inset-0 flex items-center justify-center">
            <video
              ref="mainVideo"
              src="/images/heroVid.mp4"
              autoplay
              muted
              loop
              playsinline
              preload="auto"
              @error="handleVideoError"
              @timeupdate="syncVideos"
              class="w-full h-full md:w-auto md:h-full max-w-none md:aspect-[9/16] object-cover opacity-100 brightness-100 z-10"
            ></video>
          </div>
        </ClientOnly>

        <!-- Subtle Light Vignette Overlay (Keeps video vivid while ensuring razor-sharp text) -->
        <div class="absolute inset-0 bg-black/20 z-10"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/55 z-10"></div>
      </div>

      <!-- 2. Clean, Minimal Typography (Just Clean Hook Line) -->
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 flex flex-col items-center justify-center">
        <!-- Clean Hook Line Headline with Balanced Desktop Sizing -->
        <h1 class="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.98] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] max-w-md sm:max-w-lg md:max-w-xl mx-auto mb-4 sm:mb-6">
          BUILD<br />DIFFERENT
        </h1>

        <!-- Clean Sub-headline -->
        <p class="text-base sm:text-lg md:text-xl text-white/95 font-medium max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] mb-8 sm:mb-10">
          Doorstep personal training delivered right to you in KL & Selangor.
        </p>

        <!-- Single Clean CTA Button (Pop of contrast like reference) -->
        <div class="flex items-center justify-center">
          <NuxtLink 
            to="/book" 
            class="inline-flex items-center justify-center bg-brand-sand hover:bg-white text-brand-charcoal font-heading font-black text-xs sm:text-sm uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 border border-white/40 drop-shadow-xl"
          >
            <span>Book In-Home Assessment</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Social Proof Bar (Clean transition directly below hero) -->
    <div class="bg-brand-dark border-b border-brand-earth/10 py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
        <div 
          v-for="(stat, idx) in stats" 
          :key="idx"
          class="p-4 rounded-2xl bg-brand-gray/60 border border-brand-earth/10 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-sage"
        >
          <p class="font-heading font-black text-2xl sm:text-3xl text-brand-sage tracking-tight mb-1">
            {{ stat.value }}
          </p>
          <p class="text-xs uppercase font-bold tracking-wider text-brand-charcoal leading-snug">
            {{ stat.label }}
          </p>
          <p class="text-[11px] text-brand-muted mt-0.5 font-medium hidden sm:block">
            {{ stat.subtext }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
