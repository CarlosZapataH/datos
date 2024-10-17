import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // esbuild: {
  //   loader: {
  //     '.js': 'jsx', // Configura el loader para archivos .js
  //   },
  // },
  resolve: {
    alias: {
      '@src': '/src',
    },
  },
})
