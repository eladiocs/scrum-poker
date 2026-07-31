import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Build separado para publicar <scrum-poker> como Web Component reutilizable
// desde React, Angular u otro frontal. `customElement: true` hace que los
// <style> de ScrumPoker.vue y sus componentes internos (MyButton.vue) se
// inyecten dentro del Shadow DOM del elemento en vez de en <head>.
export default defineConfig({
  plugins: [vue({ customElement: true })],
  publicDir: false,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: fileURLToPath(new URL('./src/element.ts', import.meta.url)),
      name: 'ScrumPokerElement',
      formats: ['es'],
      fileName: () => 'scrum-poker.js',
    },
  },
})
