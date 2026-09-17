<script setup lang="ts">
const stats = [
  { 
    value: '200+', 
    label: 'Clients Successfully Transformed',
    subtext: 'Achieved their dream physique' 
  },
  { 
    value: '200+ kg', 
    label: 'Total Fat & Weight Lost',
    subtext: 'Across our client roster'
  },
  { 
    value: '1,000+', 
    label: 'Hours of Hands-On Coaching',
    subtext: 'Delivered in-home & private'
  },
  { 
    value: '5–10+ Yrs', 
    label: 'Trainer Team Experience',
    subtext: 'FITM & AusActive aligned'
  }
]
</script>

<template>
  <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-brand-earth/10 pt-16 pb-20 bg-brand-dark">
    <!-- Atmospheric Background Effects in Sage & Sand -->
    <div class="absolute inset-0 bg-brand-dark pointer-events-none">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_center,_rgba(140,157,121,0.18),transparent_65%)]"></div>
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[500px] bg-brand-sand/15 rounded-full blur-[140px]"></div>
      
      <!-- Subtle Grid Pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#75585208_1px,transparent_1px),linear-gradient(to_bottom,#75585208_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Service Coverage & Doorstep Badge -->
      <div class="inline-flex items-center gap-2.5 bg-brand-gray border border-brand-sage/40 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm shadow-sm">
        <span class="w-2.5 h-2.5 rounded-full bg-brand-sage animate-pulse"></span>
        <span class="text-xs font-bold uppercase tracking-widest text-brand-charcoal">
          📍 Kuala Lumpur & Selangor • Doorstep Personal Training
        </span>
      </div>

      <!-- Main Headline -->
      <h1 class="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase leading-[1.08] mb-6 text-brand-charcoal max-w-5xl mx-auto">
        Premium Personal Training <br class="hidden sm:inline" />
        Delivered Right to Your <span class="text-brand-sage underline decoration-brand-sand decoration-wavy decoration-2">Doorstep.</span>
      </h1>

      <!-- Sub-headline -->
      <p class="text-base sm:text-lg md:text-xl text-brand-muted max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
        Built for busy individuals. Zero traffic, 100% privacy, and science-backed efficiency. Your trusted in-home fitness partner across Kuala Lumpur & Selangor.
      </p>

      <!-- CTAs in Hygge Rounded Style -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <NuxtLink 
          to="/book" 
          class="w-full sm:w-auto bg-brand-earth text-white font-heading font-black text-xs uppercase tracking-wider px-8 py-4 rounded-full hover:bg-brand-sage transition-all duration-300 shadow-md active:scale-95 flex items-center justify-center gap-2"
        >
          <Icon name="ph:calendar-check-bold" class="w-5 h-5" />
          <span>Book In-Home Assessment</span>
        </NuxtLink>

        <NuxtLink 
          to="#bio" 
          class="w-full sm:w-auto bg-brand-gray hover:bg-brand-sand/60 text-brand-charcoal font-heading font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full border border-brand-earth/20 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
        >
          <Icon name="ph:user-bold" class="w-5 h-5 text-brand-sage" />
          <span>Meet Coach Yondy</span>
        </NuxtLink>
      </div>

      <!-- Key Metrics & Social Proof Bar -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto pt-8 border-t border-brand-earth/10">
        <div 
          v-for="(stat, idx) in stats" 
          :key="idx"
          class="p-5 rounded-2xl bg-brand-gray border border-brand-earth/10 backdrop-blur-sm shadow-sm flex flex-col justify-center text-center transition-all hover:-translate-y-1 hover:border-brand-sage"
        >
          <p class="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-brand-sage tracking-tight mb-1">
            {{ stat.value }}
          </p>
          <p class="text-xs uppercase font-bold tracking-wider text-brand-charcoal leading-snug">
            {{ stat.label }}
          </p>
          <p class="text-[11px] text-brand-muted mt-1 font-medium hidden sm:block">
            {{ stat.subtext }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
