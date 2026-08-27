<script setup lang="ts">
import { ref } from 'vue'
import { useMouseParallax } from '@/composables/useMouseParallax'
import { useScrollReveal } from '@/composables/useScrollAnimation'

const root = ref<HTMLElement | null>(null)
const visual = ref<HTMLElement | null>(null)
const offset = useMouseParallax(visual, 14)
useScrollReveal(root, { childSelector: '.reveal-item', y: 30, stagger: 0.12 })
</script>

<template>
  <section id="about" class="relative overflow-hidden section-y section-pad">
    <div class="container-x grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16" ref="root">
      <div class="reveal-item max-w-xl">
        <p class="eyebrow mb-4">About</p>
        <h2 class="heading-lg">Built for businesses that refuse to stay ordinary.</h2>
        <p class="body-lg mt-5 sm:mt-6">
          The Virtual Venture combines strategy, creativity and technology to help businesses build
          digital experiences that attract attention, create trust and drive action.
        </p>
        <p class="mt-4 text-sm leading-relaxed text-muted sm:mt-5">
          We partner with founders and teams who want more than activity — they want systems that
          compound: brand, product, content and performance working as one.
        </p>
      </div>

      <div
        ref="visual"
        class="reveal-item relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[380px] md:max-w-[460px]"
        aria-hidden="true"
      >
        <div
          class="absolute inset-[12%] rounded-full border border-line-strong"
          :style="{ transform: `translate3d(${offset.x * 0.15}px, ${offset.y * 0.15}px, 0)` }"
        />
        <div
          class="absolute inset-[22%] rounded-full border border-accent/20"
          :style="{ transform: `translate3d(${offset.x * -0.2}px, ${offset.y * 0.25}px, 0)` }"
        />
        <div
          class="absolute inset-[32%] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(167,139,250,0.45),rgba(247,248,252,0.4)_60%)] shadow-[0_0_80px_rgba(124,58,237,0.2)] orb-shift"
        />

        <div class="absolute inset-0 bg-grid opacity-25" />

        <span
          class="absolute left-[18%] top-[22%] h-2.5 w-2.5 rounded-full bg-accent-soft shadow-[0_0_12px_#a78bfa]"
          :style="{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }"
        />
        <span
          class="absolute right-[20%] top-[34%] h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_#22d3ee]"
          :style="{ transform: `translate3d(${offset.x * -1}px, ${offset.y * 0.6}px, 0)` }"
        />
        <span
          class="absolute bottom-[24%] left-[30%] h-1.5 w-1.5 rounded-full bg-accent/70"
          :style="{ transform: `translate3d(${offset.x * 0.5}px, ${offset.y * -0.8}px, 0)` }"
        />

        <svg class="absolute inset-0 h-full w-full opacity-50" viewBox="0 0 400 400" fill="none">
          <path
            d="M80 200 C120 120, 180 100, 200 200 C220 300, 280 280, 320 200"
            stroke="rgba(167,139,250,0.35)"
            stroke-width="1"
          />
          <path
            d="M100 140 C160 160, 220 120, 300 160"
            stroke="rgba(34,211,238,0.25)"
            stroke-width="1"
          />
          <circle cx="200" cy="200" r="4" fill="#8B5CF6" />
          <circle cx="120" cy="150" r="3" fill="#A78BFA" />
          <circle cx="280" cy="170" r="3" fill="#22D3EE" />
        </svg>
      </div>
    </div>
  </section>
</template>
