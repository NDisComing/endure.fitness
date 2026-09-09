<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  (e: 'captured', payload: { imageBase64: string; mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' }): void
  (e: 'close'): void
}>()

const selectedMealType = ref<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'>('Lunch')
const videoRef = ref<HTMLVideoElement | null>(null)
const stream = ref<MediaStream | null>(null)
const isCameraActive = ref(false)
const isScanning = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  await startCamera()
})

onUnmounted(() => {
  stopCamera()
})

const startCamera = async () => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      })
      stream.value = mediaStream
      if (videoRef.value) {
        videoRef.value.srcObject = mediaStream
        isCameraActive.value = true
      }
    } catch (err) {
      console.warn('Camera access unavailable or declined, photo upload remains active.', err)
      isCameraActive.value = false
    }
  }
}

const stopCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
    stream.value = null
  }
  isCameraActive.value = false
}

// Client-side canvas compression (~800–1000px)
const compressAndEmit = (imgSource: HTMLVideoElement | HTMLImageElement) => {
  isScanning.value = true
  const canvas = document.createElement('canvas')
  const maxDim = 900
  let width = imgSource instanceof HTMLVideoElement ? imgSource.videoWidth || 640 : imgSource.width
  let height = imgSource instanceof HTMLVideoElement ? imgSource.videoHeight || 480 : imgSource.height

  if (width > height) {
    if (width > maxDim) {
      height = Math.round((height * maxDim) / width)
      width = maxDim
    }
  } else {
    if (height > maxDim) {
      width = Math.round((width * maxDim) / height)
      height = maxDim
    }
  }

  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.drawImage(imgSource, 0, 0, width, height)
    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85)

    setTimeout(() => {
      isScanning.value = false
      stopCamera()
      emit('captured', {
        imageBase64: compressedBase64,
        mealType: selectedMealType.value
      })
    }, 1200)
  }
}

const captureFromVideo = () => {
  if (!videoRef.value) return
  compressAndEmit(videoRef.value)
}

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (event) => {
    const img = new Image()
    img.onload = () => compressAndEmit(img)
    img.src = event.target?.result as string
  }
  reader.readAsDataURL(file)
}

const useSamplePlate = () => {
  isScanning.value = true
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.onload = () => compressAndEmit(img)
  img.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&auto=format&fit=crop&q=80'
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" @click="emit('close')"></div>

    <!-- Scanner Window -->
    <div class="relative w-full max-w-lg bg-brand-gray border border-brand-charcoal/15 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col">
      <!-- Top Bar -->
      <div class="p-4 bg-brand-dark border-b border-brand-charcoal/10 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-brand-accent/20 border border-brand-accent flex items-center justify-center text-brand-accent">
            <Icon name="ph:camera-fill" class="w-4 h-4" />
          </div>
          <div>
            <h3 class="font-heading font-black text-sm uppercase text-brand-charcoal">AI Vision Food Scanner</h3>
            <p class="text-[10px] text-brand-charcoal/60">Powered by Google Gemini 1.5 Flash</p>
          </div>
        </div>
        <button @click="emit('close')" class="text-brand-charcoal/60 hover:text-brand-charcoal p-1.5">
          <Icon name="ph:x-bold" class="w-5 h-5" />
        </button>
      </div>

      <!-- Meal Category Pill Selector -->
      <div class="p-3 bg-brand-gray border-b border-brand-charcoal/10 flex gap-1.5 overflow-x-auto">
        <button
          v-for="type in (['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const)"
          :key="type"
          @click="selectedMealType = type"
          class="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all whitespace-nowrap shadow-sm"
          :class="selectedMealType === type ? 'bg-brand-accent text-white shadow-sm font-bold' : 'bg-brand-dark text-brand-charcoal/80 hover:bg-brand-sand/80'"
        >
          {{ type }}
        </button>
      </div>

      <!-- Viewfinder / Camera Area -->
      <div class="relative aspect-[4/3] bg-black overflow-hidden flex items-center justify-center">
        <!-- Live Video Element -->
        <video
          ref="videoRef"
          autoplay
          playsinline
          muted
          class="w-full h-full object-cover"
          :class="!isCameraActive && 'hidden'"
        ></video>

        <!-- Fallback if camera stream not available -->
        <div v-if="!isCameraActive" class="text-center p-6 space-y-3">
          <div class="w-16 h-16 rounded-2xl bg-brand-dark border border-brand-charcoal/10 flex items-center justify-center mx-auto text-brand-charcoal/60 shadow-sm">
            <Icon name="ph:image-square-bold" class="w-8 h-8" />
          </div>
          <p class="text-xs text-brand-charcoal/80 max-w-xs mx-auto">
            Camera access is optional. Upload a food photo from your gallery or test with an instant healthy meal sample.
          </p>
          <div class="flex flex-wrap justify-center gap-2 pt-2">
            <button
              @click="fileInputRef?.click()"
              class="bg-brand-dark hover:bg-brand-sand/80 border border-brand-charcoal/15 text-brand-charcoal font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-2 shadow-sm"
            >
              <Icon name="ph:upload-simple-bold" class="w-4 h-4 text-brand-accent" />
              <span>Choose Photo</span>
            </button>
            <button
              @click="useSamplePlate"
              class="bg-brand-accent/20 hover:bg-brand-accent/30 border border-brand-accent text-brand-accent font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-2 shadow-sm"
            >
              <Icon name="ph:sparkle-fill" class="w-4 h-4" />
              <span>Use Sample Plate</span>
            </button>
          </div>
        </div>

        <!-- Scanning Reticle & Radar Line -->
        <div v-if="isCameraActive" class="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
          <div class="flex justify-between">
            <div class="w-8 h-8 border-t-2 border-l-2 border-brand-accent"></div>
            <div class="w-8 h-8 border-t-2 border-r-2 border-brand-accent"></div>
          </div>
          <div class="text-center">
            <span class="bg-black/70 backdrop-blur-md text-[10px] text-brand-accent font-mono uppercase px-3 py-1 rounded-full border border-brand-accent/30">
              Center meal in frame
            </span>
          </div>
          <div class="flex justify-between">
            <div class="w-8 h-8 border-b-2 border-l-2 border-brand-accent"></div>
            <div class="w-8 h-8 border-b-2 border-r-2 border-brand-accent"></div>
          </div>
        </div>

        <!-- Scanning Laser Animation Overlay -->
        <div 
          v-if="isScanning"
          class="absolute inset-0 bg-brand-accent/15 backdrop-blur-[2px] flex flex-col items-center justify-center space-y-3 z-20"
        >
          <div class="w-16 h-16 rounded-full border-4 border-brand-accent border-t-transparent animate-spin"></div>
          <p class="font-heading font-black text-sm uppercase tracking-wider text-brand-accent animate-pulse">
            Analyzing Plate with Gemini Flash...
          </p>
          <p class="text-[11px] text-brand-charcoal font-bold">Estimating portion weights & macros</p>
        </div>
      </div>

      <!-- Bottom Controls -->
      <div class="p-4 bg-brand-dark border-t border-brand-charcoal/10 flex items-center justify-between gap-3 shadow-sm">
        <!-- Hidden File Input -->
        <input 
          ref="fileInputRef" 
          type="file" 
          accept="image/*" 
          class="hidden" 
          @change="handleFileUpload" 
        />

        <button
          @click="fileInputRef?.click()"
          class="p-3 rounded-xl bg-brand-gray hover:bg-brand-sand/80 text-brand-charcoal border border-brand-charcoal/10 flex items-center gap-1.5 text-xs font-bold shadow-sm"
          title="Upload from Camera Roll"
        >
          <Icon name="ph:folder-open-bold" class="w-5 h-5 text-brand-accent" />
          <span class="hidden sm:inline">Gallery</span>
        </button>

        <!-- Main Shutter Button -->
        <button
          @click="isCameraActive ? captureFromVideo() : useSamplePlate()"
          :disabled="isScanning"
          class="w-16 h-16 rounded-full bg-brand-accent text-white border-4 border-brand-gray shadow-[0_4px_20px_rgba(250,129,18,0.5)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shrink-0 disabled:opacity-50"
          title="Snap Photo"
        >
          <Icon name="ph:aperture-bold" class="w-8 h-8" />
        </button>

        <button
          @click="useSamplePlate"
          class="p-3 rounded-xl bg-brand-gray hover:bg-brand-sand/80 text-brand-charcoal border border-brand-charcoal/10 flex items-center gap-1.5 text-xs font-bold shadow-sm"
          title="Instant Sample Plate"
        >
          <Icon name="ph:sparkle-bold" class="w-5 h-5 text-brand-accent" />
          <span class="hidden sm:inline">Demo Plate</span>
        </button>
      </div>
    </div>
  </div>
</template>
