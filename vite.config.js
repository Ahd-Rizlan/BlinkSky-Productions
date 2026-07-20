import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Honour a PORT assigned by the launcher; fall back to Vite's default.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: Number(process.env.PORT) || 5173,
  },
})
