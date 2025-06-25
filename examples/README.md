# PDF Viewer Examples

This directory contains examples demonstrating how to use the `@vvelediaz/react-pdf-viewer` component with the **production build**.

## 🚀 Running the Examples

### Method 1: Using Bun Server (Recommended)

```bash
# Start the examples server
bun examples/server.ts

# Open in browser
open http://localhost:3001
```

### Method 2: Using Any Static Server

```bash
# Build the production version first
bun run build:lib

# Serve with any static server (Python example)
python -m http.server 8000

# Then navigate to the HTML files
```

## 📄 Available Examples

### Basic Example (`/basic`)
- Simple PDF viewer implementation
- Demonstrates basic setup with `setupPDFJS()`
- Shows automatic worker configuration
- Uses production build from `/dist/`
- **Fixed**: React jsx-runtime import issues

### Advanced Example (`/advanced`)
- File upload functionality
- Error handling and loading states
- Custom zoom and page controls
- Comprehensive status display
- Production build integration
- **Fixed**: React jsx-runtime import issues

### ✨ Simple Example (`/simple`) - **Recommended**
- **No module resolution issues!**
- Uses UMD React builds instead of ES modules
- Standalone HTML file approach
- Perfect for testing and debugging
- Most compatible across browsers

## 🔧 React jsx-runtime Fix

The original error `Failed to resolve module specifier "react/jsx-runtime"` has been fixed using multiple approaches:

### Approach 1: Dynamic Imports with Global React
```javascript
// Import React dynamically and set global
const React = await import('https://esm.sh/react@18.2.0')
window.React = React.default

// Import production build
const { PDFViewer, setupPDFJS } = await import('/dist/react-pdf-viewer.es.js')
```

### Approach 2: UMD React Builds (Simple Example)
```html
<!-- Load React as UMD (global) -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<script type="module">
  // Import production build as ES module
  const { PDFViewer, setupPDFJS } = await import('/dist/react-pdf-viewer.es.js')
  
  // Use React from global scope
  const { createElement: h } = React
</script>
```

## 🔧 What These Examples Test

### ✅ Production Build Integration
- Uses compiled JavaScript from `/dist/react-pdf-viewer.es.js`
- Tests proper module exports and imports
- Verifies TypeScript declarations work correctly

### ✅ Worker File Handling
- Tests automatic PDF.js worker setup
- Verifies worker file is served correctly
- Tests CDN fallback functionality

### ✅ CSS Integration
- Uses production CSS from `/dist/PDFViewer.css`
- Tests Aqua interface styling
- Verifies responsive design

### ✅ Real-World Usage
- File upload and validation
- Error handling scenarios
- Performance with different PDF sizes
- Cross-browser compatibility

### ✅ Module Resolution Fixes
- No more `react/jsx-runtime` errors
- Compatible with different bundler setups
- Works in standalone HTML files

## 🌐 Server Features

The Bun server (`server.ts`) provides:

- **Static file serving** for production build files
- **PDF worker routing** at `/pdf.worker.min.js`
- **Sample PDF serving** for testing
- **Proper MIME types** for all assets
- **CORS-friendly headers** for development

## 📋 Testing Checklist

When running these examples, verify:

- [ ] PDF loads without console errors
- [ ] Worker file loads successfully (check Network tab)
- [ ] No "react/jsx-runtime" errors in console
- [ ] Zoom controls work smoothly
- [ ] Page navigation functions correctly
- [ ] File upload validates properly
- [ ] Error states display correctly
- [ ] Aqua interface styling appears correctly
- [ ] No React externalization warnings

## 🔗 URLs

- **Index**: http://localhost:3001/
- **Basic Example**: http://localhost:3001/basic
- **Advanced Example**: http://localhost:3001/advanced
- **✨ Simple Example (UMD)**: http://localhost:3001/simple ← **Most Compatible**

## 💡 Usage in Your Project

After testing these examples, you can use the component in your project:

```bash
# Install the package
bun add @vvelediaz/react-pdf-viewer

# Copy worker file (recommended)
cp node_modules/@vvelediaz/react-pdf-viewer/public/pdf.worker.min.js public/

# Or use automatic setup
import { setupPDFJS } from '@vvelediaz/react-pdf-viewer'
setupPDFJS()
```

### For Projects with Module Resolution Issues

If you encounter `react/jsx-runtime` errors in your project, use the UMD approach:

```html
<!-- Load React as UMD -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<script type="module">
  const { PDFViewer, setupPDFJS } = await import('@vvelediaz/react-pdf-viewer')
  setupPDFJS()
  
  // Use React.createElement from global React
  const { createElement: h } = React
</script>
```

These examples prove that the production build works correctly and can be safely published to npm! 🎉 