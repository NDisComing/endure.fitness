<script setup lang="ts">
import { ref } from 'vue'
import { useEndureStore, type Exercise } from '~/composables/useEndureStore'
import ExerciseCard from '~/components/workout/ExerciseCard.vue'
import VideoPlayerModal from '~/components/workout/VideoPlayerModal.vue'

definePageMeta({
  layout: 'client',
  middleware: ['auth']
})

useHead({
  title: 'Assigned Workouts & Video Hub | EndureFitness PWA',
  meta: [
    { name: 'description', content: 'Coach Marcus assigned workout routines with HD biomechanical video cues and set weight tracking.' }
  ]
})

const store = useEndureStore()

const splits = [
  { id: 'push', title: 'Push Day A', focus: 'Chest, Delts & Triceps', day: 'Monday' },
  { id: 'pull', title: 'Pull Day A', focus: 'Lats, Traps & Biceps', day: 'Wednesday' },
  { id: 'legs', title: 'Lower Body', focus: 'Quads, Glutes & Hamstrings', day: 'Friday' }
]

const activeSplitId = ref('push')
const selectedExerciseForVideo = ref<Exercise | null>(null)

const openVideo = (ex: Exercise) => {
  selectedExerciseForVideo.value = ex
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <span class="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Training Routine</span>
      <h2 class="font-heading font-black text-xl uppercase tracking-tight text-white">Assigned Workouts</h2>
      <p class="text-xs text-gray-400 mt-0.5">Biomechanical video cues & progressive set tracking</p>
    </div>

    <!-- Split Day Selector Tabs -->
    <div class="flex gap-2 overflow-x-auto pb-1">
      <button
        v-for="split in splits"
        :key="split.id"
        @click="activeSplitId = split.id"
        class="py-2.5 px-4 rounded-xl text-left border transition-all shrink-0"
        :class="activeSplitId === split.id 
          ? 'bg-brand-accent text-black border-brand-accent font-bold shadow-[0_0_15px_rgba(204,255,0,0.3)]' 
          : 'bg-brand-gray border-white/10 text-gray-300 hover:border-white/30'"
      >
        <p class="text-[10px] uppercase opacity-75 font-semibold">{{ split.day }}</p>
        <p class="font-heading font-black text-xs uppercase mt-0.5">{{ split.title }}</p>
      </button>
    </div>

    <!-- Workout Routine Overview Banner -->
    <div class="bg-brand-gray border border-white/10 rounded-2xl p-4 flex items-center justify-between">
      <div>
        <h3 class="font-heading font-black text-base text-white">
          {{ splits.find(s => s.id === activeSplitId)?.title }}
        </h3>
        <p class="text-xs text-gray-400">
          Focus: {{ splits.find(s => s.id === activeSplitId)?.focus }}
        </p>
      </div>

      <span class="bg-brand-accent/20 border border-brand-accent/40 text-brand-accent text-xs font-bold px-3 py-1 rounded-full">
        {{ store.exercisesList.value.length }} Exercises
      </span>
    </div>

    <!-- Exercise Cards List -->
    <div class="space-y-4">
      <ExerciseCard
        v-for="(exercise, index) in store.exercisesList.value"
        :key="exercise.id"
        :exercise="exercise"
        :index="index"
        @playVideo="openVideo"
      />
    </div>

    <!-- Video Modal Player -->
    <VideoPlayerModal
      v-if="selectedExerciseForVideo"
      :exercise="selectedExerciseForVideo"
      @close="selectedExerciseForVideo = null"
    />
  </div>
</template>
