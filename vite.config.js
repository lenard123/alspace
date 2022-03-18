import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import laravel from 'vite-plugin-laravel'

//process.env = {...process.env, ...loadEnv()};

// https://vitejs.dev/config/
export default function({mode}){
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  return defineConfig({
    plugins: [
      react(),
      laravel()
    ],
    server:{
      hmr: {
        host: process.env.VITE_HMR_HOST || 'localhost',
        port: process.env.VITE_HMR_PORT || 3000
      }
    }
  })
}
