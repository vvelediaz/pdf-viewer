import React, { useState } from 'react'
import {
	IonApp,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonItem,
	IonLabel,
	IonSelect,
	IonSelectOption,
	IonButton,
	IonInput,
	IonGrid,
	IonRow,
	IonCol,
	IonChip,
	IonIcon,
	IonToast,
	IonAccordion,
	IonAccordionGroup,
	IonList,
	IonMenu,
	IonMenuButton,
	IonButtons,
	IonSplitPane,
	IonFooter,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonText,
	IonBadge
} from '@ionic/react'
import {
	documentOutline,
	cloudUploadOutline,
	folderOutline,
	documentTextOutline,
	peopleOutline,
	settingsOutline,
	statsChartOutline,
	timeOutline,
	downloadOutline,
	shareOutline,
	starOutline
} from 'ionicons/icons'
import PDFViewer from './components/PDFViewer'
import ErrorBoundary from './components/ErrorBoundary'

const App: React.FC = () => {
	// Sample PDF documents for a document management system
	const documentCategories = {
		contracts: [
			{ name: 'Service Agreement 2024', url: '/sample.pdf', size: '1.2 MB', date: '2024-01-15' },
			{ name: 'NDA Template', url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf', size: '845 KB', date: '2024-01-10' }
		],
		reports: [
			{ name: 'Quarterly Report Q1', url: '/sample.pdf', size: '2.1 MB', date: '2024-03-31' },
			{ name: 'Financial Analysis', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '1.8 MB', date: '2024-03-15' }
		],
		manuals: [
			{ name: 'User Manual v2.1', url: '/sample.pdf', size: '3.2 MB', date: '2024-02-20' },
			{ name: 'Installation Guide', url: '/sample.pdf', size: '1.5 MB', date: '2024-02-15' }
		],
		policies: [
			{ name: 'Data Privacy Policy', url: '/sample.pdf', size: '890 KB', date: '2024-01-20' },
			{ name: 'Security Guidelines', url: '/sample.pdf', size: '1.1 MB', date: '2024-01-18' }
		]
	}

	const [selectedPDF, setSelectedPDF] = useState<string | File>(documentCategories.contracts[0].url)
	const [selectedDocument, setSelectedDocument] = useState(documentCategories.contracts[0])
	const [currentPage, setCurrentPage] = useState(1)
	const [currentZoom, setCurrentZoom] = useState(1.0)
	const [fileInputKey, setFileInputKey] = useState(0)
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
		setToastMessage(`Document loaded successfully (${pdf.numPages} pages)`)
		setShowToast(true)
	}

	const handleLoadError = (error: Error) => {
		console.error('PDF load error:', error)
		setToastMessage('Failed to load document')
		setShowToast(true)
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
			setToastMessage(`File "${file.name}" uploaded`)
			setShowToast(true)
		} else {
			setToastMessage('Please select a valid PDF file')
			setShowToast(true)
		}
	}

	const selectDocument = (doc: any) => {
		setSelectedPDF(doc.url)
		setSelectedDocument(doc)
		setCurrentPage(1)
		setToastMessage(`Loading: ${doc.name}`)
		setShowToast(true)
	}

	const triggerFileInput = () => {
		const input = document.getElementById('pdf-upload') as HTMLInputElement
		input?.click()
	}

	const menuContent = (
		<IonContent>
			<IonList>
				<IonItem lines="full">
					<IonIcon icon={cloudUploadOutline} slot="start" color="primary" />
					<IonLabel>
						<IonButton fill="clear" onClick={triggerFileInput} expand="block">
							Upload New Document
						</IonButton>
					</IonLabel>
					<input
						key={fileInputKey}
						id="pdf-upload"
						type="file"
						accept=".pdf,application/pdf"
						onChange={handleFileUpload}
						style={{ display: 'none' }}
					/>
				</IonItem>
			</IonList>

			<IonAccordionGroup>
				<IonAccordion value="contracts">
					<IonItem slot="header" color="light">
						<IonIcon icon={documentTextOutline} slot="start" />
						<IonLabel>Contracts</IonLabel>
						<IonBadge color="primary">{documentCategories.contracts.length}</IonBadge>
					</IonItem>
					<div className="ion-padding" slot="content">
						{documentCategories.contracts.map((doc, index) => (
							<IonItem
								key={index}
								button
								onClick={() => selectDocument(doc)}
								className={selectedDocument.name === doc.name ? 'selected-document' : ''}
							>
								<IonIcon icon={documentOutline} slot="start" size="small" />
								<IonLabel>
									<h3>{doc.name}</h3>
									<p>{doc.size} • {doc.date}</p>
								</IonLabel>
							</IonItem>
						))}
					</div>
				</IonAccordion>

				<IonAccordion value="reports">
					<IonItem slot="header" color="light">
						<IonIcon icon={statsChartOutline} slot="start" />
						<IonLabel>Reports</IonLabel>
						<IonBadge color="secondary">{documentCategories.reports.length}</IonBadge>
					</IonItem>
					<div className="ion-padding" slot="content">
						{documentCategories.reports.map((doc, index) => (
							<IonItem
								key={index}
								button
								onClick={() => selectDocument(doc)}
								className={selectedDocument.name === doc.name ? 'selected-document' : ''}
							>
								<IonIcon icon={documentOutline} slot="start" size="small" />
								<IonLabel>
									<h3>{doc.name}</h3>
									<p>{doc.size} • {doc.date}</p>
								</IonLabel>
							</IonItem>
						))}
					</div>
				</IonAccordion>

				<IonAccordion value="manuals">
					<IonItem slot="header" color="light">
						<IonIcon icon={folderOutline} slot="start" />
						<IonLabel>Manuals</IonLabel>
						<IonBadge color="tertiary">{documentCategories.manuals.length}</IonBadge>
					</IonItem>
					<div className="ion-padding" slot="content">
						{documentCategories.manuals.map((doc, index) => (
							<IonItem
								key={index}
								button
								onClick={() => selectDocument(doc)}
								className={selectedDocument.name === doc.name ? 'selected-document' : ''}
							>
								<IonIcon icon={documentOutline} slot="start" size="small" />
								<IonLabel>
									<h3>{doc.name}</h3>
									<p>{doc.size} • {doc.date}</p>
								</IonLabel>
							</IonItem>
						))}
					</div>
				</IonAccordion>

				<IonAccordion value="policies">
					<IonItem slot="header" color="light">
						<IonIcon icon={settingsOutline} slot="start" />
						<IonLabel>Policies</IonLabel>
						<IonBadge color="warning">{documentCategories.policies.length}</IonBadge>
					</IonItem>
					<div className="ion-padding" slot="content">
						{documentCategories.policies.map((doc, index) => (
							<IonItem
								key={index}
								button
								onClick={() => selectDocument(doc)}
								className={selectedDocument.name === doc.name ? 'selected-document' : ''}
							>
								<IonIcon icon={documentOutline} slot="start" size="small" />
								<IonLabel>
									<h3>{doc.name}</h3>
									<p>{doc.size} • {doc.date}</p>
								</IonLabel>
							</IonItem>
						))}
					</div>
				</IonAccordion>
			</IonAccordionGroup>

			<IonList>
				<IonItem button>
					<IonIcon icon={peopleOutline} slot="start" />
					<IonLabel>Shared Documents</IonLabel>
				</IonItem>
				<IonItem button>
					<IonIcon icon={starOutline} slot="start" />
					<IonLabel>Favorites</IonLabel>
				</IonItem>
				<IonItem button>
					<IonIcon icon={timeOutline} slot="start" />
					<IonLabel>Recent</IonLabel>
				</IonItem>
			</IonList>
		</IonContent>
	)

	return (
		<IonApp>
			<IonSplitPane contentId="main" when="lg">
				<IonMenu contentId="main" type="overlay">
					<IonHeader>
						<IonToolbar color="light">
							<IonTitle>Document Library</IonTitle>
						</IonToolbar>
					</IonHeader>
					{menuContent}
				</IonMenu>

				<IonPage id="main">
					<IonHeader>
						<IonToolbar>
							<IonButtons slot="start">
								<IonMenuButton />
							</IonButtons>
							<IonTitle>DocuFlow - Document Management System</IonTitle>
							<IonButtons slot="end">
								<IonButton fill="clear">
									<IonIcon icon={shareOutline} />
								</IonButton>
								<IonButton fill="clear">
									<IonIcon icon={downloadOutline} />
								</IonButton>
							</IonButtons>
						</IonToolbar>
					</IonHeader>

					<IonContent fullscreen>
						<IonGrid>
							<IonRow>
								{/* Document info section */}
								<IonCol size="12">
									<IonCard>
										<IonCardHeader>
											<IonCardTitle>{selectedDocument.name}</IonCardTitle>
										</IonCardHeader>
										<IonCardContent>
											<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
												<IonChip color="primary">
													<IonIcon icon={documentOutline} />
													<IonLabel>Page: {currentPage}</IonLabel>
												</IonChip>
												<IonChip color="secondary">
													<IonLabel>Zoom: {Math.round(currentZoom * 100)}%</IonLabel>
												</IonChip>
												<IonChip color="tertiary">
													<IonLabel>Size: {selectedDocument.size}</IonLabel>
												</IonChip>
												<IonChip color="medium">
													<IonIcon icon={timeOutline} />
													<IonLabel>Modified: {selectedDocument.date}</IonLabel>
												</IonChip>
											</div>
										</IonCardContent>
									</IonCard>
								</IonCol>

								{/* PDF Viewer Section */}
								<IonCol size="12" sizeLg="8">
									<div style={{ height: '70vh', minHeight: '500px' }}>
										<ErrorBoundary>
											<PDFViewer
												key={typeof selectedPDF === 'string' ? selectedPDF : selectedPDF.name + selectedPDF.size}
												file={selectedPDF}
												width="100%"
												height="100%"
												onPageChange={handlePageChange}
												onZoomChange={handleZoomChange}
												onLoadSuccess={handleLoadSuccess}
												onLoadError={handleLoadError}
												initialPage={1}
												initialZoom={1.0}
												scrollMode="page"
											/>
										</ErrorBoundary>
									</div>
								</IonCol>

								{/* Right sidebar for larger screens */}
								<IonCol size="12" sizeLg="4" className="ion-hide-lg-down">
									<IonCard>
										<IonCardHeader>
											<IonCardTitle>Quick Actions</IonCardTitle>
										</IonCardHeader>
										<IonCardContent>
											<IonList>
												<IonItem button>
													<IonIcon icon={downloadOutline} slot="start" />
													<IonLabel>Download PDF</IonLabel>
												</IonItem>
												<IonItem button>
													<IonIcon icon={shareOutline} slot="start" />
													<IonLabel>Share Document</IonLabel>
												</IonItem>
												<IonItem button>
													<IonIcon icon={starOutline} slot="start" />
													<IonLabel>Add to Favorites</IonLabel>
												</IonItem>
											</IonList>
										</IonCardContent>
									</IonCard>

									<IonCard>
										<IonCardHeader>
											<IonCardTitle>Document Info</IonCardTitle>
										</IonCardHeader>
										<IonCardContent>
											<IonItem lines="none">
												<IonLabel>
													<h3>Created</h3>
													<p>{selectedDocument.date}</p>
												</IonLabel>
											</IonItem>
											<IonItem lines="none">
												<IonLabel>
													<h3>File Size</h3>
													<p>{selectedDocument.size}</p>
												</IonLabel>
											</IonItem>
											<IonItem lines="none">
												<IonLabel>
													<h3>Owner</h3>
													<p>John Smith</p>
												</IonLabel>
											</IonItem>
											<IonItem lines="none">
												<IonLabel>
													<h3>Department</h3>
													<p>Legal & Compliance</p>
												</IonLabel>
											</IonItem>
										</IonCardContent>
									</IonCard>
								</IonCol>
							</IonRow>
						</IonGrid>
					</IonContent>

					{/* Footer with company info */}
					<IonFooter>
						<IonToolbar>
							<IonGrid>
								<IonRow>
									<IonCol size="12" sizeMd="4">
										<IonText>
											<h6>DocuFlow Enterprise</h6>
											<p>© 2024 TechCorp Solutions. All rights reserved.</p>
										</IonText>
									</IonCol>
									<IonCol size="12" sizeMd="4">
										<IonText>
											<p>
												<strong>Support:</strong> support@techcorp.com<br />
												<strong>Phone:</strong> +1 (555) 123-4567
											</p>
										</IonText>
									</IonCol>
									<IonCol size="12" sizeMd="4">
										<IonText>
											<p>
												<a href="#privacy">Privacy Policy</a> |
												<a href="#terms"> Terms of Service</a> |
												<a href="#help"> Help Center</a>
											</p>
										</IonText>
									</IonCol>
								</IonRow>
							</IonGrid>
						</IonToolbar>
					</IonFooter>

					<IonToast
						isOpen={showToast}
						onDidDismiss={() => setShowToast(false)}
						message={toastMessage}
						duration={3000}
						position="bottom"
					/>
				</IonPage>
			</IonSplitPane>
		</IonApp>
	)
}

export default App 