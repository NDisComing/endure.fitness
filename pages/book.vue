<script setup lang="ts">
import { ref } from 'vue'
import ServiceSelector, { type ServiceOption } from '~/components/booking/ServiceSelector.vue'
import WeeklySlotPicker from '~/components/booking/WeeklySlotPicker.vue'
import IntakeFormModal, { type IntakeData } from '~/components/booking/IntakeFormModal.vue'
import BookingConfirmation from '~/components/booking/BookingConfirmation.vue'
import { useEndureStore } from '~/composables/useEndureStore'

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Book Training Session | EndureFitness Automated Booking Engine',
  meta: [
    {
      name: 'description',
      content: 'Reserve your 1-on-1 assessment or personal training session with Coach Marcus Vance. Live slot availability with instant calendar sync.'
    }
  ]
})

const store = useEndureStore()

const selectedService = ref<ServiceOption | null>({
  id: 'assessment',
  name: '1st Assessment & Mobility Screen',
  durationMinutes: 60,
  price: 'Free ($0)',
  badge: 'Recommended for New Clients',
  description: 'Comprehensive 60-minute movement screen, overhead squat analysis, body composition check, and customized training roadmap.'
})

const selectedSlot = ref<{ date: string; time: string; fullIso: string } | null>(null)
const showIntakeModal = ref(false)
const confirmedBooking = ref<any>(null)

const handleServiceSelect = (service: ServiceOption) => {
  selectedService.value = service
}

const handleSlotSelect = (slot: { date: string; time: string; fullIso: string }) => {
  selectedSlot.value = slot
}

const proceedToIntake = () => {
  if (!selectedService.value || !selectedSlot.value) return
  showIntakeModal.value = true
}

const handleIntakeSubmit = async (intakeData: IntakeData) => {
  if (!selectedService.value || !selectedSlot.value) return

  const startTime = new Date(selectedSlot.value.fullIso)
  const endTime = new Date(startTime.getTime() + selectedService.value.durationMinutes * 60 * 1000)

  // Save into our persistent store
  const booking = store.createBooking({
    session_type: selectedService.value.name,
    start_time: startTime.toISOString(),
    end_time: endTime.toISOString(),
    client_name: intakeData.fullName,
    client_phone: intakeData.phone,
    fitness_level: intakeData.fitnessLevel,
    target_goal: intakeData.primaryGoal,
    injuries_notes: intakeData.injuriesNotes,
    notes: `Pre-booking intake: ${intakeData.primaryGoal}. Injuries: ${intakeData.injuriesNotes || 'None'}`
  })

  // Try calling the server endpoint
  try {
    await $fetch('/api/bookings/create', {
      method: 'POST',
      body: {
        client_name: intakeData.fullName,
        session_type: selectedService.value.name,
        start_time: startTime.toISOString(),
        durationMinutes: selectedService.value.durationMinutes,
        notes: intakeData.injuriesNotes
      }
    })
  } catch (err) {
    console.warn('Booking server endpoint fallback used store record.', err)
  }

  showIntakeModal.value = false
  confirmedBooking.value = booking
}

const resetBooking = () => {
  confirmedBooking.value = null
  selectedSlot.value = null
}
</script>

<template>
  <div class="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header Banner -->
    <div class="text-center max-w-3xl mx-auto mb-12">
      <div class="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/30 text-brand-accent font-bold tracking-widest uppercase text-xs px-3.5 py-1.5 rounded-full mb-3">
        <Icon name="ph:calendar-check-fill" class="w-4 h-4" />
        Automated Reservation Engine
      </div>
      <h1 class="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
        Reserve Your <span class="text-brand-accent">Training Slot.</span>
      </h1>
      <p class="text-gray-400 text-sm sm:text-base mt-2">
        Instant real-time booking directly synced with Coach Marcus's training calendar.
      </p>
    </div>

    <!-- Booking Confirmation State -->
    <div v-if="confirmedBooking">
      <BookingConfirmation 
        :booking="confirmedBooking" 
        @newBooking="resetBooking" 
      />
    </div>

    <!-- Booking Flow Steps -->
    <div v-else class="space-y-12">
      <!-- Step 1: Service Selection -->
      <ServiceSelector 
        :selectedService="selectedService" 
        @select="handleServiceSelect" 
      />

      <!-- Step 2: Slot Picker -->
      <WeeklySlotPicker 
        :selectedSlot="selectedSlot" 
        @selectSlot="handleSlotSelect" 
      />

      <!-- Floating Confirmation Action Bar -->
      <div 
        v-if="selectedService && selectedSlot"
        class="sticky bottom-6 z-30 bg-brand-gray border border-brand-accent/50 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-up"
      >
        <div class="flex items-center gap-3 text-center sm:text-left">
          <div class="w-10 h-10 rounded-xl bg-brand-accent/20 border border-brand-accent flex items-center justify-center text-brand-accent shrink-0">
            <Icon name="ph:calendar-check-bold" class="w-5 h-5" />
          </div>
          <div>
            <p class="font-heading font-black text-sm text-white">
              {{ selectedService.name }} ({{ selectedService.price }})
            </p>
            <p class="text-xs text-brand-accent font-mono">
              {{ new Date(selectedSlot.fullIso).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }) }} at {{ selectedSlot.time }}
            </p>
          </div>
        </div>

        <button 
          @click="proceedToIntake"
          class="w-full sm:w-auto bg-brand-accent text-black font-heading font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(204,255,0,0.4)] active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Continue to Intake Form</span>
          <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
        </button>
      </div>

      <!-- Step 3: Intake Form Modal -->
      <IntakeFormModal
        v-if="showIntakeModal && selectedService && selectedSlot"
        :serviceName="selectedService.name"
        :slotSummary="`${selectedSlot.date} at ${selectedSlot.time}`"
        @submit="handleIntakeSubmit"
        @cancel="showIntakeModal = false"
      />
    </div>
  </div>
</template>
