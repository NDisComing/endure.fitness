<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const userMessage = ref('')
const coachWhatsAppNumber = '+60123456789'

const sendWhatsApp = (customText?: string) => {
  const text = customText || userMessage.value || "Hi Coach Yondy! I would like to inquire about Endure Fitness doorstep personal training in KL/Selangor."
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
      class="mb-3 w-80 bg-brand-gray border border-brand-earth/20 rounded-3xl shadow-2xl p-4 backdrop-blur-xl animate-fade-in-up"
    >
      <div class="flex items-center justify-between pb-3 border-b border-brand-earth/10">
        <div class="flex items-center gap-2.5">
          <div class="relative">
            <img 
              src="/images/coach-yondy.jpeg" 
              alt="Coach Yondy" 
              class="w-10 h-10 rounded-full object-cover object-top border border-brand-sage"
            />
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-brand-sage rounded-full ring-2 ring-brand-gray"></span>
          </div>
          <div>
            <p class="font-heading font-bold text-xs text-brand-charcoal">Coach Yondy</p>
            <p class="text-[10px] text-brand-sage font-semibold flex items-center gap-1">
              Founder & Head Coach • Active Now
            </p>
          </div>
        </div>
        <button @click="isOpen = false" class="text-brand-muted hover:text-brand-charcoal p-1" aria-label="Close Chat">
          <Icon name="ph:x-bold" class="w-4 h-4" />
        </button>
      </div>

      <div class="py-3 text-xs text-brand-charcoal">
        <p class="bg-brand-dark p-3 rounded-2xl border border-brand-earth/10 mb-3 leading-relaxed text-brand-charcoal font-normal">
          👋 Hi! Looking for private personal training at your doorstep or condo gym in KL/Selangor? Message me directly on WhatsApp!
        </p>

        <!-- Quick reply suggestions -->
        <div class="space-y-1.5 mb-3">
          <button 
            @click="sendWhatsApp('Hi Coach Yondy! I would like to book a doorstep assessment and trial session in KL/Selangor.')"
            class="w-full text-left text-[11px] bg-brand-dark hover:bg-brand-sage/15 p-2.5 rounded-xl text-brand-charcoal font-semibold transition-colors block border border-brand-sage/30"
          >
            ⚡ "Book In-Home Assessment & Trial"
          </button>
          <button 
            @click="sendWhatsApp('Hi Coach Yondy! Does your Doorstep PT service cover my condo area?')"
            class="w-full text-left text-[11px] bg-brand-dark hover:bg-brand-gray p-2.5 rounded-xl text-brand-muted transition-colors block border border-brand-earth/10"
          >
            📍 "Check my condo area in KL / Selangor"
          </button>
          <button 
            @click="sendWhatsApp('Hi Coach Yondy! Tell me more about Duo & small group training packages.')"
            class="w-full text-left text-[11px] bg-brand-dark hover:bg-brand-gray p-2.5 rounded-xl text-brand-muted transition-colors block border border-brand-earth/10"
          >
            👥 "Ask about Duo & Couple Training"
          </button>
        </div>

        <div class="flex gap-2">
          <input 
            v-model="userMessage"
            type="text" 
            placeholder="Type your question..."
            @keyup.enter="sendWhatsApp()"
            class="flex-1 bg-brand-dark border border-brand-earth/15 rounded-full px-4 py-2 text-xs text-brand-charcoal placeholder-brand-muted focus:outline-none focus:border-brand-sage"
          />
          <button 
            @click="sendWhatsApp()"
            class="bg-emerald-700 hover:bg-emerald-600 text-white font-bold p-2.5 rounded-full transition-colors shrink-0 shadow-sm flex items-center justify-center"
            title="Chat on WhatsApp"
            aria-label="Send WhatsApp"
          >
            <Icon name="ph:paper-plane-right-fill" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Floating Trigger Button in Emerald / Sage -->
    <button 
      @click="isOpen = !isOpen"
      class="bg-emerald-800 hover:bg-emerald-700 text-white font-bold h-13 px-4 rounded-full flex items-center gap-2.5 shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
      aria-label="Chat with Coach Yondy on WhatsApp"
    >
      <Icon name="ph:whatsapp-logo-fill" class="w-6 h-6 text-white" />
      <span class="font-heading font-black text-xs uppercase tracking-wider hidden sm:inline">
        Chat With Coach Yondy
      </span>
    </button>
  </div>
</template>
