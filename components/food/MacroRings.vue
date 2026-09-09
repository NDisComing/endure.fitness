<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  consumedCalories: number
  targetCalories: number
  consumedProtein: number
  targetProtein: number
  consumedCarbs: number
  targetCarbs: number
  consumedFat: number
  targetFat: number
}>()

// Ring percentages (clamped 0 to 100)
const calPercent = computed(() => Math.min(100, Math.round((props.consumedCalories / props.targetCalories) * 100)) || 0)
const proPercent = computed(() => Math.min(100, Math.round((props.consumedProtein / props.targetProtein) * 100)) || 0)
const carbPercent = computed(() => Math.min(100, Math.round((props.consumedCarbs / props.targetCarbs) * 100)) || 0)
const fatPercent = computed(() => Math.min(100, Math.round((props.consumedFat / props.targetFat) * 100)) || 0)

// SVG circle calculations
const calRadius = 72
const calCircumference = 2 * Math.PI * calRadius
const calStrokeDashoffset = computed(() => calCircumference - (calPercent.value / 100) * calCircumference)

const proRadius = 56
const proCircumference = 2 * Math.PI * proRadius
const proStrokeDashoffset = computed(() => proCircumference - (proPercent.value / 100) * proCircumference)
</script>

<template>
  <div class="bg-brand-gray border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden">
    <!-- Ambient glow -->
    <div class="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="flex items-center justify-between mb-4">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Today's Nutrition</span>
        <h3 class="font-heading font-black text-lg uppercase tracking-tight text-white">Macro Snapshot</h3>
      </div>
      <NuxtLink 
        to="/client/food" 
        class="text-xs text-brand-accent font-bold hover:underline flex items-center gap-1"
      >
        <span>AI Log</span>
        <Icon name="ph:arrow-right-bold" class="w-3.5 h-3.5" />
      </NuxtLink>
    </div>

    <!-- Ring + Core Stats Layout -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
      <!-- Concentric SVG Macro Rings -->
      <div class="relative w-44 h-44 shrink-0 flex items-center justify-center">
        <svg class="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          <!-- Background Track Outer (Calories) -->
          <circle
            cx="80"
            cy="80"
            :r="calRadius"
            stroke="currentColor"
            stroke-width="10"
            fill="transparent"
            class="text-white/5"
          />
          <!-- Progress Outer (Calories) -->
          <circle
            cx="80"
            cy="80"
            :r="calRadius"
            stroke="var(--tw-color-brand-accent, #ccff00)"
            stroke-width="10"
            stroke-linecap="round"
            fill="transparent"
            :stroke-dasharray="calCircumference"
            :stroke-dashoffset="calStrokeDashoffset"
            class="transition-all duration-1000 ease-out"
          />

          <!-- Background Track Inner (Protein) -->
          <circle
            cx="80"
            cy="80"
            :r="proRadius"
            stroke="currentColor"
            stroke-width="8"
            fill="transparent"
            class="text-white/5"
          />
          <!-- Progress Inner (Protein) -->
          <circle
            cx="80"
            cy="80"
            :r="proRadius"
            stroke="#38bdf8"
            stroke-width="8"
            stroke-linecap="round"
            fill="transparent"
            :stroke-dasharray="proCircumference"
            :stroke-dashoffset="proStrokeDashoffset"
            class="transition-all duration-1000 ease-out"
          />
        </svg>

        <!-- Center Numbers -->
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
          <span class="font-heading font-black text-2xl text-white tracking-tight leading-none">
            {{ consumedCalories }}
          </span>
          <span class="text-[9px] uppercase font-bold text-gray-400 mt-0.5">/ {{ targetCalories }} kcal</span>
          <span class="text-[10px] font-bold text-brand-accent mt-0.5">{{ calPercent }}% Goal</span>
        </div>
      </div>

      <!-- Macro Details Grid -->
      <div class="w-full space-y-3">
        <!-- Protein Bar -->
        <div class="bg-brand-dark/80 rounded-xl p-2.5 border border-white/5">
          <div class="flex items-center justify-between text-xs mb-1.5">
            <span class="font-bold text-sky-400 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-sky-400"></span>
              Protein Target
            </span>
            <span class="font-mono font-bold text-white">
              {{ consumedProtein }}g <span class="text-gray-500 font-normal">/ {{ targetProtein }}g</span>
            </span>
          </div>
          <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              class="h-full bg-sky-400 rounded-full transition-all duration-700" 
              :style="{ width: `${proPercent}%` }"
            ></div>
          </div>
        </div>

        <!-- Carbs Bar -->
        <div class="bg-brand-dark/80 rounded-xl p-2.5 border border-white/5">
          <div class="flex items-center justify-between text-xs mb-1.5">
            <span class="font-bold text-amber-400 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-amber-400"></span>
              Carbohydrates
            </span>
            <span class="font-mono font-bold text-white">
              {{ consumedCarbs }}g <span class="text-gray-500 font-normal">/ {{ targetCarbs }}g</span>
            </span>
          </div>
          <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              class="h-full bg-amber-400 rounded-full transition-all duration-700" 
              :style="{ width: `${carbPercent}%` }"
            ></div>
          </div>
        </div>

        <!-- Fats Bar -->
        <div class="bg-brand-dark/80 rounded-xl p-2.5 border border-white/5">
          <div class="flex items-center justify-between text-xs mb-1.5">
            <span class="font-bold text-rose-400 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-rose-400"></span>
              Healthy Fats
            </span>
            <span class="font-mono font-bold text-white">
              {{ consumedFat }}g <span class="text-gray-500 font-normal">/ {{ targetFat }}g</span>
            </span>
          </div>
          <div class="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              class="h-full bg-rose-400 rounded-full transition-all duration-700" 
              :style="{ width: `${fatPercent}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
