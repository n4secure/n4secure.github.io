import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/OceanGrass/dist/',
  server: {
    open: '/source.html',
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'source.html'),
      },
    },
  },
})