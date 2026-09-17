<script setup lang="ts">
const steps = [
  {
    step: '1',
    title: 'Online Consultation',
    subtitle: 'Discovery & Goal Alignment',
    description: 'Understand your fitness goals, habits, and physical condition.',
    details: [
      'Lifestyle & schedule assessment',
      'Injury history and movement restrictions',
      'Target physique & health goals clarification'
    ],
    icon: 'ph:chat-teardrop-text-bold'
  },
  {
    step: '2',
    title: 'In-Home Assessment & Trial',
    subtitle: 'At Your Doorstep',
    description: 'Movement screening and a trial workout session right at your doorstep.',
    details: [
      'Comprehensive movement & posture screening',
      'Hands-on trial session in your home or condo gym',
      'Equipment check & workout baseline calibration'
    ],
    icon: 'ph:person-arms-spread-bold'
  },
  {
    step: '3',
    title: 'Customized Training Plan',
    subtitle: 'Continuous Evolution & Support',
    description: 'A tailored, progressive program with continuous monitoring and support.',
    details: [
      'Bi-weekly progressive overload adjustments',
      'Flexible, non-restrictive nutrition guidance',
      'Continuous WhatsApp support & form check-ins'
    ],
    icon: 'ph:trend-up-bold'
  }
]
</script>

<template>
  <section id="how-it-works" class="py-24 bg-brand-gray border-b border-brand-earth/10 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div class="inline-flex items-center gap-2 text-brand-sage font-bold tracking-widest uppercase text-xs">
          <span class="w-8 h-px bg-brand-sage"></span>
          Simple 3-Step Process
          <span class="w-8 h-px bg-brand-sage"></span>
        </div>
        <h2 class="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-brand-charcoal leading-tight">
          How It <span class="text-brand-sage">Works.</span>
        </h2>
        <p class="text-brand-muted text-base sm:text-lg leading-relaxed font-normal">
          No complicated commitments or guesswork. We guide you step-by-step from your first conversation to lifelong athletic durability.
        </p>
      </div>

      <!-- 3 Steps Grid with Sand Circular Number Badges (from Hygge reference) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-stretch mb-14">
        <div 
          v-for="(item, idx) in steps" 
          :key="idx"
          class="relative rounded-3xl bg-brand-dark p-8 border border-brand-earth/15 hover:border-brand-sage transition-all duration-300 shadow-sm hover:-translate-y-1.5 flex flex-col justify-between group"
        >
          <div>
            <!-- Step Number Circle (Hygge Style) & Icon Row -->
            <div class="flex items-center justify-between mb-6">
              <!-- Circular sand badge matching the numbered circles in reference -->
              <div class="w-12 h-12 rounded-full bg-brand-sand text-brand-charcoal font-heading font-black text-xl flex items-center justify-center shadow-sm">
                {{ item.step }}
              </div>
              <div class="w-12 h-12 rounded-2xl bg-brand-gray border border-brand-earth/10 text-brand-sage flex items-center justify-center group-hover:bg-brand-sage group-hover:text-white transition-all shadow-sm">
                <Icon :name="item.icon" class="w-6 h-6" />
              </div>
            </div>

            <!-- Titles -->
            <p class="text-[11px] font-bold uppercase tracking-widest text-brand-sage mb-1">
              {{ item.subtitle }}
            </p>
            <h3 class="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-brand-charcoal mb-4">
              {{ item.title }}
            </h3>

            <!-- Description -->
            <p class="text-brand-charcoal/85 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {{ item.description }}
            </p>
          </div>

          <!-- Step Details List -->
          <ul class="space-y-2.5 pt-4 border-t border-brand-earth/10">
            <li 
              v-for="(detail, dIdx) in item.details" 
              :key="dIdx"
              class="flex items-center gap-2.5 text-xs text-brand-muted font-medium"
            >
              <Icon name="ph:arrow-right-bold" class="w-3.5 h-3.5 text-brand-sage shrink-0" />
              <span>{{ detail }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Step CTA Bar -->
      <div class="text-center bg-brand-dark rounded-3xl p-6 sm:p-8 border border-brand-earth/15 shadow-sm max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-left">
          <p class="font-heading font-black text-lg text-brand-charcoal">Ready to take Step 01?</p>
          <p class="text-xs text-brand-muted">Schedule your free 15-minute online consultation with Coach Yondy.</p>
        </div>
        <NuxtLink 
          to="/book"
          class="w-full sm:w-auto bg-brand-earth hover:bg-brand-sage text-white font-heading font-black text-xs uppercase tracking-wider py-3.5 px-6 rounded-full transition-all shadow-md shrink-0 flex items-center justify-center gap-2 active:scale-95"
        >
          <span>Start Online Consultation</span>
          <Icon name="ph:calendar-check-bold" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
