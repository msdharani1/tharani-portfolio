import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscator from 'rollup-plugin-obfuscator'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      globalOptions: {
        debugProtection: true,
        debugProtectionInterval: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.8,
      }
    }),
    compression({ algorithm: 'gzip' })
  ],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  },
})