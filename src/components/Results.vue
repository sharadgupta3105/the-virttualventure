<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion, useScrollReveal } from '@/composables/useScrollAnimation'

gsap.registerPlugin(ScrollTrigger)

const root = ref<HTMLElement | null>(null)
useScrollReveal(root, { childSelector: '.reveal-item', y: 30, stagger: 0.1 })

interface Metric {
  end: number | string
  suffix: string
  label: string
  detail: string
}

const metrics: Metric[] = [
  {
    end: 360,
    suffix: '°',
    label: 'Digital Growth Approach',
    detail: 'Strategy through optimization, connected end-to-end.',
  },
  {
    end: 6,
    suffix: '+',
    label: 'Core Growth Services',
    detail: 'One partner across the channels that drive demand.',
  },
  {
    end: 24,
    suffix: '/7',
    label: 'Digital Presence',
    detail: 'Experiences and systems that work while you sleep.',
  },
  {
    end: '∞',
    suffix: '',
    label: 'Ideas Worth Testing',
    detail: 'A culture of learning that compounds over time.',
  },
]

const displays = ref(
  metrics.map((m) => (typeof m.end === 'string' ? `${m.end}${m.suffix}` : `0${m.suffix}`)),
)
const metricEls = ref<(HTMLElement | null)[]>([])

onMounted(() => {
  if (prefersReducedMotion()) {
    displays.value = metrics.map((m) => `${m.end}${m.suffix}`)
    return
  }

  metrics.forEach((metric, index) => {
    const el = metricEls.value[index]
    if (!el || typeof metric.end === 'string') return

    const obj = { val: 0 }
    gsap.to(obj, {
      val: metric.end,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        displays.value[index] = `${Math.round(obj.val)}${metric.suffix}`
      },
    })
  })
})</script>

<template>
  <section id="results" class="relative section-y section-pad">
    <div class="container-x" ref="root">
      <div class="reveal-item max-w-3xl">
        <p class="eyebrow mb-4">Capabilities</p>
        <h2 class="heading-lg">Growth should be measurable.</h2>
      </div>

      <div
        class="reveal-item mt-8 overflow-hidden rounded-2xl border border-line bg-card p-3 shadow-[var(--shadow-card)] sm:mt-10 sm:rounded-[1.75rem] sm:p-4 md:mt-12 md:rounded-[2rem] md:p-6"
      >
        <div class="mb-4 flex items-center justify-between gap-3 border-b border-line px-1 pb-3 sm:mb-5 sm:px-2 sm:pb-4">
          <div class="flex min-w-0 items-center gap-2">
            <span class="h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
            <span class="truncate text-xs text-muted sm:text-sm">Agency capability dashboard</span>
          </div>
          <span class="hidden text-xs tracking-wider text-muted uppercase sm:inline">Live systems</span>
        </div>

        <div class="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          <article
            v-for="(metric, index) in metrics"
            :key="metric.label"
            class="reveal-item relative overflow-hidden rounded-xl border border-line bg-bg p-4 sm:rounded-2xl sm:p-5 md:p-6"
          >
            <div
              class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
              aria-hidden="true"
            />
            <p
              :ref="(el) => { metricEls[index] = el as HTMLElement | null }"
              class="text-[clamp(2.1rem,8vw,3.75rem)] font-bold tracking-tight text-text"
            >
              {{ displays[index] }}
            </p>
            <h3 class="mt-2 text-sm font-semibold sm:text-base">{{ metric.label }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ metric.detail }}</p>
          </article>
        </div>

        <div class="mt-3 grid gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div class="rounded-xl border border-line bg-bg p-4 sm:rounded-2xl sm:p-5">
            <div class="mb-4 flex items-center justify-between gap-2 text-xs text-muted">
              <span>Signal quality over time</span>
              <span class="text-cyan">Optimized</span>
            </div>
            <svg viewBox="0 0 520 140" class="h-20 w-full sm:h-28" fill="none" aria-hidden="true">
              <path
                d="M0 100 C40 95, 70 70, 110 75 C160 82, 180 40, 230 48 C280 56, 300 90, 350 70 C400 48, 430 30, 520 20"
                stroke="url(#dashGrad)"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <path
                d="M0 100 C40 95, 70 70, 110 75 C160 82, 180 40, 230 48 C280 56, 300 90, 350 70 C400 48, 430 30, 520 20 V140 H0 Z"
                fill="url(#dashArea)"
                opacity="0.5"
              />
              <defs>
                <linearGradient id="dashGrad" x1="0" y1="0" x2="520" y2="0">
                  <stop stop-color="#7C3AED" />
                  <stop offset="1" stop-color="#22D3EE" />
                </linearGradient>
                <linearGradient id="dashArea" x1="0" y1="0" x2="0" y2="140">
                  <stop stop-color="#8B5CF6" stop-opacity="0.3" />
                  <stop offset="1" stop-color="#8B5CF6" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="rounded-xl border border-line bg-bg p-4 sm:rounded-2xl sm:p-5">
            <p class="text-xs tracking-wider text-muted uppercase">Focus areas</p>
            <ul class="mt-4 space-y-3">
              <li
                v-for="item in ['Acquisition', 'Conversion', 'Retention']"
                :key="item"
                class="flex items-center justify-between gap-3 text-sm"
              >
                <span>{{ item }}</span>
                <span class="h-1.5 w-16 overflow-hidden rounded-full bg-bg-secondary sm:w-24">
                  <span
                    class="block h-full rounded-full bg-gradient-to-r from-accent-deep to-accent-soft"
                    :style="{
                      width:
                        item === 'Acquisition' ? '78%' : item === 'Conversion' ? '86%' : '64%',
                    }"
                  />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
