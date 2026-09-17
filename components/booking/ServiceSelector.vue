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
    name: 'In-Home Assessment & Trial',
    durationMinutes: 60,
    price: 'Free (RM 0)',
    badge: 'Recommended for New Clients',
    description: 'Comprehensive 60-minute movement screen, posture check, and trial workout session right at your doorstep.'
  },
  {
    id: 'pt-doorstep',
    name: '1-on-1 Doorstep PT (Flagship)',
    durationMinutes: 60,
    price: 'RM 180',
    description: 'Private 60-minute in-home or condo gym personal training with posture correction, custom cues, and nutrition support.'
  },
  {
    id: 'pt-partner-gym',
    name: 'Partner Private Gym Session',
    durationMinutes: 60,
    price: 'RM 160',
    description: 'Private 60-minute strength session inside our handpicked private gym partner facilities in Klang Valley.'
  },
  {
    id: 'pt-duo',
    name: 'Duo In-Home Training (2 Pax)',
    durationMinutes: 60,
    price: 'RM 240',
    description: 'Shared 60-minute session for couples or friends right at your residence or condo gym.'
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
      <h3 class="font-heading font-black text-xl uppercase tracking-tight text-brand-charcoal">
        Step 1: Choose Your Session Type
      </h3>
      <p class="text-xs text-brand-charcoal/70 mt-1">
        Select a session type to view matching coach availability slots across Kuala Lumpur & Selangor.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div 
        v-for="service in services" 
        :key="service.id"
        @click="emit('select', service)"
        class="cursor-pointer rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between group relative shadow-sm"
        :class="selectedService?.id === service.id 
          ? 'bg-brand-gray border-2 border-brand-accent shadow-[0_4px_25px_rgba(250,129,18,0.22)]' 
          : 'bg-brand-gray/60 border-brand-charcoal/15 hover:border-brand-charcoal/30 hover:bg-brand-gray'"
      >
        <div v-if="service.badge" class="absolute -top-3 left-4 bg-brand-accent text-white font-heading font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
          {{ service.badge }}
        </div>

        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-xs font-bold text-brand-accent uppercase tracking-wider flex items-center gap-1.5">
              <Icon name="ph:clock-bold" class="w-3.5 h-3.5" />
              {{ service.durationMinutes }} Min
            </span>
            <span class="font-heading font-black text-sm text-brand-charcoal">
              {{ service.price }}
            </span>
          </div>

          <h4 class="font-heading font-bold text-sm sm:text-base text-brand-charcoal mb-2 leading-tight group-hover:text-brand-accent transition-colors">
            {{ service.name }}
          </h4>
          <p class="text-xs text-brand-charcoal/75 leading-relaxed">
            {{ service.description }}
          </p>
        </div>

        <div class="mt-5 pt-3 border-t border-brand-charcoal/10 flex items-center justify-between">
          <span class="text-[11px] font-semibold" :class="selectedService?.id === service.id ? 'text-brand-accent font-bold' : 'text-brand-charcoal/60'">
            {{ selectedService?.id === service.id ? '✓ Selected' : 'Click to select' }}
          </span>
          <div 
            class="w-6 h-6 rounded-full border flex items-center justify-center transition-all"
            :class="selectedService?.id === service.id ? 'border-brand-accent bg-brand-accent text-white' : 'border-brand-charcoal/20 text-transparent'"
          >
            <Icon name="ph:check-bold" class="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
