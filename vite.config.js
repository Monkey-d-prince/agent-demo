import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // increase the default warning limit (500kb → 1000kb)
    chunkSizeWarningLimit: 3000,

    rollupOptions: {
      output: {
        // Example: split vendor libs into a separate chunk
        manualChunks: {
          react: ['react', 'react-dom']
        }
      }
    }
  }
})
