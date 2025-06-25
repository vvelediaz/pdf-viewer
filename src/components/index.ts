export { PDFViewer } from './PDFViewer'
export type { PDFViewerProps, PDFDocumentProxy } from '../types/pdf'

// PDF.js setup utility for better compatibility
export const setupPDFJS = (): void => {
	try {
		// Dynamic import to handle different bundler environments
		import('react-pdf').then(({ pdfjs }) => {
			if (pdfjs && pdfjs.GlobalWorkerOptions) {
				// Use local worker file to avoid CORS issues
				pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
				console.log('PDF.js worker configured successfully with local file')
			}
		}).catch((error) => {
			console.warn('Could not dynamically configure PDF.js worker:', error)
		})
	} catch (error) {
		console.warn('PDF.js setup failed:', error)
	}
} 