<script setup lang="ts">
import { ref } from 'vue'
import {
  Compass,
  LayoutTemplate,
  Share2,
  Megaphone,
  Search,
  Sparkles,
} from '@lucide/vue'
import ServiceCard from './ServiceCard.vue'
import { useScrollReveal } from '@/composables/useScrollAnimation'

const root = ref<HTMLElement | null>(null)
useScrollReveal(root, { childSelector: '.reveal-item', y: 36, stagger: 0.08 })

const services = [
  {
    number: '01',
    title: 'Digital Strategy',
    description:
      'Clarify positioning, channels and priorities so every initiative ladders up to growth.',
    icon: Compass,
    className: 'md:col-span-2 lg:col-span-2 lg:row-span-1',
  },
  {
    number: '02',
    title: 'Websites & Landing Pages',
    description:
      'High-craft experiences engineered for clarity, speed and conversion.',
    icon: LayoutTemplate,
    className: 'md:col-span-2 lg:col-span-2',
  },
  {
    number: '03',
    title: 'Social Media',
    description: 'Content systems that build presence, trust and consistent demand.',
    icon: Share2,
    className: 'md:col-span-2 lg:col-span-1',
  },
  {
    number: '04',
    title: 'Performance Marketing',
    description: 'Paid acquisition tuned for efficient acquisition and measurable returns.',
    icon: Megaphone,
    className: 'md:col-span-2 lg:col-span-1',
  },
  {
    number: '05',
    title: 'SEO',
    description: 'Technical and content foundations that compound organic discovery.',
    icon: Search,
    className: 'md:col-span-2 lg:col-span-2',
  },
  {
    number: '06',
    title: 'Branding & Creative',
    description: 'Identity and creative systems that feel premium and convert attention.',
    icon: Sparkles,
    className: 'md:col-span-2 lg:col-span-2',
  },
]</script>

<template>
  <section id="services" class="relative section-y section-pad">
    <div class="container-x" ref="root">
      <div class="reveal-item max-w-3xl">
        <p class="eyebrow mb-4">Services</p>
        <h2 class="heading-lg">Everything you need to grow online.</h2>
        <p class="body-lg mt-4 max-w-2xl sm:mt-5">
          From strategy to execution, we bring the pieces of your digital presence together.
        </p>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:gap-4 md:mt-14 md:grid-cols-4 lg:grid-cols-4 lg:gap-5">
        <ServiceCard
          v-for="service in services"
          :key="service.number"
          class="reveal-item cursor-expand"
          :number="service.number"
          :title="service.title"
          :description="service.description"
          :icon="service.icon"
          :class-name="service.className"
        />
      </div>
    </div>
  </section>
</template>
