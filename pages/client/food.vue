<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEndureStore, type MealLog } from '~/composables/useEndureStore'
import CameraCaptureModal from '~/components/food/CameraCaptureModal.vue'
import MealReviewModal from '~/components/food/MealReviewModal.vue'

definePageMeta({
  layout: 'client',
  middleware: ['auth']
})

useHead({
  title: 'AI Food Scanner & Nutrition Diary | EndureFitness PWA',
  meta: [
    { name: 'description', content: 'Log and scan meals using Google Gemini Flash vision AI. Track protein, calories, and coach meal feedback.' }
  ]
})

const store = useEndureStore()

// AI Scanner State
const showCamera = ref(false)
const showReview = ref(false)
const scannedImageUrl = ref('')
const scannedMealType = ref<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'>('Lunch')
const initialParsedItems = ref<any[]>([])
const aiCoachTip = ref('')

const handlePhotoCaptured = async (payload: { imageBase64: string; mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' }) => {
  scannedImageUrl.value = payload.imageBase64
  scannedMealType.value = payload.mealType
  showCamera.value = false

  try {
    const res: any = await $fetch('/api/ai/scan-food', {
      method: 'POST',
      body: {
        imageBase64: payload.imageBase64,
        mealType: payload.mealType
      }
    })

    if (res?.data) {
      initialParsedItems.value = res.data.items || []
      aiCoachTip.value = res.data.coachTip || ''
      showReview.value = true
    }
  } catch (err) {
    console.error('Food scanning error:', err)
  }
}

const handleMealSaved = (payload: any) => {
  store.addMeal(payload)
  showReview.value = false
}

// Group meals by category
const mealCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const

const getMealsByCategory = (category: string) => {
  return store.todayMeals.value.filter(m => m.meal_type === category)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header with AI Camera Trigger -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-widest text-brand-accent">Nutrition Intake</span>
        <h2 class="font-heading font-black text-xl uppercase tracking-tight text-white">Daily Meal Diary</h2>
      </div>

      <button
        @click="showCamera = true"
        class="bg-brand-accent text-black font-heading font-black text-xs uppercase tracking-wider px-3.5 py-2 rounded-xl hover:bg-white transition-all shadow-[0_0_15px_rgba(204,255,0,0.3)] flex items-center gap-1.5 active:scale-95"
      >
        <Icon name="ph:camera-fill" class="w-4 h-4" />
        <span>Scan Food</span>
      </button>
    </div>

    <!-- Daily Caloric Summary Banner -->
    <div class="bg-brand-gray border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
      <div>
        <p class="text-[10px] uppercase font-bold text-gray-400">Total Consumed Today</p>
        <p class="font-heading font-black text-2xl text-white">
          {{ store.nutritionTotals.value.calories }} <span class="text-xs font-sans text-gray-400 font-normal">/ {{ store.currentUser.value.target_calories }} kcal</span>
        </p>
      </div>

      <div class="flex items-center gap-3 text-right font-mono text-xs">
        <div>
          <span class="text-[10px] text-gray-400 block">Protein</span>
          <span class="font-bold text-sky-400">{{ store.nutritionTotals.value.protein }}g</span>
        </div>
        <div>
          <span class="text-[10px] text-gray-400 block">Carbs</span>
          <span class="font-bold text-amber-400">{{ store.nutritionTotals.value.carbs }}g</span>
        </div>
        <div>
          <span class="text-[10px] text-gray-400 block">Fat</span>
          <span class="font-bold text-rose-400">{{ store.nutritionTotals.value.fat }}g</span>
        </div>
      </div>
    </div>

    <!-- Categorized Meal Groups (Breakfast, Lunch, Dinner, Snack) -->
    <div class="space-y-6">
      <div 
        v-for="category in mealCategories"
        :key="category"
        class="space-y-3"
      >
        <div class="flex items-center justify-between px-1">
          <h3 class="font-heading font-bold text-sm uppercase text-gray-300 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-brand-accent"></span>
            {{ category }}
          </h3>
          <span class="text-[11px] font-mono text-gray-400">
            {{ getMealsByCategory(category).reduce((sum, m) => sum + m.total_calories, 0) }} kcal
          </span>
        </div>

        <!-- Meals in this category -->
        <div v-if="getMealsByCategory(category).length > 0" class="space-y-3">
          <div
            v-for="meal in getMealsByCategory(category)"
            :key="meal.id"
            class="bg-brand-gray border border-white/10 rounded-2xl p-4 space-y-3 hover:border-white/20 transition-colors"
          >
            <div class="flex gap-3">
              <img 
                :src="meal.image_url" 
                :alt="meal.meal_type" 
                class="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
              />
              <div class="flex-grow">
                <div class="flex items-center justify-between">
                  <h4 class="font-heading font-black text-sm text-white">
                    {{ meal.items[0]?.name || meal.meal_type }}
                  </h4>
                  <span class="font-mono font-bold text-xs text-brand-accent">
                    {{ meal.total_calories }} kcal
                  </span>
                </div>

                <!-- Macro breakdown pill -->
                <div class="flex gap-2 text-[10px] text-gray-400 mt-1 font-mono">
                  <span class="text-sky-400">P: {{ meal.total_protein }}g</span>
                  <span>•</span>
                  <span class="text-amber-400">C: {{ meal.total_carbs }}g</span>
                  <span>•</span>
                  <span class="text-rose-400">F: {{ meal.total_fat }}g</span>
                </div>
              </div>
            </div>

            <!-- Itemized Ingredients Chips -->
            <div class="flex flex-wrap gap-1.5 pt-1">
              <span
                v-for="(item, i) in meal.items"
                :key="i"
                class="bg-brand-dark px-2 py-0.5 rounded-md text-[10px] text-gray-300 border border-white/5"
              >
                {{ item.name }} ({{ item.grams }}g)
              </span>
            </div>

            <!-- Coach Review Status / Comment -->
            <div 
              v-if="meal.coach_comment || meal.is_approved"
              class="p-2.5 rounded-xl bg-brand-dark/90 border border-brand-accent/20 text-xs space-y-1"
            >
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold text-brand-accent uppercase tracking-wider flex items-center gap-1">
                  <Icon name="ph:check-circle-fill" class="w-3.5 h-3.5 text-brand-accent" />
                  Coach Marcus Reviewed
                </span>
                <span class="text-[9px] text-gray-500 font-mono">Verified</span>
              </div>
              <p v-if="meal.coach_comment" class="text-[11px] text-gray-300 italic">
                "{{ meal.coach_comment }}"
              </p>
            </div>
          </div>
        </div>

        <!-- Empty category placeholder -->
        <div 
          v-else
          class="p-4 rounded-xl border border-dashed border-white/10 text-center text-xs text-gray-500 flex items-center justify-between"
        >
          <span>No {{ category.toLowerCase() }} logged yet</span>
          <button 
            @click="showCamera = true; scannedMealType = category"
            class="text-brand-accent hover:underline font-bold text-[11px]"
          >
            + Snap Photo
          </button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <CameraCaptureModal
      v-if="showCamera"
      @captured="handlePhotoCaptured"
      @close="showCamera = false"
    />

    <MealReviewModal
      v-if="showReview"
      :imageUrl="scannedImageUrl"
      :mealType="scannedMealType"
      :initialItems="initialParsedItems"
      :coachTip="aiCoachTip"
      @save="handleMealSaved"
      @cancel="showReview = false"
    />
  </div>
</template>
