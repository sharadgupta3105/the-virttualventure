<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '@/composables/useScrollAnimation'

gsap.registerPlugin(ScrollTrigger)

const root = ref<HTMLElement | null>(null)
const line = ref<HTMLElement | null>(null)
const lineMobile = ref<HTMLElement | null>(null)
const active = ref(0)

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the business, audience, competitors and goals.',
  },
  {
    number: '02',
    title: 'Strategize',
    description: 'Build a clear digital growth roadmap.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Design, develop and launch.',
  },
  {
    number: '04',
    title: 'Grow',
    description: 'Measure, optimize and continuously improve.',
  },
]

onMounted(() => {
  if (!root.value) return

  if (prefersReducedMotion()) {
    active.value = steps.length - 1
    if (line.value) line.value.style.transform = 'scaleX(1)'
    if (lineMobile.value) lineMobile.value.style.transform = 'scaleY(1)'
    return
  }

  const stepEls = root.value.querySelectorAll('.process-step')

  if (line.value) {
    gsap.fromTo(
      line.value,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.value,
          start: 'top 60%',
          end: 'bottom 55%',
          scrub: true,
        },
      },
    )
  }

  if (lineMobile.value) {
    gsap.fromTo(
      lineMobile.value,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.value,
          start: 'top 60%',
          end: 'bottom 55%',
          scrub: true,
        },
      },
    )
  }

  stepEls.forEach((el, index) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      onEnter: () => {
        active.value = Math.max(active.value, index)
      },
    })

    gsap.from(el, {
      opacity: 0,
      y: 28,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    })
  })
})
</script>

<template>
  <section id="process" ref="root" class="relative section-y section-pad">
    <div class="container-x">
      <div class="max-w-3xl">
        <p class="eyebrow mb-4">Process</p>
        <h2 class="heading-lg">From idea to impact.</h2>
      </div>

      <div class="relative mt-10 sm:mt-14 md:mt-16">
        <!-- Desktop horizontal line -->
        <div
          class="absolute left-0 right-0 top-[28px] hidden h-px origin-left bg-line-strong md:block"
          aria-hidden="true"
        >
          <div
            ref="line"
            class="h-full origin-left scale-x-0 bg-gradient-to-r from-accent-deep via-accent to-cyan"
          />
        </div>

        <!-- Mobile vertical line -->
        <div
          class="absolute bottom-6 left-[2.15rem] top-6 w-px origin-top bg-line-strong md:hidden"
          aria-hidden="true"
        >
          <div
            ref="lineMobile"
            class="h-full origin-top scale-y-0 bg-gradient-to-b from-accent-deep via-accent to-cyan"
          />
        </div>

        <ol class="grid gap-4 sm:gap-5 md:grid-cols-4 md:gap-5">
          <li
            v-for="(step, index) in steps"
            :key="step.number"
            class="process-step relative rounded-2xl border border-line bg-card/70 p-5 transition duration-300 sm:rounded-3xl sm:p-6 md:pl-6"
            :class="
              index <= active
                ? 'border-accent/30 shadow-[0_0_40px_rgba(124,58,237,0.12)]'
                : 'opacity-70'
            "
          >
            <div class="flex items-start gap-4 md:block">
              <div
                class="relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition md:mb-8 md:h-14 md:w-14"
                :class="
                  index <= active
                    ? 'border-accent/50 bg-accent/15 text-accent-soft'
                    : 'border-line-strong bg-bg text-muted'
                "
              >
                {{ step.number }}
              </div>
              <div class="min-w-0 pt-1 md:pt-0">
                <h3 class="text-lg font-semibold tracking-tight sm:text-xl">{{ step.title }}</h3>
                <p class="mt-2 text-sm leading-relaxed text-muted sm:mt-3">{{ step.description }}</p>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
