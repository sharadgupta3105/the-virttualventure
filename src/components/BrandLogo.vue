<script setup lang="ts">
import logoUrl from '@/assets/logo.png'

withDefaults(
  defineProps<{
    className?: string
    imgClass?: string
  }>(),
  {
    className: '',
    imgClass: 'h-9 w-auto sm:h-10',
  },
)
</script>

<template>
  <span :class="['inline-flex items-center', className]">
    <img
      :src="logoUrl"
      alt="The Virtual Venture"
      :class="['block object-contain object-left', imgClass]"
      width="180"
      height="101"
      decoding="async"
    />
  </span>
</template>
