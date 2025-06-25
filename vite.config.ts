import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	// Development optimizations
	optimizeDeps: {
		include: [
			'react-pdf',
			'react-pdf/dist/esm/entry.webpack',
			'pdfjs-dist',
			'pdfjs-dist/build/pdf.worker.entry'
		],
		exclude: ['@vvelediaz/react-pdf-viewer']
	},
	// Library build configuration
	build: {
		lib: {
			entry: './src/components/index.ts',
			name: 'ReactPDFViewer',
			formats: ['es', 'cjs'],
			fileName: (format) => `react-pdf-viewer.${format}.js`
		},
		rollupOptions: {
			// Externalize peer dependencies
			external: ['react', 'react-dom', 'react/jsx-runtime', 'react-pdf'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'react/jsx-runtime': 'jsxRuntime',
					'react-pdf': 'ReactPDF'
				}
			}
		},
		// Ensure compatibility
		target: 'es2020',
		minify: false,
		sourcemap: true
	},
	// SSR configuration
	ssr: {
		noExternal: ['react-pdf']
	},
	// Asset handling
	assetsInclude: ['**/*.worker.js', '**/*.worker.mjs'],
}) 