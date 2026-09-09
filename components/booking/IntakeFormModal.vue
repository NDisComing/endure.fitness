<script setup lang="ts">
import { ref } from 'vue'

export interface IntakeData {
  fullName: string
  email: string
  phone: string
  fitnessLevel: string
  primaryGoal: string
  injuriesNotes: string
  policyAccepted: boolean
}

const props = defineProps<{
  serviceName: string
  slotSummary: string
}>()

const emit = defineEmits<{
  (e: 'submit', data: IntakeData): void
  (e: 'cancel'): void
}>()

const formData = ref<IntakeData>({
  fullName: '',
  email: '',
  phone: '',
  fitnessLevel: 'Intermediate',
  primaryGoal: 'Hypertrophy & Fat Loss',
  injuriesNotes: '',
  policyAccepted: true
})

const fitnessLevels = [
  { id: 'Beginner', title: 'Beginner', desc: '0 - 1 years gym experience' },
  { id: 'Intermediate', title: 'Intermediate', desc: '1 - 3 years consistent lifting' },
  { id: 'Advanced', title: 'Advanced', desc: '3+ years athletic/powerlifting' }
]

const primaryGoals = [
  'Body Fat Loss & Recomposition',
  'Muscle Hypertrophy & Density',
  'Max Strength & Powerlifting PRs',
  'Injury Rehabilitation & Joint Health'
]

const errorMessage = ref('')

const handleSubmit = () => {
  if (!formData.value.fullName || !formData.value.email || !formData.value.phone) {
    errorMessage.value = 'Please complete your full name, email, and phone number.'
    return
  }
  if (!formData.value.policyAccepted) {
    errorMessage.value = 'You must acknowledge the 12-hour cancellation policy.'
    return
  }
  errorMessage.value = ''
  emit('submit', { ...formData.value })
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="emit('cancel')"></div>

    <!-- Modal Card -->
    <div class="relative w-full max-w-2xl bg-brand-gray border border-brand-charcoal/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between pb-4 border-b border-brand-charcoal/10 mb-6">
        <div>
          <span class="text-xs font-bold text-brand-accent uppercase tracking-wider">Mandatory Client Intake</span>
          <h3 class="font-heading font-black text-2xl uppercase tracking-tight text-brand-charcoal">
            Pre-Booking Questionnaire
          </h3>
        </div>
        <button @click="emit('cancel')" class="text-brand-charcoal/60 hover:text-brand-charcoal p-2">
          <Icon name="ph:x-bold" class="w-5 h-5" />
        </button>
      </div>

      <!-- Booking Target Recap -->
      <div class="bg-brand-dark rounded-xl p-3.5 border border-brand-charcoal/10 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
        <div>
          <span class="text-brand-charcoal/70">Session: </span>
          <span class="font-bold text-brand-charcoal">{{ serviceName }}</span>
        </div>
        <div>
          <span class="text-brand-charcoal/70">Selected Time: </span>
          <span class="font-bold text-brand-accent">{{ slotSummary }}</span>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Error alert -->
        <div v-if="errorMessage" class="p-3 bg-red-500/15 border border-red-500 text-red-700 text-xs rounded-xl flex items-center gap-2 font-medium">
          <Icon name="ph:warning-circle-bold" class="w-4 h-4 shrink-0" />
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Personal Details -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="text-xs font-bold text-brand-charcoal uppercase">Full Legal Name *</label>
            <input 
              v-model="formData.fullName"
              type="text" 
              required
              placeholder="e.g. Alex Johnson"
              class="w-full bg-brand-dark border border-brand-charcoal/15 rounded-xl px-4 py-2.5 text-sm text-brand-charcoal placeholder-brand-charcoal/50 focus:outline-none focus:border-brand-accent shadow-sm"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-bold text-brand-charcoal uppercase">Email Address *</label>
            <input 
              v-model="formData.email"
              type="email" 
              required
              placeholder="alex@example.com"
              class="w-full bg-brand-dark border border-brand-charcoal/15 rounded-xl px-4 py-2.5 text-sm text-brand-charcoal placeholder-brand-charcoal/50 focus:outline-none focus:border-brand-accent shadow-sm"
            />
          </div>

          <div class="space-y-1.5 sm:col-span-2">
            <label class="text-xs font-bold text-brand-charcoal uppercase">Mobile Phone (for SMS/WhatsApp Confirmation) *</label>
            <input 
              v-model="formData.phone"
              type="tel" 
              required
              placeholder="+1 (555) 234-5678"
              class="w-full bg-brand-dark border border-brand-charcoal/15 rounded-xl px-4 py-2.5 text-sm text-brand-charcoal placeholder-brand-charcoal/50 focus:outline-none focus:border-brand-accent shadow-sm"
            />
          </div>
        </div>

        <!-- Fitness Level -->
        <div class="space-y-2">
          <label class="text-xs font-bold text-brand-charcoal uppercase">Current Training Experience Level</label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              v-for="lvl in fitnessLevels"
              :key="lvl.id"
              type="button"
              @click="formData.fitnessLevel = lvl.id"
              class="p-3 rounded-xl border text-left transition-all text-xs shadow-sm"
              :class="formData.fitnessLevel === lvl.id ? 'bg-brand-accent/15 border-2 border-brand-accent text-brand-charcoal' : 'bg-brand-dark border-brand-charcoal/15 text-brand-charcoal/70 hover:border-brand-charcoal/30'"
            >
              <p class="font-bold text-brand-charcoal">{{ lvl.title }}</p>
              <p class="text-[10px] text-brand-charcoal/70 mt-0.5">{{ lvl.desc }}</p>
            </button>
          </div>
        </div>

        <!-- Primary Target Goal -->
        <div class="space-y-2">
          <label class="text-xs font-bold text-brand-charcoal uppercase">Primary Target Goal</label>
          <select 
            v-model="formData.primaryGoal"
            class="w-full bg-brand-dark border border-brand-charcoal/15 rounded-xl px-4 py-2.5 text-sm text-brand-charcoal focus:outline-none focus:border-brand-accent shadow-sm"
          >
            <option v-for="goal in primaryGoals" :key="goal" :value="goal">{{ goal }}</option>
          </select>
        </div>

        <!-- Injuries & Medical Notes -->
        <div class="space-y-1.5">
          <label class="text-xs font-bold text-brand-charcoal uppercase">Past Injuries, Surgeries or Medical Limitations</label>
          <textarea 
            v-model="formData.injuriesNotes"
            rows="3"
            placeholder="e.g. Mild right rotator cuff strain; lower back tightness during heavy deadlifts..."
            class="w-full bg-brand-dark border border-brand-charcoal/15 rounded-xl p-3 text-xs text-brand-charcoal placeholder-brand-charcoal/50 focus:outline-none focus:border-brand-accent shadow-sm"
          ></textarea>
        </div>

        <!-- Policy Checkbox -->
        <div class="p-4 rounded-xl bg-brand-dark border border-brand-accent/40 space-y-2 shadow-sm">
          <label class="flex items-start gap-3 cursor-pointer select-none">
            <input 
              v-model="formData.policyAccepted"
              type="checkbox"
              class="w-4 h-4 mt-0.5 accent-brand-accent rounded"
            />
            <div class="text-xs text-brand-charcoal/85">
              <span class="font-bold text-brand-charcoal">12-Hour Cancellation Policy Agreement: </span>
              I acknowledge that appointments are locked 12 hours prior to start. Any reschedules or cancellations must occur at least 12 hours before the session.
            </div>
          </label>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3 pt-2">
          <button 
            type="button" 
            @click="emit('cancel')"
            class="px-5 py-3 rounded-xl text-xs font-bold text-brand-charcoal/70 hover:text-brand-charcoal"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="bg-brand-accent text-white font-heading font-black text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl hover:bg-brand-charcoal transition-all shadow-[0_4px_15px_rgba(250,129,18,0.35)] active:scale-95"
          >
            Confirm & Reserve Slot
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
