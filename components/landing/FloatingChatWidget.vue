<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const userMessage = ref('')
const coachWhatsAppNumber = '+15551234567'

const sendWhatsApp = (customText?: string) => {
  const text = customText || userMessage.value || "Hi Coach Marcus! I want to book a free assessment and ask about EndureFitness coaching."
  const url = `https://wa.me/${coachWhatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')
  isOpen.value = false
}
</script>

<template>
  <div class="fixed bottom-6 left-6 z-40">
    <!-- Chat Modal Window -->
    <div 
      v-if="isOpen"
      class="mb-3 w-80 bg-brand-gray border border-brand-charcoal/15 rounded-2xl shadow-2xl p-4 backdrop-blur-xl animate-fade-in-up"
    >
      <div class="flex items-center justify-between pb-3 border-b border-brand-charcoal/10">
        <div class="flex items-center gap-2.5">
          <div class="relative">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Coach Marcus" 
              class="w-9 h-9 rounded-full object-cover border border-brand-accent"
            />
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-brand-gray"></span>
          </div>
          <div>
            <p class="font-heading font-bold text-xs text-brand-charcoal">Coach Marcus Vance</p>
            <p class="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              Online • Fast Response
            </p>
          </div>
        </div>
        <button @click="isOpen = false" class="text-brand-charcoal/60 hover:text-brand-charcoal p-1">
          <Icon name="ph:x-bold" class="w-4 h-4" />
        </button>
      </div>

      <div class="py-3 text-xs text-brand-charcoal">
        <p class="bg-brand-dark p-2.5 rounded-xl border border-brand-charcoal/10 mb-3 leading-relaxed text-brand-charcoal/85">
          👋 Hey! Ready to take your training to the next level? Ask me anything about assessment slots or custom meal plans.
        </p>

        <!-- Quick reply suggestions -->
        <div class="space-y-1.5 mb-3">
          <button 
            @click="sendWhatsApp('Hi Coach Marcus! I would like to book a 1-on-1 assessment slot.')"
            class="w-full text-left text-[11px] bg-brand-dark hover:bg-brand-accent/15 p-2 rounded-lg text-brand-accent font-semibold transition-colors block border border-brand-accent/30"
          >
            ⚡ "I'd like to book an assessment slot"
          </button>
          <button 
            @click="sendWhatsApp('Hi Coach Marcus! Does the Hybrid coaching program include the AI Food Scanner?')"
            class="w-full text-left text-[11px] bg-brand-dark hover:bg-brand-charcoal/5 p-2 rounded-lg text-brand-charcoal/80 transition-colors block border border-brand-charcoal/10"
          >
            🥗 "How does the AI food scanner work?"
          </button>
        </div>

        <div class="flex gap-2">
          <input 
            v-model="userMessage"
            type="text" 
            placeholder="Type a message..."
            @keyup.enter="sendWhatsApp()"
            class="flex-1 bg-brand-dark border border-brand-charcoal/15 rounded-lg px-3 py-1.5 text-xs text-brand-charcoal placeholder-brand-charcoal/50 focus:outline-none focus:border-brand-accent"
          />
          <button 
            @click="sendWhatsApp()"
            class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-2 rounded-lg transition-colors shrink-0 shadow-sm"
            title="Send on WhatsApp"
          >
            <Icon name="ph:paper-plane-right-fill" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Floating Trigger Button -->
    <button 
      @click="isOpen = !isOpen"
      class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold h-13 px-4 rounded-full flex items-center gap-2.5 shadow-[0_4px_25px_rgba(16,185,129,0.35)] hover:scale-105 active:scale-95 transition-all duration-200"
      aria-label="Chat on WhatsApp"
    >
      <Icon name="ph:whatsapp-logo-fill" class="w-6 h-6 text-white" />
      <span class="font-heading font-black text-xs uppercase tracking-wider hidden sm:inline">
        Chat With Coach
      </span>
    </button>
  </div>
</template>
