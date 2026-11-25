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
        saucelabsAlternative: resolve(__dirname, 'saucelabs-alternative.html'),
        perfectoAlternative: resolve(__dirname, 'perfecto-alternative.html'),
        mablAlternative: resolve(__dirname, 'mabl-alternative.html'),
        testimAlternative: resolve(__dirname, 'testim-alternative.html'),
        kobitonAlternative: resolve(__dirname, 'kobiton-alternative.html'),
        // the automation testing platform page, built from kit folds
        automationTestingPlatform: resolve(__dirname, 'automation-testing-platform.html'),
        // the HyperExecute page, built from kit folds
        hyperexecute: resolve(__dirname, 'hyperexecute.html'),
        // the agent assurance page, built from kit folds
        agentAssurance: resolve(__dirname, 'agent-assurance.html'),
      },
    },
  },
})
