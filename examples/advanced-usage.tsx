import React, { useState } from 'react'
import { PDFViewer } from '@vvelediaz/react-pdf-viewer'
import type { PDFDocumentProxy } from '@vvelediaz/react-pdf-viewer/types'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
// Note: Copy PDFViewer.css from the GitHub repo to your project

/**
 * Advanced usage example with file upload, error handling, and controls
 */
export function AdvancedExample() {
	const [pdfFile, setPdfFile] = useState<File | string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)
	const [zoom, setZoom] = useState(1.0)
	const [scrollMode, setScrollMode] = useState<'page' | 'continuous'>('page')

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			if (file.type === 'application/pdf') {
				setPdfFile(file)
				setError(null)
				setIsLoading(true)
			} else {
				setError('Please select a valid PDF file')
			}
		}
	}

	const handleLoadSuccess = (pdf: PDFDocumentProxy) => {
		setTotalPages(pdf.numPages)
		setIsLoading(false)
		setError(null)
		console.log('PDF loaded with', pdf.numPages, 'pages')
	}

	const handleLoadError = (err: Error) => {
		setError(`Failed to load PDF: ${err.message}`)
		setIsLoading(false)
	}

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	const handleZoomChange = (scale: number) => {
		setZoom(scale)
	}

	const loadSamplePDF = () => {
		setPdfFile('/sample.pdf')
		setError(null)
		setIsLoading(true)
	}

	const toggleScrollMode = () => {
		setScrollMode(prev => prev === 'page' ? 'continuous' : 'page')
	}

	const controlsStyle: React.CSSProperties = {
		padding: '20px',
		backgroundColor: '#f5f5f5',
		borderRadius: '8px',
		marginBottom: '20px',
		fontFamily: 'system-ui, -apple-system, sans-serif'
	}

	const cardStyle: React.CSSProperties = {
		border: '1px solid #ddd',
		borderRadius: '8px',
		padding: '16px',
		marginBottom: '16px',
		backgroundColor: 'white'
	}

	const buttonStyle: React.CSSProperties = {
		padding: '8px 16px',
		backgroundColor: '#007AFF',
		color: 'white',
		border: 'none',
		borderRadius: '6px',
		cursor: 'pointer',
		fontSize: '14px'
	}

	const inputStyle: React.CSSProperties = {
		margin: '8px 0',
		padding: '8px',
		border: '1px solid #ddd',
		borderRadius: '4px'
	}

	return (
		<div style={{ padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
			<h1>Advanced PDF Viewer Example</h1>

			<div style={controlsStyle}>
				<h2>PDF Controls</h2>

				<div style={cardStyle}>
					<label>
						Upload PDF File:
						<input
							type="file"
							accept=".pdf"
							onChange={handleFileUpload}
							style={inputStyle}
						/>
					</label>
				</div>

				<div style={cardStyle}>
					<button
						style={buttonStyle}
						onClick={loadSamplePDF}
					>
						Load Sample PDF
					</button>
				</div>

				{totalPages > 0 && (
					<>
						<div style={cardStyle}>
							<p>Page {currentPage} of {totalPages}</p>
						</div>

						<div style={cardStyle}>
							<label>
								Zoom: {Math.round(zoom * 100)}%
								<input
									type="range"
									min={0.5}
									max={3.0}
									step={0.1}
									value={zoom}
									onChange={(e) => setZoom(parseFloat(e.target.value))}
									style={{ ...inputStyle, width: '200px', marginLeft: '10px' }}
								/>
							</label>
						</div>

						<div style={cardStyle}>
							<label>
								View Mode:
								<button
									style={{ ...buttonStyle, marginLeft: '10px' }}
									onClick={toggleScrollMode}
								>
									{scrollMode === 'page' ? 'Single Page' : 'Continuous'}
								</button>
							</label>
						</div>
					</>
				)}
			</div>

			{isLoading && (
				<div style={cardStyle}>
					<p>Loading PDF...</p>
				</div>
			)}

			{pdfFile && !error && (
				<PDFViewer
					file={pdfFile}
					width="100%"
					height="600px"
					onLoadSuccess={handleLoadSuccess}
					onLoadError={handleLoadError}
					onPageChange={handlePageChange}
					onZoomChange={handleZoomChange}
					initialZoom={zoom}
					scrollMode={scrollMode}
					className="custom-pdf-viewer"
				/>
			)}

			{error && (
				<div style={{
					...cardStyle,
					backgroundColor: '#ffebee',
					border: '1px solid #f44336',
					color: '#d32f2f'
				}}>
					<h3>Error</h3>
					<p>{error}</p>
					<button
						style={buttonStyle}
						onClick={() => setError(null)}
					>
						Dismiss
					</button>
				</div>
			)}
		</div>
	)
} 