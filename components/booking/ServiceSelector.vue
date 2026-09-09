<script setup lang="ts">
export interface ServiceOption {
  id: string
  name: string
  durationMinutes: number
  price: string
  description: string
  badge?: string
}

const services: ServiceOption[] = [
  {
    id: 'assessment',
    name: '1st Assessment & Mobility Screen',
    durationMinutes: 60,
    price: 'Free ($0)',
    badge: 'Recommended for New Clients',
    description: 'Comprehensive 60-minute movement screen, overhead squat analysis, body composition check, and customized training roadmap.'
  },
  {
    id: 'pt-1on1',
    name: 'Regular 1-on-1 Coaching Session',
    durationMinutes: 45,
    price: '$80',
    description: 'Private 45-minute gym session focusing on barbell technique, progressive overload execution, and real-time form cues.'
  },
  {
    id: 'form-check',
    name: 'Technique & Form Check Call',
    durationMinutes: 30,
    price: '$45',
    description: '30-minute virtual deep-dive analyzing your video lift recordings, joint angles, sticking points, and programming tweaks.'
  }
]

const props = defineProps<{
  selectedService: ServiceOption | null
}>()

const emit = defineEmits<{
  (e: 'select', service: ServiceOption): void
}>()
</script>

<template>
  <div class="space-y-4">
    <div class="text-center md:text-left mb-6">
      <h3 class="font-heading font-black text-xl uppercase tracking-tight text-white">
        Step 1: Choose Your Session Type
      </h3>
      <p class="text-xs text-gray-400 mt-1">
        Select a session type to view matching coach availability slots.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div 
        v-for="service in services" 
        :key="service.id"
        @click="emit('select', service)"
        class="cursor-pointer rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between group relative"
        :class="selectedService?.id === service.id 
          ? 'bg-brand-gray border-brand-accent shadow-[0_0_25px_rgba(204,255,0,0.25)]' 
          : 'bg-brand-gray/50 border-white/10 hover:border-white/25 hover:bg-brand-gray/80'"
      >
        <div v-if="service.badge" class="absolute -top-3 left-4 bg-brand-accent text-black font-heading font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
          {{ service.badge }}
        </div>

        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-xs font-bold text-brand-accent uppercase tracking-wider flex items-center gap-1.5">
              <Icon name="ph:clock-bold" class="w-3.5 h-3.5" />
              {{ service.durationMinutes }} Minutes
            </span>
            <span class="font-heading font-black text-sm text-white">
              {{ service.price }}
            </span>
          </div>

          <h4 class="font-heading font-bold text-base text-white mb-2 leading-tight group-hover:text-brand-accent transition-colors">
            {{ service.name }}
          </h4>
          <p class="text-xs text-gray-400 leading-relaxed">
            {{ service.description }}
          </p>
        </div>

        <div class="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
          <span class="text-[11px] font-semibold" :class="selectedService?.id === service.id ? 'text-brand-accent' : 'text-gray-400'">
            {{ selectedService?.id === service.id ? '✓ Selected' : 'Click to select' }}
          </span>
          <div 
            class="w-6 h-6 rounded-full border flex items-center justify-center transition-all"
            :class="selectedService?.id === service.id ? 'border-brand-accent bg-brand-accent text-black' : 'border-white/20 text-transparent'"
          >
            <Icon name="ph:check-bold" class="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
