<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer id="contact" class="bg-brand-gray border-t border-brand-earth/10 pt-16 pb-8 text-brand-charcoal">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <!-- Brand Summary with Logo -->
        <div class="space-y-4 md:col-span-1">
          <NuxtLink to="/" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl overflow-hidden shadow-sm border border-brand-earth/20 bg-black flex items-center justify-center shrink-0">
              <img src="/images/Logo-icon.jpeg" alt="Endure Fitness" class="w-full h-full object-cover" />
            </div>
            <div>
              <span class="font-heading font-black text-xl tracking-tighter uppercase text-brand-charcoal leading-none block">
                Endure<span class="text-brand-sage">Fitness</span>
              </span>
              <span class="text-[9px] font-primary uppercase tracking-widest text-brand-muted block mt-0.5">
                Kuala Lumpur & Selangor
              </span>
            </div>
          </NuxtLink>
          <p class="text-brand-muted text-xs leading-relaxed">
            Premium personal training delivered right to your doorstep across Kuala Lumpur & Selangor. Built for busy individuals—zero traffic, 100% privacy, and science-backed efficiency.
          </p>
          <div class="flex items-center gap-2 pt-1">
            <span class="w-2.5 h-2.5 rounded-full bg-brand-sage animate-pulse"></span>
            <span class="text-xs text-brand-charcoal font-semibold">Accepting Doorstep PT Inquiries</span>
          </div>
        </div>

        <!-- Quick Navigation -->
        <div class="space-y-3">
          <h3 class="font-heading font-bold text-xs uppercase tracking-widest text-brand-sage">Landing Navigation</h3>
          <ul class="space-y-2 text-xs">
            <li><NuxtLink to="/" class="text-brand-muted hover:text-brand-sage transition-colors">Home</NuxtLink></li>
            <li><NuxtLink to="/#bio" class="text-brand-muted hover:text-brand-sage transition-colors">About Coach Yondy</NuxtLink></li>
            <li><NuxtLink to="/#how-it-works" class="text-brand-muted hover:text-brand-sage transition-colors">How It Works (3 Steps)</NuxtLink></li>
            <li><NuxtLink to="/#services" class="text-brand-muted hover:text-brand-sage transition-colors">Services & Rates</NuxtLink></li>
            <li><NuxtLink to="/#why-in-home" class="text-brand-muted hover:text-brand-sage transition-colors">Why In-Home Coaching</NuxtLink></li>
            <li><NuxtLink to="/#transformations" class="text-brand-muted hover:text-brand-sage transition-colors">Transformations Slider</NuxtLink></li>
            <li><NuxtLink to="/#faq" class="text-brand-muted hover:text-brand-sage transition-colors">Frequently Asked Questions</NuxtLink></li>
          </ul>
        </div>

        <!-- Booking & Coaching -->
        <div class="space-y-3">
          <h3 class="font-heading font-bold text-xs uppercase tracking-widest text-brand-sage">Booking & Coaching</h3>
          <ul class="space-y-2 text-xs">
            <li><NuxtLink to="/book" class="text-brand-muted hover:text-brand-sage transition-colors flex items-center gap-1.5"><Icon name="ph:calendar-check-bold" class="w-3.5 h-3.5 text-brand-sage" /> Book In-Home Assessment</NuxtLink></li>
            <li><NuxtLink to="/#bio" class="text-brand-muted hover:text-brand-sage transition-colors flex items-center gap-1.5"><Icon name="ph:user-circle-bold" class="w-3.5 h-3.5 text-brand-sage" /> Coach Yondy Bio</NuxtLink></li>
            <li><NuxtLink to="/#services" class="text-brand-muted hover:text-brand-sage transition-colors flex items-center gap-1.5"><Icon name="ph:barbell-fill" class="w-3.5 h-3.5 text-brand-sage" /> Doorstep PT Programs</NuxtLink></li>
            <li><NuxtLink to="/coach" class="text-brand-muted hover:text-brand-sage transition-colors flex items-center gap-1.5"><Icon name="ph:shield-star-bold" class="w-3.5 h-3.5 text-brand-sage" /> Coach Dashboard</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact & Service Coverage -->
        <div class="space-y-3">
          <h3 class="font-heading font-bold text-xs uppercase tracking-widest text-brand-sage">Service Coverage & Contact</h3>
          <p class="text-xs text-brand-muted leading-relaxed">
            📍 Kuala Lumpur & Selangor<br />
            (In-Home Doorstep, Condo Gyms & Partner Private Facilities)
          </p>
          <p class="text-xs text-brand-charcoal font-mono font-bold">yondy@endurefitness.com</p>
          <div class="pt-1">
            <a 
              href="https://wa.me/60123456789?text=Hi%20Coach%20Yondy!%20I%20would%20like%20to%20inquire%20about%20Endure%20Fitness%20coaching." 
              target="_blank"
              class="inline-flex items-center gap-1.5 text-xs text-brand-earth font-bold hover:text-brand-sage transition-colors"
            >
              <Icon name="ph:whatsapp-logo-fill" class="w-4 h-4 text-emerald-700" />
              <span>WhatsApp Direct Inquiries</span>
            </a>
          </div>
          <div class="flex gap-2.5 pt-2">
            <a href="https://instagram.com" target="_blank" class="w-8 h-8 rounded-full bg-brand-dark border border-brand-earth/15 flex items-center justify-center text-brand-charcoal hover:bg-brand-sage hover:text-white transition-colors" aria-label="Instagram">
              <Icon name="ph:instagram-logo-fill" class="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" class="w-8 h-8 rounded-full bg-brand-dark border border-brand-earth/15 flex items-center justify-center text-brand-charcoal hover:bg-brand-sage hover:text-white transition-colors" aria-label="YouTube">
              <Icon name="ph:youtube-logo-fill" class="w-4 h-4" />
            </a>
            <a href="https://tiktok.com" target="_blank" class="w-8 h-8 rounded-full bg-brand-dark border border-brand-earth/15 flex items-center justify-center text-brand-charcoal hover:bg-brand-sage hover:text-white transition-colors" aria-label="TikTok">
              <Icon name="ph:tiktok-logo-fill" class="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-brand-earth/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-muted">
        <div>
          <p>&copy; {{ currentYear }} Endure Fitness. Founder & Head Coach Yondy. FITM Certified Personal Trainer (Level 2).</p>
          <p class="text-[11px] text-brand-muted/70 mt-1">
            <a 
              href="https://www.flaticon.com/free-animated-icons/exercise" 
              title="exercise animated icons" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="hover:text-brand-sage transition-colors underline decoration-brand-earth/30 underline-offset-2"
            >Exercise animated icons created by Magnific - Flaticon</a>
          </p>
        </div>
        <div class="flex gap-4 flex-wrap">
          <a href="#" class="hover:text-brand-charcoal transition-colors">12-Hour Cancellation Policy</a>
          <a href="#" class="hover:text-brand-charcoal transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-brand-charcoal transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>
