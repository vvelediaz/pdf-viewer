import React, { useState } from 'react'
import PDFViewer from './components/PDFViewer'
import './App.css'

const App: React.FC = () => {
	// Sample PDF documents for demonstration
	const sampleDocuments = [
		{ name: 'Local Sample PDF', url: '/sample.pdf', size: '1.2 MB', date: '2024-01-15' },
		{ name: 'Mozilla PDF.js Example', url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf', size: '845 KB', date: '2024-01-10' },
		{ name: 'W3C Test Document', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '13 KB', date: '2024-03-15' }
	]

	const [selectedPDF, setSelectedPDF] = useState<string | File>(sampleDocuments[0].url)
	const [selectedDocument, setSelectedDocument] = useState(sampleDocuments[0])
	const [currentPage, setCurrentPage] = useState(1)
	const [currentZoom, setCurrentZoom] = useState(1.0)
	const [showToast, setShowToast] = useState(false)
	const [toastMessage, setToastMessage] = useState('')

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
		showMessage(`Document loaded successfully (${pdf.numPages} pages)`)
	}

	const handleLoadError = (error: Error) => {
		console.error('PDF load error:', error)
		showMessage('Failed to load document')
	}

	const showMessage = (message: string) => {
		setToastMessage(message)
		setShowToast(true)
		setTimeout(() => setShowToast(false), 3000)
	}

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file && file.type === 'application/pdf') {
			console.log('Uploading file:', { name: file.name, size: file.size, type: file.type })
			setSelectedPDF(file)
			setSelectedDocument({
				name: file.name,
				url: '',
				size: `${Math.round(file.size / 1024)} KB`,
				date: new Date().toISOString().split('T')[0]
			})
			setCurrentPage(1)
			showMessage(`File "${file.name}" uploaded`)
		} else {
			showMessage('Please select a valid PDF file')
		}
	}

	const selectDocument = (doc: typeof sampleDocuments[0]) => {
		setSelectedPDF(doc.url)
		setSelectedDocument(doc)
		setCurrentPage(1)
		showMessage(`Loading: ${doc.name}`)
	}

	return (
		<div className="app">
			<header className="app-header">
				<h1>📄 React PDF Viewer</h1>
				<p>A lightweight, modern PDF viewer component</p>
			</header>

			<main className="app-main">
				{/* Sidebar */}
				<aside className="sidebar">
					<div className="upload-section">
						<h3>📁 Upload Document</h3>
						<input
							type="file"
							accept=".pdf,application/pdf"
							onChange={handleFileUpload}
							className="file-input"
							id="pdf-upload"
						/>
						<label htmlFor="pdf-upload" className="upload-btn">
							📤 Choose PDF File
						</label>
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
						</div>
					</div>
				</aside>

				{/* PDF Viewer */}
				<div className="viewer-container">
					<PDFViewer
						file={selectedPDF}
						width="100%"
						height="calc(100vh - 120px)"
						onLoadSuccess={handleLoadSuccess}
						onLoadError={handleLoadError}
						onPageChange={handlePageChange}
						onZoomChange={handleZoomChange}
						className="pdf-viewer"
					/>
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