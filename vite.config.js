import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import laravel from 'vite-plugin-laravel'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [
		react(),
		laravel({
			postcss: [
				tailwindcss(),
				autoprefixer(),
			],
		}),
	],
	server: {
		host: 'localhost',
		https: false,
		hmr: {
			clientPort: 443
		}
	}
})