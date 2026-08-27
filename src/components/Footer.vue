<script setup lang="ts">
import BrandLogo from '@/components/BrandLogo.vue'
import { prefersReducedMotion } from '@/composables/useScrollAnimation'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'X', href: 'https://x.com' },
]

const scrollTo = (href: string) => {
  document.querySelector(href)?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}
</script>

<template>
  <footer class="relative border-t border-line bg-bg-secondary pt-12 section-pad pb-8 sm:pt-16">
    <div class="container-x">
      <div class="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr]">
        <div class="sm:col-span-2 md:col-span-1">
          <a
            href="#home"
            class="cursor-expand inline-block"
            aria-label="The Virtual Venture — Home"
            @click.prevent="scrollTo('#home')"
          >
            <BrandLogo img-class="h-14 w-auto max-w-[240px] sm:h-16 sm:max-w-[280px]" />
          </a>
          <p class="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Digital growth for ambitious businesses.
          </p>
          <a
            href="mailto:info@thevirtualventure.com"
            class="cursor-expand mt-5 inline-block break-all text-sm text-accent-soft transition hover:text-text sm:break-normal"
          >
            info@thevirtualventure.com
          </a>
        </div>

        <div>
          <p class="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Navigate</p>
          <ul class="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:block sm:space-y-2">
            <li v-for="link in links" :key="link.href">
              <a
                :href="link.href"
                class="cursor-expand text-sm text-text/80 transition hover:text-text"
                @click.prevent="scrollTo(link.href)"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p class="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Social</p>
          <ul class="mt-4 flex flex-wrap gap-x-5 gap-y-2 sm:block sm:space-y-2">
            <li v-for="social in socials" :key="social.label">
              <a
                :href="social.href"
                class="cursor-expand text-sm text-text/80 transition hover:text-text"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ social.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:mt-12 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© 2026 The Virtual Venture. All rights reserved.</p>
        <p class="text-text/70">Made for the next venture.</p>
      </div>
    </div>
  </footer>
</template>
