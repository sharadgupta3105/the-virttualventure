<script setup lang="ts">
const industries = [
  'STARTUPS',
  'D2C',
  'SAAS',
  'E-COMMERCE',
  'TECH',
  'PROFESSIONAL SERVICES',
]
</script>

<template>
  <section
    class="relative overflow-hidden border-y border-line bg-bg-secondary/60 py-6 section-pad sm:py-8"
    aria-label="Industries we serve"
  >
    <div class="container-x mb-4 text-center sm:mb-6">
      <p class="text-sm text-muted md:text-base">Built for businesses ready to grow.</p>
    </div>

    <div class="relative overflow-hidden">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-bg-secondary to-transparent sm:w-16 md:w-28"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-bg-secondary to-transparent sm:w-16 md:w-28"
        aria-hidden="true"
      />

      <div class="marquee-track gap-8 px-4 sm:gap-10" aria-hidden="true">
        <template v-for="loop in 2" :key="loop">
          <div
            v-for="item in industries"
            :key="`${loop}-${item}`"
            class="flex items-center gap-8 whitespace-nowrap sm:gap-10"
          >
            <span class="text-xs font-semibold tracking-[0.18em] text-text/70 sm:text-sm sm:tracking-[0.22em] md:text-base">
              {{ item }}
            </span>
            <span class="h-1 w-1 rounded-full bg-accent/70" />
          </div>
        </template>
      </div>

      <p class="sr-only">
        Industries: Startups, D2C, SaaS, E-commerce, Tech, Professional Services
      </p>
    </div>
  </section>
</template>
