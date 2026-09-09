<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEndureStore } from '~/composables/useEndureStore'

const store = useEndureStore()

const props = defineProps<{
  selectedSlot: { date: string; time: string; fullIso: string } | null
}>()

const emit = defineEmits<{
  (e: 'selectSlot', slot: { date: string; time: string; fullIso: string }): void
}>()

// Current week offset (0 = this week, 1 = next week, etc.)
const weekOffset = ref(0)
const selectedDayIndex = ref(1) // Default Monday

const getDaysOfWeek = (offset: number) => {
  const curr = new Date()
  // Align to Monday of the selected week
  const day = curr.getDay()
  const diff = curr.getDate() - day + (day === 0 ? -6 : 1) + offset * 7
  
  const days = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(curr.setDate(diff + i))
    days.push({
      dateObj: new Date(d),
      dayName: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()],
      dateNumber: d.getDate(),
      monthName: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()],
      isoDate: d.toISOString().split('T')[0],
      isPast: d < new Date(new Date().setHours(0, 0, 0, 0))
    })
  }
  return days
}

const currentDays = computed(() => getDaysOfWeek(weekOffset.value))
const activeDay = computed(() => currentDays.value[selectedDayIndex.value] || currentDays.value[0])

// PT Schedule slots template (Morning 7-11, Evening 16-19)
const baseSlotTimes = [
  '07:00', '08:00', '09:00', '10:00', '11:00',
  '16:00', '17:00', '18:00', '19:00'
]

// Determine if a slot is booked by inspecting store bookings
const isSlotBooked = (isoDate: string, time: string) => {
  return store.bookingsList.value.some(b => {
    if (b.status === 'cancelled') return false
    const bDate = b.start_time.split('T')[0]
    const bTime = new Date(b.start_time).toTimeString().slice(0, 5)
    return bDate === isoDate && bTime === time
  })
}

const getSlotListForActiveDay = computed(() => {
  const iso = activeDay.value.isoDate
  return baseSlotTimes.map(time => {
    const booked = isSlotBooked(iso, time)
    const [h, m] = time.split(':')
    const slotDate = new Date(activeDay.value.dateObj)
    slotDate.setHours(parseInt(h), parseInt(m), 0, 0)
    const isPast = slotDate < new Date()

    return {
      time,
      isBooked: booked,
      isPast: isPast || activeDay.value.isPast,
      fullIso: slotDate.toISOString()
    }
  })
})

const selectTimeSlot = (slot: { time: string; fullIso: string; isBooked: boolean; isPast: boolean }) => {
  if (slot.isBooked || slot.isPast) return
  emit('selectSlot', {
    date: activeDay.value.isoDate,
    time: slot.time,
    fullIso: slot.fullIso
  })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="font-heading font-black text-xl uppercase tracking-tight text-white">
          Step 2: Select Date & Time Slot
        </h3>
        <p class="text-xs text-gray-400 mt-1">
          Live schedule synchronized with Coach Marcus Vance's calendar.
        </p>
      </div>

      <!-- Week pagination controls -->
      <div class="flex items-center gap-2">
        <button 
          @click="weekOffset = Math.max(0, weekOffset - 1)"
          :disabled="weekOffset === 0"
          class="w-9 h-9 rounded-lg bg-brand-gray border border-white/10 flex items-center justify-center hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Previous Week"
        >
          <Icon name="ph:caret-left-bold" class="w-4 h-4 text-white" />
        </button>
        <span class="text-xs font-mono font-bold text-brand-accent px-2">
          {{ weekOffset === 0 ? 'This Week' : `+${weekOffset} Wk` }}
        </span>
        <button 
          @click="weekOffset++"
          class="w-9 h-9 rounded-lg bg-brand-gray border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
          title="Next Week"
        >
          <Icon name="ph:caret-right-bold" class="w-4 h-4 text-white" />
        </button>
      </div>
    </div>

    <!-- 7-Day Week Scroller -->
    <div class="grid grid-cols-7 gap-2">
      <button
        v-for="(day, idx) in currentDays"
        :key="day.isoDate"
        @click="selectedDayIndex = idx"
        :disabled="day.isPast"
        class="py-3 px-1 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-center relative"
        :class="[
          selectedDayIndex === idx 
            ? 'bg-brand-accent text-black border-brand-accent font-bold shadow-[0_0_15px_rgba(204,255,0,0.3)]' 
            : day.isPast 
              ? 'opacity-30 border-transparent bg-white/[0.02] cursor-not-allowed text-gray-500' 
              : 'bg-brand-gray border-white/10 text-gray-300 hover:border-brand-accent/50 hover:text-white'
        ]"
      >
        <span class="text-[10px] font-bold uppercase tracking-wider">{{ day.dayName }}</span>
        <span class="font-heading font-black text-lg my-0.5">{{ day.dateNumber }}</span>
        <span class="text-[9px] uppercase opacity-75">{{ day.monthName }}</span>
      </button>
    </div>

    <!-- Active Day Time Slots Grid -->
    <div class="bg-brand-gray/60 border border-white/10 rounded-2xl p-6">
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div class="flex items-center gap-2">
          <Icon name="ph:calendar-blank-bold" class="w-4 h-4 text-brand-accent" />
          <span class="font-heading font-bold text-sm text-white">
            Available Hours for {{ activeDay.dayName }}, {{ activeDay.monthName }} {{ activeDay.dateNumber }}
          </span>
        </div>
        <div class="flex items-center gap-3 text-[11px] text-gray-400">
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-brand-accent"></span> Open</span>
          <span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-red-500/60"></span> Booked</span>
        </div>
      </div>

      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        <button
          v-for="slot in getSlotListForActiveDay"
          :key="slot.time"
          @click="selectTimeSlot(slot)"
          :disabled="slot.isBooked || slot.isPast"
          class="py-3 px-2 rounded-xl text-center font-mono font-bold text-xs border transition-all duration-200 relative group"
          :class="[
            selectedSlot?.fullIso === slot.fullIso
              ? 'bg-brand-accent text-black border-brand-accent shadow-[0_0_20px_rgba(204,255,0,0.5)] scale-105'
              : slot.isBooked
                ? 'bg-red-500/10 border-red-500/20 text-red-400 cursor-not-allowed'
                : slot.isPast
                  ? 'bg-white/5 border-white/5 text-gray-600 cursor-not-allowed'
                  : 'bg-brand-dark border-white/15 text-gray-200 hover:border-brand-accent hover:text-brand-accent hover:scale-102'
          ]"
        >
          <span>{{ slot.time }}</span>
          <span v-if="slot.isBooked" class="block text-[8px] font-sans uppercase font-bold text-red-400">Booked</span>
          <span v-else-if="slot.isPast" class="block text-[8px] font-sans uppercase font-bold text-gray-600">Past</span>
          <span v-else-if="selectedSlot?.fullIso === slot.fullIso" class="block text-[8px] font-sans uppercase font-bold text-black">Selected</span>
        </button>
      </div>
    </div>
  </div>
</template>
