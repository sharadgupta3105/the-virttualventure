<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, MessageCircle } from '@lucide/vue'
import { prefersReducedMotion, useScrollReveal } from '@/composables/useScrollAnimation'

const root = ref<HTMLElement | null>(null)
useScrollReveal(root, { childSelector: '.reveal-item', y: 28, stagger: 0.1 })

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}
</script>

<template>
  <section class="relative overflow-hidden section-y section-pad" ref="root">
    <div
      class="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.35),rgba(34,211,238,0.08),transparent_70%)] blur-2xl sm:h-[520px] sm:w-[520px] orb-shift"
      aria-hidden="true"
    />

    <div
      class="container-x relative overflow-hidden rounded-2xl border border-line-strong bg-[linear-gradient(180deg,#ffffff,rgba(238,241,248,0.95))] px-5 py-12 text-center shadow-[var(--shadow-card)] sm:rounded-[2rem] sm:px-6 sm:py-16 md:px-12 md:py-20"
    >
      <div class="pointer-events-none absolute inset-0 bg-grid opacity-25" aria-hidden="true" />

      <div class="relative mx-auto max-w-3xl">
        <h2 class="reveal-item heading-lg">Ready to make your next move?</h2>
        <p class="reveal-item body-lg mx-auto mt-4 max-w-xl sm:mt-5">
          Let's turn your next idea into something people notice — and remember.
        </p>
        <div class="reveal-item mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center">
          <a
            href="#contact"
            class="btn-primary cursor-expand w-full sm:w-auto"
            @click.prevent="scrollTo('#contact')"
          >
            Start a Project
            <ArrowRight class="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#contact"
            class="btn-secondary cursor-expand w-full sm:w-auto"
            @click.prevent="scrollTo('#contact')"
          >
            Let's Talk
            <MessageCircle class="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
