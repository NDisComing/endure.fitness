<script setup lang="ts">
import HeroSection from '~/components/landing/HeroSection.vue'
import TrainerBio from '~/components/landing/TrainerBio.vue'
import WhyInHome from '~/components/landing/WhyInHome.vue'
import CoreServices from '~/components/landing/CoreServices.vue'
import HowItWorks from '~/components/landing/HowItWorks.vue'
import ComparisonSlider from '~/components/landing/ComparisonSlider.vue'
import PricingTiers from '~/components/landing/PricingTiers.vue'
import FaqSection from '~/components/landing/FaqSection.vue'
import FloatingChatWidget from '~/components/landing/FloatingChatWidget.vue'

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Endure Fitness | Premium Doorstep Personal Training in Kuala Lumpur & Selangor',
  meta: [
    {
      name: 'description',
      content: 'Premium doorstep personal training delivered right to your residence or condo gym across Kuala Lumpur & Selangor by Coach Yondy. Zero traffic, 100% privacy, and science-backed efficiency.'
    },
    {
      property: 'og:title',
      content: 'Endure Fitness | Premium Doorstep Personal Training (KL & Selangor)'
    },
    {
      property: 'og:description',
      content: 'Built for busy individuals. 1-on-1 doorstep PT, partner private gyms, and customized science-backed training by Coach Yondy.'
    }
  ]
})
</script>

<template>
  <div class="relative bg-brand-dark min-h-screen text-brand-charcoal">
    <!-- 1. Hero Section: Headline, Tagline & Key Metrics -->
    <HeroSection />

    <!-- 2. Meet Coach Yondy: Founder Bio, Philosophy & Credentials (Directly After Hero) -->
    <TrainerBio />

    <!-- 3. Why In-Home Coaching: Pain Points Solved & Service Coverage -->
    <WhyInHome />

    <!-- 4. Core Services: Flagship Doorstep PT, Partner Gym, Duo, Gym Design -->
    <CoreServices />

    <!-- 5. How It Works: 3 Simple Steps -->
    <HowItWorks />

    <!-- 6. Client Transformations: Comparison Slider with Real Proof -->
    <ComparisonSlider />

    <!-- 7. Program Investment & Tiers -->
    <PricingTiers />

    <!-- 8. FAQ Section -->
    <FaqSection />

    <!-- 9. WhatsApp Quick Chat Widget -->
    <FloatingChatWidget />
  </div>
</template>
