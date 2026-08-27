<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, useScrollReveal } from '@/composables/useScrollAnimation'

gsap.registerPlugin(ScrollTrigger)

const root = ref<HTMLElement | null>(null)
const path = ref<SVGPathElement | null>(null)
useScrollReveal(root, { childSelector: '.reveal-item', y: 28, stagger: 0.12 })

onMounted(() => {
  if (!path.value || prefersReducedMotion()) return

  const length = path.value.getTotalLength()
  gsap.set(path.value, {
    strokeDasharray: length,
    strokeDashoffset: length,
  })

  gsap.to(path.value, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: root.value,
      start: 'top 70%',
      end: 'bottom 55%',
      scrub: 0.6,
    },
  })
})
</script>

<template>
  <section
    id="statement"
    ref="root"
    class="relative overflow-hidden border-y border-line bg-bg-secondary section-y section-pad"
  >
    <div class="pointer-events-none absolute inset-0 bg-grid opacity-30" aria-hidden="true" />
    <div
      class="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_65%)] sm:h-[520px] sm:w-[520px]"
      aria-hidden="true"
    />

    <div class="container-x relative">
      <svg
        class="pointer-events-none absolute -right-8 top-8 hidden h-64 w-[420px] opacity-70 lg:block lg:right-0"
        viewBox="0 0 420 240"
        fill="none"
        aria-hidden="true"
      >
        <path
          ref="path"
          d="M10 180 C80 170, 110 90, 170 110 C230 130, 250 40, 310 60 C360 76, 380 30, 410 20"
          stroke="url(#statementGrad)"
          stroke-width="2"
          stroke-linecap="round"
        />
        <defs>
          <linearGradient id="statementGrad" x1="0" y1="0" x2="420" y2="0">
            <stop stop-color="#7C3AED" />
            <stop offset="0.6" stop-color="#8B5CF6" />
            <stop offset="1" stop-color="#22D3EE" />
          </linearGradient>
        </defs>
      </svg>

      <p class="reveal-item eyebrow mb-5 sm:mb-8">Philosophy</p>
      <h2 class="reveal-item max-w-5xl text-[clamp(1.85rem,8.5vw,6.5rem)] font-bold leading-[1.02] tracking-[-0.045em]">
        We don't just make brands look good.
      </h2>
      <h2 class="reveal-item mt-2 max-w-4xl text-[clamp(1.85rem,8.5vw,6.5rem)] font-bold leading-[1.02] tracking-[-0.045em] sm:mt-3">
        <span class="text-gradient">We make them move.</span>
      </h2>
      <p class="reveal-item body-lg mt-7 max-w-2xl sm:mt-10">
        Every campaign, page and creative decision starts with one question: does it move the
        business forward?
      </p>
    </div>
  </section>
</template>
