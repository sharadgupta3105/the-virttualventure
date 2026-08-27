import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // Project Pages URL: https://sharadgupta3105.github.io/the-virttualventure/
  // After DNS points to GitHub, change this to '/' and restore public/CNAME
  base: '/the-virttualventure/',
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
