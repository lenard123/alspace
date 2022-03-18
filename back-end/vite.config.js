import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import laravel from 'vite-plugin-laravel'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    laravel()
  ],
  server:{
    hmr: {
      //port: 443
    }
  }
})
