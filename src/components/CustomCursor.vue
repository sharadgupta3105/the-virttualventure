<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const x = ref(0)
const y = ref(0)
const visible = ref(false)
const hovering = ref(false)
const large = ref(false)
const enabled = ref(false)

let raf = 0

const isInteractive = (el: Element | null) => {
  if (!el) return false
  return Boolean(
    el.closest(
      'a, button, [role="button"], input, select, textarea, .cursor-expand, .cursor-large',
    ),
  )
}

const isLarge = (el: Element | null) => {
  if (!el) return false
  return Boolean(el.closest('.cursor-large, [data-cursor="large"]'))
}

const onMove = (e: MouseEvent) => {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    x.value = e.clientX
    y.value = e.clientY
    visible.value = true
    const target = e.target as Element | null
    hovering.value = isInteractive(target)
    large.value = isLarge(target)
  })
}

const onLeave = () => {
  visible.value = false
}

onMounted(() => {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  enabled.value = fine
  if (!fine) return
  document.documentElement.classList.add('has-custom-cursor')
  window.addEventListener('mousemove', onMove)
  document.addEventListener('mouseleave', onLeave)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  document.documentElement.classList.remove('has-custom-cursor')
  window.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseleave', onLeave)
})
</script>

<template>
  <div
    v-if="enabled"
    class="pointer-events-none fixed left-0 top-0 z-[9999]"
    :style="{
      transform: `translate3d(${x}px, ${y}px, 0)`,
      opacity: visible ? 1 : 0,
    }"
    aria-hidden="true"
  >
    <div
      class="rounded-full transition-all duration-200 ease-out"
      :class="
        large
          ? '-translate-x-1/2 -translate-y-1/2 h-16 w-16 bg-accent/25'
          : hovering
            ? '-translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-accent/40'
            : '-translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 bg-text'
      "
    />
  </div>
</template>
