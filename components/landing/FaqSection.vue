<script setup lang="ts">
import { ref } from 'vue'

interface Faq {
  question: string
  answer: string
}

const faqs: Faq[] = [
  {
    question: 'How does the AI Food Scanner work in the Client PWA?',
    answer: 'Simply snap a photo of your meal on your phone. Our integrated Google Gemini Flash vision model analyzes the visual contents, identifies food ingredients, estimates portion weights, and automatically computes total calories, protein, carbs, and fat. You can review and fine-tune gram amounts before saving to your daily diary.'
  },
  {
    question: 'What if I have prior injuries or orthopedic restrictions?',
    answer: 'Before your first session or program setup, you complete our intake questionnaire detailing your medical history, past injuries, and range of motion. Coach Marcus customizes exercise selections, replaces aggravating lifts with joint-friendly biomechanical equivalents, and includes therapeutic warmups.'
  },
  {
    question: 'How does the Progressive Web App (PWA) install on my iPhone or Android?',
    answer: 'No app store downloads or fees needed. When browsing our site on your mobile phone, tap "Install App" or use your browser Share menu → "Add to Home Screen". The app installs as a native icon with full-screen experience and offline support.'
  },
  {
    question: 'What is your session cancellation and reschedule policy?',
    answer: 'All 1-on-1 sessions are subject to a strict 12-hour notice window. If you need to reschedule or cancel, you can do so directly in your Client Portal up to 12 hours prior to start time without penalty. Sessions cancelled under 12 hours cannot be credited to respect the coach schedule.'
  },
  {
    question: 'Can I do the hybrid workouts in a basic commercial or apartment gym?',
    answer: 'Yes. Every assigned routine is tailored to the exact equipment you have access to. If you are traveling, the PWA offers dumbbell-only and bodyweight resistance alternatives with full video cues.'
  }
]

const openIndex = ref<number | null>(0)

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section id="faq" class="py-24 bg-brand-dark border-b border-brand-charcoal/10 relative">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 space-y-3">
        <div class="inline-flex items-center gap-2 text-brand-accent font-bold tracking-widest uppercase text-xs">
          <span class="w-8 h-px bg-brand-accent"></span>
          Clarity & Expectations
          <span class="w-8 h-px bg-brand-accent"></span>
        </div>
        <h2 class="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-brand-charcoal">
          Frequently Asked <span class="text-brand-accent">Questions.</span>
        </h2>
        <p class="text-brand-charcoal/70 text-sm sm:text-base">
          Everything you need to know about coaching, the PWA, and session rules.
        </p>
      </div>

      <div class="space-y-4">
        <div 
          v-for="(faq, i) in faqs" 
          :key="i"
          class="rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm"
          :class="openIndex === i ? 'bg-brand-gray border-brand-accent/60 shadow-md' : 'bg-brand-gray/60 border-brand-charcoal/10 hover:border-brand-charcoal/25'"
        >
          <button 
            @click="toggleFaq(i)"
            class="w-full text-left p-6 flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-brand-charcoal"
          >
            <span>{{ faq.question }}</span>
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300"
              :class="openIndex === i ? 'rotate-180 bg-brand-accent text-white' : 'bg-brand-charcoal/10 text-brand-charcoal'"
            >
              <Icon name="ph:caret-down-bold" class="w-4 h-4" />
            </div>
          </button>

          <div 
            v-if="openIndex === i"
            class="px-6 pb-6 pt-1 text-sm text-brand-charcoal/80 leading-relaxed border-t border-brand-charcoal/10 animate-fade-in-up"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
