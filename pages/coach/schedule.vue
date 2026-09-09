<script setup lang="ts">
import { ref } from 'vue'
import { useEndureStore } from '~/composables/useEndureStore'

definePageMeta({
  layout: 'coach',
  middleware: ['auth']
})

useHead({
  title: 'Schedule & Availability Manager | EndureFitness Admin',
  meta: [
    { name: 'description', content: 'Manage recurring PT hours, block out holiday dates, and manage client bookings.' }
  ]
})

const store = useEndureStore()

// Recurring weekly hours state
const recurringSchedule = ref([
  { day: 'Monday', enabled: true, morning: '07:00 - 12:00', evening: '16:00 - 20:00' },
  { day: 'Tuesday', enabled: true, morning: '07:00 - 12:00', evening: '16:00 - 20:00' },
  { day: 'Wednesday', enabled: true, morning: '07:00 - 12:00', evening: '16:00 - 20:00' },
  { day: 'Thursday', enabled: true, morning: '07:00 - 12:00', evening: '16:00 - 20:00' },
  { day: 'Friday', enabled: true, morning: '07:00 - 12:00', evening: '16:00 - 19:00' },
  { day: 'Saturday', enabled: true, morning: '08:00 - 14:00', evening: 'Off' },
  { day: 'Sunday', enabled: false, morning: 'Off', evening: 'Off' }
])

// Blocked dates list
const blockedDates = ref([
  { date: '2026-09-20', label: 'NSCA Regional Strength Conference' },
  { date: '2026-11-26', label: 'Thanksgiving Holiday Block' }
])

const newBlockDate = ref('')
const newBlockReason = ref('')

const addBlockout = () => {
  if (!newBlockDate.value || !newBlockReason.value) return
  blockedDates.value.push({
    date: newBlockDate.value,
    label: newBlockReason.value
  })
  newBlockDate.value = ''
  newBlockReason.value = ''
}

const removeBlockout = (index: number) => {
  blockedDates.value.splice(index, 1)
}

const cancelClientSession = (bookingId: string) => {
  if (confirm('Cancel this client appointment?')) {
    const b = store.bookingsList.value.find(item => item.id === bookingId)
    if (b) b.status = 'cancelled'
  }
}
</script>

<template>
  <div class="space-y-8 max-w-6xl">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-xs font-bold text-brand-accent uppercase tracking-widest">Calendar & Time Slots</span>
        <h1 class="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
          Schedule & Availability
        </h1>
      </div>

      <NuxtLink
        to="/book"
        target="_blank"
        class="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 border border-white/15"
      >
        <Icon name="ph:arrow-square-out-bold" class="w-4 h-4 text-brand-accent" />
        <span>View Public Booking Engine</span>
      </NuxtLink>
    </div>

    <!-- Upcoming Confirmed Sessions Table -->
    <div class="bg-brand-gray border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <Icon name="ph:calendar-check-fill" class="w-5 h-5 text-brand-accent" />
          <h2 class="font-heading font-black text-lg uppercase text-white">
            Upcoming Booked Appointments
          </h2>
        </div>
        <span class="text-xs text-brand-accent font-mono font-bold">
          {{ store.coachUpcomingSessions.value.length }} Active
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-brand-dark text-gray-400 uppercase font-bold text-[10px] border-b border-white/10">
            <tr>
              <th class="py-3 px-4">Client</th>
              <th class="py-3 px-4">Session Type</th>
              <th class="py-3 px-4">Scheduled Window</th>
              <th class="py-3 px-4">Intake Goals & Notes</th>
              <th class="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr 
              v-for="booking in store.coachUpcomingSessions.value"
              :key="booking.id"
              class="hover:bg-white/[0.02]"
            >
              <td class="py-3.5 px-4 font-bold text-white">
                <p>{{ booking.client_name }}</p>
                <p class="text-[10px] font-mono text-gray-400">{{ booking.client_phone || 'No phone' }}</p>
              </td>
              <td class="py-3.5 px-4 text-brand-accent font-medium">
                {{ booking.session_type }}
              </td>
              <td class="py-3.5 px-4 font-mono">
                <p class="text-white">{{ new Date(booking.start_time).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }) }}</p>
                <p class="text-gray-400">{{ new Date(booking.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }} - {{ new Date(booking.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</p>
              </td>
              <td class="py-3.5 px-4 text-gray-300 max-w-xs">
                <p class="truncate">{{ booking.notes || 'Routine session' }}</p>
              </td>
              <td class="py-3.5 px-4 text-right space-x-2">
                <button
                  @click="cancelClientSession(booking.id)"
                  class="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/20 text-[11px] font-bold transition-colors"
                >
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Recurring Working Hours & Block-Out Dates Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Recurring Hours -->
      <div class="lg:col-span-7 bg-brand-gray border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-white/10">
          <div class="flex items-center gap-2">
            <Icon name="ph:clock-bold" class="w-5 h-5 text-brand-accent" />
            <h3 class="font-heading font-black text-base uppercase text-white">
              Weekly Working Hours Template
            </h3>
          </div>
          <span class="text-[10px] text-gray-400 font-bold uppercase">Automated Slots</span>
        </div>

        <div class="space-y-2.5">
          <div 
            v-for="item in recurringSchedule" 
            :key="item.day"
            class="flex items-center justify-between p-3 rounded-xl bg-brand-dark/80 border border-white/5 text-xs"
          >
            <div class="flex items-center gap-3 w-32">
              <input 
                v-model="item.enabled" 
                type="checkbox" 
                class="accent-brand-accent rounded w-4 h-4"
              />
              <span class="font-bold text-white">{{ item.day }}</span>
            </div>

            <div class="flex items-center gap-3 font-mono text-gray-300 text-[11px]">
              <span>AM: {{ item.morning }}</span>
              <span>•</span>
              <span>PM: {{ item.evening }}</span>
            </div>

            <span 
              class="text-[10px] font-bold px-2 py-0.5 rounded uppercase"
              :class="item.enabled ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'"
            >
              {{ item.enabled ? 'Active' : 'Off' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Block-Out Dates -->
      <div class="lg:col-span-5 bg-brand-gray border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
        <div class="flex items-center gap-2 pb-3 border-b border-white/10">
          <Icon name="ph:prohibit-bold" class="w-5 h-5 text-red-400" />
          <h3 class="font-heading font-black text-base uppercase text-white">
            Block-Out Dates
          </h3>
        </div>

        <p class="text-xs text-gray-400">
          Mark vacation periods, travel, or coaching conferences to automatically close booking slots.
        </p>

        <!-- Existing Blockouts -->
        <div class="space-y-2">
          <div 
            v-for="(block, idx) in blockedDates" 
            :key="idx"
            class="p-3 rounded-xl bg-brand-dark border border-white/5 flex items-center justify-between text-xs"
          >
            <div>
              <p class="font-mono font-bold text-white">{{ block.date }}</p>
              <p class="text-[11px] text-gray-400">{{ block.label }}</p>
            </div>
            <button 
              @click="removeBlockout(idx)"
              class="text-gray-500 hover:text-red-400 p-1"
              title="Remove Block"
            >
              <Icon name="ph:trash-bold" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Add New Block -->
        <div class="pt-3 border-t border-white/10 space-y-2">
          <div class="space-y-1">
            <label class="text-[10px] uppercase font-bold text-gray-400">Date to Lock</label>
            <input 
              v-model="newBlockDate"
              type="date" 
              class="w-full bg-brand-dark border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
            />
          </div>
          <div class="space-y-1">
            <label class="text-[10px] uppercase font-bold text-gray-400">Reason</label>
            <input 
              v-model="newBlockReason"
              type="text" 
              placeholder="e.g. Travel / Competition"
              class="w-full bg-brand-dark border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent"
            />
          </div>
          <button
            @click="addBlockout"
            :disabled="!newBlockDate || !newBlockReason"
            class="w-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2.5 rounded-xl transition-all disabled:opacity-40"
          >
            + Add Blockout Date
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
