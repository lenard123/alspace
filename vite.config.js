import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import laravel from 'vite-plugin-laravel'

const setupEnvironment = (mode) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  const isGitpod = !!process.env.GITPOD_WORKSPACE_ID
  const GITPOD_WORKSPACE_HOST = process.env.GITPOD_WORKSPACE_ID +'.'+process.env.GITPOD_WORKSPACE_CLUSTER_HOST
  process.env.VITE_CLIENT_HOST = isGitpod ? `3000-${GITPOD_WORKSPACE_HOST}` : 'localhost:3000'
  process.env.VITE_SERVER_HOST = isGitpod ? `8000-${GITPOD_WORKSPACE_HOST}` : 'localhost:8000'
  process.env.VITE_HMR_HOST = isGitpod ? process.env.VITE_CLIENT_HOST : 'localhost'
  process.env.VITE_HMR_PORT = isGitpod ? 443 : 3000
  process.env.VITE_ISGITPOD = isGitpod
  process.env.VITE_GITPOD_WORKSPACE_ID = process.env.GITPOD_WORKSPACE_ID
}

// https://vitejs.dev/config/
export default function({mode}){
  setupEnvironment(mode)
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
