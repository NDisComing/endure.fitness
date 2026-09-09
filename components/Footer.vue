<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="bg-brand-gray border-t border-white/10 pt-16 pb-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <!-- Brand Summary -->
        <div class="space-y-4 md:col-span-1">
          <NuxtLink to="/" class="flex items-center gap-2">
            <Icon name="ph:barbell-fill" class="w-6 h-6 text-brand-accent" />
            <span class="font-heading font-black text-xl tracking-tighter uppercase text-white">
              Endure<span class="text-brand-accent">Fitness</span>
            </span>
          </NuxtLink>
          <p class="text-gray-400 text-xs leading-relaxed">
            Elite 1-on-1 personal coaching, progressive web app training systems, and Gemini AI nutrition scanner. Push your limits and endure the grind.
          </p>
          <div class="flex items-center gap-2 pt-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-xs text-emerald-400 font-semibold">Accepting Q3 Client Applications</span>
          </div>
        </div>

        <!-- Quick Navigation -->
        <div class="space-y-3">
          <h3 class="font-heading font-bold text-xs uppercase tracking-widest text-brand-accent">Platform Navigation</h3>
          <ul class="space-y-2 text-xs">
            <li><NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">Home Page</NuxtLink></li>
            <li><NuxtLink to="/#bio" class="text-gray-400 hover:text-white transition-colors">Trainer Bio & Credentials</NuxtLink></li>
            <li><NuxtLink to="/#transformations" class="text-gray-400 hover:text-white transition-colors">Client Before & After Slider</NuxtLink></li>
            <li><NuxtLink to="/#programs" class="text-gray-400 hover:text-white transition-colors">Membership Tiers</NuxtLink></li>
            <li><NuxtLink to="/#faq" class="text-gray-400 hover:text-white transition-colors">Frequently Asked Questions</NuxtLink></li>
          </ul>
        </div>

        <!-- Client & Coach Spaces -->
        <div class="space-y-3">
          <h3 class="font-heading font-bold text-xs uppercase tracking-widest text-brand-accent">Portals & Tools</h3>
          <ul class="space-y-2 text-xs">
            <li><NuxtLink to="/book" class="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"><Icon name="ph:calendar-check-bold" class="w-3.5 h-3.5 text-brand-accent" /> Booking Engine</NuxtLink></li>
            <li><NuxtLink to="/client" class="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"><Icon name="ph:device-mobile-camera-bold" class="w-3.5 h-3.5 text-brand-accent" /> Client PWA Dashboard</NuxtLink></li>
            <li><NuxtLink to="/client/food" class="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"><Icon name="ph:camera-fill" class="w-3.5 h-3.5 text-brand-accent" /> AI Food Scanner</NuxtLink></li>
            <li><NuxtLink to="/client/workouts" class="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"><Icon name="ph:barbell-fill" class="w-3.5 h-3.5 text-brand-accent" /> Workout Video Hub</NuxtLink></li>
            <li><NuxtLink to="/coach" class="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"><Icon name="ph:shield-star-bold" class="w-3.5 h-3.5 text-brand-accent" /> Coach PT CRM</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact & Location -->
        <div class="space-y-3">
          <h3 class="font-heading font-bold text-xs uppercase tracking-widest text-brand-accent">Contact & Support</h3>
          <p class="text-xs text-gray-400">
            Private Performance Lab • Downtown Fitness District
          </p>
          <p class="text-xs text-gray-400">marcus@endurefitness.com</p>
          <div class="flex gap-2.5 pt-2">
            <a href="https://instagram.com" target="_blank" class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-black transition-colors">
              <Icon name="ph:instagram-logo-fill" class="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-black transition-colors">
              <Icon name="ph:youtube-logo-fill" class="w-4 h-4" />
            </a>
            <a href="https://tiktok.com" target="_blank" class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-black transition-colors">
              <Icon name="ph:tiktok-logo-fill" class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>&copy; {{ currentYear }} EndureFitness. Certified CSCS® Coaching. Built with Nuxt 3 & Supabase.</p>
        <div class="flex gap-4">
          <a href="#" class="hover:text-white transition-colors">12-Hour Cancellation Policy</a>
          <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>
