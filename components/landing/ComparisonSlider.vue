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
    name: 'Nd Lua.',
    program: '1-on-1 Doorstep PT (Cheras)',
    duration: '16 Weeks',
    beforeImg: '/images/before-2.jpeg',
    afterImg: '/images/after-2.jpeg',
    quote: "I was always a skinny fat guy who couldn't gain weight despite eating a lot. Coach Yondy helped me change my mindset and habits, and I finally achieved my dream body.",
    metrics: {
      weightChange: '64kg → 69kg',
      bodyFat: '20% → 11%',
      strengthGain: '+30kg Bench Press',
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
  <section id="transformations" class="pt-0 pb-12 sm:pb-16 lg:pb-20 bg-[#010736] border-b border-white/10 relative overflow-hidden text-white">
    <!-- Top Section Ambient Glow & Light Cone (Smooth Transition from Core Services) -->
    <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[850px] max-w-full h-[350px] bg-[radial-gradient(ellipse_at_top,_rgba(252,241,208,0.15),transparent_70%)] pointer-events-none blur-3xl -z-0"></div>
    <div class="absolute top-1/3 -left-32 w-80 h-80 bg-[#22396F]/25 rounded-full blur-3xl pointer-events-none -z-0"></div>
    <div class="absolute bottom-10 -right-32 w-96 h-96 bg-[#0D1C42]/50 rounded-full blur-3xl pointer-events-none -z-0"></div>

    <!-- Glowing Top Accent Line (Luxury Section Divider) -->
    <div class="w-full h-px bg-gradient-to-r from-transparent via-brand-sand/40 to-transparent relative z-10"></div>

    <!-- Static Section Transition Ribbon (Single static line of Work Hard Gain Hard) -->
    <div class="w-full bg-[#0D1C42]/95 backdrop-blur-md border-b border-white/10 py-2.5 sm:py-3 mb-8 sm:mb-12 overflow-hidden select-none relative z-10">
      <div class="w-full flex items-center justify-center overflow-hidden">
        <p class="font-heading font-black text-xs sm:text-sm tracking-widest uppercase text-brand-sand/90 whitespace-nowrap select-none hover:text-white transition-colors duration-300">
          Work Hard Gain Hard &nbsp;-&nbsp; Work Hard Gain Hard &nbsp;-&nbsp; Work Hard Gain Hard &nbsp;-&nbsp; Work Hard Gain Hard &nbsp;-&nbsp; Work Hard Gain Hard &nbsp;-&nbsp; Work Hard Gain Hard &nbsp;-&nbsp; Work Hard Gain Hard
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
        <div>
          <div class="inline-flex items-center gap-2 text-brand-sand font-primary tracking-widest uppercase text-xs mb-3">
            <span class="w-8 h-px bg-brand-sand"></span>
            Real Measured Transformations
          </div>
          <h2 class="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            Proof Over <span class="text-brand-sand">Promises.</span>
          </h2>
          <p class="text-gray-300 mt-2 text-base max-w-xl font-info">
            Drag the interactive slider horizontally to compare verified before-and-after results.
          </p>
        </div>

        <!-- Carousel Switcher Controls with Hover Physics -->
        <div class="flex items-center gap-3">
          <span class="text-xs text-gray-400 font-mono font-bold">
            {{ currentIndex + 1 }} / {{ transformations.length }}
          </span>
          <button 
            @click="prevItem"
            class="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-brand-sage hover:border-brand-sage hover:scale-110 active:scale-95 transition-all duration-300 shadow-md cursor-pointer group"
            aria-label="Previous Transformation"
          >
            <Icon name="ph:caret-left-bold" class="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" />
          </button>
          <button 
            @click="nextItem"
            class="w-12 h-12 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-brand-sage hover:border-brand-sage hover:scale-110 active:scale-95 transition-all duration-300 shadow-md cursor-pointer group"
            aria-label="Next Transformation"
          >
            <Icon name="ph:caret-right-bold" class="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>

      <!-- Main Showcase Container -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <!-- Interactive Comparison Slider Column with Ambient Glow Frame -->
        <div class="lg:col-span-7 flex justify-center relative group/frame">
          <!-- Ambient backlight glow behind slider frame -->
          <div class="absolute -inset-2 bg-gradient-to-r from-brand-sage/30 via-brand-sand/25 to-brand-earth/40 rounded-[2rem] blur-xl opacity-60 group-hover/frame:opacity-90 transition-opacity duration-700 pointer-events-none -z-0"></div>

          <div 
            ref="sliderRef"
            class="relative w-full aspect-[3/4] sm:aspect-[4/5] max-h-[580px] rounded-3xl overflow-hidden border-2 border-white/15 bg-black/40 select-none shadow-2xl cursor-ew-resize touch-none z-10"
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
            <div class="absolute top-4 right-4 bg-black/75 backdrop-blur-md text-brand-sand font-heading font-black text-xs px-3.5 py-1.5 rounded-full border border-brand-sand/30 uppercase tracking-wider shadow-md">
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
              <div class="absolute top-4 left-4 bg-black/75 backdrop-blur-md text-white font-heading font-bold text-xs px-3.5 py-1.5 rounded-full border border-white/20 uppercase tracking-wider shadow-md">
                Before
              </div>
            </div>

            <!-- Draggable Divider Line & Knob with Animated Pulse Aura -->
            <div 
              class="absolute top-0 bottom-0 w-1 bg-brand-sand shadow-[0_0_15px_rgba(252,241,208,0.85)] pointer-events-none"
              :style="{ left: `${sliderPosition}%` }"
            >
              <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-sand text-brand-charcoal flex items-center justify-center shadow-xl border-2 border-white group/knob">
                <!-- Gentle pulse breathing ring -->
                <div class="absolute -inset-2 rounded-full bg-brand-sand/40 animate-pulse pointer-events-none"></div>
                <Icon name="ph:arrows-left-right-bold" class="w-5 h-5 relative z-10" />
              </div>
            </div>

            <!-- Bottom Instruction Pill with Floating Breathing Motion -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-[11px] text-gray-200 font-medium px-4 py-1.5 rounded-full border border-white/15 pointer-events-none flex items-center gap-1.5 shadow-lg animate-pulse-gentle">
              <Icon name="ph:hand-pointing-bold" class="w-3.5 h-3.5 text-brand-sand shrink-0" />
              <span>Drag slider horizontally to compare</span>
            </div>
          </div>
        </div>

        <!-- Metrics & Review Column with Smooth Animated Transition -->
        <div class="lg:col-span-5">
          <Transition name="bento-fade-slide" mode="out-in">
            <div :key="currentItem.id" class="space-y-6">
              <!-- Client Header with Live Status Beacon -->
              <div class="flex items-center justify-between gap-3">
                <div>
                  <h3 class="font-heading font-black text-2xl uppercase tracking-tight text-white">
                    {{ currentItem.name }}
                  </h3>
                  <p class="text-xs font-bold text-brand-sand uppercase tracking-wider mt-0.5">
                    {{ currentItem.program }}
                  </p>
                </div>
                <!-- Live Beacon Badge -->
                <div class="inline-flex items-center gap-2 bg-brand-sage/15 border border-brand-sage/40 text-brand-sand text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow-xs shrink-0">
                  <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-sage opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-sage"></span>
                  </span>
                  <span>Verified Result</span>
                </div>
              </div>

              <!-- Quote Card with Interactive Depth -->
              <div class="relative overflow-hidden bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-brand-sand/40 hover:bg-white/[0.08] hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-all duration-300 group/quote">
                <div class="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-sand/10 via-transparent to-brand-sage/10 opacity-0 group-hover/quote:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <Icon name="ph:quotes-fill" class="w-8 h-8 text-brand-sand/20 group-hover/quote:text-brand-sand/40 group-hover/quote:scale-110 absolute top-4 right-4 transition-all duration-300" />
                <p class="text-gray-200 italic text-sm leading-relaxed relative z-10 font-normal">
                  "{{ currentItem.quote }}"
                </p>
              </div>

              <!-- Metrics Bento Box with Dynamic Hover Physics & Sheen -->
              <div class="grid grid-cols-2 gap-3">
                <!-- Bento 1: Body Recomposition -->
                <div class="relative overflow-hidden p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-sage/50 hover:bg-white/[0.09] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out group/bento cursor-default">
                  <div class="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-sage/20 via-transparent to-brand-sand/15 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <p class="text-[10px] uppercase font-bold text-gray-400 relative z-10">Body Recomposition</p>
                  <p class="font-heading font-black text-xl text-brand-sage mt-0.5 relative z-10 group-hover/bento:scale-105 transition-transform duration-300 origin-left inline-block">
                    {{ currentItem.metrics.weightChange }}
                  </p>
                </div>

                <!-- Bento 2: Body Fat % -->
                <div class="relative overflow-hidden p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-sand/50 hover:bg-white/[0.09] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out group/bento cursor-default">
                  <div class="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-sand/20 via-transparent to-brand-sage/15 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <p class="text-[10px] uppercase font-bold text-gray-400 relative z-10">Body Fat %</p>
                  <p class="font-heading font-black text-xl text-white mt-0.5 relative z-10 group-hover/bento:scale-105 transition-transform duration-300 origin-left inline-block">
                    {{ currentItem.metrics.bodyFat }}
                  </p>
                </div>

                <!-- Bento 3: Strength Indicator -->
                <div class="relative overflow-hidden p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-earth/50 hover:bg-white/[0.09] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out group/bento cursor-default">
                  <div class="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-earth/30 via-transparent to-brand-sand/20 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <p class="text-[10px] uppercase font-bold text-gray-400 relative z-10">Strength Indicator</p>
                  <p class="font-heading font-black text-base text-brand-sand mt-0.5 relative z-10 group-hover/bento:scale-105 transition-transform duration-300 origin-left inline-block">
                    {{ currentItem.metrics.strengthGain }}
                  </p>
                </div>

                <!-- Bento 4: Key Milestone -->
                <div class="relative overflow-hidden p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-sand/50 hover:bg-white/[0.09] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out group/bento cursor-default">
                  <div class="absolute -inset-px rounded-2xl bg-gradient-to-br from-brand-sand/20 via-transparent to-brand-sage/15 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <p class="text-[10px] uppercase font-bold text-gray-400 relative z-10">Key Milestone</p>
                  <p class="font-heading font-bold text-xs text-gray-200 mt-0.5 leading-snug relative z-10">
                    {{ currentItem.metrics.highlight }}
                  </p>
                </div>
              </div>

              <!-- Call to action with Glow Accent -->
              <div class="pt-2">
                <NuxtLink 
                  to="/book" 
                  class="w-full bg-[#FCF1D0] hover:bg-white text-[#010736] font-primary text-sm uppercase tracking-wider py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#010736]/40 hover:shadow-[0_0_25px_rgba(252,241,208,0.4)] hover:-translate-y-0.5 active:scale-95 group font-bold"
                >
                  <span>Get Similar Results — Book Assessment</span>
                  <Icon name="ph:arrow-right-bold" class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- Bottom Section Transition Gradient (Smooth Handoff into Why In-Home) -->
    <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"></div>
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-5xl h-px bg-gradient-to-r from-transparent via-brand-sand/30 to-transparent"></div>
  </section>
</template>

<style scoped>
.bento-fade-slide-enter-active,
.bento-fade-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.bento-fade-slide-enter-from {
  opacity: 0;
  transform: translateY(14px) scale(0.98);
}

.bento-fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-14px) scale(0.98);
}

@keyframes pulseGentle {
  0%, 100% {
    transform: translate(-50%, 0) scale(1);
    opacity: 0.95;
  }
  50% {
    transform: translate(-50%, -2px) scale(1.02);
    opacity: 1;
  }
}

.animate-pulse-gentle {
  animation: pulseGentle 3.5s ease-in-out infinite;
}
</style>

