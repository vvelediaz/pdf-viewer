import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	optimizeDeps: {
		include: [
			'react-pdf',
			'react-pdf/dist/esm/entry.webpack',
			'pdfjs-dist',
			'pdfjs-dist/build/pdf.worker.entry'
		],
		exclude: ['@vvelediaz/react-pdf-viewer']
	},
	build: {
		rollupOptions: {
			external: ['react', 'react-dom', 'react-pdf'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'react-pdf': 'ReactPDF'
				}
			}
		},
	},
	ssr: {
		noExternal: ['react-pdf']
	},
	assetsInclude: ['**/*.worker.js', '**/*.worker.mjs'],
}) 