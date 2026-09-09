<script setup lang="ts">
import { ref } from 'vue'
import { useEndureStore } from '~/composables/useEndureStore'

definePageMeta({
  layout: 'coach',
  middleware: ['auth']
})

useHead({
  title: 'Daily Meal Review Stream | EndureFitness Admin',
  meta: [
    { name: 'description', content: 'Audit client meal photos in real time and deliver 1-click coach feedback.' }
  ]
})

const store = useEndureStore()

const quickComments = [
  'Great protein portion, let’s add more greens tomorrow!',
  'Approved — spot on with your pre-workout carbs.',
  'Looks solid. Make sure you hit your 3.5L water target today.',
  'A bit high in added oils, but great lean protein choice.'
]

const customCommentInputs = ref<Record<string, string>>({})

const applyQuickComment = (mealId: string, comment: string) => {
  store.addCoachMealComment(mealId, comment)
}

const submitCustomComment = (mealId: string) => {
  const comment = customCommentInputs.value[mealId]
  if (!comment) return
  store.addCoachMealComment(mealId, comment)
  customCommentInputs.value[mealId] = ''
}
</script>

<template>
  <div class="space-y-6 max-w-5xl">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-brand-accent uppercase tracking-widest">Live Client Nutrition Stream</span>
        <h1 class="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
          Daily Photo Audit Feed
        </h1>
      </div>

      <div class="flex items-center gap-2 bg-brand-gray border border-white/10 px-3 py-1.5 rounded-xl text-xs">
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span class="text-white font-bold">{{ store.mealLogsList.value.length }}</span>
        <span class="text-gray-400">Total Uploads</span>
      </div>
    </div>

    <!-- Feed Stream -->
    <div class="space-y-6">
      <div 
        v-for="meal in store.mealLogsList.value"
        :key="meal.id"
        class="bg-brand-gray border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 hover:border-white/20 transition-all"
      >
        <!-- Client Profile & Timestamp -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img 
              :src="meal.client_avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'" 
              :alt="meal.client_name || 'Client'"
              class="w-10 h-10 rounded-full object-cover border-2 border-brand-accent/40"
            />
            <div>
              <p class="font-heading font-bold text-sm text-white">{{ meal.client_name }}</p>
              <p class="text-[11px] text-gray-400">
                {{ meal.meal_type }} • {{ new Date(meal.logged_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
              </p>
            </div>
          </div>

          <span 
            v-if="meal.is_approved"
            class="bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-heading font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1.5"
          >
            <Icon name="ph:check-bold" class="w-3.5 h-3.5" />
            <span>Audit Approved</span>
          </span>
          <span 
            v-else
            class="bg-amber-500/10 border border-amber-500/40 text-amber-400 font-heading font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1.5"
          >
            <Icon name="ph:hourglass-bold" class="w-3.5 h-3.5" />
            <span>Pending Review</span>
          </span>
        </div>

        <!-- Meal Photo & Macro Grid -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <!-- Meal Photo -->
          <div class="md:col-span-4">
            <img 
              :src="meal.image_url" 
              :alt="meal.meal_type" 
              class="w-full aspect-[4/3] rounded-2xl object-cover border border-white/10 shadow-lg"
            />
          </div>

          <!-- Items Breakdown & Calculated Macros -->
          <div class="md:col-span-8 space-y-3">
            <div class="grid grid-cols-4 gap-2 bg-brand-dark p-3.5 rounded-2xl border border-white/5 text-center">
              <div>
                <p class="text-[9px] uppercase font-bold text-gray-400">Total Kcal</p>
                <p class="font-heading font-black text-lg text-brand-accent">{{ meal.total_calories }}</p>
              </div>
              <div>
                <p class="text-[9px] uppercase font-bold text-gray-400">Protein</p>
                <p class="font-heading font-black text-lg text-sky-400">{{ meal.total_protein }}g</p>
              </div>
              <div>
                <p class="text-[9px] uppercase font-bold text-gray-400">Carbs</p>
                <p class="font-heading font-black text-lg text-amber-400">{{ meal.total_carbs }}g</p>
              </div>
              <div>
                <p class="text-[9px] uppercase font-bold text-gray-400">Fats</p>
                <p class="font-heading font-black text-lg text-rose-400">{{ meal.total_fat }}g</p>
              </div>
            </div>

            <!-- Itemized list -->
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="(item, idx) in meal.items"
                :key="idx"
                class="bg-brand-dark px-2.5 py-1 rounded-lg text-xs text-gray-300 border border-white/5"
              >
                {{ item.name }} • <span class="font-bold text-white">{{ item.grams }}g</span> ({{ item.calories }} kcal)
              </span>
            </div>
          </div>
        </div>

        <!-- Coach Review & 1-Click Approval Toolbar -->
        <div class="bg-brand-dark/80 rounded-2xl p-4 border border-white/10 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Icon name="ph:chat-circle-dots-bold" class="w-4 h-4 text-brand-accent" />
              1-Click Coach Feedback
            </span>

            <button
              @click="store.approveMeal(meal.id, 'Great protein portion, let’s add more greens tomorrow!')"
              class="bg-brand-accent text-black font-heading font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-lg hover:bg-white transition-all shadow-[0_0_10px_rgba(204,255,0,0.3)]"
            >
              1-Click Approve
            </button>
          </div>

          <!-- Quick comment buttons -->
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="(qc, qIdx) in quickComments"
              :key="qIdx"
              @click="applyQuickComment(meal.id, qc)"
              class="text-[11px] bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white px-2.5 py-1 rounded-lg border border-white/5 transition-all text-left"
            >
              + "{{ qc }}"
            </button>
          </div>

          <!-- Current active comment if any -->
          <div v-if="meal.coach_comment" class="p-2.5 rounded-xl bg-brand-gray border border-brand-accent/30 text-xs text-brand-accent italic flex items-center justify-between">
            <span>Coach Note: "{{ meal.coach_comment }}"</span>
            <span class="text-[10px] text-gray-400 not-italic font-bold">✓ Applied</span>
          </div>

          <!-- Custom Comment Input -->
          <div class="flex gap-2 pt-1">
            <input 
              v-model="customCommentInputs[meal.id]"
              type="text"
              placeholder="Write a custom coach critique or suggestion..."
              @keyup.enter="submitCustomComment(meal.id)"
              class="flex-1 bg-brand-gray border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
            />
            <button
              @click="submitCustomComment(meal.id)"
              class="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shrink-0"
            >
              Send Critique
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
