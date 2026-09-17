<script setup lang="ts">
import { ref } from 'vue'

interface Faq {
  question: string
  answer: string
}

const faqs: Faq[] = [
  {
    question: 'Which areas in Kuala Lumpur & Selangor do you cover for doorstep PT?',
    answer: 'We provide direct doorstep personal training across major residential hotspots in Kuala Lumpur and Selangor, including Mont Kiara, Bangsar, KLCC, Damansara, Petaling Jaya, Subang Jaya, Puchong, Bukit Jalil, and nearby townships. Coach Yondy travels straight to your condominium gym or private residence.'
  },
  {
    question: 'What equipment do I need if I train in my living room or condo gym?',
    answer: 'If your condominium has a residential gym, we utilize your building’s amenities. If you prefer private training inside your living room or residence, Coach Yondy brings professional portable equipment—including resistance bands, adjustable weights, core sliders, and mobility tools. You do not need to buy any gear to get started.'
  },
  {
    question: 'What happens during the In-Home Assessment & Trial Session?',
    answer: 'Our 3-step process begins with an online consultation followed by an in-home assessment. During this 60-minute session at your doorstep, Coach Yondy conducts a biomechanical movement screening, posture check, and injury history review, followed by a calibrated trial workout to map out your customized training roadmap.'
  },
  {
    question: 'How does the nutrition coaching work without restrictive crash dieting?',
    answer: 'We firmly believe fitness shouldn’t feel like punishment. Rather than extreme calorie-cutting that triggers rebound weight gain, Coach Yondy implements practical, habit-based nutrition built around your Malaysian lifestyle and dining preferences. You can log daily meals easily using our integrated AI Food Scanner for swift feedback and continuous guidance.'
  },
  {
    question: 'Can I train together with my partner, family member, or friend?',
    answer: 'Absolutely! Our Duo & Small Group Training is designed specifically for couples, friends, or family who want to build healthy habits together. Coach Yondy tailors exercise cues and regressions individually for each person so both of you make optimal, safe progress.'
  },
  {
    question: 'What is your session cancellation and rescheduling policy?',
    answer: 'All doorstep and private sessions operate on a flexible 12-hour notice window. If an urgent work meeting or travel arises, you can reschedule your session up to 12 hours before the appointment directly via your Client Portal or WhatsApp without penalty.'
  }
]

const openIndex = ref<number | null>(0)

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section id="faq" class="py-24 bg-brand-dark border-b border-brand-earth/10 relative">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 space-y-3">
        <div class="inline-flex items-center gap-2 text-brand-sage font-bold tracking-widest uppercase text-xs">
          <span class="w-8 h-px bg-brand-sage"></span>
          Clarity & Expectations
          <span class="w-8 h-px bg-brand-sage"></span>
        </div>
        <h2 class="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-brand-charcoal">
          Frequently Asked <span class="text-brand-sage">Questions.</span>
        </h2>
        <p class="text-brand-muted text-sm sm:text-base">
          Everything you need to know about Doorstep PT, condo gym coaching, and booking with Coach Yondy.
        </p>
      </div>

      <div class="space-y-4">
        <div 
          v-for="(faq, i) in faqs" 
          :key="i"
          class="rounded-3xl border transition-all duration-200 overflow-hidden shadow-sm"
          :class="openIndex === i ? 'bg-brand-gray border-brand-sage shadow-md' : 'bg-brand-gray/60 border-brand-earth/15 hover:border-brand-sage/40'"
        >
          <button 
            @click="toggleFaq(i)"
            class="w-full text-left p-6 flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-brand-charcoal"
          >
            <span>{{ faq.question }}</span>
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300"
              :class="openIndex === i ? 'rotate-180 bg-brand-sage text-white' : 'bg-brand-earth/10 text-brand-charcoal'"
            >
              <Icon name="ph:caret-down-bold" class="w-4 h-4" />
            </div>
          </button>

          <div 
            v-if="openIndex === i"
            class="px-6 pb-6 pt-1 text-sm text-brand-muted leading-relaxed border-t border-brand-earth/10 animate-fade-in-up"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
