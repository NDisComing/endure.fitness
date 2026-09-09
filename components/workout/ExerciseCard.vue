<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Exercise } from '~/composables/useEndureStore'
import { useEndureStore } from '~/composables/useEndureStore'

const props = defineProps<{
  exercise: Exercise
  index: number
}>()

const emit = defineEmits<{
  (e: 'playVideo', ex: Exercise): void
}>()

const store = useEndureStore()

// Sets state initialized for target_sets
const setsData = ref<Array<{ setNum: number; weight: number; reps: number; completed: boolean }>>(
  Array.from({ length: props.exercise.target_sets }, (_, i) => ({
    setNum: i + 1,
    weight: i === 0 ? 30 : 32 + i * 2,
    reps: 10,
    completed: i === 0 // 1st set completed for demo
  }))
)

const isAllCompleted = computed(() => setsData.value.every(s => s.completed))

const toggleSet = (idx: number) => {
  setsData.value[idx].completed = !setsData.value[idx].completed
  store.toggleSetComplete(props.exercise.id, idx, setsData.value[idx].weight, setsData.value[idx].reps)
}
</script>

<template>
  <div 
    class="bg-brand-gray border rounded-2xl p-5 transition-all duration-300 relative overflow-hidden shadow-sm"
    :class="isAllCompleted ? 'border-brand-accent/60 shadow-[0_4px_20px_rgba(250,129,18,0.2)]' : 'border-brand-charcoal/10 hover:border-brand-charcoal/25'"
  >
    <!-- Top Header -->
    <div class="flex items-start justify-between gap-3 mb-4">
      <div class="flex items-start gap-3">
        <span class="w-7 h-7 rounded-lg bg-brand-dark border border-brand-charcoal/10 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-brand-charcoal">
          0{{ index + 1 }}
        </span>
        <div>
          <div class="flex items-center gap-2 mb-0.5">
            <span class="text-[10px] font-bold text-brand-accent uppercase tracking-wider">{{ exercise.category }}</span>
            <span class="text-brand-charcoal/40">•</span>
            <span class="text-[11px] text-brand-charcoal/70">{{ exercise.target_sets }} Sets × {{ exercise.target_reps }}</span>
          </div>
          <h4 class="font-heading font-black text-lg text-brand-charcoal leading-tight">
            {{ exercise.title }}
          </h4>
        </div>
      </div>

      <!-- Video Watch Button -->
      <button
        @click="emit('playVideo', exercise)"
        class="bg-brand-dark hover:bg-brand-sand/80 text-brand-accent border border-brand-accent/40 hover:border-brand-accent p-2 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold shrink-0 shadow-sm"
        title="Watch Form Video & Cues"
      >
        <Icon name="ph:play-fill" class="w-4 h-4" />
        <span class="hidden sm:inline text-[11px]">Form Video</span>
      </button>
    </div>

    <!-- Sets Logger Table -->
    <div class="bg-brand-dark rounded-xl p-3 border border-brand-charcoal/10 space-y-2 shadow-sm">
      <div class="grid grid-cols-12 text-[10px] uppercase font-bold text-brand-charcoal/60 px-2 pb-1 border-b border-brand-charcoal/10">
        <span class="col-span-2">Set</span>
        <span class="col-span-4 text-center">Load (kg)</span>
        <span class="col-span-3 text-center">Reps</span>
        <span class="col-span-3 text-right">Log</span>
      </div>

      <div 
        v-for="(set, idx) in setsData"
        :key="idx"
        class="grid grid-cols-12 items-center px-2 py-1.5 rounded-lg transition-colors"
        :class="set.completed ? 'bg-brand-accent/15 border border-brand-accent/40' : 'hover:bg-brand-charcoal/5'"
      >
        <span class="col-span-2 font-mono text-xs font-bold text-brand-charcoal">#{{ set.setNum }}</span>
        
        <div class="col-span-4 flex justify-center">
          <input 
            v-model.number="set.weight" 
            type="number"
            class="w-16 bg-brand-gray border border-brand-charcoal/15 rounded-md py-1 text-center font-mono text-xs font-bold text-brand-charcoal focus:outline-none focus:border-brand-accent"
          />
        </div>

        <div class="col-span-3 flex justify-center">
          <input 
            v-model.number="set.reps" 
            type="number"
            class="w-12 bg-brand-gray border border-brand-charcoal/15 rounded-md py-1 text-center font-mono text-xs font-bold text-brand-charcoal focus:outline-none focus:border-brand-accent"
          />
        </div>

        <div class="col-span-3 flex justify-end">
          <button
            @click="toggleSet(idx)"
            class="w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-200"
            :class="set.completed ? 'bg-brand-accent border-brand-accent text-white shadow-sm' : 'border-brand-charcoal/20 text-brand-charcoal/40 hover:border-brand-charcoal/40'"
          >
            <Icon name="ph:check-bold" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
