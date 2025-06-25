import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	build: {
		rollupOptions: {
			external: ['react', 'react-dom'],
		},
	},
	optimizeDeps: {
		include: ['react-pdf', 'pdfjs-dist'],
	},
	assetsInclude: ['**/*.worker.js', '**/*.worker.mjs'],
}) 