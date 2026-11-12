import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // options.html is the standalone Pioneer layout review page
      input: {
        main: resolve(__dirname, 'index.html'),
        options: resolve(__dirname, 'options.html'),
        // library.html shows each building block on its own
        library: resolve(__dirname, 'library.html'),
        // the BrowserStack alternative page, built from kit folds
        browserstackAlternative: resolve(__dirname, 'browserstack-alternative.html'),
      },
    },
  },
})
