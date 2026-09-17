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
    name: 'Coach Yondy | Real Transformation',
    program: 'Natural Body Recomposition & Hypertrophy',
    duration: '100% Drug-Free Progress',
    beforeImg: '/images/before-1.jpeg',
    afterImg: '/images/after-1.jpeg',
    quote: "I walked this exact journey before coaching others. Transforming from a slim frame to building dense athletic muscle through progressive overload and sustainable nutrition is why our methods deliver lasting results without crash dieting.",
    metrics: {
      weightChange: '+14.5 kg Lean Mass',
      bodyFat: '21% → 11.8%',
      strengthGain: '+55 kg Compound PR',
      highlight: 'Built drug-free & sustained'
    }
  },
  {
    id: 't-2',
    name: 'Alex Tan',
    program: '1-on-1 Doorstep PT (Mont Kiara)',
    duration: '16 Weeks',
    beforeImg: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80',
    afterImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80',
    quote: "With traffic jams in KL, I could never commit to the gym. Coach Yondy training me right at my condo gym eliminated all excuses. His science-driven programming and sustainable nutrition habits helped me drop 14kg with zero rebound.",
    metrics: {
      weightChange: '-14.2 kg',
      bodyFat: '23.5% → 12.8%',
      strengthGain: '+45 kg Squat PR',
      highlight: 'Visible 6-pack & posture fixed'
    }
  },
  {
    id: 't-3',
    name: 'Sarah Chen',
    program: 'Female Lower-Body & Glute Sculpting',
    duration: '20 Weeks',
    beforeImg: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    afterImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
    quote: "I wanted targeted glute development and functional strength without harsh crash diets. Coach Yondy's movement mechanics cues made every session enjoyable and empowering. I feel stronger and more toned than ever.",
    metrics: {
      weightChange: '+3.5 kg Lean Muscle',
      bodyFat: '25% → 17.5%',
      strengthGain: '+50 kg Barbell Hip Thrust',
      highlight: 'Sculpted lower body & toned core'
    }
  }
]

const currentIndex = ref(0)
const sliderPosition = ref(50)
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
  <section id="transformations" class="py-24 bg-brand-dark border-b border-brand-earth/10 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div class="inline-flex items-center gap-2 text-brand-sage font-bold tracking-widest uppercase text-xs mb-3">
            <span class="w-8 h-px bg-brand-sage"></span>
            Real Measured Transformations
          </div>
          <h2 class="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-brand-charcoal">
            Proof Over <span class="text-brand-sage">Promises.</span>
          </h2>
          <p class="text-brand-muted mt-2 text-base max-w-xl">
            Drag the interactive slider horizontally to compare verified before-and-after results.
          </p>
        </div>

        <!-- Carousel Switcher Controls -->
        <div class="flex items-center gap-3">
          <span class="text-xs text-brand-muted font-mono font-bold">
            {{ currentIndex + 1 }} / {{ transformations.length }}
          </span>
          <button 
            @click="prevItem"
            class="w-12 h-12 rounded-full bg-brand-gray border border-brand-earth/15 flex items-center justify-center text-brand-charcoal hover:bg-brand-sage hover:text-white transition-all shadow-sm"
            aria-label="Previous Transformation"
          >
            <Icon name="ph:caret-left-bold" class="w-5 h-5" />
          </button>
          <button 
            @click="nextItem"
            class="w-12 h-12 rounded-full bg-brand-gray border border-brand-earth/15 flex items-center justify-center text-brand-charcoal hover:bg-brand-sage hover:text-white transition-all shadow-sm"
            aria-label="Next Transformation"
          >
            <Icon name="ph:caret-right-bold" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Main Showcase Container -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- Interactive Comparison Slider Column -->
        <div class="lg:col-span-7 flex justify-center">
          <div 
            ref="sliderRef"
            class="relative w-full aspect-[3/4] sm:aspect-[4/5] max-h-[580px] rounded-3xl overflow-hidden border-2 border-brand-earth/15 bg-brand-charcoal select-none shadow-2xl cursor-ew-resize touch-none"
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
              class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />
            <div class="absolute top-4 right-4 bg-brand-charcoal/80 backdrop-blur-md text-brand-sand font-heading font-black text-xs px-3.5 py-1.5 rounded-full border border-brand-sand/30 uppercase tracking-wider shadow-md">
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
                class="absolute inset-0 w-full h-full object-cover object-center filter brightness-95"
              />
              <div class="absolute top-4 left-4 bg-brand-charcoal/80 backdrop-blur-md text-white font-heading font-bold text-xs px-3.5 py-1.5 rounded-full border border-white/20 uppercase tracking-wider shadow-md">
                Before
              </div>
            </div>

            <!-- Draggable Divider Line & Knob -->
            <div 
              class="absolute top-0 bottom-0 w-1 bg-brand-sage shadow-[0_0_15px_rgba(140,157,121,0.9)] pointer-events-none"
              :style="{ left: `${sliderPosition}%` }"
            >
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-sage text-white flex items-center justify-center shadow-xl border-2 border-white">
                <Icon name="ph:arrows-left-right-bold" class="w-5 h-5" />
              </div>
            </div>

            <!-- Bottom Instruction Pill -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-brand-charcoal/80 backdrop-blur-md text-[11px] text-gray-200 font-medium px-4 py-1.5 rounded-full border border-white/15 pointer-events-none flex items-center gap-1.5 shadow-md">
              <Icon name="ph:hand-pointing-bold" class="w-3.5 h-3.5 text-brand-sand" />
              <span>Drag slider horizontally to compare</span>
            </div>
          </div>
        </div>

        <!-- Metrics & Review Column -->
        <div class="lg:col-span-5 space-y-6">
          <!-- Client Header -->
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-heading font-black text-2xl uppercase tracking-tight text-brand-charcoal">
                {{ currentItem.name }}
              </h3>
              <p class="text-xs font-bold text-brand-sage uppercase tracking-wider mt-0.5">
                {{ currentItem.program }}
              </p>
            </div>
            <span class="bg-brand-sage/20 border border-brand-sage/40 text-brand-charcoal text-xs font-bold px-3 py-1 rounded-full">
              Verified Result
            </span>
          </div>

          <!-- Quote -->
          <div class="relative bg-brand-gray p-6 rounded-2xl border border-brand-earth/10 shadow-sm">
            <Icon name="ph:quotes-fill" class="w-8 h-8 text-brand-sage/30 absolute top-4 right-4" />
            <p class="text-brand-charcoal/90 italic text-sm leading-relaxed relative z-10 font-normal">
              "{{ currentItem.quote }}"
            </p>
          </div>

          <!-- Metrics Bento Box in Hygge Palette -->
          <div class="grid grid-cols-2 gap-3">
            <div class="p-4 rounded-2xl bg-brand-gray border border-brand-earth/10 shadow-sm">
              <p class="text-[10px] uppercase font-bold text-brand-muted">Body Recomposition</p>
              <p class="font-heading font-black text-xl text-brand-sage mt-0.5">
                {{ currentItem.metrics.weightChange }}
              </p>
            </div>
            <div class="p-4 rounded-2xl bg-brand-gray border border-brand-earth/10 shadow-sm">
              <p class="text-[10px] uppercase font-bold text-brand-muted">Body Fat %</p>
              <p class="font-heading font-black text-xl text-brand-charcoal mt-0.5">
                {{ currentItem.metrics.bodyFat }}
              </p>
            </div>
            <div class="p-4 rounded-2xl bg-brand-gray border border-brand-earth/10 shadow-sm">
              <p class="text-[10px] uppercase font-bold text-brand-muted">Strength Indicator</p>
              <p class="font-heading font-black text-base text-brand-earth mt-0.5">
                {{ currentItem.metrics.strengthGain }}
              </p>
            </div>
            <div class="p-4 rounded-2xl bg-brand-gray border border-brand-earth/10 shadow-sm">
              <p class="text-[10px] uppercase font-bold text-brand-muted">Key Milestone</p>
              <p class="font-heading font-bold text-xs text-brand-charcoal mt-0.5 leading-snug">
                {{ currentItem.metrics.highlight }}
              </p>
            </div>
          </div>

          <!-- Call to action -->
          <div class="pt-2">
            <NuxtLink 
              to="/book" 
              class="w-full bg-brand-earth hover:bg-brand-sage text-white font-heading font-black text-xs uppercase tracking-wider py-4 px-6 rounded-full transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <span>Get Similar Results — Book Assessment</span>
              <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
