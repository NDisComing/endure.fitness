<script setup lang="ts">
import { ref } from 'vue'
import { useEndureStore } from '~/composables/useEndureStore'

definePageMeta({
  layout: 'client',
  middleware: ['auth']
})

useHead({
  title: 'Progress Metrics & Check-Ins | EndureFitness PWA',
  meta: [
    { name: 'description', content: 'Submit weekly body weight, body fat %, and check-in photos for Coach Marcus audit.' }
  ]
})

const store = useEndureStore()

const weightInput = ref<number | ''>('')
const bodyFatInput = ref<number | ''>('')
const notesInput = ref('')
const successMessage = ref('')

const handleAddMetric = () => {
  if (!weightInput.value) return
  store.addMetricEntry(
    Number(weightInput.value),
    bodyFatInput.value ? Number(bodyFatInput.value) : undefined,
    notesInput.value
  )
  weightInput.value = ''
  bodyFatInput.value = ''
  notesInput.value = ''
  successMessage.value = 'Check-in metric logged successfully!'
  setTimeout(() => successMessage.value = '', 4000)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <span class="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Progress Visualizer</span>
      <h2 class="font-heading font-black text-xl uppercase tracking-tight text-brand-charcoal">Metrics & Weigh-Ins</h2>
      <p class="text-xs text-brand-charcoal/70 mt-0.5">Weekly scale weight, body fat %, and check-in history</p>
    </div>

    <!-- Quick Form -->
    <div class="bg-brand-gray border border-brand-charcoal/10 rounded-3xl p-5 space-y-4 shadow-sm">
      <h3 class="font-heading font-black text-sm uppercase text-brand-charcoal flex items-center gap-2">
        <Icon name="ph:scales-bold" class="w-4 h-4 text-brand-accent" />
        <span>Submit Weekly Check-In</span>
      </h3>

      <div v-if="successMessage" class="p-3 bg-emerald-500/15 border border-emerald-500 rounded-xl text-xs text-emerald-800 flex items-center gap-2 font-medium">
        <Icon name="ph:check-circle-bold" class="w-4 h-4" />
        <span>{{ successMessage }}</span>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="space-y-1">
          <label class="text-[10px] uppercase font-bold text-brand-charcoal/70">Scale Weight (kg) *</label>
          <input 
            v-model.number="weightInput"
            type="number"
            step="0.1"
            placeholder="84.2"
            class="w-full bg-brand-dark border border-brand-charcoal/15 rounded-xl px-3 py-2 text-sm font-mono text-brand-charcoal focus:outline-none focus:border-brand-accent shadow-sm"
          />
        </div>

        <div class="space-y-1">
          <label class="text-[10px] uppercase font-bold text-brand-charcoal/70">Body Fat % (optional)</label>
          <input 
            v-model.number="bodyFatInput"
            type="number"
            step="0.1"
            placeholder="16.5"
            class="w-full bg-brand-dark border border-brand-charcoal/15 rounded-xl px-3 py-2 text-sm font-mono text-brand-charcoal focus:outline-none focus:border-brand-accent shadow-sm"
          />
        </div>
      </div>

      <div class="space-y-1">
        <label class="text-[10px] uppercase font-bold text-brand-charcoal/70">Coach Notes & Energy Check</label>
        <input 
          v-model="notesInput"
          type="text"
          placeholder="e.g. Energy great, hit 10k steps daily, sleep 8h..."
          class="w-full bg-brand-dark border border-brand-charcoal/15 rounded-xl px-3 py-2 text-xs text-brand-charcoal focus:outline-none focus:border-brand-accent shadow-sm"
        />
      </div>

      <button
        @click="handleAddMetric"
        :disabled="!weightInput"
        class="w-full bg-brand-accent text-white font-heading font-black text-xs uppercase tracking-wider py-3 rounded-xl hover:bg-brand-charcoal transition-all shadow-[0_4px_15px_rgba(250,129,18,0.35)] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Log Check-In
      </button>
    </div>

    <!-- Progress History Table -->
    <div class="bg-brand-gray border border-brand-charcoal/10 rounded-3xl p-5 space-y-3 shadow-sm">
      <div class="flex items-center justify-between">
        <h3 class="font-heading font-bold text-sm uppercase text-brand-charcoal">Weigh-In Trend History</h3>
        <span class="text-xs text-brand-accent font-mono font-bold">
          -2.3 kg Total
        </span>
      </div>

      <div class="space-y-2">
        <div 
          v-for="entry in store.metricsHistory.value.slice().reverse()" 
          :key="entry.id"
          class="bg-brand-dark border border-brand-charcoal/10 rounded-xl p-3 flex items-center justify-between text-xs shadow-sm"
        >
          <div>
            <p class="font-mono font-bold text-brand-charcoal text-sm">
              {{ entry.weight_kg }} kg
              <span v-if="entry.body_fat_percentage" class="text-xs font-normal text-sky-700 ml-1">
                ({{ entry.body_fat_percentage }}% BF)
              </span>
            </p>
            <p v-if="entry.notes" class="text-[11px] text-brand-charcoal/70 mt-0.5">{{ entry.notes }}</p>
          </div>

          <span class="text-[10px] font-mono text-brand-charcoal/50">
            {{ entry.date }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
