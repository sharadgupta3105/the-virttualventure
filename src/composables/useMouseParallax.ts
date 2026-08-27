import { onMounted, onUnmounted, reactive, type Ref } from 'vue'
import { prefersReducedMotion } from './useScrollAnimation'

export function useMouseParallax(
  container: Ref<HTMLElement | null>,
  strength = 20,
) {
  const offset = reactive({ x: 0, y: 0 })
  let frame = 0

  const onMove = (e: MouseEvent) => {
    if (!container.value || prefersReducedMotion()) return
    const rect = container.value.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5

    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      offset.x = nx * strength
      offset.y = ny * strength
    })
  }

  const onLeave = () => {
    offset.x = 0
    offset.y = 0
  }

  onMounted(() => {
    const el = container.value
    if (!el) return
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
  })

  onUnmounted(() => {
    cancelAnimationFrame(frame)
    const el = container.value
    if (!el) return
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  })

  return offset
}
