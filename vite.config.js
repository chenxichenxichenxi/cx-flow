import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin()
  ],
  build: {
    lib: {
      entry: './src/main.js',
      name: 'cx-flow',
      fileName: 'cx-flow',
      cssCodeSplit: false,
    },
  }
})
