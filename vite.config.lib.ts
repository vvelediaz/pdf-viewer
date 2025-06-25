import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: './mod.ts',
			name: 'ReactPDFViewer',
			fileName: (format) => `react-pdf-viewer.${format}.js`,
			formats: ['es', 'umd']
		},
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
		sourcemap: true,
		minify: 'terser'
	},
	define: {
		global: 'globalThis',
	},
}) 