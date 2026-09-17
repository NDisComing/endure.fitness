<script setup lang="ts">
interface ServiceItem {
  id: string
  title: string
  subtitle: string
  badge?: string
  isFlagship?: boolean
  icon: string
  description: string
  features: string[]
  ctaText: string
  ctaLink: string
}

const services: ServiceItem[] = [
  {
    id: 'doorstep-pt',
    title: '1-on-1 Doorstep PT',
    subtitle: 'Flagship In-Home Coaching',
    badge: 'Flagship Service',
    isFlagship: true,
    icon: 'ph:house-line-bold',
    description: 'Professional personal training right at your residence or condo gym—convenient, exclusive, and results-focused.',
    features: [
      'Direct doorstep travel across KL & Selangor',
      'Condo gym or living room workout execution',
      'Training equipment provided if needed',
      'Customized biomechanical posture correction',
      'Habit-based nutrition tracking & daily support'
    ],
    ctaText: 'Book Doorstep Assessment',
    ctaLink: '/book'
  },
  {
    id: 'partner-gym',
    title: 'Partner Private Gym Sessions',
    subtitle: 'Dedicated Training Facility',
    badge: 'Private Gym Setup',
    isFlagship: false,
    icon: 'ph:barbell-bold',
    description: 'Prefer a gym setup? Train with us at our handpicked partner private gyms across Klang Valley.',
    features: [
      'Access to elite, uncrowded private gym setups',
      'Full suite of specialized barbell & machine gear',
      'Distraction-free environment with zero equipment queues',
      'Ideal for heavy strength, power, and hypertrophy',
      'Coached directly by Head Coach Yondy'
    ],
    ctaText: 'Apply For Gym Sessions',
    ctaLink: '/book'
  },
  {
    id: 'duo-group',
    title: 'Duo & Small Group Training',
    subtitle: 'Couples, Friends & Family',
    badge: 'High Energy',
    isFlagship: false,
    icon: 'ph:users-three-bold',
    description: 'Perfect for couples, family, or friends who want to train and stay motivated together while cutting costs.',
    features: [
      'Double the accountability and shared motivation',
      'Individually scaled exercises for differing fitness levels',
      'Joyful, energetic, and supportive training atmosphere',
      'Available in-home, at condo gyms, or partner facilities',
      'Cost-effective per person coaching investment'
    ],
    ctaText: 'Schedule Duo Trial',
    ctaLink: '/book'
  },
  {
    id: 'gym-design',
    title: 'Gym Space Design & Consulting',
    subtitle: 'Residential & Commercial Fit-Out',
    badge: 'Specialized Consulting',
    isFlagship: false,
    icon: 'ph:compass-tool-bold',
    description: 'Layout planning, equipment sourcing, and spatial optimization for residential and commercial gyms.',
    features: [
      'Condo & bungalow gym layout & 3D flow planning',
      'Equipment sourcing & supplier procurement advisory',
      'Biomechanical safety and flooring optimization',
      'Commercial fitness studio & corporate wellness rooms',
      'Turnkey equipment placement & maintenance advice'
    ],
    ctaText: 'Consult With Coach Yondy',
    ctaLink: '/book'
  }
]
</script>

<template>
  <section id="services" class="py-24 bg-brand-dark border-b border-brand-earth/10 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div class="inline-flex items-center gap-2 text-brand-sage font-bold tracking-widest uppercase text-xs">
          <span class="w-8 h-px bg-brand-sage"></span>
          Tailored Fitness Solutions
          <span class="w-8 h-px bg-brand-sage"></span>
        </div>
        <h2 class="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-brand-charcoal leading-tight">
          Our Core <span class="text-brand-sage">Services.</span>
        </h2>
        <p class="text-brand-muted text-base sm:text-lg leading-relaxed font-normal">
          From doorstep coaching at your condo residence to private gym mastery and bespoke home gym design, 
          every service is crafted for maximum efficiency and lasting results.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div 
          v-for="service in services" 
          :key="service.id"
          class="relative rounded-3xl bg-brand-gray p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-sm group"
          :class="service.isFlagship 
            ? 'border-2 border-brand-sage shadow-[0_8px_30px_rgba(140,157,121,0.2)]' 
            : 'border border-brand-earth/15 hover:border-brand-sage/50'"
        >
          <!-- Top Badge -->
          <div 
            v-if="service.badge"
            class="inline-flex items-center gap-1.5 self-start mb-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm"
            :class="service.isFlagship 
              ? 'bg-brand-sage text-white' 
              : 'bg-brand-dark text-brand-charcoal border border-brand-earth/15'"
          >
            <Icon v-if="service.isFlagship" name="ph:star-fill" class="w-3.5 h-3.5 text-brand-sand" />
            <span>{{ service.badge }}</span>
          </div>

          <div>
            <!-- Header Row -->
            <div class="flex items-start justify-between gap-4 mb-4">
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-brand-sage mb-1">
                  {{ service.subtitle }}
                </p>
                <h3 class="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-brand-charcoal">
                  {{ service.title }}
                </h3>
              </div>
              <div class="w-12 h-12 rounded-2xl bg-brand-dark border border-brand-earth/15 flex items-center justify-center text-brand-sage shrink-0 group-hover:bg-brand-sage group-hover:text-white transition-colors shadow-sm">
                <Icon :name="service.icon" class="w-6 h-6" />
              </div>
            </div>

            <!-- Description -->
            <p class="text-brand-charcoal/90 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {{ service.description }}
            </p>

            <!-- Feature Bullet Points -->
            <ul class="space-y-3 mb-8 pt-4 border-t border-brand-earth/10">
              <li 
                v-for="(feat, fIdx) in service.features" 
                :key="fIdx"
                class="flex items-start gap-3 text-xs sm:text-sm text-brand-muted font-medium"
              >
                <Icon name="ph:check-circle-bold" class="w-4 h-4 text-brand-sage shrink-0 mt-0.5" />
                <span>{{ feat }}</span>
              </li>
            </ul>
          </div>

          <!-- Bottom Action in Hygge Pill Style -->
          <div class="pt-4 border-t border-brand-earth/10">
            <NuxtLink 
              :to="service.ctaLink"
              class="w-full py-3.5 px-6 rounded-full font-heading font-black text-xs uppercase tracking-wider text-center transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-95"
              :class="service.isFlagship 
                ? 'bg-brand-earth text-white hover:bg-brand-sage shadow-md' 
                : 'bg-brand-dark hover:bg-brand-sage hover:text-white text-brand-charcoal border border-brand-earth/15'"
            >
              <span>{{ service.ctaText }}</span>
              <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
