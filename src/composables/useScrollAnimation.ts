import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useScrollReveal(
  target: Ref<HTMLElement | null>,
  options: {
    y?: number
    duration?: number
    delay?: number
    stagger?: number
    start?: string
    childSelector?: string
  } = {},
) {
  onMounted(() => {
    if (!target.value || prefersReducedMotion()) {
      if (target.value) {
        gsap.set(target.value, { clearProps: 'all', opacity: 1 })
        if (options.childSelector) {
          gsap.set(target.value.querySelectorAll(options.childSelector), {
            clearProps: 'all',
            opacity: 1,
          })
        }
      }
      return
    }

    const {
      y = 40,
      duration = 0.9,
      delay = 0,
      stagger = 0.1,
      start = 'top 85%',
      childSelector,
    } = options

    const elements = childSelector
      ? target.value.querySelectorAll(childSelector)
      : target.value

    gsap.fromTo(
      elements,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger: childSelector ? stagger : 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: target.value,
          start,
          once: true,
        },
      },
    )
  })

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach((t) => {
      if (target.value && t.trigger === target.value) t.kill()
    })
  })
}

export function useCounter(
  end: number | string,
  options: { duration?: number; suffix?: string; prefix?: string } = {},
) {
  const display = ref(typeof end === 'string' ? end : '0')
  const el = ref<HTMLElement | null>(null)
  const { duration = 1.6, suffix = '', prefix = '' } = options

  onMounted(() => {
    if (!el.value) return

    if (typeof end === 'string' || prefersReducedMotion()) {
      display.value = `${prefix}${end}${suffix}`
      return
    }

    const obj = { val: 0 }
    gsap.to(obj, {
      val: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el.value,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        display.value = `${prefix}${Math.round(obj.val)}${suffix}`
      },
    })
  })

  return { display, el }
}
