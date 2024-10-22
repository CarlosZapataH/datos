import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      '@emotion/react', 
      '@emotion/styled', 
      // '@mui/material/Tooltip'
    ],
  },
  plugins: [react()],
  // esbuild: {
  //   loader: {
  //     '.js': 'jsx', // Configura el loader para archivos .js
  //   },
  // },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },

  // resolve: {
  //   alias: {
  //     "@src": "/src",
  //   },
  // },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
    },
  },
});
