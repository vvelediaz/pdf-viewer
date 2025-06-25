import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { PDFViewerProps, PDFLoadSuccess } from '../types/pdf'

// Configure PDF.js worker to use local file to avoid CORS issues
const configurePDFWorker = () => {
	try {
		if (typeof pdfjs !== 'undefined' && pdfjs.GlobalWorkerOptions) {
			// Use local worker file served from public directory
			pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
			console.log('PDF.js worker configured with local file:', pdfjs.GlobalWorkerOptions.workerSrc)
		}
	} catch (error) {
		console.warn('Could not configure PDF.js worker:', error)

		// Fallback: Try to set a CDN worker URL as last resort
		try {
			if (typeof pdfjs !== 'undefined' && pdfjs.GlobalWorkerOptions) {
				pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`
				console.log('PDF.js worker configured with CDN fallback')
			}
		} catch (fallbackError) {
			console.error('PDF.js worker configuration failed completely:', fallbackError)
		}
	}
}

// Initialize worker configuration
configurePDFWorker()

const PDFViewer: React.FC<PDFViewerProps> = ({
	file,
	width = '100%',
	height = '600px',
	onLoadSuccess,
	onLoadError,
	onPageChange,
	onZoomChange,
	className = '',
	initialPage = 1,
	initialZoom = 1.0,
	scrollMode = 'page'
}) => {
	const [numPages, setNumPages] = useState<number>(0)
	const [pageNumber, setPageNumber] = useState<number>(initialPage)
	const [scale, setScale] = useState<number>(initialZoom)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [fileUrl, setFileUrl] = useState<string | File | ArrayBuffer | null>(null)
	const [currentVisiblePage, setCurrentVisiblePage] = useState<number>(1)
	const [currentScrollMode, setCurrentScrollMode] = useState<'page' | 'continuous'>(scrollMode)

	// Enhanced options with local resources to avoid CORS issues
	const documentOptions = useMemo(() => {
		return {
			// Use CDN for cmaps and fonts (these don't cause CORS issues typically)
			cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
			cMapPacked: true,
			standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
			// CORS and performance settings
			httpHeaders: {},
			withCredentials: false,
			maxImageSize: 1024 * 1024 * 10, // 10MB
			disableFontFace: false,
			disableRange: false,
			disableStream: false,
		}
	}, [])

	// Handle file processing with better error handling
	useEffect(() => {
		console.log('Processing file:', typeof file, file instanceof File ? file.name : file)

		setLoading(true)
		setError(null)
		setNumPages(0)
		setPageNumber(initialPage)

		if (!file) {
			setError('No file provided')
			setLoading(false)
			return
		}

		if (file instanceof File) {
			// Validate file type
			if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
				setError('Invalid file type. Please select a PDF file.')
				setLoading(false)
				return
			}

			// Create a stable URL for the file to avoid ArrayBuffer issues
			const url = URL.createObjectURL(file)
			setFileUrl(url)
			console.log('Created blob URL for file:', url)

			// Cleanup the URL when component unmounts or file changes
			return () => {
				URL.revokeObjectURL(url)
				console.log('Revoked blob URL:', url)
			}
		} else if (typeof file === 'string') {
			// Handle URL strings
			if (!file.startsWith('http') && !file.startsWith('/') && !file.startsWith('blob:')) {
				setError('Invalid file URL format')
				setLoading(false)
				return
			}
			setFileUrl(file)
			console.log('Using URL string:', file)
		} else {
			// Handle ArrayBuffer or other types
			setFileUrl(file)
			console.log('Using ArrayBuffer or other file type')
		}
	}, [file, initialPage])

	const onDocumentLoadSuccess = useCallback(({ numPages }: PDFLoadSuccess) => {
		console.log('PDF loaded successfully:', {
			numPages,
			file: typeof file === 'string' ? file : file instanceof File ? file.name : 'ArrayBuffer',
			workerSrc: pdfjs.GlobalWorkerOptions.workerSrc
		})

		setNumPages(numPages)
		setLoading(false)
		setError(null)

		if (onLoadSuccess) {
			onLoadSuccess({ numPages, fingerprint: '' })
		}
	}, [onLoadSuccess, file])

	const onDocumentLoadError = useCallback((error: Error) => {
		console.error('PDF load error details:', {
			message: error.message,
			stack: error.stack,
			file: typeof file === 'string' ? file : file instanceof File ? file.name : 'ArrayBuffer',
			workerSrc: pdfjs.GlobalWorkerOptions.workerSrc
		})

		let errorMessage = 'Failed to load PDF'

		if (error.message.includes('Invalid PDF structure') || error.message.includes('InvalidPDFException')) {
			errorMessage = 'Invalid PDF file format or corrupted file.'
		} else if (error.message.includes('fetch') || error.message.includes('NetworkError')) {
			errorMessage = 'Failed to fetch PDF file from the server. Check your internet connection and CORS settings.'
		} else if (error.message.includes('password')) {
			errorMessage = 'This PDF is password protected.'
		} else if (error.message.includes('ArrayBuffer') || error.message.includes('detached')) {
			errorMessage = 'Error processing PDF file. Please try uploading the file again.'
		} else if (error.message.includes('worker')) {
			errorMessage = 'PDF.js worker failed to load. Please check your internet connection.'
		} else if (error.message.includes('CORS')) {
			errorMessage = 'CORS error: Cannot load PDF from external source. Try downloading the file first.'
		} else {
			errorMessage = `Failed to load PDF: ${error.message}`
		}

		setError(errorMessage)
		setLoading(false)

		if (onLoadError) {
			onLoadError(error)
		}
	}, [onLoadError, file])

	const goToPrevPage = useCallback(() => {
		const newPage = Math.max(pageNumber - 1, 1)
		setPageNumber(newPage)
		if (onPageChange) {
			onPageChange(newPage)
		}
	}, [pageNumber, onPageChange])

	const goToNextPage = useCallback(() => {
		const newPage = Math.min(pageNumber + 1, numPages)
		setPageNumber(newPage)
		if (onPageChange) {
			onPageChange(newPage)
		}
	}, [pageNumber, numPages, onPageChange])

	const zoomIn = useCallback(() => {
		const newScale = Math.min(scale + 0.2, 3.0)
		setScale(newScale)
		if (onZoomChange) {
			onZoomChange(newScale)
		}
	}, [scale, onZoomChange])

	const zoomOut = useCallback(() => {
		const newScale = Math.max(scale - 0.2, 0.5)
		setScale(newScale)
		if (onZoomChange) {
			onZoomChange(newScale)
		}
	}, [scale, onZoomChange])

	const resetZoom = useCallback(() => {
		setScale(1.0)
		if (onZoomChange) {
			onZoomChange(1.0)
		}
	}, [onZoomChange])

	const goToPage = useCallback((page: number) => {
		const newPage = Math.max(1, Math.min(page, numPages))
		setPageNumber(newPage)
		if (onPageChange) {
			onPageChange(newPage)
		}
	}, [numPages, onPageChange])

	const retryLoad = useCallback(() => {
		setError(null)
		setLoading(true)
		setNumPages(0)

		// If it's a File object, recreate the URL
		if (file instanceof File) {
			const url = URL.createObjectURL(file)
			setFileUrl(url)
		}
	}, [file])

	// Toggle scroll mode
	const toggleScrollMode = useCallback(() => {
		const newMode = currentScrollMode === 'page' ? 'continuous' : 'page'
		setCurrentScrollMode(newMode)
	}, [currentScrollMode])

	// Debounced scroll handler to prevent rapid page changes
	const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
		if (currentScrollMode !== 'continuous' || numPages === 0) return

		const container = e.currentTarget
		const scrollTop = container.scrollTop
		const scrollHeight = container.scrollHeight

		// Calculate which page is most visible with some tolerance
		const pageHeight = scrollHeight / numPages
		const currentPage = Math.floor((scrollTop + pageHeight * 0.5) / pageHeight) + 1
		const adjustedPage = Math.min(Math.max(currentPage, 1), numPages)

		// Only update if there's a significant change to prevent flipping
		if (Math.abs(adjustedPage - currentVisiblePage) >= 1) {
			setCurrentVisiblePage(adjustedPage)
			setPageNumber(adjustedPage)
			if (onPageChange) {
				onPageChange(adjustedPage)
			}
		}
	}, [currentScrollMode, numPages, currentVisiblePage, onPageChange])

	// Scroll to specific page in continuous mode
	const scrollToPage = useCallback((page: number) => {
		if (currentScrollMode !== 'continuous') return

		const container = document.querySelector('.pdf-content-continuous')
		if (container && numPages > 0) {
			const pageHeight = container.scrollHeight / numPages
			const scrollTop = (page - 1) * pageHeight
			container.scrollTo({ top: scrollTop, behavior: 'smooth' })
		}
	}, [currentScrollMode, numPages])

	// Update scroll position when page changes in continuous mode
	useEffect(() => {
		if (currentScrollMode === 'continuous' && pageNumber !== currentVisiblePage) {
			scrollToPage(pageNumber)
		}
	}, [pageNumber, currentScrollMode, currentVisiblePage, scrollToPage])

	if (error) {
		return (
			<div className={`pdf-viewer-error ${className}`}>
				<div className="error-content">
					<h3>PDF Loading Error</h3>
					<div className="error-message">{error}</div>
					<div className="error-suggestions">
						<p><strong>Troubleshooting Steps:</strong></p>
						<ul>
							{error.includes('Invalid PDF') || error.includes('ArrayBuffer') ? (
								<>
									<li>Try uploading a different PDF file</li>
									<li>Ensure the PDF file is not corrupted</li>
									<li>Check if the file is a valid PDF document</li>
									<li>Try saving the PDF from a different source</li>
									<li>If the file is large, try a smaller PDF first</li>
								</>
							) : (
								<>
									<li>Try uploading a local PDF file instead</li>
									<li>Check your internet connection</li>
									<li>Ensure the PDF URL is accessible</li>
									<li>Refresh the page and try again</li>
								</>
							)}
						</ul>
					</div>
					<div className="error-actions">
						<button
							className="pdf-control-btn primary"
							onClick={retryLoad}
						>
							↻ Retry Loading
						</button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className={`pdf-viewer-container ${className}`} style={{ width, height }}>
			{/* Controls */}
			<div className="pdf-controls-single-line">
				{/* Navigation Controls */}
				<div className="pdf-controls-group">
					<button
						className="pdf-control-btn"
						disabled={pageNumber <= 1}
						onClick={goToPrevPage}
						title="Previous page"
					>
						‹
					</button>

					<span className="page-info-compact">
						{numPages > 0 ? `${pageNumber} / ${numPages}` : 'Loading...'}
					</span>

					<button
						className="pdf-control-btn"
						disabled={pageNumber >= numPages}
						onClick={goToNextPage}
						title="Next page"
					>
						›
					</button>
				</div>

				{/* Page Input */}
				<div className="page-input-compact">
					<input
						type="number"
						min={1}
						max={numPages || 1}
						value={pageNumber}
						onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
						disabled={!numPages}
						placeholder="Page"
						className="page-number-input"
					/>
				</div>

				{/* Zoom Controls */}
				<div className="pdf-controls-group">
					<button
						className="pdf-control-btn"
						disabled={scale <= 0.5}
						onClick={zoomOut}
						title="Zoom out"
					>
						−
					</button>

					<span className="zoom-info-compact">
						{Math.round(scale * 100)}%
					</span>

					<button
						className="pdf-control-btn"
						disabled={scale >= 3.0}
						onClick={zoomIn}
						title="Zoom in"
					>
						+
					</button>

					<button
						className="pdf-control-btn"
						onClick={resetZoom}
						title="Reset zoom"
					>
						⌂
					</button>

					{/* Scroll Mode Toggle */}
					<button
						className="pdf-control-btn"
						onClick={toggleScrollMode}
						title={currentScrollMode === 'page' ? 'Switch to continuous scroll' : 'Switch to page-by-page'}
					>
						{currentScrollMode === 'page' ? '⎘' : '≡'}
					</button>
				</div>
			</div>

			{/* PDF Content */}
			<div
				className={currentScrollMode === 'continuous' ? 'pdf-content-continuous' : 'pdf-content-ionic'}
				onScroll={currentScrollMode === 'continuous' ? handleScroll : undefined}
			>
				{loading && (
					<div className="pdf-loading-ionic">
						<div className="loading-spinner"></div>
						<p>Loading PDF...</p>
						<p className="loading-details">
							{typeof file === 'string' ?
								(file.startsWith('/') ? 'Loading local file...' : 'Loading from URL...') :
								'Processing uploaded file...'
							}
						</p>
					</div>
				)}

				{fileUrl && (
					<div>
						<Document
							file={fileUrl}
							onLoadSuccess={onDocumentLoadSuccess}
							onLoadError={onDocumentLoadError}
							loading={null}
							options={documentOptions}
						>
							{numPages > 0 && currentScrollMode === 'page' && (
								<Page
									pageNumber={pageNumber}
									scale={scale}
									renderTextLayer={true}
									renderAnnotationLayer={true}
								/>
							)}
							{numPages > 0 && currentScrollMode === 'continuous' && (
								<div className="pdf-pages-container">
									{Array.from(new Array(numPages), (_, index) => (
										<div key={`page_${index + 1}`} className="pdf-page-wrapper">
											<Page
												pageNumber={index + 1}
												scale={scale}
												renderTextLayer={true}
												renderAnnotationLayer={true}
												className={`pdf-page-continuous ${index + 1 === currentVisiblePage ? 'current-page' : ''}`}
											/>
										</div>
									))}
								</div>
							)}
						</Document>
					</div>
				)}
			</div>
		</div>
	)
}

export default PDFViewer
export { PDFViewer } 