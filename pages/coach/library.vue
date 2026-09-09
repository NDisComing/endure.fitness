<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEndureStore, type Exercise } from '~/composables/useEndureStore'

definePageMeta({
  layout: 'coach',
  middleware: ['auth']
})

useHead({
  title: 'Exercise & Video Content CMS | EndureFitness Admin',
  meta: [
    { name: 'description', content: 'Manage the exercise movement library, video hosting URLs, and reusable client workout splits.' }
  ]
})

const store = useEndureStore()

const selectedCategory = ref<string>('all')
const showAddModal = ref(false)

const categories = ['all', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'] as const

const filteredExercises = computed(() => {
  if (selectedCategory.value === 'all') return store.exercisesList.value
  return store.exercisesList.value.filter(ex => ex.category === selectedCategory.value)
})

// New Exercise Form
const newEx = ref({
  title: '',
  category: 'Chest' as 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core',
  video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  instructions: '',
  form_cues_raw: 'Brace core, control eccentric, drive forcefully',
  target_sets: 4,
  target_reps: '8 - 10 reps',
  rest_seconds: 90
})

const handleCreateExercise = () => {
  if (!newEx.value.title || !newEx.value.video_url) return

  store.addExercise({
    title: newEx.value.title,
    category: newEx.value.category,
    video_url: newEx.value.video_url,
    instructions: newEx.value.instructions,
    form_cues: newEx.value.form_cues_raw.split(',').map(s => s.trim()),
    target_sets: newEx.value.target_sets,
    target_reps: newEx.value.target_reps,
    rest_seconds: newEx.value.rest_seconds
  })

  showAddModal.value = false
  newEx.value.title = ''
  newEx.value.instructions = ''
}
</script>

<template>
  <div class="space-y-6 max-w-6xl">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <span class="text-xs font-bold text-brand-accent uppercase tracking-widest">Exercise & Video CMS</span>
        <h1 class="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-brand-charcoal">
          Movement Video Library
        </h1>
      </div>

      <button
        @click="showAddModal = true"
        class="bg-brand-accent text-white font-heading font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl hover:bg-brand-charcoal transition-all shadow-[0_4px_15px_rgba(250,129,18,0.35)] flex items-center gap-1.5 self-start sm:self-auto"
      >
        <Icon name="ph:plus-bold" class="w-4 h-4" />
        <span>Add New Exercise</span>
      </button>
    </div>

    <!-- Category Filter Tabs -->
    <div class="flex gap-2 overflow-x-auto pb-1">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        class="py-2 px-3.5 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap border shadow-sm"
        :class="selectedCategory === cat 
          ? 'bg-brand-accent text-white border-brand-accent shadow-sm' 
          : 'bg-brand-gray border-brand-charcoal/15 text-brand-charcoal hover:border-brand-accent'"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Exercise Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="exercise in filteredExercises"
        :key="exercise.id"
        class="bg-brand-gray border border-brand-charcoal/10 rounded-3xl p-5 shadow-md space-y-4 hover:border-brand-charcoal/25 transition-all flex flex-col justify-between"
      >
        <div>
          <!-- Video Preview Box -->
          <div class="aspect-video bg-black rounded-2xl overflow-hidden relative mb-4 border border-brand-charcoal/10 group shadow-sm">
            <video 
              :src="exercise.video_url" 
              muted 
              class="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
            ></video>
            <div class="absolute top-2 left-2 bg-brand-dark/90 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-bold text-brand-accent uppercase border border-brand-charcoal/10">
              {{ exercise.category }}
            </div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-10 h-10 rounded-full bg-brand-accent text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Icon name="ph:play-fill" class="w-5 h-5 ml-0.5" />
              </div>
            </div>
          </div>

          <h3 class="font-heading font-black text-lg text-brand-charcoal mb-1 leading-tight">
            {{ exercise.title }}
          </h3>
          <p class="text-xs text-brand-charcoal/70 line-clamp-2 leading-relaxed mb-3">
            {{ exercise.instructions }}
          </p>

          <!-- Form Cues Chips -->
          <div class="space-y-1">
            <span class="text-[10px] uppercase font-bold text-brand-charcoal/60">Key Form Cues:</span>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="(cue, cIdx) in exercise.form_cues.slice(0, 2)" 
                :key="cIdx"
                class="bg-brand-dark text-[10px] text-brand-charcoal px-2 py-0.5 rounded border border-brand-charcoal/10 shadow-sm"
              >
                {{ cue }}
              </span>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-brand-charcoal/10 flex items-center justify-between text-xs text-brand-charcoal/60 font-mono">
          <span>{{ exercise.target_sets }} Sets × {{ exercise.target_reps }}</span>
          <span>Rest: {{ exercise.rest_seconds }}s</span>
        </div>
      </div>
    </div>

    <!-- Add New Exercise Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="showAddModal = false"></div>

      <div class="relative w-full max-w-xl bg-brand-gray border border-brand-charcoal/15 rounded-3xl p-6 shadow-2xl z-10 space-y-4 max-h-[92vh] overflow-y-auto">
        <div class="flex items-center justify-between pb-3 border-b border-brand-charcoal/10">
          <div>
            <span class="text-xs font-bold text-brand-accent uppercase">Exercise CMS</span>
            <h3 class="font-heading font-black text-xl text-brand-charcoal">Add Movement to Library</h3>
          </div>
          <button @click="showAddModal = false" class="text-brand-charcoal/60 hover:text-brand-charcoal">
            <Icon name="ph:x-bold" class="w-5 h-5" />
          </button>
        </div>

        <div class="space-y-3 text-xs">
          <div>
            <label class="font-bold text-brand-charcoal/80 uppercase block mb-1">Exercise Title *</label>
            <input 
              v-model="newEx.title" 
              type="text" 
              placeholder="e.g. Incline Dumbbell Bench Press" 
              class="w-full bg-brand-dark border border-brand-charcoal/15 rounded-xl px-3 py-2 text-brand-charcoal focus:outline-none focus:border-brand-accent shadow-sm"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="font-bold text-brand-charcoal/80 uppercase block mb-1">Target Muscle Group</label>
              <select 
                v-model="newEx.category" 
                class="w-full bg-brand-dark border border-brand-charcoal/15 rounded-xl px-3 py-2 text-brand-charcoal focus:outline-none focus:border-brand-accent shadow-sm"
              >
                <option value="Chest">Chest</option>
                <option value="Back">Back</option>
                <option value="Legs">Legs</option>
                <option value="Shoulders">Shoulders</option>
                <option value="Arms">Arms</option>
                <option value="Core">Core</option>
              </select>
            </div>

            <div>
              <label class="font-bold text-brand-charcoal/80 uppercase block mb-1">Video Stream URL (MP4 / Cloudflare)</label>
              <input 
                v-model="newEx.video_url" 
                type="text" 
                class="w-full bg-brand-dark border border-brand-charcoal/15 rounded-xl px-3 py-2 text-brand-charcoal font-mono focus:outline-none focus:border-brand-accent shadow-sm"
              />
            </div>
          </div>

          <div>
            <label class="font-bold text-brand-charcoal/80 uppercase block mb-1">Biomechanical Instructions</label>
            <textarea 
              v-model="newEx.instructions" 
              rows="2" 
              placeholder="Setup, scapular positioning, elbow angle, bar path..."
              class="w-full bg-brand-dark border border-brand-charcoal/15 rounded-xl p-2.5 text-brand-charcoal focus:outline-none focus:border-brand-accent shadow-sm"
            ></textarea>
          </div>

          <div>
            <label class="font-bold text-brand-charcoal/80 uppercase block mb-1">Form Cues (Comma-Separated)</label>
            <input 
              v-model="newEx.form_cues_raw" 
              type="text" 
              placeholder="Drive heels into floor, 1s chest pause, tuck elbows 45 deg"
              class="w-full bg-brand-dark border border-brand-charcoal/15 rounded-xl px-3 py-2 text-brand-charcoal focus:outline-none focus:border-brand-accent shadow-sm"
            />
          </div>

          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="font-bold text-brand-charcoal/80 uppercase block mb-1">Target Sets</label>
              <input 
                v-model.number="newEx.target_sets" 
                type="number" 
                class="w-full bg-brand-dark border border-brand-charcoal/15 rounded-xl p-2 text-brand-charcoal text-center font-mono shadow-sm"
              />
            </div>
            <div>
              <label class="font-bold text-brand-charcoal/80 uppercase block mb-1">Rep Scheme</label>
              <input 
                v-model="newEx.target_reps" 
                type="text" 
                class="w-full bg-brand-dark border border-brand-charcoal/15 rounded-xl p-2 text-brand-charcoal text-center font-mono shadow-sm"
              />
            </div>
            <div>
              <label class="font-bold text-brand-charcoal/80 uppercase block mb-1">Rest Seconds</label>
              <input 
                v-model.number="newEx.rest_seconds" 
                type="number" 
                class="w-full bg-brand-dark border border-brand-charcoal/15 rounded-xl p-2 text-brand-charcoal text-center font-mono shadow-sm"
              />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end gap-3 pt-3">
          <button @click="showAddModal = false" class="px-4 py-2 rounded-xl text-xs font-bold text-brand-charcoal/70 hover:text-brand-charcoal">
            Cancel
          </button>
          <button 
            @click="handleCreateExercise" 
            class="bg-brand-accent text-white font-heading font-black text-xs uppercase px-5 py-2.5 rounded-xl hover:bg-brand-charcoal transition-all shadow-[0_4px_15px_rgba(250,129,18,0.35)]"
          >
            Save Movement
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
