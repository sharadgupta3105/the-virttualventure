export interface ContactPayload {
  name: string
  email: string
  company: string
  need: string
  budget: string
  message: string
}

export interface ContactResult {
  ok: boolean
  message: string
}

/**
 * API-ready contact submission.
 * Swap the body of `submitContact` to connect Formspree, Supabase, Firebase, or a custom API.
 *
 * Formspree example:
 *   await fetch('https://formspree.io/f/YOUR_ID', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
 *     body: JSON.stringify(payload),
 *   })
 */
export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  // Simulate network latency for UX states until a backend is connected.
  await new Promise((resolve) => setTimeout(resolve, 900))

  if (!payload.email.includes('@')) {
    return { ok: false, message: 'Please enter a valid email address.' }
  }

  // Persist locally for demo / handoff — replace with real API call.
  if (typeof window !== 'undefined') {
    const key = 'tvv-contact-leads'
    const existing = JSON.parse(localStorage.getItem(key) || '[]') as ContactPayload[]
    existing.push({ ...payload })
    localStorage.setItem(key, JSON.stringify(existing))
  }

  return {
    ok: true,
    message: "Thanks — we'll be in touch shortly.",
  }
}
