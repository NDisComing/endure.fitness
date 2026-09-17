<script setup lang="ts">
const philosophies = [
  {
    title: 'Sustainable Lifestyle, Zero Rebound',
    description: 'Say no to crash diets and unsustainable burnout. We focus on building micro-habits every single day for lifelong, lasting results.',
    icon: 'ph:plant-bold'
  },
  {
    title: 'Joyful & Science-Driven Workouts',
    description: 'Training should be enjoyable and empowering. I help you master movement mechanics and correct form so you see faster, safer progress.',
    icon: 'ph:barbell-bold'
  },
  {
    title: 'Dedicated 1-on-1 Care',
    description: 'Every client is unique. I personally invest in your progress with attentive guidance, active tracking, and genuine encouragement every step of the way.',
    icon: 'ph:heartbeat-bold'
  }
]

const expertiseAreas = [
  'Fat Loss & Body Recomposition',
  'Hypertrophy & Functional Strength Training',
  'Posture Correction & Movement Mechanics',
  'Female Lower-Body & Glute Sculpting',
  'Practical & Habit-Based Nutrition Guidance'
]

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
  <section id="bio" class="py-24 bg-brand-dark border-b border-brand-earth/10 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
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
          </div>
        </div>

        <!-- Bio Content Column -->
        <div class="lg:col-span-7 space-y-8">
          <!-- Section Tag -->
          <div>
            <div class="inline-flex items-center gap-2 text-brand-sage font-bold tracking-widest uppercase text-xs mb-3">
              <span class="w-8 h-px bg-brand-sage"></span>
              Meet Your Coach
            </div>
            <h2 class="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight leading-tight text-brand-charcoal">
              Meet Coach <span class="text-brand-sage">Yondy.</span>
            </h2>
            <p class="text-xs font-semibold uppercase tracking-widest text-brand-earth mt-1">
              Founder & Head Coach of Endure Fitness
            </p>
          </div>

          <!-- Coach Core Quote in Warm Hygge Style -->
          <div class="relative bg-brand-gray p-6 sm:p-8 rounded-3xl border-l-4 border-brand-sage border-brand-earth/10 shadow-sm">
            <Icon name="ph:quotes-fill" class="w-10 h-10 text-brand-sage/25 absolute top-4 right-4" />
            <blockquote class="text-brand-charcoal text-base sm:text-lg italic font-medium leading-relaxed relative z-10">
              "Fitness shouldn't be a temporary punishment. It should be a sustainable, joyful lifestyle you embrace for life."
            </blockquote>
            <p class="mt-3 text-xs font-bold uppercase tracking-wider text-brand-earth">
              — Yondy | Founder & Head Coach, Endure Fitness
            </p>
          </div>

          <!-- Coaching Philosophy -->
          <div class="space-y-4">
            <h3 class="font-heading font-bold text-sm uppercase tracking-widest text-brand-charcoal flex items-center gap-2">
              <Icon name="ph:sparkle-bold" class="w-4 h-4 text-brand-sage" />
              <span>My Coaching Philosophy</span>
            </h3>
            
            <div class="space-y-3">
              <div 
                v-for="(item, i) in philosophies" 
                :key="i"
                class="p-4 rounded-2xl bg-brand-gray border border-brand-earth/10 hover:border-brand-sage transition-colors shadow-sm flex items-start gap-3.5"
              >
                <div class="w-9 h-9 rounded-xl bg-brand-sage/15 border border-brand-sage/30 text-brand-sage flex items-center justify-center shrink-0 mt-0.5">
                  <Icon :name="item.icon" class="w-5 h-5" />
                </div>
                <div>
                  <h4 class="font-heading font-bold text-sm text-brand-charcoal mb-1">
                    {{ item.title }}
                  </h4>
                  <p class="text-xs text-brand-muted leading-relaxed font-normal">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Core Areas of Expertise -->
          <div class="space-y-3 pt-2">
            <h3 class="font-heading font-bold text-sm uppercase tracking-widest text-brand-charcoal flex items-center gap-2">
              <Icon name="ph:target-bold" class="w-4 h-4 text-brand-sage" />
              <span>Core Areas of Expertise</span>
            </h3>
            <div class="flex flex-wrap gap-2.5">
              <span 
                v-for="(area, idx) in expertiseAreas" 
                :key="idx"
                class="px-3.5 py-2 rounded-xl bg-brand-gray border border-brand-earth/15 text-brand-charcoal text-xs font-semibold flex items-center gap-2 shadow-sm hover:border-brand-sage transition-colors"
              >
                <span class="w-2 h-2 rounded-full bg-brand-sage"></span>
                <span>{{ area }}</span>
              </span>
            </div>
          </div>

          <!-- Professional Credentials Grid -->
          <div class="space-y-3 pt-2">
            <h3 class="font-heading font-bold text-sm uppercase tracking-widest text-brand-charcoal flex items-center gap-2">
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
                  <p class="font-heading font-bold text-xs text-brand-charcoal">{{ cred.title }}</p>
                  <p class="text-[11px] text-brand-muted leading-snug mt-0.5">{{ cred.issuer }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Direct Strategy Session CTA -->
          <div class="pt-4 flex flex-col sm:flex-row gap-3">
            <NuxtLink 
              to="/book" 
              class="inline-flex items-center justify-center gap-2 bg-brand-earth hover:bg-brand-sage text-white hover:text-white font-heading font-black text-xs uppercase tracking-wider px-7 py-4 rounded-full transition-all duration-300 shadow-md active:scale-95"
            >
              <span>Schedule In-Home Trial With Yondy</span>
              <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
            </NuxtLink>
            
            <a 
              href="https://wa.me/60123456789?text=Hi%20Coach%20Yondy!%20I%20saw%20your%20bio%20on%20Endure%20Fitness%20and%20want%20to%20ask%20about%20coaching."
              target="_blank"
              class="inline-flex items-center justify-center gap-2 bg-brand-gray hover:bg-brand-sand/50 text-brand-charcoal font-heading font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-full border border-brand-earth/20 transition-all shadow-sm"
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
