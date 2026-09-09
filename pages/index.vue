<script setup lang="ts">
import HeroSection from '~/components/landing/HeroSection.vue'
import TrainerBio from '~/components/landing/TrainerBio.vue'
import ComparisonSlider from '~/components/landing/ComparisonSlider.vue'
import PricingTiers from '~/components/landing/PricingTiers.vue'
import FaqSection from '~/components/landing/FaqSection.vue'
import FloatingChatWidget from '~/components/landing/FloatingChatWidget.vue'

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'EndureFitness | Elite 1-on-1 Personal Training & PWA Portal',
  meta: [
    {
      name: 'description',
      content: 'Transform your body with Coach Marcus Vance. 1-on-1 private gym sessions, AI food scanner nutrition diary, and custom biomechanical workout routines.'
    }
  ]
})
</script>

<template>
  <div class="relative">
    <!-- Module 1: Hero Section with Proof Stats & CTAs -->
    <HeroSection />

    <!-- Module 1: Trainer Bio & Certifications -->
    <TrainerBio />

    <!-- Module 1: Side-by-Side Comparison Slider of Progress Photos -->
    <ComparisonSlider />

    <!-- Module 1: Program Tier Cards -->
    <PricingTiers />

    <!-- Module 1: FAQ Accordion Addressing Objections -->
    <FaqSection />

    <!-- Module 1: Floating WhatsApp Quick Chat Widget -->
    <FloatingChatWidget />
  </div>
</template>
