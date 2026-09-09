<script setup lang="ts">
const stats = [
  { value: '500+', label: 'Physiques Transformed' },
  { value: '12,400 kg', label: 'Fat Lost by Clients' },
  { value: '98.2%', label: 'Habit Adherence Rate' },
  { value: '10+ Yrs', label: 'CSCS & Elite Coaching' }
]
</script>

<template>
  <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-brand-charcoal/10 pt-16 pb-20">
    <!-- Atmospheric Background Effects -->
    <div class="absolute inset-0 bg-brand-dark">
      <!-- Glow Gradients -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_center,_rgba(250,129,18,0.14),transparent_65%)]"></div>
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[500px] bg-brand-accent/10 rounded-full blur-[140px] pointer-events-none"></div>
      
      <!-- Subtle Grid Pattern -->
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#22222208_1px,transparent_1px),linear-gradient(to_bottom,#22222208_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <!-- Elite Tag -->
      <div class="inline-flex items-center gap-2 bg-brand-gray border border-brand-accent/40 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm shadow-sm">
        <span class="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
        <span class="text-xs font-bold uppercase tracking-widest text-brand-charcoal">
          Personal Coaching & Hybrid Training
        </span>
      </div>

      <!-- Main Headline -->
      <h1 class="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-[1.05] mb-6 text-brand-charcoal">
        Push Your <span class="text-brand-accent">Limits.</span><br />
        Endure The <span class="text-brand-charcoal">Grind.</span>
      </h1>

      <p class="text-base sm:text-lg md:text-xl text-brand-charcoal/80 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
        Science-based 1-on-1 personal training and custom nutritional protocols. 
        Engineered for driven individuals ready to dismantle plateaus and forge an athletic physique.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <NuxtLink 
          to="/book" 
          class="w-full sm:w-auto bg-brand-accent text-white font-heading font-black text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-brand-charcoal hover:scale-105 active:scale-95 shadow-[0_4px_25px_rgba(250,129,18,0.35)] transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Icon name="ph:calendar-check-bold" class="w-5 h-5" />
          <span>Book Free Assessment</span>
        </NuxtLink>

        <NuxtLink 
          to="#transformations" 
          class="w-full sm:w-auto bg-brand-gray hover:bg-brand-sand/80 text-brand-charcoal font-heading font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-xl border border-brand-charcoal/15 hover:border-brand-charcoal/30 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
        >
          <Icon name="ph:play-circle-bold" class="w-5 h-5 text-brand-accent" />
          <span>View Transformations</span>
        </NuxtLink>
      </div>

      <!-- Quick Proof Stats Bar -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto pt-6 border-t border-brand-charcoal/10">
        <div 
          v-for="(stat, idx) in stats" 
          :key="idx"
          class="p-4 rounded-xl bg-brand-gray border border-brand-charcoal/10 backdrop-blur-sm shadow-sm"
        >
          <p class="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-brand-accent tracking-tight mb-1">
            {{ stat.value }}
          </p>
          <p class="text-xs uppercase font-bold tracking-wider text-brand-charcoal/70">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
