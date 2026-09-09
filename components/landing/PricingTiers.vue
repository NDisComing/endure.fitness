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
    name: 'Hybrid App Coaching',
    subtitle: 'High-accountability remote coaching with our Progressive Web App.',
    price: '$199',
    cadence: '/ month',
    featured: true,
    features: [
      'Full Endure PWA Portal & Offline App Access',
      'Unlimited AI Food Scanning & Macro breakdown',
      'Custom weekly training splits with HD video cues',
      'Daily coach review of meal photo stream',
      'Weekly 30m video check-in & form audit',
      'Direct WhatsApp access to Coach Marcus'
    ],
    ctaText: 'Start Hybrid Training',
    ctaLink: '/book'
  },
  {
    name: '1-on-1 Gym Mastery',
    subtitle: 'Elite private in-person training sessions for maximum speed.',
    price: '$449',
    cadence: '/ month',
    featured: false,
    features: [
      'All Hybrid App & AI Food Scanner features',
      '8x Monthly 1-on-1 in-person gym sessions (60 min)',
      'Real-time barbell bar-path tracking & spotting',
      'Bi-weekly InBody body composition scans',
      'Custom pre & intra-workout supplementation',
      'VIP booking window with 24h flexibility'
    ],
    ctaText: 'Apply for 1-on-1 PT',
    ctaLink: '/book'
  },
  {
    name: 'Nutrition & Macro Protocol',
    subtitle: 'Pure dietary precision for fat loss, recomp, or athletic fueling.',
    price: '$99',
    cadence: '/ month',
    featured: false,
    features: [
      'Personalized caloric & macro target breakdown',
      'Daily meal photo logging via AI Food Scanner',
      'Coach meal audits and nutritional adjustments',
      'Dining out & travel survival guidelines',
      'Supplement strategy tailored to bloodwork'
    ],
    ctaText: 'Join Nutrition Track',
    ctaLink: '/book'
  }
]
</script>

<template>
  <section id="programs" class="py-24 bg-brand-gray border-b border-white/10 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div class="inline-flex items-center gap-2 text-brand-accent font-bold tracking-widest uppercase text-xs">
          <span class="w-8 h-px bg-brand-accent"></span>
          Training Tiers & Investment
          <span class="w-8 h-px bg-brand-accent"></span>
        </div>
        <h2 class="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight">
          Select Your Path To <span class="text-brand-accent">Dominance.</span>
        </h2>
        <p class="text-gray-300 text-base sm:text-lg">
          No locking contracts. Transparent monthly pricing with guaranteed progress when you adhere to the protocol.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <div 
          v-for="tier in tiers" 
          :key="tier.name"
          class="relative rounded-2xl bg-brand-dark p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 group"
          :class="tier.featured 
            ? 'border-2 border-brand-accent shadow-[0_0_40px_rgba(204,255,0,0.2)]' 
            : 'border border-white/10 hover:border-white/30'"
        >
          <!-- Featured Badge -->
          <div 
            v-if="tier.featured"
            class="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-accent text-black font-heading font-black text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg"
          >
            Most Popular Choice
          </div>

          <!-- Tier Header -->
          <div class="mb-6">
            <h3 class="font-heading font-black text-2xl uppercase tracking-tight text-white mb-2">
              {{ tier.name }}
            </h3>
            <p class="text-gray-400 text-xs leading-relaxed min-h-[36px]">
              {{ tier.subtitle }}
            </p>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-1.5 mb-8 pb-6 border-b border-white/10">
            <span class="font-heading font-black text-4xl sm:text-5xl text-white tracking-tight">
              {{ tier.price }}
            </span>
            <span class="text-gray-400 text-sm font-medium">{{ tier.cadence }}</span>
          </div>

          <!-- Feature List -->
          <ul class="space-y-3.5 mb-8 flex-grow">
            <li 
              v-for="(feat, fIdx) in tier.features" 
              :key="fIdx"
              class="flex items-start gap-3 text-xs sm:text-sm text-gray-300"
            >
              <Icon name="ph:check-bold" class="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
              <span>{{ feat }}</span>
            </li>
          </ul>

          <!-- CTA Button -->
          <NuxtLink 
            :to="tier.ctaLink"
            class="w-full py-4 rounded-xl font-heading font-black text-xs uppercase tracking-wider text-center transition-all duration-200"
            :class="tier.featured 
              ? 'bg-brand-accent text-black hover:bg-white shadow-[0_0_20px_rgba(204,255,0,0.4)]' 
              : 'bg-white/10 hover:bg-brand-accent hover:text-black text-white border border-white/10'"
          >
            {{ tier.ctaText }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
