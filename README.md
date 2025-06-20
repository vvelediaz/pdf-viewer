# @vvelediaz/ionic-pdf-viewer

A modern, feature-rich React PDF viewer component built with Ionic Framework. Perfect for mobile and desktop applications requiring PDF display capabilities.

[![JSR](https://jsr.io/badges/@vvelediaz/ionic-pdf-viewer)](https://jsr.io/@vvelediaz/ionic-pdf-viewer)

## ✨ Features

- 📄 **Universal PDF Support** - Display PDFs from URLs, File objects, or ArrayBuffers
- 🔍 **Advanced Zoom Controls** - Zoom from 50% to 300% with smooth scaling
- 📱 **Responsive Design** - Optimized for mobile and desktop with Ionic Framework
- ⬅️➡️ **Page Navigation** - Intuitive page controls with jump-to-page functionality
- 📜 **Multiple View Modes** - Single page or continuous scroll viewing
- ⚡ **High Performance** - Efficient rendering with react-pdf
- 🎨 **Modern UI** - Clean, accessible interface with Ionic design system
- 🔧 **TypeScript Support** - Fully typed for better development experience
- 🌐 **Cross Platform** - Works on iOS, Android, and web platforms

## 📦 Installation

### Using JSR (Recommended)

```bash
# Deno
deno add @vvelediaz/ionic-pdf-viewer

# npm
npx jsr add @vvelediaz/ionic-pdf-viewer

# Yarn
yarn dlx jsr add @vvelediaz/ionic-pdf-viewer

# pnpm
pnpm dlx jsr add @vvelediaz/ionic-pdf-viewer

# Bun
bunx jsr add @vvelediaz/ionic-pdf-viewer
```

### Using npm

```bash
npm install @vvelediaz/ionic-pdf-viewer
```

## 🚀 Quick Start

```tsx
import React from 'react'
import { PDFViewer } from '@vvelediaz/ionic-pdf-viewer'

// Import required CSS files
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
// Note: You'll need to manually copy the component CSS from the GitHub repo

function MyApp() {
  const handleLoadSuccess = (pdf) => {
    console.log('PDF loaded with', pdf.numPages, 'pages')
  }

  const handlePageChange = (pageNumber) => {
    console.log('Current page:', pageNumber)
  }

  return (
    <PDFViewer 
      file="/path/to/document.pdf"
      width="100%"
      height="600px"
      onLoadSuccess={handleLoadSuccess}
      onPageChange={handlePageChange}
      scrollMode="continuous"
      initialZoom={1.2}
    />
  )
}
```

## 📚 API Reference

### PDFViewer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `file` | `string \| File \| ArrayBuffer` | **Required** | PDF source - URL, File object, or ArrayBuffer |
| `width` | `string \| number` | `'100%'` | Component width |
| `height` | `string \| number` | `'600px'` | Component height |
| `onLoadSuccess` | `(pdf: PDFDocumentProxy) => void` | - | Called when PDF loads successfully |
| `onLoadError` | `(error: Error) => void` | - | Called when PDF fails to load |
| `onPageChange` | `(pageNumber: number) => void` | - | Called when current page changes |
| `onZoomChange` | `(scale: number) => void` | - | Called when zoom level changes |
| `className` | `string` | `''` | Additional CSS classes |
| `initialPage` | `number` | `1` | Starting page number |
| `initialZoom` | `number` | `1.0` | Starting zoom level (0.5 - 3.0) |
| `scrollMode` | `'page' \| 'continuous'` | `'page'` | View mode for PDF display |

### Types

```tsx
import type { 
  PDFViewerProps, 
  PDFDocumentProxy, 
  PDFPageProxy,
  PDFLoadSuccess,
  PDFError 
} from '@vvelediaz/ionic-pdf-viewer/types'
```

## 🛠️ Advanced Usage

### File Upload Integration

```tsx
import React, { useState } from 'react'
import { PDFViewer } from '@vvelediaz/ionic-pdf-viewer'
import { IonButton, IonInput } from '@ionic/react'

function PDFUploader() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setPdfFile(file)
    }
  }

  return (
    <>
      <IonInput 
        type="file" 
        accept=".pdf"
        onIonChange={handleFileChange}
      />
      {pdfFile && (
        <PDFViewer 
          file={pdfFile}
          height="500px"
          scrollMode="continuous"
        />
      )}
    </>
  )
}
```

### Custom Error Handling

```tsx
import React, { useState } from 'react'
import { PDFViewer } from '@vvelediaz/ionic-pdf-viewer'
import { IonAlert } from '@ionic/react'

function PDFWithErrorHandling() {
  const [error, setError] = useState<string | null>(null)

  const handleError = (err: Error) => {
    setError(`Failed to load PDF: ${err.message}`)
  }

  return (
    <>
      <PDFViewer 
        file="/path/to/document.pdf"
        onLoadError={handleError}
      />
      <IonAlert
        isOpen={!!error}
        onDidDismiss={() => setError(null)}
        header="Error"
        message={error}
        buttons={['OK']}
      />
    </>
  )
}
```

## 🎨 Styling

The component comes with built-in Ionic styling. Import the required CSS files:

```tsx
// Required react-pdf styles for proper PDF rendering
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
```

**Note**: Since JSR doesn't support CSS modules, you'll need to copy the component styles manually. You can find the CSS file in the [GitHub repository](https://github.com/yourusername/ionic-pdf-viewer/blob/main/src/components/PDFViewer.css) and include it in your project.

You can override styles using CSS custom properties or by providing a custom `className`.

## 📱 Platform Support

- **iOS** - Native app or PWA
- **Android** - Native app or PWA  
- **Web** - All modern browsers
- **Desktop** - Electron apps

## 🔧 Requirements

- React 18+
- Ionic React 8+
- Modern browser with PDF.js support

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [JSR Package](https://jsr.io/@vvelediaz/ionic-pdf-viewer)
- [GitHub Repository](https://github.com/yourusername/ionic-pdf-viewer)
- [Ionic Framework](https://ionicframework.com/)
- [React PDF](https://github.com/wojtekmaj/react-pdf)
