<script setup lang="ts">
const benefits = [
  {
    icon: 'ph:clock-countdown-bold',
    title: 'Ultimate Convenience',
    subtitle: 'Zero Traffic & Parking Hassles',
    description: 'Say goodbye to traffic jams, parking hassles, and waiting for gym equipment. Work out right in your home or condo gym without disrupting your packed schedule.',
    perks: [
      'Zero commute time & no rain delays',
      'Train in your living room or condo gym',
      'Flexible early morning or evening hours'
    ]
  },
  {
    icon: 'ph:shield-check-bold',
    title: 'Absolute Privacy',
    subtitle: 'No Crowds & No Prying Eyes',
    description: 'Zero crowded gyms and no prying eyes. Exercise comfortably in your own personal sanctuary with 100% undivided coach attention on every single rep.',
    perks: [
      '100% private, judgment-free space',
      'Full confidence to push your limits',
      'Undivided 1-on-1 coach observation'
    ]
  },
  {
    icon: 'ph:crosshair-simple-bold',
    title: 'Tailored & Science-Backed',
    subtitle: 'Custom Programs & Posture Realignment',
    description: 'Custom-designed programs, posture correction, and nutrition tracking built around your personal goals, biomechanics, and daily lifestyle demands.',
    perks: [
      'Corrective movement & joint relief',
      'Practical habit-based nutrition tracking',
      'Progressive overload matched to your pace'
    ]
  }
]

const coverageHotspots = [
  'Mont Kiara', 'Bangsar', 'KLCC', 'Damansara', 'Petaling Jaya', 'Subang Jaya', 'Puchong', 'Bukit Jalil'
]
</script>

<template>
  <section id="why-in-home" class="py-10 sm:py-14 lg:py-18 bg-brand-dark border-b border-brand-earth/10 relative overflow-hidden">
    <!-- Top transition gradient aura from the dark Transformation section -->
    <div class="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#2A221E]/8 to-transparent pointer-events-none"></div>
    <!-- Subtle background ambience -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(140,157,121,0.12),transparent_60%)] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
        <div class="inline-flex items-center gap-2 text-brand-sage font-primary tracking-widest uppercase text-xs">
          <span class="w-8 h-px bg-brand-sage"></span>
          Pain Points Solved
          <span class="w-8 h-px bg-brand-sage"></span>
        </div>
        <h2 class="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-brand-charcoal leading-tight">
          Why Choose <span class="text-brand-sage">In-Home</span> Coaching?
        </h2>
        <p class="text-brand-muted text-base sm:text-lg leading-relaxed font-normal font-info">
          Traditional gym memberships fail busy professionals because of friction, crowds, and lack of accountability. 
          We eliminate the barriers so you can focus entirely on sustainable progress.
        </p>
      </div>

      <!-- 3 Core Benefits Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 sm:mb-12 items-stretch">
        <div 
          v-for="(item, idx) in benefits" 
          :key="idx"
          class="rounded-3xl bg-brand-gray p-8 border border-brand-earth/15 hover:border-brand-sage transition-all duration-300 shadow-md hover:-translate-y-1.5 flex flex-col justify-between group"
        >
          <div>
            <!-- Icon Badge in Sage Green -->
            <div class="w-14 h-14 rounded-2xl bg-brand-sage/15 border border-brand-sage/30 text-brand-sage flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-sage group-hover:text-white transition-all shadow-sm">
              <Icon :name="item.icon" class="w-7 h-7" />
            </div>

            <p class="text-[11px] font-primary tracking-widest uppercase text-brand-sage mb-1">
              {{ item.subtitle }}
            </p>
            <h3 class="font-heading font-black text-2xl uppercase tracking-tight text-brand-charcoal mb-4">
              {{ item.title }}
            </h3>
            <p class="text-brand-muted text-sm leading-relaxed mb-6 font-normal font-info">
              {{ item.description }}
            </p>
          </div>

          <!-- Feature Perks -->
          <ul class="space-y-2.5 pt-4 border-t border-brand-earth/10">
            <li 
              v-for="(perk, pIdx) in item.perks" 
              :key="pIdx"
              class="flex items-center gap-2.5 text-xs text-brand-charcoal font-info font-medium"
            >
              <Icon name="ph:check-circle-fill" class="w-4 h-4 text-brand-sage shrink-0" />
              <span>{{ perk }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Featured Green Service Coverage Banner (Hygge Sage Card Style) -->
      <div class="rounded-3xl bg-brand-sage text-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div class="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div class="lg:col-span-8 space-y-3">
            <div class="inline-flex items-center gap-2 bg-white/20 px-3.5 py-1 rounded-full text-white font-primary text-xs uppercase tracking-wider backdrop-blur-sm">
              <Icon name="ph:map-pin-fill" class="w-4 h-4 text-brand-sand" />
              <span>Service Coverage</span>
            </div>
            <h3 class="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
              Serving In-Home & Condo Gyms Across <span class="text-brand-sand">Kuala Lumpur & Selangor</span>
            </h3>
            <p class="text-white/90 text-sm sm:text-base leading-relaxed font-normal font-info">
              Coach Yondy travels directly to your residential doorstep or condo gymnasium. All essential training props, mobility gear, and guidance are brought right to you.
            </p>

            <!-- Hotspots Tags -->
            <div class="flex flex-wrap gap-2 pt-2">
              <span 
                v-for="spot in coverageHotspots" 
                :key="spot"
                class="px-3 py-1 bg-white/15 rounded-full text-xs font-semibold text-white border border-white/20 backdrop-blur-sm font-info"
              >
                {{ spot }}
              </span>
              <span class="px-3 py-1 bg-brand-sand/90 text-brand-charcoal rounded-full text-xs font-primary shadow-sm">
                + Surrounding Townships
              </span>
            </div>
          </div>

          <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <NuxtLink 
              to="/book"
              class="w-full text-center bg-brand-earth hover:bg-brand-charcoal text-white font-primary text-sm uppercase tracking-wider py-4 px-6 rounded-full transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
            >
              <Icon name="ph:calendar-check-bold" class="w-4 h-4" />
              <span>Check My Area & Book</span>
            </NuxtLink>
            <NuxtLink 
              to="#services"
              class="w-full text-center bg-white/20 hover:bg-white/30 text-white font-primary text-sm uppercase tracking-wider py-3.5 px-6 rounded-full border border-white/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Services & Rates</span>
              <Icon name="ph:arrow-down-bold" class="w-4 h-4 text-brand-sand" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
