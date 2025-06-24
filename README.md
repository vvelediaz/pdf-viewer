# @vvelediaz/react-pdf-viewer

A modern, feature-rich React PDF viewer component with a classic Mac OS X Aqua interface. Perfect for desktop and web applications requiring elegant PDF display capabilities.

[![JSR](https://jsr.io/badges/@vvelediaz/react-pdf-viewer)](https://jsr.io/@vvelediaz/react-pdf-viewer)

## ✨ Features

- 📄 **Universal PDF Support** - Display PDFs from URLs, File objects, or ArrayBuffers
- 🔍 **Advanced Zoom Controls** - Zoom from 50% to 300% with smooth scaling
- 🖥️ **Classic Mac OS X Aqua Design** - Authentic Aqua interface with brushed metal toolbars
- ⬅️➡️ **Page Navigation** - Intuitive page controls with jump-to-page functionality
- 📜 **Multiple View Modes** - Single page or continuous scroll viewing
- ⚡ **High Performance** - Efficient rendering with react-pdf
- 🎨 **Beautiful UI** - Classic Mac interface with proper gradients, shadows, and typography
- 🔧 **TypeScript Support** - Fully typed for better development experience
- 🌐 **Cross Platform** - Works on all modern browsers and desktop applications
- ⚛️ **React 19 Ready** - Fully compatible with React 18 and 19
- 🎯 **Minimal Dependencies** - Only essential dependencies for maximum compatibility

## 📦 Installation

### Using JSR (Recommended)

```bash
# Deno
deno add @vvelediaz/react-pdf-viewer

# npm
npx jsr add @vvelediaz/react-pdf-viewer

# Yarn
yarn dlx jsr add @vvelediaz/react-pdf-viewer

# pnpm
pnpm dlx jsr add @vvelediaz/react-pdf-viewer

# Bun
bunx jsr add @vvelediaz/react-pdf-viewer
```

### Using npm

```bash
npm install @vvelediaz/react-pdf-viewer
```

## 🚀 Quick Start

```tsx
import React from 'react'
import { PDFViewer } from '@vvelediaz/react-pdf-viewer'

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
} from '@vvelediaz/react-pdf-viewer/types'
```

## 🛠️ Advanced Usage

### File Upload Integration

```tsx
import React, { useState } from 'react'
import { PDFViewer } from '@vvelediaz/react-pdf-viewer'

function PDFUploader() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      setPdfFile(file)
    }
  }

  return (
    <div>
      <input 
        type="file" 
        accept=".pdf"
        onChange={handleFileChange}
      />
      {pdfFile && (
        <PDFViewer 
          file={pdfFile}
          height="500px"
          scrollMode="continuous"
        />
      )}
    </div>
  )
}
```

### Custom Error Handling

```tsx
import React, { useState } from 'react'
import { PDFViewer } from '@vvelediaz/react-pdf-viewer'

function PDFWithErrorHandling() {
  const [error, setError] = useState<string | null>(null)

  const handleError = (err: Error) => {
    setError(`Failed to load PDF: ${err.message}`)
  }

  return (
    <div>
      <PDFViewer 
        file="/path/to/document.pdf"
        onLoadError={handleError}
      />
      {error && (
        <div className="error-message">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
    </div>
  )
}
```

## 🎨 Styling

The component features a beautiful classic Mac OS X Aqua interface with:

- **Brushed Metal Toolbars** - Authentic metal texture with subtle striped patterns
- **Classic Aqua Buttons** - Proper gradients, shadows, and hover effects
- **Blue Aqua Scrollbars** - Traditional Mac scrollbar styling
- **Lucida Grande Typography** - System font matching the classic Mac experience

Import the required CSS files:

```tsx
// Required react-pdf styles for proper PDF rendering
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
```

**Note**: Since JSR doesn't support CSS modules, you'll need to copy the component styles manually. You can find the CSS file in the [GitHub repository](https://github.com/yourusername/react-pdf-viewer/blob/main/src/components/PDFViewer.css) and include it in your project.

You can override styles using CSS custom properties or by providing a custom `className`.

## 📱 Platform Support

- **Web** - All modern browsers (Chrome, Firefox, Safari, Edge)
- **Desktop** - Electron apps, Tauri apps, and other desktop frameworks
- **PWA** - Progressive Web Applications

## 🔧 Requirements

- React 18+ or 19+
- Modern browser with PDF.js support
- No additional UI framework dependencies

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [JSR Package](https://jsr.io/@vvelediaz/react-pdf-viewer)
- [GitHub Repository](https://github.com/yourusername/react-pdf-viewer)
- [React PDF](https://github.com/wojtekmaj/react-pdf)
