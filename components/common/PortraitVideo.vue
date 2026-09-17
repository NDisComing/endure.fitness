<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  src?: string
  poster?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  src: '/images/heroVid.mp4',
  autoplay: true,
  muted: true,
  loop: true,
  className: ''
})

const mainVideo = ref<HTMLVideoElement | null>(null)
const bgVideo = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(true)
const isMuted = ref(props.muted)

const togglePlay = () => {
  if (!mainVideo.value) return
  if (mainVideo.value.paused) {
    mainVideo.value.play()
    bgVideo.value?.play()
    isPlaying.value = true
  } else {
    mainVideo.value.pause()
    bgVideo.value?.pause()
    isPlaying.value = false
  }
}

const toggleMute = () => {
  if (!mainVideo.value) return
  mainVideo.value.muted = !mainVideo.value.muted
  isMuted.value = mainVideo.value.muted
}

// Keep background video synced with foreground video
const syncPlayback = () => {
  if (mainVideo.value && bgVideo.value) {
    if (Math.abs(mainVideo.value.currentTime - bgVideo.value.currentTime) > 0.2) {
      bgVideo.value.currentTime = mainVideo.value.currentTime
    }
  }
}

onMounted(() => {
  if (mainVideo.value && props.autoplay) {
    mainVideo.value.play().catch(() => {
      isPlaying.value = false
    })
  }
  if (bgVideo.value && props.autoplay) {
    bgVideo.value.play().catch(() => {})
  }
})
</script>

<template>
  <div 
    class="relative w-full overflow-hidden rounded-3xl bg-brand-charcoal/10 shadow-2xl border border-brand-earth/15 group select-none"
    :class="className"
  >
    <!-- 1. Blurred Ambient Background Video (fills horizontal desktop space) -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <video
        ref="bgVideo"
        :src="src"
        autoplay
        muted
        loop
        playsinline
        aria-hidden="true"
        class="w-full h-full object-cover scale-125 filter blur-3xl opacity-50 brightness-95 saturate-150 transition-opacity duration-700"
      ></video>
      <!-- Warm Vignette / Contrast Overlay to complement Hygge palette -->
      <div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 via-transparent to-brand-charcoal/30"></div>
      <div class="absolute inset-0 bg-brand-dark/10 backdrop-blur-[2px]"></div>
    </div>

    <!-- 2. Sharp Portrait Video (Centered, 9:16 Aspect Ratio) -->
    <div class="relative z-10 flex items-center justify-center p-3 sm:p-6 md:p-8">
      <div class="relative max-h-[640px] aspect-[9/16] w-auto rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-white/20 ring-1 ring-brand-earth/20 bg-black/20">
        <video
          ref="mainVideo"
          :src="src"
          :autoplay="autoplay"
          :muted="muted"
          :loop="loop"
          playsinline
          @timeupdate="syncPlayback"
          @play="isPlaying = true; bgVideo?.play()"
          @pause="isPlaying = false; bgVideo?.pause()"
          class="w-full h-full object-cover cursor-pointer"
          @click="togglePlay"
        ></video>

        <!-- Play / Pause Center Overlay (Appears on hover or when paused) -->
        <button
          @click="togglePlay"
          type="button"
          class="absolute inset-0 m-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-charcoal/60 backdrop-blur-md text-brand-dark flex items-center justify-center transition-all duration-300 shadow-lg border border-white/20 hover:scale-110 active:scale-95 z-20"
          :class="{ 'opacity-0 group-hover:opacity-100': isPlaying, 'opacity-100': !isPlaying }"
          aria-label="Play or pause video"
        >
          <Icon v-if="!isPlaying" name="ph:play-fill" class="w-7 h-7 ml-0.5 text-white" />
          <Icon v-else name="ph:pause-fill" class="w-7 h-7 text-white" />
        </button>

        <!-- Floating Mute/Unmute Toggle in Corner -->
        <button
          @click.stop="toggleMute"
          type="button"
          class="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-brand-charcoal/70 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-brand-earth transition-all shadow-md active:scale-95"
          :title="isMuted ? 'Unmute' : 'Mute'"
          aria-label="Toggle sound"
        >
          <Icon v-if="isMuted" name="ph:speaker-simple-slash-bold" class="w-5 h-5 text-white" />
          <Icon v-else name="ph:speaker-simple-high-bold" class="w-5 h-5 text-brand-sand" />
        </button>
      </div>
    </div>
  </div>
</template>
