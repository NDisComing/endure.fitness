<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useEndureStore } from '~/composables/useEndureStore'
import MacroRings from '~/components/food/MacroRings.vue'
import CameraCaptureModal from '~/components/food/CameraCaptureModal.vue'
import MealReviewModal from '~/components/food/MealReviewModal.vue'

definePageMeta({
  layout: 'client',
  middleware: ['auth']
})

useHead({
  title: 'Client Dashboard | EndureFitness PWA Portal',
  meta: [
    { name: 'description', content: 'Track daily macro targets, upcoming PT sessions, and assigned workouts.' }
  ]
})

const store = useEndureStore()

// AI Scanner Modals
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
    console.error('Error scanning food:', err)
  }
}

const handleMealSaved = (payload: any) => {
  store.addMeal(payload)
  showReview.value = false
}

// Countdown timer for next session
const countdownText = ref('')
let timer: any = null

const updateCountdown = () => {
  if (!store.nextSession.value) {
    countdownText.value = 'No upcoming sessions'
    return
  }
  const sessionTime = new Date(store.nextSession.value.start_time).getTime()
  const now = Date.now()
  const diff = sessionTime - now

  if (diff <= 0) {
    countdownText.value = 'In progress or completed'
    return
  }

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  countdownText.value = `${hours}h ${minutes}m away`
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 60000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

// Cancellation check
const cancelWarning = ref('')
const handleCancelSession = () => {
  if (!store.nextSession.value) return
  const check = store.canCancelOrReschedule(store.nextSession.value.start_time)
  if (!check.allowed) {
    cancelWarning.value = check.reason || 'Sessions locked 12 hours prior to start.'
    setTimeout(() => cancelWarning.value = '', 6000)
    return
  }
  if (confirm('Are you sure you want to cancel this session?')) {
    store.cancelBooking(store.nextSession.value.id)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Macro Snapshot Rings -->
    <MacroRings
      :consumedCalories="store.nutritionTotals.value.calories"
      :targetCalories="store.currentUser.value.target_calories"
      :consumedProtein="store.nutritionTotals.value.protein"
      :targetProtein="store.currentUser.value.target_protein"
      :consumedCarbs="store.nutritionTotals.value.carbs"
      :targetCarbs="store.currentUser.value.target_carbs"
      :consumedFat="store.nutritionTotals.value.fat"
      :targetFat="store.currentUser.value.target_fat"
    />

    <!-- Quick Food Scanner CTA Banner -->
    <button
      @click="showCamera = true"
      class="w-full bg-gradient-to-r from-brand-accent/20 via-brand-accent/30 to-brand-accent/10 border-2 border-brand-accent rounded-3xl p-4 flex items-center justify-between shadow-[0_0_25px_rgba(204,255,0,0.25)] hover:scale-102 active:scale-98 transition-all group"
    >
      <div class="flex items-center gap-3 text-left">
        <div class="w-12 h-12 rounded-2xl bg-brand-accent text-black flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
          <Icon name="ph:camera-fill" class="w-6 h-6" />
        </div>
        <div>
          <h4 class="font-heading font-black text-sm uppercase text-white">Scan Meal With AI</h4>
          <p class="text-xs text-brand-accent font-semibold">Gemini Flash Portion & Macro Intake</p>
        </div>
      </div>
      <div class="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-brand-accent">
        <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
      </div>
    </button>

    <!-- Upcoming Scheduled Training Session Badge with Countdown -->
    <div class="bg-brand-gray border border-white/10 rounded-3xl p-5 relative overflow-hidden">
      <div class="flex items-center justify-between mb-3">
        <span class="text-[10px] font-bold text-brand-accent uppercase tracking-widest flex items-center gap-1.5">
          <Icon name="ph:calendar-check-fill" class="w-3.5 h-3.5" />
          Scheduled Session
        </span>
        <span 
          v-if="store.nextSession.value"
          class="bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full"
        >
          ⏱ {{ countdownText }}
        </span>
      </div>

      <div v-if="store.nextSession.value" class="space-y-3">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-heading font-black text-base text-white">
              {{ store.nextSession.value.session_type }}
            </h4>
            <p class="text-xs text-gray-400">
              With Coach Marcus Vance • Performance Lab
            </p>
          </div>
          <div class="text-right font-mono">
            <p class="text-xs font-bold text-white">
              {{ new Date(store.nextSession.value.start_time).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }) }}
            </p>
            <p class="text-xs text-brand-accent font-bold">
              {{ new Date(store.nextSession.value.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
            </p>
          </div>
        </div>

        <!-- 12-Hour Cancellation Rule Notice -->
        <div v-if="cancelWarning" class="p-3 bg-red-500/20 border border-red-500 rounded-xl text-xs text-red-300 flex items-center gap-2">
          <Icon name="ph:warning-bold" class="w-4 h-4 shrink-0" />
          <span>{{ cancelWarning }}</span>
        </div>

        <div class="pt-2 border-t border-white/5 flex items-center justify-between">
          <span class="text-[10px] text-gray-400">12h Cancellation Policy</span>
          <button 
            @click="handleCancelSession"
            class="text-[11px] font-bold text-gray-400 hover:text-red-400 transition-colors"
          >
            Reschedule / Cancel
          </button>
        </div>
      </div>

      <div v-else class="text-center py-4 space-y-2">
        <p class="text-xs text-gray-400">You have no upcoming confirmed sessions.</p>
        <NuxtLink 
          to="/book" 
          class="inline-block bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2 px-4 rounded-xl transition-all"
        >
          Book 1-on-1 Session
        </NuxtLink>
      </div>
    </div>

    <!-- Today's Workout Quick-Launch Card -->
    <div class="bg-brand-gray border border-white/10 rounded-3xl p-5 space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold text-brand-accent uppercase tracking-widest">Assigned Split</span>
        <NuxtLink to="/client/workouts" class="text-xs font-bold text-brand-accent hover:underline flex items-center gap-1">
          <span>Start Workout</span>
          <Icon name="ph:arrow-right-bold" class="w-3.5 h-3.5" />
        </NuxtLink>
      </div>

      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-2xl bg-brand-dark border border-white/10 flex items-center justify-center text-brand-accent">
          <Icon name="ph:barbell-fill" class="w-6 h-6" />
        </div>
        <div>
          <h4 class="font-heading font-black text-base text-white">Monday: Push Day A</h4>
          <p class="text-xs text-gray-400">5 Exercises • Chest, Shoulders, Triceps</p>
        </div>
      </div>
    </div>

    <!-- Daily Hydration Tracker -->
    <div class="bg-brand-gray border border-white/10 rounded-3xl p-5 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-11 h-11 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center shrink-0">
          <Icon name="ph:drop-fill" class="w-6 h-6" />
        </div>
        <div>
          <h4 class="font-heading font-black text-sm text-white">Hydration</h4>
          <p class="text-xs font-mono text-gray-400">
            <span class="text-white font-bold">{{ store.dailyWaterMl.value }}</span> / 3,500 ml
          </p>
        </div>
      </div>

      <button
        @click="store.addWater(250)"
        class="bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 active:scale-95"
      >
        <Icon name="ph:plus-bold" class="w-3.5 h-3.5" />
        <span>+250 ml</span>
      </button>
    </div>

    <!-- Camera Capture Modal -->
    <CameraCaptureModal
      v-if="showCamera"
      @captured="handlePhotoCaptured"
      @close="showCamera = false"
    />

    <!-- Review & Edit Modal -->
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
