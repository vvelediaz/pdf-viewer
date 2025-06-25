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
		console.log('PDF loaded successfully with', pdf.numPages, 'pages')
	}

	const handlePageChange = (pageNumber: number) => {
		console.log('Current page:', pageNumber)
	}

	const handleZoomChange = (scale: number) => {
		console.log('Zoom level:', scale)
	}

	return (
		<div style={{ height: '100vh', padding: '20px' }}>
			<h1>Basic PDF Viewer Example</h1>

			<PDFViewer
				file="/sample.pdf"
				width="100%"
				height="600px"
				onLoadSuccess={handleLoadSuccess}
				onPageChange={handlePageChange}
				onZoomChange={handleZoomChange}
				initialZoom={1.0}
				scrollMode="page"
			/>
		</div>
	)
} 