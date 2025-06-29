/**
 * @module react-pdf-viewer
 * 
 * A modern, lightweight React PDF viewer component.
 * Features include zoom controls, page navigation, responsive design,
 * and support for both page and continuous scroll modes.
 */

// Main component export
export { default as PDFViewer } from './src/components/PDFViewer'

// Type exports
export type {
	PDFViewerProps,
	PDFDocumentProxy,
	PDFPageProxy,
	PDFLoadSuccess,
	PDFError
} from './src/types/pdf'

