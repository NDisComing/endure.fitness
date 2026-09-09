<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import type { Exercise } from '~/composables/useEndureStore'

const props = defineProps<{
  exercise: Exercise
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Built-in Rest Stopwatch
const restTimeSeconds = ref(props.exercise.rest_seconds || 90)
const remainingTime = ref(restTimeSeconds.value)
const isTimerRunning = ref(false)
let timerInterval: any = null

const startRestTimer = () => {
  if (isTimerRunning.value) return
  isTimerRunning.value = true
  remainingTime.value = restTimeSeconds.value
  timerInterval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      clearInterval(timerInterval)
      isTimerRunning.value = false
    }
  }, 1000)
}

const resetTimer = () => {
  clearInterval(timerInterval)
  isTimerRunning.value = false
  remainingTime.value = restTimeSeconds.value
}

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/90 backdrop-blur-md" @click="emit('close')"></div>

    <!-- Video Modal Card -->
    <div class="relative w-full max-w-2xl bg-brand-gray border border-white/20 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[92vh] flex flex-col">
      <!-- Video Player Frame -->
      <div class="relative aspect-video bg-black flex items-center justify-center">
        <video 
          :src="exercise.video_url"
          controls
          autoplay
          playsinline
          class="w-full h-full object-contain"
        ></video>
        
        <button 
          @click="emit('close')"
          class="absolute top-3 right-3 bg-black/60 hover:bg-black/90 text-white rounded-full p-2 backdrop-blur-md transition-all z-20"
        >
          <Icon name="ph:x-bold" class="w-5 h-5" />
        </button>
      </div>

      <!-- Exercise Content Details -->
      <div class="p-6 overflow-y-auto space-y-6">
        <!-- Title & Target Sets -->
        <div class="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-bold text-brand-accent uppercase tracking-wider">{{ exercise.category }}</span>
              <span class="text-gray-500">•</span>
              <span class="text-xs font-bold text-gray-300">{{ exercise.target_sets }} Sets × {{ exercise.target_reps }}</span>
            </div>
            <h3 class="font-heading font-black text-2xl uppercase tracking-tight text-white">
              {{ exercise.title }}
            </h3>
          </div>

          <!-- Rest Timer Widget -->
          <div class="bg-brand-dark rounded-xl p-2.5 border border-white/10 text-center shrink-0">
            <span class="text-[9px] uppercase font-bold text-gray-400 block">Rest Clock</span>
            <span class="font-mono font-black text-lg text-brand-accent">
              {{ Math.floor(remainingTime / 60) }}:{{ (remainingTime % 60).toString().padStart(2, '0') }}
            </span>
            <div class="flex gap-1 mt-1 justify-center">
              <button 
                @click="startRestTimer" 
                class="bg-brand-accent text-black text-[9px] font-bold px-2 py-0.5 rounded hover:bg-white transition-colors"
              >
                {{ isTimerRunning ? 'Running' : 'Start' }}
              </button>
              <button 
                @click="resetTimer" 
                class="bg-white/10 text-gray-300 text-[9px] font-bold px-2 py-0.5 rounded hover:bg-white/20 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <!-- Biomechanical Instructions -->
        <div class="space-y-2">
          <h4 class="font-heading font-bold text-xs uppercase tracking-wider text-gray-300">
            Biomechanical Instructions
          </h4>
          <p class="text-xs sm:text-sm text-gray-300 leading-relaxed bg-brand-dark/60 p-3.5 rounded-xl border border-white/5">
            {{ exercise.instructions }}
          </p>
        </div>

        <!-- Coach Form Cues -->
        <div class="space-y-2">
          <h4 class="font-heading font-bold text-xs uppercase tracking-wider text-brand-accent flex items-center gap-1.5">
            <Icon name="ph:crosshair-bold" class="w-4 h-4" />
            <span>Key Technique Cues</span>
          </h4>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <li 
              v-for="(cue, i) in exercise.form_cues" 
              :key="i"
              class="flex items-start gap-2 bg-brand-dark/40 p-2.5 rounded-lg border border-white/5 text-gray-300"
            >
              <Icon name="ph:check-circle-fill" class="w-3.5 h-3.5 text-brand-accent shrink-0 mt-0.5" />
              <span>{{ cue }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
