import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      name: 'heic-converter',
      entry: resolve(__dirname, '/src/heic-converter.ts'),
    },
  },
});
