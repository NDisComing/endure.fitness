<script setup lang="ts">
interface Tier {
  name: string
  subtitle: string
  price: string
  cadence: string
  featured: boolean
  features: string[]
  ctaText: string
  ctaLink: string
}

const tiers: Tier[] = [
  {
    name: '1-on-1 Doorstep PT',
    subtitle: 'Our flagship in-home personal training delivered directly to your residence.',
    price: 'RM 180',
    cadence: '/ session',
    featured: true,
    features: [
      'Travel directly to your home or condo gym',
      'Posture correction & biomechanical screening',
      'Training equipment provided if your condo lacks gear',
      'Tailored workout programming & form coaching',
      'Habit-based nutrition guidance with AI Food Scanner',
      'Direct WhatsApp access to Coach Yondy'
    ],
    ctaText: 'Book Doorstep Trial',
    ctaLink: '/book'
  },
  {
    name: 'Partner Private Gym PT',
    subtitle: 'Elite coaching inside handpicked private gym facilities in Klang Valley.',
    price: 'RM 160',
    cadence: '/ session',
    featured: false,
    features: [
      'Dedicated training inside uncrowded private gym',
      'Full suite of specialized barbell & isolation machines',
      'Heavy progressive overload & hypertrophy focus',
      'Zero queueing or distractions during sessions',
      'InBody body recomposition tracking check-ins',
      'Direct WhatsApp access to Coach Yondy'
    ],
    ctaText: 'Reserve Private Gym PT',
    ctaLink: '/book'
  },
  {
    name: 'Duo In-Home Training',
    subtitle: 'Train together with your partner, spouse, or friend right at home.',
    price: 'RM 240',
    cadence: '/ session (2 pax)',
    featured: false,
    features: [
      'Cost-effective shared rate (RM 120 / person)',
      'Delivered to your condo gym or living room',
      'Individually tailored exercise regressions & cues',
      'High-accountability mutual motivation',
      'Customized nutrition tracking for both partners',
      'Flexible scheduling across KL & Selangor'
    ],
    ctaText: 'Schedule Duo Training',
    ctaLink: '/book'
  }
]
</script>

<template>
  <section id="programs" class="py-24 bg-brand-gray border-b border-brand-earth/10 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div class="inline-flex items-center gap-2 text-brand-sage font-bold tracking-widest uppercase text-xs">
          <span class="w-8 h-px bg-brand-sage"></span>
          Training Packages & Investment
          <span class="w-8 h-px bg-brand-sage"></span>
        </div>
        <h2 class="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-brand-charcoal">
          Transparent Rates. <span class="text-brand-sage">Zero Contracts.</span>
        </h2>
        <p class="text-brand-muted text-base sm:text-lg leading-relaxed">
          Flexible package tiers across Kuala Lumpur & Selangor. Clear session-based pricing with guaranteed personal accountability.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <div 
          v-for="tier in tiers" 
          :key="tier.name"
          class="relative rounded-3xl bg-brand-dark p-8 flex flex-col transition-all duration-300 hover:-translate-y-1.5 group shadow-sm"
          :class="tier.featured 
            ? 'border-2 border-brand-sage shadow-[0_8px_30px_rgba(34,57,111,0.22)]' 
            : 'border border-brand-earth/15 hover:border-brand-sage/40'"
        >
          <!-- Featured Badge -->
          <div 
            v-if="tier.featured"
            class="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-sage text-white font-heading font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md"
          >
            Flagship Choice
          </div>

          <!-- Tier Header -->
          <div class="mb-6">
            <h3 class="font-heading font-black text-2xl uppercase tracking-tight text-brand-charcoal mb-2">
              {{ tier.name }}
            </h3>
            <p class="text-brand-muted text-xs leading-relaxed min-h-[36px]">
              {{ tier.subtitle }}
            </p>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-1.5 mb-8 pb-6 border-b border-brand-earth/10">
            <span class="font-heading font-black text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
              {{ tier.price }}
            </span>
            <span class="text-brand-muted text-xs sm:text-sm font-medium">{{ tier.cadence }}</span>
          </div>

          <!-- Feature List -->
          <ul class="space-y-3.5 mb-8 flex-grow">
            <li 
              v-for="(feat, fIdx) in tier.features" 
              :key="fIdx"
              class="flex items-start gap-3 text-xs sm:text-sm text-brand-charcoal/80 font-medium"
            >
              <Icon name="ph:check-bold" class="w-4 h-4 text-brand-sage shrink-0 mt-0.5" />
              <span>{{ feat }}</span>
            </li>
          </ul>

          <!-- CTA Button (Pill Shape) -->
          <NuxtLink 
            :to="tier.ctaLink"
            class="w-full py-4 rounded-full font-heading font-black text-xs uppercase tracking-wider text-center transition-all duration-200 shadow-sm active:scale-95"
            :class="tier.featured 
              ? 'bg-brand-earth text-white hover:bg-brand-sage shadow-md' 
              : 'bg-brand-gray hover:bg-brand-sage hover:text-white text-brand-charcoal border border-brand-earth/15'"
          >
            {{ tier.ctaText }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
