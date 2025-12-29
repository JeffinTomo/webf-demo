import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@wlfi/webf-point': path.resolve(__dirname, 'webf-modules/webf-point/dist/index.mjs'),
    },
  },
  optimizeDeps: {
    exclude: ['@wlfi/webf-point'],
  },
})
