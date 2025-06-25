export { PDFViewer } from './PDFViewer'
export type { PDFViewerProps, PDFDocumentProxy } from '../types/pdf'

// PDF.js setup utility for better compatibility
export const setupPDFJS = (workerSrc?: string): void => {
	try {
		// Dynamic import to handle different bundler environments
		import('react-pdf').then(({ pdfjs }) => {
			if (pdfjs && pdfjs.GlobalWorkerOptions) {
				if (workerSrc) {
					// Use provided worker source
					pdfjs.GlobalWorkerOptions.workerSrc = workerSrc
					console.log('PDF.js worker configured with provided source:', workerSrc)
				} else {
					// Auto-detect best worker source
					const strategies = [
						'/pdf.worker.min.js', // Public directory
						`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`, // CDN
						`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js` // Alternative CDN
					]

					// Try local first, then fallback to CDN
					pdfjs.GlobalWorkerOptions.workerSrc = strategies[0]

					// Test if local worker is available
					if (typeof window !== 'undefined') {
						fetch(strategies[0], { method: 'HEAD' }).catch(() => {
							console.warn('Local PDF worker not found, using CDN fallback')
							pdfjs.GlobalWorkerOptions.workerSrc = strategies[1]
						})
					} else {
						// Server-side rendering - use CDN
						pdfjs.GlobalWorkerOptions.workerSrc = strategies[1]
					}

					console.log('PDF.js worker configured automatically:', pdfjs.GlobalWorkerOptions.workerSrc)
				}
			}
		}).catch((error) => {
			console.warn('Could not dynamically configure PDF.js worker:', error)
		})
	} catch (error) {
		console.warn('PDF.js setup failed:', error)
	}
} 