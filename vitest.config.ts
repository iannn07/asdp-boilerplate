import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup/vitest.setup.ts'],
    include: [
      'src/**/__tests__/**/*.test.{ts,tsx}',
      'tests/integration/**/*.test.{ts,tsx}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/__tests__/**', 'src/components/ui/**', 'src/app/api/**'],
    },
    environmentMatchGlobs: [
      ['src/lib/__tests__/env.test.ts', 'node'],
      ['src/lib/api/**', 'node'],
      ['src/lib/i18n/**', 'node'],
      ['src/lib/auth/**', 'node'],
      ['src/lib/query/__tests__/client.test.ts', 'node'],
      ['src/lib/security/**', 'node'],
    ],
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
})
