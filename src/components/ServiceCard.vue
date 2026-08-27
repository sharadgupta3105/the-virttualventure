<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import type { Component } from 'vue'
import { prefersReducedMotion } from '@/composables/useScrollAnimation'

const props = defineProps<{
  number: string
  title: string
  description: string
  icon: Component
  need: string
  className?: string
}>()

const explore = () => {
  sessionStorage.setItem('tvv-contact-need', props.need)
  window.dispatchEvent(new CustomEvent('tvv:prefill-need', { detail: props.need }))
  document.querySelector('#contact')?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}
</script>

<template>
  <article
    class="group relative overflow-hidden rounded-2xl border border-line bg-card p-5 shadow-[0_1px_2px_rgba(16,19,28,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-border-hover hover:shadow-[0_0_0_1px_rgba(124,58,237,0.12),0_20px_40px_rgba(16,19,28,0.08)] sm:rounded-3xl md:p-6 lg:p-7"
    :class="className"
  >
    <div
      class="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.25),transparent_70%)] opacity-0 blur-2xl transition duration-500 group-hover:opacity-100"
      aria-hidden="true"
    />

    <div class="relative flex items-start justify-between gap-4">
      <span class="text-sm font-semibold tracking-wider text-muted">{{ number }}</span>
      <component
        :is="icon"
        class="h-5 w-5 text-accent-soft transition duration-300 group-hover:scale-110 group-hover:text-accent"
        aria-hidden="true"
      />
    </div>

    <h3 class="relative mt-6 text-lg font-semibold tracking-tight text-text sm:mt-8 sm:text-xl md:text-2xl">
      {{ title }}
    </h3>
    <p class="relative mt-2.5 text-sm leading-relaxed text-muted sm:mt-3 md:text-[0.95rem]">
      {{ description }}
    </p>

    <button
      type="button"
      class="relative mt-6 flex w-full cursor-expand items-center justify-between rounded-xl text-left transition sm:mt-8"
      :aria-label="`Enquire about ${title}`"
      @click="explore"
    >
      <span class="text-xs font-medium tracking-wider text-muted uppercase transition group-hover:text-accent">
        Explore
      </span>
      <span
        class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong transition duration-300 group-hover:translate-x-1 group-hover:border-accent/40 group-hover:bg-accent/10"
      >
        <ArrowUpRight class="h-4 w-4 text-text" aria-hidden="true" />
      </span>
    </button>
  </article>
</template>
