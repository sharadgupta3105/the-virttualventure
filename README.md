# The Virtual Venture

Premium digital growth agency website built with Vue 3, Vite, Tailwind CSS, Vue Router, Lucide, and GSAP.

## Getting started

```bash
npm install
npm run dev
```

## Deploy on GitHub Pages + custom DNS

This repo auto-deploys to GitHub Pages on every push to `main`.

### 1. Enable Pages in GitHub

1. Open the repo → **Settings** → **Pages**
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**
3. Save

### 2. Point your DNS

At your domain registrar (for `thevirtualventure.com`):

**Apex / root domain (`thevirtualventure.com`)** — add these **A** records:

| Type | Name | Value |
|------|------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**www** — add a **CNAME**:

| Type | Name | Value |
|------|------|--------|
| CNAME | `www` | `sharadgupta3105.github.io` |

### 3. Set custom domain in GitHub

1. Repo → **Settings** → **Pages**
2. **Custom domain**: `thevirtualventure.com`
3. Check **Enforce HTTPS** (after DNS propagates — can take a few minutes to 48h)

Temporary URL before DNS is ready:  
`https://sharadgupta3105.github.io/the-virttualventure/`  
(With a custom domain configured, GitHub serves from the root domain instead.)

### Contact form

Uses [FormSubmit](https://formsubmit.co) — **no API keys, no backend**.

1. Open the live site and submit the contact form once
2. In **info@thevirtualventure.com**, open the FormSubmit email
3. Click **Activate Form** (one time only)
4. Later submissions go to that inbox
