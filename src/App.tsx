import React, { useState } from 'react'
import PDFViewer from './components/PDFViewer'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

const App: React.FC = () => {
	// Sample PDF documents for demonstration - using more reliable sources
	const sampleDocuments = [
		{ name: 'Local Sample PDF', url: '/sample.pdf', size: '606 B', date: '2024-01-15' },
		{ name: 'Local Test PDF', url: '/test.pdf', size: '20 KB', date: '2024-01-16' },
		{ name: 'Mozilla PDF.js Example', url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf', size: '845 KB', date: '2024-01-10' }
	]

	const [selectedPDF, setSelectedPDF] = useState<string | File>(sampleDocuments[0].url)
	const [selectedDocument, setSelectedDocument] = useState(sampleDocuments[0])
	const [currentPage, setCurrentPage] = useState(1)
	const [currentZoom, setCurrentZoom] = useState(1.0)
	const [showToast, setShowToast] = useState(false)
	const [toastMessage, setToastMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber)
		console.log(`Page changed to: ${pageNumber}`)
	}

	const handleZoomChange = (scale: number) => {
		setCurrentZoom(scale)
		console.log(`Zoom changed to: ${Math.round(scale * 100)}%`)
	}

	const handleLoadSuccess = (pdf: any) => {
		console.log(`PDF loaded successfully with ${pdf.numPages} pages`)
		setCurrentPage(1)
		setIsLoading(false)
		showMessage(`Document loaded successfully (${pdf.numPages} pages)`)
	}

	const handleLoadError = (error: Error) => {
		console.error('PDF load error:', error)
		setIsLoading(false)
		showMessage(`Failed to load document: ${error.message}`)
	}

	const showMessage = (message: string) => {
		setToastMessage(message)
		setShowToast(true)
		setTimeout(() => setShowToast(false), 4000)
	}

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			// Validate file type more thoroughly
			const isValidPDF = file.type === 'application/pdf' ||
				file.name.toLowerCase().endsWith('.pdf') ||
				file.type === 'application/x-pdf'

			if (isValidPDF) {
				console.log('Uploading file:', {
					name: file.name,
					size: file.size,
					type: file.type,
					lastModified: new Date(file.lastModified).toISOString()
				})

				setSelectedPDF(file)
				setSelectedDocument({
					name: file.name,
					url: '',
					size: `${Math.round(file.size / 1024)} KB`,
					date: new Date().toISOString().split('T')[0]
				})
				setCurrentPage(1)
				setIsLoading(true)
				showMessage(`Loading file: ${file.name}`)
			} else {
				showMessage(`Invalid file type. Please select a PDF file. Selected: ${file.type}`)
			}
		}

		// Reset the input so the same file can be selected again
		event.target.value = ''
	}

	const selectDocument = (doc: typeof sampleDocuments[0]) => {
		console.log('Selecting document:', doc)
		setSelectedPDF(doc.url)
		setSelectedDocument(doc)
		setCurrentPage(1)
		setIsLoading(true)
		showMessage(`Loading: ${doc.name}`)
	}

	return (
		<div className="app">
			<header className="app-header">
				<h1>📄 React PDF Viewer</h1>
				<p>A lightweight, modern PDF viewer component with Aqua design</p>
			</header>

			<main className="app-main">
				{/* Sidebar */}
				<aside className="sidebar">
					<div className="upload-section">
						<h3>📁 Upload Document</h3>
						<input
							type="file"
							accept=".pdf,application/pdf,application/x-pdf"
							onChange={handleFileUpload}
							className="file-input"
							id="pdf-upload"
						/>
						<label htmlFor="pdf-upload" className="upload-btn">
							📤 Choose PDF File
						</label>
						<p className="upload-hint">Supports: PDF files up to 10MB</p>
					</div>

					<div className="documents-section">
						<h3>📚 Sample Documents</h3>
						<div className="document-list">
							{sampleDocuments.map((doc, index) => (
								<div
									key={index}
									className={`document-item ${selectedDocument.name === doc.name ? 'selected' : ''}`}
									onClick={() => selectDocument(doc)}
								>
									<div className="document-icon">📄</div>
									<div className="document-info">
										<h4>{doc.name}</h4>
										<p>{doc.size} • {doc.date}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="info-section">
						<h3>📊 Current Document</h3>
						<div className="current-doc-info">
							<p><strong>Name:</strong> {selectedDocument.name}</p>
							<p><strong>Size:</strong> {selectedDocument.size}</p>
							<p><strong>Page:</strong> {currentPage}</p>
							<p><strong>Zoom:</strong> {Math.round(currentZoom * 100)}%</p>
							<p><strong>Status:</strong> {isLoading ? 'Loading...' : 'Ready'}</p>
						</div>
					</div>

					<div className="debug-section">
						<h3>🔧 Debug Info</h3>
						<div className="debug-info">
							<p><strong>File Type:</strong> {typeof selectedPDF}</p>
							<p><strong>URL:</strong> {typeof selectedPDF === 'string' ? selectedPDF.substring(0, 50) + '...' : 'File Object'}</p>
						</div>
					</div>
				</aside>

				{/* PDF Viewer */}
				<div className="viewer-container">
					<ErrorBoundary>
						<PDFViewer
							file={selectedPDF}
							width="100%"
							height="calc(100vh - 120px)"
							onLoadSuccess={handleLoadSuccess}
							onLoadError={handleLoadError}
							onPageChange={handlePageChange}
							onZoomChange={handleZoomChange}
							className="pdf-viewer"
							initialZoom={1.0}
							scrollMode="page"
						/>
					</ErrorBoundary>
				</div>
			</main>

			{/* Toast notification */}
			{showToast && (
				<div className="toast">
					{toastMessage}
				</div>
			)}
		</div>
	)
}

export default App 