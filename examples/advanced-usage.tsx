import React, { useState } from 'react'
import { PDFViewer } from '@vvelediaz/ionic-pdf-viewer'
import type { PDFDocumentProxy } from '@vvelediaz/ionic-pdf-viewer/types'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
// Note: Copy PDFViewer.css from the GitHub repo to your project
import {
	IonApp,
	IonContent,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButton,
	IonInput,
	IonAlert,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonItem,
	IonLabel,
	IonRange,
	IonText
} from '@ionic/react'

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

	return (
		<IonApp>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Advanced PDF Viewer Example</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent className="ion-padding">
				<IonCard>
					<IonCardHeader>
						<IonCardTitle>PDF Controls</IonCardTitle>
					</IonCardHeader>
					<IonCardContent>
						<IonItem>
							<IonLabel>Upload PDF File:</IonLabel>
							<input
								type="file"
								accept=".pdf"
								onChange={handleFileUpload}
								style={{ marginLeft: '10px' }}
							/>
						</IonItem>

						<IonItem>
							<IonButton
								expand="block"
								fill="outline"
								onClick={loadSamplePDF}
							>
								Load Sample PDF
							</IonButton>
						</IonItem>

						{totalPages > 0 && (
							<>
								<IonItem>
									<IonLabel>Page {currentPage} of {totalPages}</IonLabel>
								</IonItem>

								<IonItem>
									<IonLabel>Zoom: {Math.round(zoom * 100)}%</IonLabel>
									<IonRange
										min={0.5}
										max={3.0}
										step={0.1}
										value={zoom}
										onIonInput={(e) => setZoom(e.detail.value as number)}
									/>
								</IonItem>

								<IonItem>
									<IonLabel>View Mode:</IonLabel>
									<IonButton
										fill="outline"
										size="small"
										onClick={toggleScrollMode}
									>
										{scrollMode === 'page' ? 'Single Page' : 'Continuous'}
									</IonButton>
								</IonItem>
							</>
						)}
					</IonCardContent>
				</IonCard>

				{isLoading && (
					<IonCard>
						<IonCardContent>
							<IonText>Loading PDF...</IonText>
						</IonCardContent>
					</IonCard>
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

				<IonAlert
					isOpen={!!error}
					onDidDismiss={() => setError(null)}
					header="Error"
					message={error || ''}
					buttons={['OK']}
				/>
			</IonContent>
		</IonApp>
	)
} 