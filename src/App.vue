<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import CustomCursor from '@/components/CustomCursor.vue'

const prefersReducedMotion = ref(false)

onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mq.matches
  const handler = (e: MediaQueryListEvent) => {
    prefersReducedMotion.value = e.matches
  }
  mq.addEventListener('change', handler)
  onUnmounted(() => mq.removeEventListener('change', handler))
})
</script>

<template>
  <a
    href="#main"
    class="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:[clip:auto]"
  >
    Skip to content
  </a>
  <CustomCursor v-if="!prefersReducedMotion" />
  <RouterView />
</template>
