<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { ArrowRight, Menu, X } from '@lucide/vue'
import gsap from 'gsap'
import BrandLogo from '@/components/BrandLogo.vue'
import { prefersReducedMotion } from '@/composables/useScrollAnimation'

const scrolled = ref(false)
const open = ref(false)
const navRef = ref<HTMLElement | null>(null)

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const navClasses = computed(() =>
  scrolled.value
    ? 'bg-white/90 border-line-strong shadow-[0_10px_40px_rgba(16,19,28,0.08)] backdrop-blur-xl'
    : 'bg-transparent border-transparent backdrop-blur-0',
)

const onScroll = () => {
  const y = window.scrollY || document.documentElement.scrollTop || 0
  scrolled.value = y > 16
}

const closeMenu = () => {
  open.value = false
  document.body.style.overflow = ''
}

const toggleMenu = () => {
  open.value = !open.value
  document.body.style.overflow = open.value ? 'hidden' : ''
}

const scrollTo = (href: string) => {
  closeMenu()
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }
}

const onResize = () => {
  if (window.innerWidth >= 1024 && open.value) closeMenu()
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)

  if (navRef.value && !prefersReducedMotion()) {
    gsap.from(navRef.value, {
      y: -24,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.1,
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 section-pad pt-[max(0.75rem,env(safe-area-inset-top))]">
    <nav
      ref="navRef"
      class="container-x flex items-center justify-between gap-3 rounded-full border px-3 py-2 transition-all duration-300 sm:px-4 sm:py-2.5 md:px-5"
      :class="navClasses"
      aria-label="Primary"
    >
      <a
        href="#home"
        class="cursor-expand min-w-0 shrink"
        aria-label="The Virtual Venture — Home"
        @click.prevent="scrollTo('#home')"
      >
        <BrandLogo img-class="h-8 w-auto max-w-[148px] sm:h-9 sm:max-w-[180px] md:h-10 md:max-w-[200px]" />
      </a>

      <ul class="hidden items-center gap-7 lg:flex">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="cursor-expand text-sm text-muted transition-colors hover:text-text"
            @click.prevent="scrollTo(link.href)"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <div class="flex shrink-0 items-center gap-2">
        <a
          href="#contact"
          class="btn-primary cursor-expand hidden !min-h-10 !px-4 !py-2 text-sm md:inline-flex"
          @click.prevent="scrollTo('#contact')"
        >
          Start a Project
          <ArrowRight class="h-4 w-4" aria-hidden="true" />
        </a>

        <button
          type="button"
          class="cursor-expand inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-text sm:h-11 sm:w-11 lg:hidden"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          @click="toggleMenu"
        >
          <Menu v-if="!open" class="h-5 w-5" />
          <X v-else class="h-5 w-5" />
        </button>
      </div>
    </nav>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="-translate-y-3 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-3 opacity-0"
    >
      <div
        v-if="open"
        id="mobile-menu"
        class="container-x mt-3 max-h-[min(80vh,560px)] overflow-y-auto rounded-3xl border border-line-strong bg-white/95 p-4 shadow-[var(--shadow-card)] backdrop-blur-xl sm:p-5 lg:hidden"
      >
        <ul class="flex flex-col gap-1">
          <li v-for="link in links" :key="link.href">
            <a
              :href="link.href"
              class="block rounded-2xl px-4 py-3.5 text-base text-text transition hover:bg-bg-secondary active:bg-bg-secondary"
              @click.prevent="scrollTo(link.href)"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
        <a
          href="#contact"
          class="btn-primary mt-4 w-full"
          @click.prevent="scrollTo('#contact')"
        >
          Start a Project
          <ArrowRight class="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </Transition>
  </header>
</template>
