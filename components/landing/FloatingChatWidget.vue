<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const userMessage = ref('')
const coachWhatsAppNumber = '+60199850163'

const sendWhatsApp = (customText?: string) => {
  const text = customText || userMessage.value || "Hi Coach Yondy! I would like to inquire about Endure Fitness doorstep personal training in KL/Selangor."
  const url = `https://wa.me/${coachWhatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')
  isOpen.value = false
}
</script>

<template>
  <!-- Floating WhatsApp Widget: Bottom-Right on mobile, Bottom-Left on desktop -->
  <div class="fixed bottom-5 right-5 sm:bottom-6 sm:left-6 sm:right-auto z-50">
    <!-- Chat Modal Window -->
    <div 
      v-if="isOpen"
      class="absolute bottom-16 right-0 sm:right-auto sm:left-0 mb-2 w-[calc(100vw-2.5rem)] sm:w-96 max-w-sm bg-brand-gray border border-brand-earth/20 rounded-3xl shadow-2xl p-4.5 backdrop-blur-xl animate-fade-in-up"
    >
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-3 border-b border-brand-earth/10">
        <div class="flex items-center gap-2.5">
          <div class="relative">
            <img 
              src="/images/coach-yondy.jpeg" 
              alt="Coach Yondy" 
              class="w-10 h-10 rounded-full object-cover object-top border-2 border-emerald-500 shadow-sm"
            />
            <span class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-brand-gray"></span>
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <p class="font-heading font-black text-sm text-brand-charcoal uppercase tracking-tight">Coach Yondy</p>
              <Icon name="ph:seal-check-fill" class="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <p class="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 font-info">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Online • Replies within 15 mins
            </p>
          </div>
        </div>
        <button 
          @click="isOpen = false" 
          class="w-7 h-7 rounded-full bg-brand-dark/80 hover:bg-brand-earth hover:text-white text-brand-muted flex items-center justify-center transition-colors"
          aria-label="Close Chat"
        >
          <Icon name="ph:x-bold" class="w-3.5 h-3.5" />
        </button>
      </div>

      <!-- Modal Body -->
      <div class="py-3 text-xs text-brand-charcoal">
        <div class="bg-brand-dark p-3.5 rounded-2xl border border-brand-earth/10 mb-3 leading-relaxed text-brand-charcoal font-info shadow-xs">
          <p class="font-medium text-xs text-brand-charcoal">
            👋 <span class="font-bold">Hi there!</span> Looking for 1-on-1 personal training at your condo gym or residence in KL/Selangor?
          </p>
          <p class="text-[11px] text-brand-muted mt-1">
            Tap a quick question below or send me a message directly!
          </p>
        </div>

        <!-- Quick reply suggestion chips -->
        <div class="space-y-1.5 mb-3.5">
          <button 
            @click="sendWhatsApp('Hi Coach Yondy! I would like to book a doorstep assessment and trial session in KL/Selangor.')"
            class="w-full text-left text-[11px] bg-brand-dark hover:bg-emerald-50 hover:border-emerald-500/40 p-2.5 rounded-xl text-brand-charcoal font-medium transition-all block border border-brand-earth/15 group shadow-xs cursor-pointer"
          >
            <span class="text-emerald-700 font-bold mr-1">⚡</span>
            <span>Book In-Home Assessment & Trial</span>
          </button>
          
          <button 
            @click="sendWhatsApp('Hi Coach Yondy! Does your Doorstep PT service cover my condo area in KL/Selangor?')"
            class="w-full text-left text-[11px] bg-brand-dark hover:bg-emerald-50 hover:border-emerald-500/40 p-2.5 rounded-xl text-brand-charcoal font-medium transition-all block border border-brand-earth/15 group shadow-xs cursor-pointer"
          >
            <span class="text-brand-sage font-bold mr-1">📍</span>
            <span>Check my condo area in KL / Selangor</span>
          </button>
          
          <button 
            @click="sendWhatsApp('Hi Coach Yondy! Tell me more about Duo & couple training rates.')"
            class="w-full text-left text-[11px] bg-brand-dark hover:bg-emerald-50 hover:border-emerald-500/40 p-2.5 rounded-xl text-brand-charcoal font-medium transition-all block border border-brand-earth/15 group shadow-xs cursor-pointer"
          >
            <span class="text-brand-earth font-bold mr-1">👥</span>
            <span>Ask about Duo & Couple Training</span>
          </button>
        </div>

        <!-- Input row -->
        <div class="flex gap-2">
          <input 
            v-model="userMessage"
            type="text" 
            placeholder="Type your question..."
            @keyup.enter="sendWhatsApp()"
            class="flex-1 bg-brand-dark border border-brand-earth/20 rounded-full px-4 py-2.5 text-xs text-brand-charcoal placeholder-brand-muted focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-info"
          />
          <button 
            @click="sendWhatsApp()"
            class="bg-[#25D366] hover:bg-[#20ba59] text-white p-2.5 rounded-full transition-all shrink-0 shadow-md hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
            title="Send on WhatsApp"
            aria-label="Send WhatsApp"
          >
            <Icon name="ph:paper-plane-right-fill" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Floating WhatsApp Action Trigger Button (Bottom-Right) -->
    <button 
      @click="isOpen = !isOpen"
      class="group relative bg-[#25D366] hover:bg-[#20ba59] text-white font-primary h-12 sm:h-13 px-4 sm:px-5 rounded-full flex items-center gap-2.5 shadow-[0_6px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_30px_rgba(37,211,102,0.6)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 cursor-pointer select-none"
      aria-label="Chat with Coach Yondy on WhatsApp"
    >
      <!-- Pulsing live indicator dot -->
      <span class="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
      </span>

      <!-- Official WhatsApp Icon -->
      <Icon name="ph:whatsapp-logo-fill" class="w-6 h-6 sm:w-6.5 sm:h-6.5 text-white transition-transform group-hover:scale-110" />
      
      <!-- Label -->
      <span class="text-xs sm:text-sm font-bold tracking-wider uppercase text-white">
        WhatsApp
      </span>
      <span class="text-[10px] text-emerald-950/70 font-bold bg-white/30 px-2 py-0.5 rounded-full hidden sm:inline uppercase">
        Online
      </span>
    </button>
  </div>
</template>
