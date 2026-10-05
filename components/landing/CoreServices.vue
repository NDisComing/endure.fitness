<script setup lang="ts">
import { ref, computed } from 'vue'

interface ServiceTier {
  id: string
  title: string
  shortTitle: string
  subtitle: string
  badge?: string
  isFlagship?: boolean
  icon: string
  price: string
  cadence: string
  subPrice?: string
  description: string
  features: string[]
  ctaText: string
  ctaLink: string
}

const serviceTiers: ServiceTier[] = [
  {
    id: 'doorstep-pt',
    title: '1-on-1 Doorstep PT',
    shortTitle: 'Doorstep PT',
    subtitle: 'Flagship In-Home Coaching',
    badge: 'Flagship Service',
    isFlagship: true,
    icon: 'ph:house-line-bold',
    price: 'RM 180',
    cadence: '/ session',
    description: 'Professional personal training right at your residence or condo gym. Zero traffic, 100% privacy, and science-backed efficiency.',
    features: [
      'Direct doorstep travel across KL & Selangor',
      'Training equipment provided if your condo lacks gear',
      'Posture correction & biomechanical movement screen',
      'Tailored progressive workout programming',
      'Habit-based nutrition guidance & WhatsApp accountability'
    ],
    ctaText: 'Book Doorstep Assessment',
    ctaLink: '/book'
  },
  {
    id: 'partner-gym',
    title: 'Partner Private Gym PT',
    shortTitle: 'Partner Gym',
    subtitle: 'Dedicated Training Facility',
    badge: 'Private Facility',
    isFlagship: false,
    icon: 'ph:barbell-bold',
    price: 'RM 160',
    cadence: '/ session',
    description: 'Prefer a dedicated gym setup? Train inside handpicked, distraction-free partner private gym facilities across Klang Valley.',
    features: [
      'Access to elite, uncrowded private gym setups',
      'Full suite of specialized barbells, racks & machines',
      'Zero equipment queueing or gym floor distractions',
      'Heavy progressive overload & hypertrophy focus',
      'Regular InBody body recomposition check-ins'
    ],
    ctaText: 'Book Gym Session',
    ctaLink: '/book'
  },
  {
    id: 'duo-training',
    title: 'Duo In-Home Training',
    shortTitle: 'Duo Training',
    subtitle: 'Couples & Friends',
    badge: 'Shared Energy',
    isFlagship: false,
    icon: 'ph:users-three-bold',
    price: 'RM 240',
    cadence: '/ session (2 pax)',
    subPrice: 'RM 120 / person',
    description: 'Train together with your spouse, partner, or friend right at home. Double the motivation and accountability at a shared rate.',
    features: [
      'Cost-effective shared rate (RM 120 / person)',
      'Delivered directly to your condo gym or living room',
      'Individually tailored exercise regressions for both',
      'High-accountability mutual motivation & fun dynamic',
      'Personalized nutrition & habit coaching for each partner'
    ],
    ctaText: 'Schedule Duo Trial',
    ctaLink: '/book'
  }
]

// Mobile-Only Tab Switcher State & Directional Transitions
const selectedTab = ref<string>('doorstep-pt')
const transitionDirection = ref<'next' | 'prev'>('next')

const activeService = computed(() => {
  return serviceTiers.find(s => s.id === selectedTab.value) || serviceTiers[0]
})

const activeIndex = computed(() => {
  return serviceTiers.findIndex(s => s.id === selectedTab.value)
})

const switchTab = (targetId: string) => {
  const currentIdx = activeIndex.value
  const targetIdx = serviceTiers.findIndex(s => s.id === targetId)
  if (targetIdx > currentIdx) {
    transitionDirection.value = 'next'
  } else if (targetIdx < currentIdx) {
    transitionDirection.value = 'prev'
  }
  selectedTab.value = targetId
}

const selectNext = () => {
  transitionDirection.value = 'next'
  const nextIdx = (activeIndex.value + 1) % serviceTiers.length
  selectedTab.value = serviceTiers[nextIdx].id
}

const selectPrev = () => {
  transitionDirection.value = 'prev'
  const prevIdx = (activeIndex.value - 1 + serviceTiers.length) % serviceTiers.length
  selectedTab.value = serviceTiers[prevIdx].id
}

// Mobile Touch Swipe Handling
const touchStartX = ref(0)
const touchEndX = ref(0)

const onTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.changedTouches[0].screenX
}

const onTouchEnd = (e: TouchEvent) => {
  touchEndX.value = e.changedTouches[0].screenX
  const diff = touchStartX.value - touchEndX.value
  if (Math.abs(diff) > 40) {
    if (diff > 0) {
      selectNext()
    } else {
      selectPrev()
    }
  }
}
</script>

<template>
  <section id="services" class="py-10 sm:py-14 lg:py-18 bg-brand-dark border-b border-brand-earth/10 relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-6 sm:mb-10 lg:mb-12 space-y-3">
        <div class="inline-flex items-center gap-2 text-brand-sage font-primary tracking-widest uppercase text-xs">
          <span class="w-8 h-px bg-brand-sage"></span>
          Services & Transparent Rates
          <span class="w-8 h-px bg-brand-sage"></span>
        </div>
        <h2 class="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-brand-charcoal leading-tight">
          Tailored Services. <span class="text-brand-sage">Clear Rates.</span>
        </h2>
        <p class="text-brand-muted text-base sm:text-lg leading-relaxed font-normal font-info">
          Transparent, session-based coaching with zero lock-in contracts. 
          Everything you need for sustainable body recomposition and lifelong fitness.
        </p>
      </div>

      <!-- ===================================================== -->
      <!-- 1. MOBILE-ONLY VIEW: Segmented Control & Animated Card -->
      <!-- ===================================================== -->
      <div class="lg:hidden">
        <!-- Segmented Control Pill Switcher Bar -->
        <div class="flex flex-col items-center justify-center mb-6">
          <div class="p-1.5 bg-brand-gray border border-brand-earth/20 rounded-full shadow-inner inline-flex items-center gap-1 max-w-full overflow-x-auto relative">
            <button
              v-for="service in serviceTiers"
              :key="service.id"
              @click="switchTab(service.id)"
              class="relative px-3.5 py-2.5 rounded-full font-primary text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap cursor-pointer select-none"
              :class="selectedTab === service.id
                ? 'bg-brand-earth text-white shadow-md font-bold'
                : 'text-brand-charcoal/75 hover:text-brand-charcoal hover:bg-brand-dark/60 font-semibold'"
            >
              <Icon 
                :name="service.icon" 
                class="w-3.5 h-3.5 shrink-0 transition-colors" 
                :class="selectedTab === service.id ? 'text-brand-sand' : 'text-brand-sage'" 
              />
              <span>{{ service.shortTitle }}</span>
              <span 
                v-if="service.isFlagship" 
                class="text-[9px] px-1.5 py-0.2 rounded-full uppercase tracking-tighter shrink-0"
                :class="selectedTab === service.id ? 'bg-brand-sand text-brand-charcoal font-bold' : 'bg-brand-sage/20 text-brand-sage font-bold'"
              >
                ★
              </span>
            </button>
          </div>

          <!-- Quick Navigation: Prev, Dots, Next -->
          <div class="flex items-center justify-between w-full max-w-xs px-2 mt-3 text-xs text-brand-muted font-info">
            <button 
              @click="selectPrev" 
              class="p-1 rounded-full hover:bg-brand-gray text-brand-charcoal transition-colors flex items-center gap-1 font-primary text-xs uppercase tracking-wider cursor-pointer"
              aria-label="Previous Package"
            >
              <Icon name="ph:caret-left-bold" class="w-3.5 h-3.5 text-brand-sage" />
              <span>Prev</span>
            </button>
            
            <div class="flex items-center gap-2">
              <button
                v-for="service in serviceTiers"
                :key="service.id"
                @click="switchTab(service.id)"
                class="h-2 rounded-full transition-all duration-300 cursor-pointer"
                :class="selectedTab === service.id ? 'w-6 bg-brand-sage' : 'w-2 bg-brand-earth/25 hover:bg-brand-earth/50'"
                :aria-label="`Switch to ${service.title}`"
              ></button>
            </div>

            <button 
              @click="selectNext" 
              class="p-1 rounded-full hover:bg-brand-gray text-brand-charcoal transition-colors flex items-center gap-1 font-primary text-xs uppercase tracking-wider cursor-pointer"
              aria-label="Next Package"
            >
              <span>Next</span>
              <Icon name="ph:caret-right-bold" class="w-4 h-4 text-brand-sage" />
            </button>
          </div>
        </div>

        <!-- Animated Single Card Container with Touch Swipe -->
        <div 
          class="max-w-md mx-auto overflow-hidden px-1"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
        >
          <Transition :name="transitionDirection === 'next' ? 'slide-next' : 'slide-prev'" mode="out-in">
            <div 
              :key="activeService.id"
              class="relative rounded-3xl bg-brand-gray p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl"
              :class="activeService.isFlagship 
                ? 'border-2 border-brand-sage shadow-[0_12px_36px_rgba(34,57,111,0.22)]' 
                : 'border border-brand-earth/20'"
            >
              <!-- Featured Badge -->
              <div 
                v-if="activeService.badge"
                class="inline-flex items-center gap-1.5 self-start mb-4 px-3 py-1 rounded-full text-xs font-primary uppercase tracking-wider shadow-sm"
                :class="activeService.isFlagship 
                  ? 'bg-brand-sage text-white' 
                  : 'bg-brand-dark text-brand-charcoal border border-brand-earth/15'"
              >
                <Icon v-if="activeService.isFlagship" name="ph:star-fill" class="w-3.5 h-3.5 text-brand-sand" />
                <span>{{ activeService.badge }}</span>
              </div>

              <div>
                <!-- Header Row: Title & Icon -->
                <div class="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p class="text-xs font-primary uppercase tracking-widest text-brand-sage mb-1">
                      {{ activeService.subtitle }}
                    </p>
                    <h3 class="font-heading font-black text-2xl uppercase tracking-tight text-brand-charcoal">
                      {{ activeService.title }}
                    </h3>
                  </div>
                  <div class="w-12 h-12 rounded-2xl bg-brand-dark border border-brand-earth/15 flex items-center justify-center text-brand-sage shrink-0 shadow-sm">
                    <Icon :name="activeService.icon" class="w-6 h-6" />
                  </div>
                </div>

                <!-- Description -->
                <p class="text-brand-muted text-xs sm:text-sm leading-relaxed mb-6 font-normal font-info min-h-[44px]">
                  {{ activeService.description }}
                </p>

                <!-- Price Block -->
                <div class="mb-6 pb-6 border-b border-brand-earth/10 flex items-baseline justify-between">
                  <div>
                    <span class="font-primary text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
                      {{ activeService.price }}
                    </span>
                    <span class="text-brand-muted text-xs sm:text-sm font-info font-medium ml-1.5">
                      {{ activeService.cadence }}
                    </span>
                  </div>
                  <span v-if="activeService.subPrice" class="text-[11px] font-primary text-brand-sage uppercase tracking-wider bg-brand-dark px-2.5 py-1 rounded-lg border border-brand-earth/15 shadow-sm">
                    {{ activeService.subPrice }}
                  </span>
                </div>

                <!-- Features List -->
                <ul class="space-y-3 mb-8">
                  <li 
                    v-for="(feat, fIdx) in activeService.features" 
                    :key="fIdx"
                    class="flex items-start gap-3 text-xs sm:text-sm text-brand-charcoal/85 font-info font-medium"
                  >
                    <Icon name="ph:check-circle-bold" class="w-4 h-4 text-brand-sage shrink-0 mt-0.5" />
                    <span>{{ feat }}</span>
                  </li>
                </ul>
              </div>

              <!-- Bottom CTA Button & Step Counter -->
              <div class="pt-4 border-t border-brand-earth/10 flex flex-col gap-3">
                <NuxtLink 
                  :to="activeService.ctaLink"
                  class="w-full py-4 px-6 rounded-full font-primary text-sm uppercase tracking-wider text-center transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
                  :class="activeService.isFlagship 
                    ? 'bg-brand-earth text-white hover:bg-brand-sage shadow-lg' 
                    : 'bg-brand-dark hover:bg-brand-sage hover:text-white text-brand-charcoal border border-brand-earth/20'"
                >
                  <span>{{ activeService.ctaText }}</span>
                  <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
                </NuxtLink>

                <div class="flex items-center justify-between pt-1 text-[11px] font-primary uppercase tracking-wider text-brand-muted">
                  <button 
                    @click="selectPrev"
                    class="hover:text-brand-sage flex items-center gap-1 transition-colors cursor-pointer py-1"
                  >
                    <Icon name="ph:arrow-left" class="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                  <span class="text-brand-muted/70 font-info font-normal">
                    {{ activeIndex + 1 }} of {{ serviceTiers.length }}
                  </span>
                  <button 
                    @click="selectNext"
                    class="hover:text-brand-sage flex items-center gap-1 transition-colors cursor-pointer py-1"
                  >
                    <span>Next</span>
                    <Icon name="ph:arrow-right" class="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- ===================================================== -->
      <!-- 2. DESKTOP-ONLY VIEW: Classic Clean 3-Column Grid     -->
      <!-- ===================================================== -->
      <div class="hidden lg:grid lg:grid-cols-3 gap-8 items-stretch">
        <div 
          v-for="service in serviceTiers" 
          :key="service.id"
          class="relative rounded-3xl bg-brand-gray p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-sm group"
          :class="service.isFlagship 
            ? 'border-2 border-brand-sage shadow-[0_8px_30px_rgba(34,57,111,0.22)]' 
            : 'border border-brand-earth/15 hover:border-brand-sage/50'"
        >
          <!-- Featured Badge -->
          <div 
            v-if="service.badge"
            class="inline-flex items-center gap-1.5 self-start mb-4 px-3 py-1 rounded-full text-xs font-primary uppercase tracking-wider shadow-sm"
            :class="service.isFlagship 
              ? 'bg-brand-sage text-white' 
              : 'bg-brand-dark text-brand-charcoal border border-brand-earth/15'"
          >
            <Icon v-if="service.isFlagship" name="ph:star-fill" class="w-3.5 h-3.5 text-brand-sand" />
            <span>{{ service.badge }}</span>
          </div>

          <div>
            <!-- Header Row: Title & Icon -->
            <div class="flex items-start justify-between gap-4 mb-3">
              <div>
                <p class="text-xs font-primary uppercase tracking-widest text-brand-sage mb-1">
                  {{ service.subtitle }}
                </p>
                <h3 class="font-heading font-black text-2xl uppercase tracking-tight text-brand-charcoal">
                  {{ service.title }}
                </h3>
              </div>
              <div class="w-12 h-12 rounded-2xl bg-brand-dark border border-brand-earth/15 flex items-center justify-center text-brand-sage shrink-0 group-hover:bg-brand-sage group-hover:text-white transition-colors shadow-sm">
                <Icon :name="service.icon" class="w-6 h-6" />
              </div>
            </div>

            <!-- Description -->
            <p class="text-brand-muted text-xs sm:text-sm leading-relaxed mb-6 font-normal font-info min-h-[44px]">
              {{ service.description }}
            </p>

            <!-- Price Block -->
            <div class="mb-6 pb-6 border-b border-brand-earth/10 flex items-baseline justify-between">
              <div>
                <span class="font-primary text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
                  {{ service.price }}
                </span>
                <span class="text-brand-muted text-xs sm:text-sm font-info font-medium ml-1.5">
                  {{ service.cadence }}
                </span>
              </div>
              <span v-if="service.subPrice" class="text-[11px] font-primary text-brand-sage uppercase tracking-wider bg-brand-dark px-2.5 py-1 rounded-lg border border-brand-earth/15">
                {{ service.subPrice }}
              </span>
            </div>

            <!-- Features List -->
            <ul class="space-y-3 mb-8">
              <li 
                v-for="(feat, fIdx) in service.features" 
                :key="fIdx"
                class="flex items-start gap-3 text-xs sm:text-sm text-brand-charcoal/85 font-info font-medium"
              >
                <Icon name="ph:check-circle-bold" class="w-4 h-4 text-brand-sage shrink-0 mt-0.5" />
                <span>{{ feat }}</span>
              </li>
            </ul>
          </div>

          <!-- Bottom CTA Button -->
          <div class="pt-4 border-t border-brand-earth/10">
            <NuxtLink 
              :to="service.ctaLink"
              class="w-full py-4 px-6 rounded-full font-primary text-sm uppercase tracking-wider text-center transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-95"
              :class="service.isFlagship 
                ? 'bg-brand-earth text-white hover:bg-brand-sage shadow-md' 
                : 'bg-brand-dark hover:bg-brand-sage hover:text-white text-brand-charcoal border border-brand-earth/15'"
            >
              <span>{{ service.ctaText }}</span>
              <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- ===================================================== -->
      <!-- 3. Bespoke Consulting Banner: Gym Space Design & Setup-->
      <!-- ===================================================== -->
      <div class="mt-12 rounded-3xl bg-brand-gray border border-brand-earth/15 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:border-brand-sage/40 transition-colors">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-2xl bg-brand-dark border border-brand-earth/15 flex items-center justify-center text-brand-sage shrink-0 shadow-sm">
            <Icon name="ph:compass-tool-bold" class="w-6 h-6" />
          </div>
          <div>
            <div class="inline-flex items-center gap-2 mb-1">
              <span class="text-[10px] font-primary uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-dark border border-brand-earth/15 text-brand-earth">
                Bespoke Consulting
              </span>
              <span class="text-xs font-primary uppercase tracking-widest text-brand-sage">Residential & Commercial</span>
            </div>
            <h4 class="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-brand-charcoal">
              Gym Space Design & Equipment Advisory
            </h4>
            <p class="text-xs sm:text-sm text-brand-muted mt-1 max-w-2xl font-normal font-info leading-relaxed">
              Spatial flow 3D planning, equipment sourcing, and biomechanical safety optimization for luxury condo gyms, landed residences, and corporate fitness spaces.
            </p>
          </div>
        </div>

        <div class="shrink-0 w-full md:w-auto">
          <a
            href="https://wa.me/60199850163?text=Hi%20Coach%20Yondy!%20I%20would%20like%20to%20inquire%20about%20Gym%20Space%20Design%20and%20Equipment%20Consulting."
            target="_blank"
            class="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-brand-dark hover:bg-brand-sage hover:text-white text-brand-charcoal border border-brand-earth/20 font-primary text-sm uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-200 shadow-sm active:scale-95"
          >
            <Icon name="ph:whatsapp-logo-fill" class="w-4 h-4 text-emerald-700" />
            <span>Inquire Gym Design</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Directional Slide + Crossfade Transitions for Mobile Content Switch */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-next-enter-from {
  opacity: 0;
  transform: translateX(36px) scale(0.97);
}
.slide-next-leave-to {
  opacity: 0;
  transform: translateX(-36px) scale(0.97);
}

.slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-36px) scale(0.97);
}
.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(36px) scale(0.97);
}
</style>
