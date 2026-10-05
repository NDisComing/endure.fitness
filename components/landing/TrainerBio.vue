<script setup lang="ts">

const expertiseAreas = [
  'Fat Loss & Body Recomposition',
  'Hypertrophy & Functional Strength Training',
  'Posture Correction & Movement Mechanics',
  'Female Lower-Body & Glute Sculpting',
  'Practical & Habit-Based Nutrition Guidance'
]

// Multiplied for smooth seamless infinite marquee loop
const marqueeList = [...expertiseAreas, ...expertiseAreas, ...expertiseAreas, ...expertiseAreas]

const credentials = [
  {
    title: 'FITM Certified PT (Level 2)',
    issuer: 'Fitness Innovations Malaysia • Aligned with Fitness Australia / AUSactive'
  },
  {
    title: 'CPR & AED Certified',
    issuer: 'Emergency First Response & Healthcare Standards'
  },
  {
    title: '1,000+ Hours Coaching Experience',
    issuer: 'Hands-on 1-on-1 In-Home & Private Coaching'
  },
  {
    title: '200+ Transformative Success Stories',
    issuer: 'Verified Client Body Recompositions'
  }
]
</script>

<template>
  <section id="bio" class="pt-0 pb-8 sm:pb-12 lg:pb-16 bg-brand-dark border-b border-brand-earth/10 relative overflow-hidden">
    <!-- High-Class Infinite Marquee Ticker (Desktop: Top of Section) -->
    <div class="hidden lg:block w-full border-b border-brand-earth/15 bg-brand-gray/50 py-3.5 mb-10 overflow-hidden relative group">
      <div class="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div class="animate-marquee flex items-center gap-3 sm:gap-4 whitespace-nowrap">
          <div 
            v-for="(area, idx) in marqueeList" 
            :key="idx"
            class="inline-flex items-center gap-2.5 sm:gap-3 px-4 py-1.5 sm:py-2 rounded-full bg-brand-dark/95 border border-brand-earth/15 shadow-2xs hover:border-brand-sage transition-all shrink-0 select-none group/item cursor-default"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-brand-sage animate-pulse shrink-0"></span>
            <span class="font-primary text-xs sm:text-sm tracking-wider uppercase text-brand-charcoal group-hover/item:text-brand-sage transition-colors">
              {{ area }}
            </span>
            <span class="text-brand-sand font-bold text-xs shrink-0">✦</span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Mobile Section Header (Displayed before Coach Yondy's picture on mobile) -->
      <div class="lg:hidden mb-5 sm:mb-8">
        <div class="inline-flex items-center gap-2 text-brand-sage font-primary tracking-widest uppercase text-xs mb-2">
          <span class="w-8 h-px bg-brand-sage"></span>
          Meet Your Coach
        </div>
        <h2 class="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight leading-tight text-brand-charcoal">
          Meet Coach <span class="text-brand-sage">Yondy.</span>
        </h2>
        <p class="text-xs font-semibold uppercase tracking-widest text-brand-earth mt-1 font-primary">
          Founder & Head Coach of Endure Fitness
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-16 items-start">
        <!-- Trainer Portrait Column -->
        <div class="lg:col-span-5 lg:sticky lg:top-28">
          <div class="relative mx-auto max-w-md lg:max-w-none">
            <!-- Glow background in sage tone -->
            <div class="absolute -inset-4 bg-gradient-to-tr from-brand-sage/25 via-brand-sand/20 to-transparent rounded-3xl blur-2xl -z-10"></div>

            <!-- Frame with real Coach Yondy picture -->
            <div class="relative rounded-3xl overflow-hidden border-2 border-brand-earth/15 bg-brand-gray group shadow-2xl">
              <img 
                src="/images/coach-yondy.jpeg" 
                alt="Coach Yondy - Founder & Head Coach" 
                class="w-full aspect-[3/4] sm:aspect-[4/5] object-cover object-top group-hover:scale-105 transition-all duration-700"
              />
              
              <!-- Overlay badge -->
              <div class="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-brand-charcoal/95 via-brand-charcoal/75 to-transparent text-white">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sage/90 text-white text-[10px] font-bold uppercase tracking-wider mb-2 backdrop-blur-sm">
                  <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  Founder & Head Coach
                </div>
                <p class="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">Yondy</p>
                <p class="text-xs font-semibold text-brand-sand">Endure Fitness • In-Home Coaching KL & Selangor</p>
              </div>
            </div>

            <!-- Floating Credentials Badge -->
            <div class="mt-4 p-4 rounded-2xl bg-brand-gray border border-brand-sand shadow-md flex items-center gap-3.5">
              <div class="w-10 h-10 rounded-xl bg-brand-sage/20 border border-brand-sage/40 flex items-center justify-center shrink-0 text-brand-sage">
                <Icon name="ph:certificate-bold" class="w-6 h-6" />
              </div>
              <div>
                <p class="font-heading font-black text-xs uppercase text-brand-charcoal">FITM Certified Level 2</p>
                <p class="text-[11px] text-brand-muted">Aligned with Fitness Australia / AUSactive</p>
              </div>
            </div>

            <!-- High-Class Infinite Marquee Ticker (Mobile: Placed below picture & credentials) -->
            <div class="lg:hidden w-full border-y border-brand-earth/15 bg-brand-gray/50 py-2.5 mt-4 mb-0 overflow-hidden relative group">
              <div class="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
                <div class="animate-marquee flex items-center gap-3 whitespace-nowrap">
                  <div 
                    v-for="(area, idx) in marqueeList" 
                    :key="idx"
                    class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dark/95 border border-brand-earth/15 shadow-2xs shrink-0 select-none cursor-default"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-brand-sage animate-pulse shrink-0"></span>
                    <span class="font-primary text-xs tracking-wider uppercase text-brand-charcoal">
                      {{ area }}
                    </span>
                    <span class="text-brand-sand font-bold text-xs shrink-0">✦</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bio Content Column -->
        <div class="lg:col-span-7 space-y-5 lg:space-y-8">
          <!-- Section Tag (Desktop only, mobile header shown above picture) -->
          <div class="hidden lg:block mb-6">
            <div class="inline-flex items-center gap-2 text-brand-sage font-primary tracking-widest uppercase text-xs mb-3">
              <span class="w-8 h-px bg-brand-sage"></span>
              Meet Your Coach
            </div>
            <h2 class="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight leading-tight text-brand-charcoal">
              Meet Coach <span class="text-brand-sage">Yondy.</span>
            </h2>
            <p class="text-xs font-semibold uppercase tracking-widest text-brand-earth mt-1 font-primary">
              Founder & Head Coach of Endure Fitness
            </p>
          </div>

          <!-- Professional Credentials Grid -->
          <div class="space-y-3 !mt-0 lg:!mt-0">
            <h3 class="font-primary text-sm uppercase tracking-widest text-brand-charcoal flex items-center gap-2">
              <Icon name="ph:medal-bold" class="w-4 h-4 text-brand-sage" />
              <span>Professional Credentials</span>
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div 
                v-for="(cred, i) in credentials" 
                :key="i"
                class="p-4 rounded-2xl bg-brand-gray border border-brand-earth/10 flex items-start gap-3 shadow-sm hover:border-brand-sand transition-colors"
              >
                <div class="w-7 h-7 rounded-lg bg-brand-sand/30 border border-brand-sand text-brand-earth flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="ph:check-bold" class="w-3.5 h-3.5" />
                </div>
                <div>
                  <p class="font-heading font-bold text-xs uppercase text-brand-charcoal">{{ cred.title }}</p>
                  <p class="text-[11px] font-info text-brand-muted leading-snug mt-0.5">{{ cred.issuer }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Direct Strategy Session CTA -->
          <div class="pt-4 flex flex-col sm:flex-row gap-3">
            <NuxtLink 
              to="/book" 
              class="inline-flex items-center justify-center gap-2 bg-brand-earth hover:bg-brand-sage text-white hover:text-white font-primary text-sm uppercase tracking-wider px-7 py-4 rounded-full transition-all duration-300 shadow-md active:scale-95"
            >
              <span>Schedule In-Home Trial With Yondy</span>
              <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
            </NuxtLink>
            
            <a 
              href="https://wa.me/60199850163?text=Hi%20Coach%20Yondy!%20I%20saw%20your%20bio%20on%20Endure%20Fitness%20and%20want%20to%20ask%20about%20coaching."
              target="_blank"
              class="inline-flex items-center justify-center gap-2 bg-brand-gray hover:bg-brand-sand/50 text-brand-charcoal font-primary text-sm uppercase tracking-wider px-6 py-4 rounded-full border border-brand-earth/20 transition-all shadow-sm"
            >
              <Icon name="ph:whatsapp-logo-fill" class="w-4 h-4 text-emerald-700" />
              <span>WhatsApp Coach Yondy</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 60s linear infinite;
  will-change: transform;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
