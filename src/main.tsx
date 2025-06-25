import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Custom CSS
import './index.css'

// PDF Viewer CSS (for demo website)
import './components/PDFViewer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
) 