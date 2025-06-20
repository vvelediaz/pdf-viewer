import React from 'react'
import ReactDOM from 'react-dom/client'
import { setupIonicReact, isPlatform } from '@ionic/react'
import App from './App'

// Core CSS required for Ionic components to work properly
import '@ionic/react/css/core.css'

// Basic CSS for apps built with Ionic
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

// Optional CSS utils that can be commented out
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

// Custom CSS
import './index.css'

// PDF Viewer CSS (for demo website)
import './components/PDFViewer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Initialize Ionic
setupIonicReact()

// Force iOS design for browser/desktop
if (isPlatform('desktop') || isPlatform('electron') || isPlatform('pwa')) {
	document.body.classList.add('ios')
	document.body.classList.add('plt-desktop')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
) 