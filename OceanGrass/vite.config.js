import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
    plugins: [react()],
    // In dev, use root relative path.
    // In build, use the GitHub Pages repository name.
    base: './',
    build: {
      outDir: 'dist',
    },
  }
})