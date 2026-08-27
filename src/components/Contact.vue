<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ArrowRight, CheckCircle2, LoaderCircle } from '@lucide/vue'
import { submitContact } from '@/services/contact'
import { useScrollReveal } from '@/composables/useScrollAnimation'

const root = ref<HTMLElement | null>(null)
useScrollReveal(root, { childSelector: '.reveal-item', y: 28, stagger: 0.08 })

const form = reactive({
  name: '',
  email: '',
  company: '',
  need: '',
  budget: '',
  message: '',
  website: '',
})

const errors = reactive<Record<string, string>>({})
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const statusMessage = ref('')

const budgetOptions = [
  'Under ₹50K',
  '₹50K – ₹1L',
  '₹1L – ₹3L',
  '₹3L+',
]

const needOptions = [
  'Digital Strategy',
  'Website / Landing Page',
  'Branding & Creative',
  'Social Media',
  'SEO',
  'Performance Marketing',
  'Not sure yet',
]

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

const validate = () => {
  Object.keys(errors).forEach((key) => delete errors[key])

  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!form.email.trim()) errors.email = 'Please enter your email.'
  else if (!isValidEmail(form.email)) errors.email = 'Enter a valid email address.'
  if (!form.need) errors.need = 'Select what you need help with.'
  if (!form.budget) errors.budget = 'Select a budget range.'
  if (!form.message.trim() || form.message.trim().length < 10) {
    errors.message = 'Tell us a bit more (at least 10 characters).'
  }

  return Object.keys(errors).length === 0
}

const canSubmit = computed(() => status.value !== 'loading')

const onSubmit = async () => {
  if (!validate()) {
    status.value = 'error'
    statusMessage.value = 'Please fix the highlighted fields.'
    return
  }

  status.value = 'loading'
  statusMessage.value = ''

  try {
    const result = await submitContact({ ...form })
    if (result.ok) {
      status.value = 'success'
      statusMessage.value = result.message
      form.name = ''
      form.email = ''
      form.company = ''
      form.need = ''
      form.budget = ''
      form.message = ''
      form.website = ''
    } else {
      status.value = 'error'
      statusMessage.value = result.message
    }
  } catch {
    status.value = 'error'
    statusMessage.value = 'Something went wrong. Please try again.'
  }
}
</script>

<template>
  <section id="contact" class="relative section-y section-pad" ref="root">
    <div class="container-x grid gap-8 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div class="reveal-item max-w-lg">
        <p class="eyebrow mb-4">Contact</p>
        <h2 class="heading-lg">Let's build something worth talking about.</h2>
        <p class="body-lg mt-4 sm:mt-5">
          Tell us what you're building, where you're stuck, and where you want to go.
        </p>
        <a
          href="mailto:info@thevirtualventure.com"
          class="cursor-expand mt-6 inline-flex break-all text-sm font-medium text-accent-soft transition hover:text-text sm:mt-8 sm:break-normal"
        >
          info@thevirtualventure.com
        </a>
      </div>

      <form
        class="reveal-item relative rounded-2xl border border-line bg-card p-4 sm:rounded-[1.75rem] sm:p-5 md:p-8"
        novalidate
        @submit.prevent="onSubmit"
      >
        <div
          v-if="status === 'success'"
          class="mb-6 flex items-start gap-3 rounded-2xl border border-cyan/20 bg-cyan/5 p-4 text-sm text-text"
          role="status"
        >
          <CheckCircle2 class="mt-0.5 h-5 w-5 shrink-0 text-cyan" aria-hidden="true" />
          <div>
            <p class="font-medium">Message received</p>
            <p class="mt-1 text-muted">{{ statusMessage }}</p>
          </div>
        </div>

        <div
          v-else-if="status === 'error' && statusMessage"
          class="mb-6 rounded-2xl border border-red-400/40 bg-red-50 p-4 text-sm text-red-700"
          role="alert"
        >
          {{ statusMessage }}
        </div>

        <!-- Honeypot -->
        <div class="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
          <label for="website">Website</label>
          <input id="website" v-model="form.website" type="text" tabindex="-1" autocomplete="off" />
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="sm:col-span-1">
            <label for="name" class="mb-2 block text-sm text-muted">Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              autocomplete="name"
              class="w-full rounded-xl border bg-bg px-4 py-3.5 text-base text-text outline-none transition placeholder:text-muted/50 focus:border-accent/50 sm:text-[0.95rem]"
              :class="errors.name ? 'border-red-400/50' : 'border-line-strong'"
              placeholder="Your name"
              :aria-invalid="Boolean(errors.name)"
              :aria-describedby="errors.name ? 'name-error' : undefined"
            />
            <p v-if="errors.name" id="name-error" class="mt-1.5 text-xs text-red-600">
              {{ errors.name }}
            </p>
          </div>

          <div class="sm:col-span-1">
            <label for="email" class="mb-2 block text-sm text-muted">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              autocomplete="email"
              class="w-full rounded-xl border bg-bg px-4 py-3.5 text-base text-text outline-none transition placeholder:text-muted/50 focus:border-accent/50 sm:text-[0.95rem]"
              :class="errors.email ? 'border-red-400/50' : 'border-line-strong'"
              placeholder="you@company.com"
              :aria-invalid="Boolean(errors.email)"
              :aria-describedby="errors.email ? 'email-error' : undefined"
            />
            <p v-if="errors.email" id="email-error" class="mt-1.5 text-xs text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <div class="sm:col-span-2">
            <label for="company" class="mb-2 block text-sm text-muted">Company</label>
            <input
              id="company"
              v-model="form.company"
              type="text"
              autocomplete="organization"
              class="w-full rounded-xl border border-line-strong bg-bg px-4 py-3.5 text-base text-text outline-none transition placeholder:text-muted/50 focus:border-accent/50 sm:text-[0.95rem]"
              placeholder="Optional"
            />
          </div>

          <div>
            <label for="need" class="mb-2 block text-sm text-muted">What do you need help with?</label>
            <select
              id="need"
              v-model="form.need"
              class="w-full rounded-xl border bg-bg px-4 py-3.5 text-base text-text outline-none transition focus:border-accent/50 sm:text-[0.95rem]"
              :class="errors.need ? 'border-red-400/50' : 'border-line-strong'"
              :aria-invalid="Boolean(errors.need)"
            >
              <option disabled value="">Select an option</option>
              <option v-for="option in needOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <p v-if="errors.need" class="mt-1.5 text-xs text-red-600">{{ errors.need }}</p>
          </div>

          <div>
            <label for="budget" class="mb-2 block text-sm text-muted">Budget</label>
            <select
              id="budget"
              v-model="form.budget"
              class="w-full rounded-xl border bg-bg px-4 py-3.5 text-base text-text outline-none transition focus:border-accent/50 sm:text-[0.95rem]"
              :class="errors.budget ? 'border-red-400/50' : 'border-line-strong'"
              :aria-invalid="Boolean(errors.budget)"
            >
              <option disabled value="">Select a range</option>
              <option v-for="option in budgetOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <p v-if="errors.budget" class="mt-1.5 text-xs text-red-600">{{ errors.budget }}</p>
          </div>

          <div class="sm:col-span-2">
            <label for="message" class="mb-2 block text-sm text-muted">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="5"
              class="w-full resize-y rounded-xl border bg-bg px-4 py-3.5 text-base text-text outline-none transition placeholder:text-muted/50 focus:border-accent/50 sm:text-[0.95rem]"
              :class="errors.message ? 'border-red-400/50' : 'border-line-strong'"
              placeholder="Share context, goals, timelines…"
              :aria-invalid="Boolean(errors.message)"
            />
            <p v-if="errors.message" class="mt-1.5 text-xs text-red-600">{{ errors.message }}</p>
          </div>
        </div>

        <button
          type="submit"
          class="btn-primary cursor-expand mt-6 w-full"
          :disabled="!canSubmit"
          :aria-busy="status === 'loading'"
        >
          <LoaderCircle v-if="status === 'loading'" class="h-4 w-4 animate-spin" aria-hidden="true" />
          <template v-else>
            Start the Conversation
            <ArrowRight class="h-4 w-4" aria-hidden="true" />
          </template>
        </button>
      </form>
    </div>
  </section>
</template>
