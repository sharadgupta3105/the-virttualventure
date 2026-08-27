<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ArrowRight, ArrowUpRight } from '@lucide/vue'
import gsap from 'gsap'
import { useMouseParallax } from '@/composables/useMouseParallax'
import { prefersReducedMotion } from '@/composables/useScrollAnimation'

const root = ref<HTMLElement | null>(null)
const visual = ref<HTMLElement | null>(null)
const offset = useMouseParallax(visual, 18)
let ctx: gsap.Context | undefined

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}

onMounted(() => {
  if (!root.value || prefersReducedMotion()) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.hero-eyebrow', { opacity: 0, y: 16, duration: 0.6, delay: 0.35 })
      .from('.hero-line', { opacity: 0, y: 28, duration: 0.75, stagger: 0.1 }, '-=0.2')
      .from('.hero-desc', { opacity: 0, y: 18, duration: 0.65 }, '-=0.4')
      .from('.hero-cta', { opacity: 0, y: 16, duration: 0.55, stagger: 0.08 }, '-=0.35')
      .from('.hero-pills', { opacity: 0, y: 12, duration: 0.5 }, '-=0.3')
      .from(
        '.hero-visual-piece',
        { opacity: 0, y: 24, scale: 0.97, duration: 0.7, stagger: 0.08 },
        '-=0.75',
      )
  }, root.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    id="home"
    ref="root"
    class="relative isolate overflow-hidden pt-24 section-pad pb-12 sm:pt-28 sm:pb-16 md:min-h-[100svh] md:pt-32 md:pb-24"
  >
    <div class="pointer-events-none absolute inset-0 bg-grid opacity-30 sm:opacity-40" aria-hidden="true" />
    <div
      class="pointer-events-none absolute -left-32 top-16 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.16),transparent_65%)] blur-2xl sm:-left-24 sm:top-24 sm:h-[420px] sm:w-[420px] orb-shift"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -right-20 top-32 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(8,145,178,0.12),transparent_60%)] blur-3xl sm:right-0 sm:top-40 sm:h-[480px] sm:w-[480px]"
      aria-hidden="true"
    />

    <div class="container-x relative grid items-center gap-10 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
      <div class="relative z-10 max-w-3xl">
        <p class="hero-eyebrow eyebrow mb-4 sm:mb-6">
          <span class="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          Digital Growth Agency
        </p>

        <h1 class="heading-xl max-w-[16ch] sm:max-w-[14ch]">
          <span class="hero-line block">We turn digital presence into</span>
          <span class="hero-line block text-gradient">real business growth.</span>
        </h1>

        <p class="hero-desc body-lg mt-5 max-w-xl sm:mt-6">
          Strategy, creative, technology and performance — built to help ambitious brands grow
          faster.
        </p>

        <div class="hero-cta mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
          <a
            href="#contact"
            class="btn-primary cursor-expand w-full sm:w-auto"
            @click.prevent="scrollTo('#contact')"
          >
            Start a Project
            <ArrowRight class="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#services"
            class="btn-secondary cursor-expand w-full sm:w-auto"
            @click.prevent="scrollTo('#services')"
          >
            Explore Services
            <ArrowUpRight class="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <p
          class="hero-pills mt-8 text-[0.65rem] font-semibold leading-relaxed tracking-[0.14em] text-muted uppercase sm:mt-10 sm:text-xs sm:tracking-[0.18em]"
        >
          Strategy • Design • Technology • Growth
        </p>
      </div>

      <div
        ref="visual"
        class="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-none"
        aria-hidden="true"
      >
        <div
          class="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(167,139,250,0.35),rgba(124,58,237,0.12)_45%,transparent_70%)] opacity-90 blur-2xl orb-shift"
        />
        <div
          class="hero-visual-piece absolute inset-[18%] rounded-full border border-line-strong bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.95),rgba(238,241,248,0.9)_50%,rgba(124,58,237,0.08))] shadow-[0_0_80px_rgba(124,58,237,0.18)]"
          :style="{ transform: `translate3d(${offset.x * 0.2}px, ${offset.y * 0.2}px, 0)` }"
        />

        <div
          class="hero-visual-piece absolute left-[2%] top-[18%] w-[48%] sm:left-[4%] sm:w-[46%]"
          :style="{ transform: `translate3d(${offset.x * -0.4}px, ${offset.y * -0.35}px, 0)` }"
        >
          <div class="float-y rounded-xl border border-line-strong bg-card/90 p-3 shadow-[var(--shadow-card)] backdrop-blur-md sm:rounded-2xl sm:p-4">
            <div class="mb-2 flex items-center justify-between text-[9px] text-muted sm:mb-3 sm:text-[10px]">
              <span>Growth</span>
              <span class="text-cyan">+128%</span>
            </div>
            <svg viewBox="0 0 160 64" class="h-12 w-full sm:h-16" fill="none">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="160" y2="0">
                  <stop stop-color="#7C3AED" />
                  <stop offset="1" stop-color="#22D3EE" />
                </linearGradient>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="64">
                  <stop stop-color="#8B5CF6" stop-opacity="0.35" />
                  <stop offset="1" stop-color="#8B5CF6" stop-opacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 52 C20 48, 28 40, 42 38 C60 35, 68 46, 84 34 C102 20, 112 24, 128 16 C140 10, 150 18, 160 12 L160 64 L0 64 Z"
                fill="url(#areaGrad)"
              />
              <path
                d="M0 52 C20 48, 28 40, 42 38 C60 35, 68 46, 84 34 C102 20, 112 24, 128 16 C140 10, 150 18, 160 12"
                stroke="url(#lineGrad)"
                stroke-width="2.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
        </div>

        <div
          class="hero-visual-piece absolute right-[1%] top-[10%] w-[44%] sm:right-[2%] sm:top-[12%] sm:w-[42%]"
          :style="{ transform: `translate3d(${offset.x * 0.5}px, ${offset.y * 0.25}px, 0)` }"
        >
          <div class="float-y-slow rounded-xl border border-line-strong bg-bg-secondary/95 p-2.5 shadow-[var(--shadow-card)] sm:rounded-2xl sm:p-3">
            <div class="mb-2 flex gap-1 sm:mb-3 sm:gap-1.5">
              <span class="h-1.5 w-1.5 rounded-full bg-text/20 sm:h-2 sm:w-2" />
              <span class="h-1.5 w-1.5 rounded-full bg-text/20 sm:h-2 sm:w-2" />
              <span class="h-1.5 w-1.5 rounded-full bg-text/20 sm:h-2 sm:w-2" />
            </div>
            <div class="space-y-1.5 sm:space-y-2">
              <div class="h-1.5 w-3/4 rounded bg-text/10 sm:h-2" />
              <div class="h-1.5 w-full rounded bg-text/10 sm:h-2" />
              <div class="h-6 rounded-lg bg-gradient-to-r from-accent-deep/40 to-cyan/20 sm:h-8" />
              <div class="hidden grid-cols-3 gap-1.5 pt-1 sm:grid">
                <div class="h-6 rounded bg-text/10" />
                <div class="h-6 rounded bg-text/10" />
                <div class="h-6 rounded bg-accent/30" />
              </div>
            </div>
          </div>
        </div>

        <div
          class="hero-visual-piece absolute bottom-[20%] left-[4%] sm:bottom-[22%] sm:left-[8%]"
          :style="{ transform: `translate3d(${offset.x * -0.3}px, ${offset.y * 0.4}px, 0)` }"
        >
          <div class="float-y rounded-full border border-line-strong bg-card/90 px-3 py-1.5 text-xs shadow-lg backdrop-blur sm:px-4 sm:py-2 sm:text-sm">
            <span class="text-muted">CVR</span>
            <span class="ml-1.5 font-semibold text-text sm:ml-2">4.8%</span>
          </div>
        </div>

        <div
          class="hero-visual-piece absolute right-[6%] bottom-[12%] hidden sm:block sm:right-[10%] sm:bottom-[16%]"
          :style="{ transform: `translate3d(${offset.x * 0.35}px, ${offset.y * -0.3}px, 0)` }"
        >
          <div class="float-y-slow rounded-2xl border border-line-strong bg-card/90 px-4 py-3 shadow-lg">
            <p class="text-[10px] tracking-wider text-muted uppercase">Pipeline</p>
            <p class="mt-1 text-lg font-semibold">₹2.4L</p>
            <div class="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-bg-secondary">
              <div class="h-full w-[72%] rounded-full bg-gradient-to-r from-accent-deep to-cyan" />
            </div>
          </div>
        </div>

        <div
          class="hero-visual-piece absolute left-[40%] top-[6%] rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[10px] text-accent-soft sm:left-[42%] sm:top-[8%] sm:px-3 sm:text-xs"
          :style="{ transform: `translate3d(${offset.x * 0.15}px, ${offset.y * -0.5}px, 0)` }"
        >
          +42 leads
        </div>

        <div
          class="hero-visual-piece absolute bottom-[8%] left-[36%] h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_#22d3ee]"
        />
        <div
          class="hero-visual-piece absolute top-[40%] right-[6%] h-1.5 w-1.5 rounded-full bg-accent-soft shadow-[0_0_10px_#a78bfa]"
        />
      </div>
    </div>
  </section>
</template>
