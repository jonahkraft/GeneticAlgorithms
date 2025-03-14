import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// https://dev.to/din0saur5/integrating-vite-with-flask-for-production-28af
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    cors: true,
    proxy: {
      "/api": {
        target: "https://127.0.0.1:5000/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
