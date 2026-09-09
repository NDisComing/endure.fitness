<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  booking: {
    id: string
    client_name: string
    session_type: string
    start_time: string
    end_time: string
    status: string
  }
}>()

const emit = defineEmits<{
  (e: 'newBooking'): void
}>()

const startDate = computed(() => new Date(props.booking.start_time))
const endDate = computed(() => new Date(props.booking.end_time))

// Format for display
const formattedDate = computed(() => {
  return startDate.value.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
})

const formattedTime = computed(() => {
  const startStr = startDate.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const endStr = endDate.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return `${startStr} - ${endStr}`
})

// Google Calendar URL generator
const googleCalendarUrl = computed(() => {
  const formatGCal = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '')
  const title = encodeURIComponent(`EndureFitness: ${props.booking.session_type} with Marcus Vance`)
  const dates = `${formatGCal(startDate.value)}/${formatGCal(endDate.value)}`
  const details = encodeURIComponent(`1-on-1 session with Head Coach Marcus Vance at EndureFitness Lab. Please arrive 5 minutes early. Note: 12-hour cancellation policy applies.`)
  const location = encodeURIComponent(`EndureFitness Performance Lab, Downtown`)
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`
})

// Download .ics Calendar File
const downloadIcs = () => {
  const formatIcs = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '')
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//EndureFitness//SessionBooking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${props.booking.id}@endurefitness.com`,
    `DTSTAMP:${formatIcs(new Date())}`,
    `DTSTART:${formatIcs(startDate.value)}`,
    `DTEND:${formatIcs(endDate.value)}`,
    `SUMMARY:EndureFitness ${props.booking.session_type}`,
    `DESCRIPTION:1-on-1 Coaching with Marcus Vance. 12-hour cancellation rule applies.`,
    'LOCATION:EndureFitness Performance Lab',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', `EndureFitness-${props.booking.id}.ics`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<template>
  <div class="bg-brand-gray border border-brand-accent/40 rounded-3xl p-8 max-w-xl mx-auto text-center space-y-6 shadow-[0_0_50px_rgba(204,255,0,0.15)] animate-fade-in-up">
    <!-- Checkmark Icon -->
    <div class="w-16 h-16 rounded-2xl bg-brand-accent/20 border border-brand-accent flex items-center justify-center mx-auto text-brand-accent shadow-[0_0_25px_rgba(204,255,0,0.4)]">
      <Icon name="ph:check-fat-fill" class="w-8 h-8" />
    </div>

    <div>
      <span class="text-xs font-mono font-bold text-brand-accent uppercase tracking-widest">
        Booking Confirmed • Ref #{{ booking.id }}
      </span>
      <h3 class="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mt-1">
        You're On The Schedule!
      </h3>
      <p class="text-xs text-gray-300 mt-2 max-w-md mx-auto">
        Your slot has been reserved. A confirmation email and calendar sync notice have been dispatched.
      </p>
    </div>

    <!-- Details Bento -->
    <div class="bg-brand-dark/80 rounded-2xl p-5 border border-white/10 text-left space-y-3">
      <div class="flex items-center justify-between border-b border-white/5 pb-2.5">
        <span class="text-xs text-gray-400">Client</span>
        <span class="font-bold text-white text-xs">{{ booking.client_name }}</span>
      </div>
      <div class="flex items-center justify-between border-b border-white/5 pb-2.5">
        <span class="text-xs text-gray-400">Session Type</span>
        <span class="font-bold text-brand-accent text-xs">{{ booking.session_type }}</span>
      </div>
      <div class="flex items-center justify-between border-b border-white/5 pb-2.5">
        <span class="text-xs text-gray-400">Date</span>
        <span class="font-bold text-white text-xs">{{ formattedDate }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-400">Time Window</span>
        <span class="font-bold text-white text-xs font-mono">{{ formattedTime }}</span>
      </div>
    </div>

    <!-- Calendar Sync Actions -->
    <div class="space-y-3">
      <p class="text-xs font-bold uppercase tracking-wider text-gray-400">Sync with your Personal Calendar</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <!-- Google Calendar Button -->
        <a 
          :href="googleCalendarUrl" 
          target="_blank" 
          rel="noopener"
          class="bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Icon name="ph:google-logo-bold" class="w-4 h-4 text-brand-accent" />
          <span>Add to Google Calendar</span>
        </a>

        <!-- iCal / Outlook Download -->
        <button 
          @click="downloadIcs"
          class="bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Icon name="ph:calendar-plus-bold" class="w-4 h-4 text-brand-accent" />
          <span>Download .ics File</span>
        </button>
      </div>
    </div>

    <!-- Policy Reminder Alert -->
    <div class="p-3.5 rounded-xl bg-brand-dark/90 border border-white/10 text-left text-[11px] text-gray-400 flex items-start gap-2.5">
      <Icon name="ph:info-bold" class="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
      <div>
        <span class="font-bold text-white">Cancellation Notice: </span>
        Sessions locked 12 hours prior to start. You can manage or reschedule this appointment directly in the Client PWA.
      </div>
    </div>

    <!-- Next Destination -->
    <div class="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
      <NuxtLink 
        to="/client"
        class="bg-brand-accent text-black font-heading font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)] flex items-center justify-center gap-2"
      >
        <Icon name="ph:device-mobile-camera-bold" class="w-4 h-4" />
        <span>Open In Client PWA</span>
      </NuxtLink>
      <button 
        @click="emit('newBooking')"
        class="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-bold text-xs py-3.5 px-6 rounded-xl border border-white/10 transition-all"
      >
        Book Another Session
      </button>
    </div>
  </div>
</template>
