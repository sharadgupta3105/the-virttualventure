export interface ContactPayload {
  name: string
  email: string
  company: string
  need: string
  budget: string
  message: string
  /** Honeypot — must stay empty */
  website?: string
}

export interface ContactResult {
  ok: boolean
  message: string
}

const TO_EMAIL = 'info@thevirtualventure.com'

/**
 * Simple form email via FormSubmit — no API keys or backend required.
 * First submission: open info@thevirtualventure.com and click “Activate Form”.
 */
export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  if (payload.website) {
    return { ok: true, message: "Thanks — we'll be in touch shortly." }
  }

  if (!payload.email.includes('@') || !payload.name.trim() || !payload.message.trim()) {
    return { ok: false, message: 'Please complete the required fields.' }
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(TO_EMAIL)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name.trim(),
        email: payload.email.trim(),
        company: payload.company.trim() || '—',
        need: payload.need,
        budget: payload.budget,
        message: payload.message.trim(),
        _replyto: payload.email.trim(),
        _subject: `New enquiry from ${payload.name.trim()} — The Virtual Venture`,
        _template: 'table',
        _captcha: 'false',
      }),
    })

    const data = (await response.json().catch(() => null)) as {
      success?: string | boolean
      message?: string
      error?: string
    } | null

    const successFlag = data?.success
    if (!response.ok || successFlag === false || successFlag === 'false') {
      const raw = data?.message || data?.error || ''
      if (/activation/i.test(raw)) {
        return {
          ok: false,
          message:
            'Almost ready — check info@thevirtualventure.com for an “Activate Form” email from FormSubmit, click it once, then try again.',
        }
      }
      return {
        ok: false,
        message: raw || 'Could not send. Please email info@thevirtualventure.com.',
      }
    }

    return {
      ok: true,
      message: "Thanks — your message was sent. We'll get back to you soon.",
    }
  } catch {
    return {
      ok: false,
      message: 'Network error. Please try again or email info@thevirtualventure.com.',
    }
  }
}
