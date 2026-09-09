<script setup lang="ts">
import { ref, computed } from 'vue'

interface Transformation {
  id: string
  name: string
  program: string
  duration: string
  beforeImg: string
  afterImg: string
  quote: string
  metrics: {
    weightChange: string
    bodyFat: string
    strengthGain: string
    highlight: string
  }
}

const transformations: Transformation[] = [
  {
    id: 't-1',
    name: 'Alex Johnson',
    program: 'Hybrid Elite 1-on-1',
    duration: '16 Weeks',
    beforeImg: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80',
    afterImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    quote: "I was exhausted and plateaued after years of random gym workouts. Marcus engineered my nutrition and dialed in progressive overload. The results blew away my expectations.",
    metrics: {
      weightChange: '-14.2 kg',
      bodyFat: '23.5% → 12.8%',
      strengthGain: '+45 kg Squat PR',
      highlight: 'Visible 6-pack & zero knee pain'
    }
  },
  {
    id: 't-2',
    name: 'David Ramirez',
    program: '12-Week Metabolic Recomp',
    duration: '12 Weeks',
    beforeImg: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80',
    afterImg: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80',
    quote: "Traveling weekly for work made consistency impossible until I used the Endure PWA food scanner and Marcus's hotel workout splits. Lost 9kg without starving.",
    metrics: {
      weightChange: '-9.8 kg',
      bodyFat: '21.0% → 14.2%',
      strengthGain: '+35 kg Deadlift',
      highlight: '-12 cm waist reduction'
    }
  },
  {
    id: 't-3',
    name: 'Sarah Miller',
    program: 'Athletic Strength & Hypertrophy',
    duration: '20 Weeks',
    beforeImg: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    afterImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    quote: "I wanted to feel athletic and powerful, not just burn calories on a treadmill. I can now do 8 strict pull-ups and deadlift 1.5x my bodyweight.",
    metrics: {
      weightChange: '+3.5 kg Lean Muscle',
      bodyFat: '25% → 17.5%',
      strengthGain: '+50 kg Barbell Hip Thrust',
      highlight: 'First strict bodyweight pull-up'
    }
  }
]

const currentIndex = ref(0)
const sliderPosition = ref(50) // percentage 0 to 100
const isDragging = ref(false)
const sliderRef = ref<HTMLElement | null>(null)

const currentItem = computed(() => transformations[currentIndex.value])

const prevItem = () => {
  currentIndex.value = (currentIndex.value - 1 + transformations.length) % transformations.length
  sliderPosition.value = 50
}

const nextItem = () => {
  currentIndex.value = (currentIndex.value + 1) % transformations.length
  sliderPosition.value = 50
}

const handleMove = (clientX: number) => {
  if (!sliderRef.value) return
  const rect = sliderRef.value.getBoundingClientRect()
  const x = clientX - rect.left
  const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
  sliderPosition.value = Math.round(percent)
}

const onMouseMove = (e: MouseEvent) => {
  if (isDragging.value) {
    handleMove(e.clientX)
  }
}

const onTouchMove = (e: TouchEvent) => {
  if (e.touches.length > 0) {
    handleMove(e.touches[0].clientX)
  }
}
</script>

<template>
  <section id="transformations" class="py-24 bg-brand-dark border-b border-white/10 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div class="inline-flex items-center gap-2 text-brand-accent font-bold tracking-widest uppercase text-xs mb-3">
            <span class="w-8 h-px bg-brand-accent"></span>
            Real Measured Transformations
          </div>
          <h2 class="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight">
            Proof Over <span class="text-brand-accent">Promises.</span>
          </h2>
          <p class="text-gray-400 mt-2 text-base max-w-xl">
            Drag the interactive slider horizontally to compare verified client results.
          </p>
        </div>

        <!-- Carousel Switcher Controls -->
        <div class="flex items-center gap-3">
          <span class="text-xs text-gray-400 font-mono">
            {{ currentIndex + 1 }} / {{ transformations.length }}
          </span>
          <button 
            @click="prevItem"
            class="w-12 h-12 rounded-xl bg-brand-gray border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-black hover:border-transparent transition-all"
            aria-label="Previous Transformation"
          >
            <Icon name="ph:caret-left-bold" class="w-5 h-5" />
          </button>
          <button 
            @click="nextItem"
            class="w-12 h-12 rounded-xl bg-brand-gray border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-black hover:border-transparent transition-all"
            aria-label="Next Transformation"
          >
            <Icon name="ph:caret-right-bold" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Main Showcase Container -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- Interactive Comparison Slider Column -->
        <div class="lg:col-span-7">
          <div 
            ref="sliderRef"
            class="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border-2 border-white/15 bg-black select-none shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-ew-resize touch-none"
            @mousedown="isDragging = true"
            @mouseup="isDragging = false"
            @mouseleave="isDragging = false"
            @mousemove="onMouseMove"
            @touchstart="isDragging = true"
            @touchend="isDragging = false"
            @touchmove="onTouchMove"
          >
            <!-- After Image (Base) -->
            <img 
              :src="currentItem.afterImg" 
              :alt="`${currentItem.name} After`"
              class="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div class="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-brand-accent font-heading font-black text-xs px-3 py-1.5 rounded-md border border-brand-accent/40 uppercase tracking-wider">
              After ({{ currentItem.duration }})
            </div>

            <!-- Before Image (Clipped) -->
            <div 
              class="absolute inset-0 overflow-hidden pointer-events-none"
              :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }"
            >
              <img 
                :src="currentItem.beforeImg" 
                :alt="`${currentItem.name} Before`"
                class="absolute inset-0 w-full h-full object-cover filter brightness-95"
              />
              <div class="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-gray-300 font-heading font-bold text-xs px-3 py-1.5 rounded-md border border-white/20 uppercase tracking-wider">
                Before
              </div>
            </div>

            <!-- Draggable Divider Line & Knob -->
            <div 
              class="absolute top-0 bottom-0 w-1 bg-brand-accent shadow-[0_0_15px_rgba(204,255,0,0.8)] pointer-events-none"
              :style="{ left: `${sliderPosition}%` }"
            >
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-accent text-black flex items-center justify-center shadow-2xl border-2 border-black">
                <Icon name="ph:arrows-left-right-bold" class="w-5 h-5" />
              </div>
            </div>

            <!-- Bottom Instruction Pill -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-md text-[11px] text-gray-300 font-medium px-4 py-1.5 rounded-full border border-white/10 pointer-events-none flex items-center gap-1.5">
              <Icon name="ph:hand-pointing-bold" class="w-3.5 h-3.5 text-brand-accent" />
              <span>Drag slider or click anywhere to inspect</span>
            </div>
          </div>
        </div>

        <!-- Metrics & Review Column -->
        <div class="lg:col-span-5 space-y-6">
          <!-- Client Header -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-heading font-black text-2xl uppercase tracking-tight text-white">
                {{ currentItem.name }}
              </h3>
              <p class="text-xs font-bold text-brand-accent uppercase tracking-wider">
                {{ currentItem.program }} • {{ currentItem.duration }}
              </p>
            </div>
            <span class="bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-xs font-bold px-3 py-1 rounded-full">
              Verified Client
            </span>
          </div>

          <!-- Quote -->
          <div class="relative bg-brand-gray p-6 rounded-2xl border border-white/10">
            <Icon name="ph:quotes-fill" class="w-8 h-8 text-brand-accent/20 absolute top-4 right-4" />
            <p class="text-gray-300 italic text-sm leading-relaxed relative z-10">
              "{{ currentItem.quote }}"
            </p>
          </div>

          <!-- Metrics Bento Box -->
          <div class="grid grid-cols-2 gap-3">
            <div class="p-4 rounded-xl bg-brand-gray/80 border border-white/10">
              <p class="text-[10px] uppercase font-bold text-gray-400">Scale Weight</p>
              <p class="font-heading font-black text-xl text-brand-accent mt-0.5">
                {{ currentItem.metrics.weightChange }}
              </p>
            </div>
            <div class="p-4 rounded-xl bg-brand-gray/80 border border-white/10">
              <p class="text-[10px] uppercase font-bold text-gray-400">Body Fat %</p>
              <p class="font-heading font-black text-xl text-white mt-0.5">
                {{ currentItem.metrics.bodyFat }}
              </p>
            </div>
            <div class="p-4 rounded-xl bg-brand-gray/80 border border-white/10">
              <p class="text-[10px] uppercase font-bold text-gray-400">Strength Indicator</p>
              <p class="font-heading font-black text-base text-brand-accent mt-0.5">
                {{ currentItem.metrics.strengthGain }}
              </p>
            </div>
            <div class="p-4 rounded-xl bg-brand-gray/80 border border-white/10">
              <p class="text-[10px] uppercase font-bold text-gray-400">Key Milestone</p>
              <p class="font-heading font-bold text-xs text-gray-200 mt-0.5 leading-snug">
                {{ currentItem.metrics.highlight }}
              </p>
            </div>
          </div>

          <!-- Call to action -->
          <div class="pt-2">
            <NuxtLink 
              to="/book" 
              class="w-full bg-brand-accent text-black font-heading font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.3)]"
            >
              <span>Get Similar Results — Book Consultation</span>
              <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
