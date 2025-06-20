export type SupportedFileType = 'pdf' | 'docx'

export interface DocumentViewerProps {
	file: string | File | ArrayBuffer
	width?: string | number
	height?: string | number
	onLoadSuccess?: (document: DocumentProxy) => void
	onLoadError?: (error: Error) => void
	onPageChange?: (pageNumber: number) => void
	onZoomChange?: (scale: number) => void
	className?: string
	initialPage?: number
	initialZoom?: number
	scrollMode?: 'page' | 'continuous'
	fileType?: SupportedFileType // Optional override for file type detection
}

export interface DocumentProxy {
	numPages: number
	fingerprint?: string
	fileType: SupportedFileType
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

export interface DocxContent {
	html: string
	messages: Array<{ type: string; message: string }>
} 