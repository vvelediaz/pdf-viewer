import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	optimizeDeps: {
		include: ['react-pdf', 'pdfjs-dist'],
		exclude: ['react', 'react-dom'],
	},
	assetsInclude: ['**/*.worker.js', '**/*.worker.mjs'],
	define: {
		global: 'globalThis',
	},
	resolve: {
		alias: {
			// Ensure proper resolution of React
			'react': 'react',
			'react-dom': 'react-dom',
		},
	},
}) 