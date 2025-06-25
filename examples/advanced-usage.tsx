import React, { useState } from 'react'
import { PDFViewer, setupPDFJS } from '@vvelediaz/react-pdf-viewer'
import type { PDFDocumentProxy } from '@vvelediaz/react-pdf-viewer/types'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
// Note: Copy PDFViewer.css from the GitHub repo to your project

// Configure PDF.js worker
setupPDFJS()

/**
 * Advanced usage example with file upload, error handling, and controls
 */
export function AdvancedExample() {
	const [pdfFile, setPdfFile] = useState<File | string | null>('/sample.pdf')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [pageCount, setPageCount] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)
	const [zoom, setZoom] = useState(1.0)
	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		// Validate file type
		if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
			setError('Please select a valid PDF file')
			return
		}

		// Validate file size (10MB limit)
		if (file.size > 10 * 1024 * 1024) {
			setError('File size must be less than 10MB')
			return
		}

		setError(null)
		setPdfFile(file)
		setCurrentPage(1)
	}

	const handleLoadSuccess = (pdf: PDFDocumentProxy) => {
		setPageCount(pdf.numPages)
		setLoading(false)
		setError(null)
		console.log('PDF loaded successfully:', pdf.numPages, 'pages')
	}

	const handleLoadError = (error: Error) => {
		setError(`Failed to load PDF: ${error.message}`)
		setLoading(false)
		console.error('PDF load error:', error)
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
		setLoading(true)
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
		<div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
			<h1>Advanced PDF Viewer Example</h1>

			<div style={controlsStyle}>
				<h2>PDF Controls</h2>

				<div style={cardStyle}>
					<label htmlFor="pdf-upload" style={inputStyle}>
						Choose PDF File
					</label>
					<input
						id="pdf-upload"
						type="file"
						accept=".pdf,application/pdf"
						onChange={handleFileUpload}
						style={{ ...inputStyle, display: 'none' }}
					/>
				</div>

				<div style={cardStyle}>
					<button
						style={buttonStyle}
						onClick={loadSamplePDF}
					>
						Load Sample PDF
					</button>
				</div>

				{pageCount > 0 && (
					<>
						<div style={cardStyle}>
							<p>Page {currentPage} of {pageCount}</p>
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


					</>
				)}
			</div>

			<div style={{
				marginBottom: '20px',
				padding: '10px',
				backgroundColor: '#f5f5f5',
				borderRadius: '6px',
				fontSize: '14px'
			}}>
				<strong>Status:</strong> {
					loading ? 'Loading...' :
						error ? `Error: ${error}` :
							pageCount > 0 ? `Loaded ${pageCount} pages, currently viewing page ${currentPage}, zoom: ${Math.round(zoom * 100)}%` :
								'No PDF loaded'
				}
			</div>

			{error && (
				<div style={{
					marginBottom: '20px',
					padding: '15px',
					backgroundColor: '#ffebee',
					border: '1px solid #f44336',
					borderRadius: '6px',
					color: '#d32f2f'
				}}>
					<h3 style={{ margin: '0 0 10px 0' }}>Error</h3>
					<p style={{ margin: 0 }}>{error}</p>
					<button
						onClick={() => {
							setError(null)
							setLoading(true)
						}}
						style={{
							marginTop: '10px',
							padding: '8px 16px',
							backgroundColor: '#f44336',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer'
						}}
					>
						Retry
					</button>
				</div>
			)}

			{pdfFile && !error && (
				<div style={{
					border: '1px solid #ccc',
					borderRadius: '8px',
					overflow: 'hidden',
					boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
				}}>
					<PDFViewer
						file={pdfFile}
						width="100%"
						height="700px"
						onLoadSuccess={handleLoadSuccess}
						onLoadError={handleLoadError}
						onPageChange={handlePageChange}
						onZoomChange={handleZoomChange}
						initialZoom={zoom}
						scrollMode="continuous"
					/>
				</div>
			)}

			<div style={{
				marginTop: '30px',
				padding: '20px',
				backgroundColor: '#f8f9fa',
				borderRadius: '8px',
				fontSize: '14px'
			}}>
				<h3>Setup Instructions for Your Project:</h3>
				<pre style={{
					backgroundColor: '#e9ecef',
					padding: '15px',
					borderRadius: '6px',
					overflow: 'auto',
					fontSize: '13px'
				}}>
					{`// 1. Install the package
npm install @vvelediaz/react-pdf-viewer

// 2. Copy the worker file (Method 1 - Recommended)
cp node_modules/@vvelediaz/react-pdf-viewer/public/pdf.worker.min.js public/

// 3. Or use setupPDFJS() for automatic CDN fallback (Method 2)
import { setupPDFJS } from '@vvelediaz/react-pdf-viewer'
setupPDFJS() // Call once in your app

// 4. Import required CSS
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// 5. Use the component
import { PDFViewer } from '@vvelediaz/react-pdf-viewer'`}
				</pre>
			</div>
		</div>
	)
} 