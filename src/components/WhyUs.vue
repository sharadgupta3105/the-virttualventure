<script setup lang="ts">
import { ref } from 'vue'
import { Crosshair, Gauge, Layers, RefreshCw } from '@lucide/vue'
import { useScrollReveal } from '@/composables/useScrollAnimation'

const root = ref<HTMLElement | null>(null)
useScrollReveal(root, { childSelector: '.reveal-item', y: 32, stagger: 0.1 })

const features = [
  {
    title: 'Strategy First',
    description: "We don't start with random posts or ads. We start with the business problem.",
    icon: Crosshair,
  },
  {
    title: 'Built to Convert',
    description: 'Beautiful is good. Beautiful and effective is better.',
    icon: Gauge,
  },
  {
    title: 'One Digital Partner',
    description: 'Strategy, creative, technology and growth under one roof.',
    icon: Layers,
  },
  {
    title: 'Always Improving',
    description: "Launch isn't the finish line. We test, learn and optimize.",
    icon: RefreshCw,
  },
]
</script>

<template>
  <section id="why-us" class="relative section-y section-pad">
    <div class="container-x" ref="root">
      <div class="reveal-item max-w-3xl">
        <p class="eyebrow mb-4">Why us</p>
        <h2 class="heading-lg">Why venture with us?</h2>
      </div>

      <div class="mt-10 space-y-4 sm:mt-12 sm:space-y-5 md:mt-14">
        <article
          v-for="(feature, index) in features"
          :key="feature.title"
          class="reveal-item grid items-center gap-5 overflow-hidden rounded-2xl border border-line bg-card/80 p-5 sm:gap-6 sm:rounded-[1.75rem] sm:p-6 md:grid-cols-2 md:gap-10 md:p-8 lg:p-10"
          :class="index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''"
        >
          <div>
            <div
              class="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line-strong bg-bg text-accent-soft sm:mb-5 sm:h-12 sm:w-12"
            >
              <component :is="feature.icon" class="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 class="heading-md">{{ feature.title }}</h3>
            <p class="body-lg mt-3 max-w-md sm:mt-4">{{ feature.description }}</p>
          </div>

          <div
            class="relative min-h-[140px] overflow-hidden rounded-xl border border-line bg-bg-secondary sm:min-h-[180px] sm:rounded-2xl"
            aria-hidden="true"
          >
            <div class="absolute inset-0 bg-grid opacity-40" />
            <div
              class="absolute inset-4 rounded-xl border border-line sm:inset-6"
              :class="
                index % 2 === 0
                  ? 'bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.35),transparent_55%)]'
                  : 'bg-[radial-gradient(circle_at_70%_40%,rgba(34,211,238,0.22),transparent_50%)]'
              "
            />
            <div class="absolute bottom-4 left-4 right-4 h-12 rounded-xl border border-line-strong bg-card/70 p-3 backdrop-blur sm:bottom-6 sm:left-6 sm:right-6 sm:h-16">
              <div class="h-2 w-1/3 rounded bg-text/15" />
              <div class="mt-2 h-2 w-2/3 rounded bg-text/10 sm:mt-3" />
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
