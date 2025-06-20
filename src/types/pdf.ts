export interface PDFViewerProps {
	file: string | File | ArrayBuffer
	width?: string | number
	height?: string | number
	onLoadSuccess?: (pdf: PDFDocumentProxy) => void
	onLoadError?: (error: Error) => void
	onPageChange?: (pageNumber: number) => void
	onZoomChange?: (scale: number) => void
	className?: string
	initialPage?: number
	initialZoom?: number
	scrollMode?: 'page' | 'continuous'
}

export interface PDFDocumentProxy {
	numPages: number
	fingerprint: string
}

export interface PDFPageProxy {
	pageNumber: number
	pageIndex: number
	rotate: number
}

export interface PDFLoadSuccess {
	numPages: number
}

export interface PDFError {
	message: string
	name: string
} 