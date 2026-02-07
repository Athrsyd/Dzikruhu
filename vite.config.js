import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/api-berita': {
        target: 'https://artikel-islam.netlify.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-berita/, '/.netlify/functions/api/kj')
      }
    }
  }
})
