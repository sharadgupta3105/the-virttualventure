<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUpRight, Star } from '@lucide/vue'
import { useScrollReveal } from '@/composables/useScrollAnimation'

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?q=the+virtual+venture+raebareli+review&oq=the+virtual+venture+raebareli+review&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigAdIBCDgzNzNqMGo3qAIAsAIA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x399ba7ec9d98d09f:0xe6b66f7968563fb0,1,,,,'

const root = ref<HTMLElement | null>(null)
useScrollReveal(root, { childSelector: '.reveal-item', y: 28, stagger: 0.1 })

const highlights = [
  {
    title: 'Real client feedback',
    description: 'Read verified Google reviews from businesses we’ve worked with in Raebareli and beyond.',
  },
  {
    title: 'Transparent ratings',
    description: 'See how clients rate strategy, creative, websites and growth support — directly on Google.',
  },
  {
    title: 'Share your experience',
    description: 'If we’ve worked together, your review helps other ambitious brands choose with confidence.',
  },
]
</script>

<template>
  <section id="reviews" class="relative section-y section-pad" ref="root">
    <div class="container-x">
      <div class="reveal-item mx-auto max-w-3xl text-center">
        <p class="eyebrow mb-4 justify-center">Reviews</p>
        <h2 class="heading-lg">Trusted locally. Proven digitally.</h2>
        <p class="body-lg mx-auto mt-4 max-w-2xl sm:mt-5">
          The Virtual Venture is built on real relationships. Explore what clients say about us on
          Google — then decide if we’re the right partner for your next move.
        </p>
      </div>

      <div
        class="reveal-item relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-line bg-card p-6 shadow-[var(--shadow-card)] sm:mt-12 sm:rounded-[1.75rem] sm:p-8 md:p-10"
      >
        <div
          class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.16),transparent_70%)]"
          aria-hidden="true"
        />

        <div class="relative flex flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div class="flex flex-col items-center gap-4 md:flex-row md:items-center">
            <div
              class="flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-bg"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" class="h-8 w-8" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>

            <div>
              <p class="text-sm font-semibold tracking-wide text-muted uppercase">Google Reviews</p>
              <p class="mt-1 text-xl font-semibold tracking-tight text-text sm:text-2xl">
                The Virtual Venture · Raebareli
              </p>
              <div class="mt-3 flex items-center justify-center gap-1 md:justify-start" aria-label="5 star rating display">
                <Star
                  v-for="n in 5"
                  :key="n"
                  class="h-5 w-5 fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
              </div>
              <p class="mt-2 text-sm text-muted">See live ratings and written feedback on Google.</p>
            </div>
          </div>

          <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              :href="GOOGLE_REVIEWS_URL"
              class="btn-primary cursor-expand w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Google Reviews
              <ArrowUpRight class="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              :href="GOOGLE_REVIEWS_URL"
              class="btn-secondary cursor-expand w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              Leave a Review
              <ArrowUpRight class="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div class="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
        <article
          v-for="item in highlights"
          :key="item.title"
          class="reveal-item rounded-2xl border border-line bg-card p-5 shadow-[0_1px_2px_rgba(16,19,28,0.04)] sm:p-6"
        >
          <h3 class="text-lg font-semibold tracking-tight">{{ item.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
