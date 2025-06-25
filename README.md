# @vvelediaz/react-pdf-viewer

A modern, feature-rich React PDF viewer component with a classic Mac OS X Aqua interface. Perfect for desktop and web applications requiring elegant PDF display capabilities with zero configuration hassles.

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
- 🚫 **Zero CORS Issues** - Local worker files eliminate cross-origin problems
- 🔄 **Auto-Configuration** - Automatic PDF.js worker setup with version matching

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

// Required CSS imports
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
// Copy PDFViewer.css from the GitHub repo to your project

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

## 🛠️ Setup & Configuration

### Automatic PDF.js Configuration

The component automatically handles PDF.js worker setup with **zero configuration required**:

- ✅ **Auto-detects** correct worker version
- ✅ **Eliminates CORS issues** with local worker files
- ✅ **Matches API versions** automatically
- ✅ **No manual setup** needed

### Manual Configuration (Optional)

If you need custom worker configuration:

```tsx
import { setupPDFJS } from '@vvelediaz/react-pdf-viewer'

// Call once in your app's entry point
setupPDFJS()
```

### Bundler Configuration

#### Vite (Recommended)
Add to your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-pdf', 'pdfjs-dist'],
  },
  // ⚠️ Don't externalize React in development
  // Only externalize for library builds
})
```

**Common Vite Issues**:
- ❌ **Don't externalize React** in your main vite.config.ts
- ✅ **Do include react-pdf** in optimizeDeps
- ✅ **Install peer dependencies** (React 18+)

#### Next.js
Add to your `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-pdf'],
  webpack: (config) => {
    config.resolve.alias.canvas = false
    return config
  },
}

module.exports = nextConfig
```

#### Webpack
```javascript
module.exports = {
  resolve: {
    alias: {
      canvas: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
}
```

## 🔧 Troubleshooting

### Common Issues & Solutions

#### ✅ "No CORS Errors" 
**Fixed**: Component uses local worker files automatically.

#### ✅ "No Version Mismatches"
**Fixed**: Automatic version matching between react-pdf and PDF.js worker.

#### ✅ "No Configuration Required"
**Fixed**: Zero-config setup works out of the box.

#### PDF Not Loading
**Solutions**:
1. Check file path/URL is correct
2. Verify file is a valid PDF
3. Check browser console for specific errors
4. Ensure required CSS files are imported

#### Memory Issues with Large PDFs
**Solutions**:
- Use `scrollMode="page"` for very large documents
- Implement lazy loading for multiple PDFs
- Consider using lower `initialZoom` values

#### React Import Errors ("useState is not a function")
**Solutions**:
1. **Check Vite Configuration**: Remove React externalization from dev config:
   ```typescript
   // vite.config.ts - Remove this section for development
   build: {
     rollupOptions: {
       external: ['react', 'react-dom'], // ❌ Don't externalize in dev
     },
   }
   ```

2. **Install Peer Dependencies**: Ensure React is properly installed:
   ```bash
   npm install react@^18.0.0 react-dom@^18.0.0
   # or
   bun add react@^18.0.0 react-dom@^18.0.0
   ```

3. **Proper Vite Config**: Use this configuration:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     optimizeDeps: {
       include: ['react-pdf', 'pdfjs-dist'],
     },
   })
   ```

#### Module Externalization Warnings
**Solutions**:
- These warnings are normal in development and don't affect functionality
- For production builds, externalization is handled automatically
- Add to `optimizeDeps.include` in vite.config.ts if needed

#### TypeScript Errors
**Solutions**:
- Ensure `@types/react` and `@types/react-dom` are installed
- Import types: `import type { PDFViewerProps } from '@vvelediaz/react-pdf-viewer/types'`

### Browser Compatibility

Works in all modern browsers that support:
- ✅ ES2018+ features
- ✅ Web Workers
- ✅ ArrayBuffer and Blob APIs
- ✅ CSS Grid and Flexbox

**Tested Browsers**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

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

### Utility Functions

```tsx
import { setupPDFJS } from '@vvelediaz/react-pdf-viewer'

// Configure PDF.js worker (call once in your app)
setupPDFJS()
```

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

### File Upload with Validation

```tsx
import React, { useState } from 'react'
import { PDFViewer } from '@vvelediaz/react-pdf-viewer'

function PDFUploader() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    
    if (!file) return
    
    // Validate file type
    if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a valid PDF file')
      return
    }
    
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }
    
    setError(null)
    setPdfFile(file)
  }

  return (
    <div>
      <input 
        type="file" 
        accept=".pdf,application/pdf"
        onChange={handleFileChange}
      />
      
      {error && <div className="error">{error}</div>}
      
      {pdfFile && (
        <PDFViewer 
          file={pdfFile}
          height="500px"
          scrollMode="continuous"
          onLoadError={(err) => setError(err.message)}
        />
      )}
    </div>
  )
}
```

### Custom Error Handling & Loading States

```tsx
import React, { useState } from 'react'
import { PDFViewer } from '@vvelediaz/react-pdf-viewer'

function PDFWithStates() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pageCount, setPageCount] = useState(0)

  const handleLoadSuccess = (pdf) => {
    setPageCount(pdf.numPages)
    setLoading(false)
    setError(null)
  }

  const handleLoadError = (err: Error) => {
    setError(`Failed to load PDF: ${err.message}`)
    setLoading(false)
  }

  return (
    <div>
      {loading && <div className="loading">Loading PDF...</div>}
      
      {error && (
        <div className="error">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={() => {
            setError(null)
            setLoading(true)
          }}>
            Retry
          </button>
        </div>
      )}
      
      {!loading && !error && (
        <div className="pdf-info">
          Document loaded successfully ({pageCount} pages)
        </div>
      )}
      
      <PDFViewer 
        file="/path/to/document.pdf"
        onLoadSuccess={handleLoadSuccess}
        onLoadError={handleLoadError}
      />
    </div>
  )
}
```

## 🎨 Styling

### Classic Mac OS X Aqua Interface

The component features an authentic classic Mac OS X Aqua design:

- **🖥️ Brushed Metal Toolbars** - Authentic metal texture with subtle striped patterns
- **🔵 Classic Aqua Buttons** - Proper gradients, shadows, and hover effects  
- **📜 Blue Aqua Scrollbars** - Traditional Mac scrollbar styling
- **📝 Lucida Grande Typography** - System font matching the classic Mac experience

### Required CSS Imports

```tsx
// Essential react-pdf styles
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Component styles (copy from GitHub repo)
import './PDFViewer.css'
```

### Custom Styling

```css
/* Override default styles */
.pdf-viewer {
  --aqua-blue: #007AFF;
  --metal-bg: linear-gradient(to bottom, #E8E8E8, #D0D0D0);
  --button-gradient: linear-gradient(to bottom, #F8F8F8, #E0E0E0);
}

/* Custom scrollbar colors */
.pdf-content::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #FF6B6B, #FF5252) !important;
}
```

### Multiple PDF Viewer with Tabs

```tsx
import React, { useState } from 'react'
import { PDFViewer } from '@vvelediaz/react-pdf-viewer'

function MultiPDFViewer() {
  const documents = [
    { id: 1, name: 'Document 1', url: '/doc1.pdf' },
    { id: 2, name: 'Document 2', url: '/doc2.pdf' },
    { id: 3, name: 'Document 3', url: '/doc3.pdf' },
  ]
  
  const [activeDoc, setActiveDoc] = useState(documents[0])

  return (
    <div>
      <div className="tabs">
        {documents.map(doc => (
          <button
            key={doc.id}
            className={activeDoc.id === doc.id ? 'active' : ''}
            onClick={() => setActiveDoc(doc)}
          >
            {doc.name}
          </button>
        ))}
      </div>
      
      <PDFViewer 
        key={activeDoc.id} // Force re-render when switching docs
        file={activeDoc.url}
        height="600px"
        scrollMode="page"
      />
    </div>
  )
}
```

## 📱 Platform Support

- **✅ Web Browsers** - Chrome, Firefox, Safari, Edge (latest versions)
- **✅ Desktop Apps** - Electron, Tauri, and other desktop frameworks
- **✅ Mobile Web** - iOS Safari, Android Chrome (responsive design)
- **✅ PWA** - Progressive Web Applications
- **✅ Server-Side** - Next.js, Remix (with proper configuration)

## 🔧 Requirements

- **React** 18+ or 19+
- **Modern Browser** with PDF.js support
- **No additional UI frameworks** required
- **TypeScript** 5+ (optional but recommended)

## 📈 Performance Tips

1. **Use `scrollMode="page"`** for large documents (>50 pages)
2. **Implement lazy loading** when displaying multiple PDFs
3. **Set appropriate `initialZoom`** based on your use case
4. **Use `React.memo`** for wrapper components to avoid unnecessary re-renders
5. **Preload critical PDFs** using `<link rel="preload">` in your HTML

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/react-pdf-viewer.git

# Install dependencies
bun install

# Start development server (auto-copies worker files)
bun run dev

# Run type checking
bun run type-check

# Build for production
bun run build
```

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **[JSR Package](https://jsr.io/@vvelediaz/react-pdf-viewer)** - Official package registry
- **[GitHub Repository](https://github.com/yourusername/react-pdf-viewer)** - Source code and issues
- **[React PDF](https://github.com/wojtekmaj/react-pdf)** - Underlying PDF rendering library
- **[PDF.js](https://mozilla.github.io/pdf.js/)** - Mozilla's PDF rendering engine

## 🎯 Roadmap

- [ ] **Dark mode support** for Aqua interface
- [ ] **Annotation tools** (highlight, comments)
- [ ] **Search functionality** within PDFs
- [ ] **Thumbnail navigation** sidebar
- [ ] **Print support** with custom styling
- [ ] **Accessibility improvements** (ARIA labels, keyboard navigation)
- [ ] **Mobile gestures** (pinch to zoom, swipe navigation)
