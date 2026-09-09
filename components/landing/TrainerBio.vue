<script setup lang="ts">
const credentials = [
  { title: 'CSCS® Certified', issuer: 'National Strength & Conditioning Association' },
  { title: 'Pn1 Nutrition Specialist', issuer: 'Precision Nutrition' },
  { title: 'USAW Level 2 Coach', issuer: 'USA Weightlifting' },
  { title: 'Biomechanics Specialist', issuer: 'Functional Anatomy Seminars' }
]
</script>

<template>
  <section id="bio" class="py-24 bg-brand-gray border-b border-brand-charcoal/10 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Trainer Portrait Column -->
        <div class="lg:col-span-5 relative">
          <div class="relative mx-auto max-w-md lg:max-w-none">
            <!-- Glow background -->
            <div class="absolute -inset-4 bg-gradient-to-tr from-brand-accent/20 to-transparent rounded-3xl blur-2xl -z-10"></div>

            <!-- Frame -->
            <div class="relative rounded-2xl overflow-hidden border-2 border-brand-charcoal/10 bg-brand-dark group shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80" 
                alt="Marcus Vance - Head Coach" 
                class="w-full aspect-[4/5] object-cover object-center grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              
              <!-- Overlay badge -->
              <div class="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/60 to-transparent">
                <p class="font-heading font-black text-2xl uppercase tracking-tight text-white">Marcus Vance</p>
                <p class="text-xs font-bold uppercase tracking-widest text-brand-accent">Founder & Head Performance Coach</p>
              </div>
            </div>

            <!-- Floating Accent Badge -->
            <div class="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-brand-dark border border-brand-accent/40 px-5 py-3 rounded-xl shadow-xl">
              <Icon name="ph:medal-military-fill" class="w-8 h-8 text-brand-accent" />
              <div>
                <p class="font-heading font-black text-sm text-brand-charcoal">Ex-Competitive</p>
                <p class="text-[11px] text-brand-charcoal/70">Powerlifting & Athletics</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bio Content Column -->
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center gap-2 text-brand-accent font-bold tracking-widest uppercase text-xs">
            <span class="w-8 h-px bg-brand-accent"></span>
            Coach Ethos & Pedigree
          </div>

          <h2 class="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight leading-tight text-brand-charcoal">
            "No Gimmicks. Just <span class="text-brand-accent">Relentless</span> Execution."
          </h2>

          <p class="text-brand-charcoal/80 text-base sm:text-lg leading-relaxed font-normal">
            With over a decade of coaching high-level executives, collegiate athletes, and everyday achievers, 
            my methodology dismantles the noise of quick-fix fitness trends. Every rep, rest period, and macro target is calibrated to your unique physiology and lifestyle demands.
          </p>

          <p class="text-brand-charcoal/80 text-base sm:text-lg leading-relaxed font-normal">
            Physical change requires mental durability. We focus on movement quality, progressive overload, and intelligent nutritional periodization so your results endure long past the 12-week mark.
          </p>

          <!-- Credentials Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div 
              v-for="(cred, i) in credentials" 
              :key="i"
              class="p-4 rounded-xl bg-brand-dark border border-brand-charcoal/10 flex items-start gap-3 hover:border-brand-accent/40 transition-colors shadow-sm"
            >
              <div class="w-8 h-8 rounded-lg bg-brand-accent/15 border border-brand-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="ph:check-circle-bold" class="w-4 h-4 text-brand-accent" />
              </div>
              <div>
                <p class="font-heading font-bold text-sm text-brand-charcoal">{{ cred.title }}</p>
                <p class="text-xs text-brand-charcoal/65">{{ cred.issuer }}</p>
              </div>
            </div>
          </div>

          <!-- Direct CTA -->
          <div class="pt-6">
            <NuxtLink 
              to="/book" 
              class="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-charcoal text-white font-heading font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(250,129,18,0.3)]"
            >
              <span>Schedule 1-on-1 Strategy Session</span>
              <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
