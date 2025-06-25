import React from 'react'
import { PDFViewer, setupPDFJS } from '@vvelediaz/react-pdf-viewer'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
// Note: Copy PDFViewer.css from the GitHub repo to your project

// Configure PDF.js worker
setupPDFJS()

/**
 * Basic usage example of the PDFViewer component
 */
export function BasicExample() {
	const handleLoadSuccess = (pdf: any) => {
		console.log('PDF loaded successfully:', pdf.numPages, 'pages')
	}

	const handleLoadError = (error: Error) => {
		console.error('Failed to load PDF:', error.message)
	}

	return (
		<div style={{ padding: '20px' }}>
			<h1>Basic PDF Viewer Example</h1>

			<div style={{
				border: '1px solid #ccc',
				borderRadius: '8px',
				overflow: 'hidden',
				boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
			}}>
				<PDFViewer
					file="/sample.pdf"
					width="100%"
					height="600px"
					onLoadSuccess={handleLoadSuccess}
					onLoadError={handleLoadError}
					initialZoom={1.0}
					scrollMode="page"
				/>
			</div>

			<div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
				<p><strong>Setup Instructions:</strong></p>
				<ol>
					<li>Copy the PDF worker file: <code>cp node_modules/@vvelediaz/react-pdf-viewer/public/pdf.worker.min.js public/</code></li>
					<li>Or use <code>setupPDFJS()</code> for automatic CDN fallback</li>
					<li>Import required CSS files as shown above</li>
					<li>Place your PDF file in the public directory</li>
				</ol>
			</div>
		</div>
	)
} 