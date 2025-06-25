/// <reference types="bun-types" />

import { serve } from "bun"
import { readFileSync } from "fs"
import { join } from "path"

const server = serve({
	port: 3001,
	async fetch(req: Request): Promise<Response> {
		const url = new URL(req.url)
		const pathname = url.pathname

		try {
			// Serve static files from public directory
			if (pathname.startsWith('/public/')) {
				const filePath = join(process.cwd(), pathname)
				const file = Bun.file(filePath)
				if (await file.exists()) {
					return new Response(file)
				}
			}

			// Serve PDF worker file
			if (pathname === '/pdf.worker.min.js') {
				const workerFile = Bun.file(join(process.cwd(), 'dist/pdf.worker.min.js'))
				if (await workerFile.exists()) {
					return new Response(workerFile, {
						headers: {
							'Content-Type': 'application/javascript',
							'Cache-Control': 'public, max-age=31536000'
						}
					})
				}
			}

			// Serve sample PDFs
			if (pathname === '/sample.pdf' || pathname === '/test.pdf') {
				const pdfFile = Bun.file(join(process.cwd(), 'public', pathname.slice(1)))
				if (await pdfFile.exists()) {
					return new Response(pdfFile, {
						headers: {
							'Content-Type': 'application/pdf'
						}
					})
				}
			}

			// Serve built component files
			if (pathname.startsWith('/dist/')) {
				const filePath = join(process.cwd(), pathname)
				const file = Bun.file(filePath)
				if (await file.exists()) {
					const contentType = pathname.endsWith('.js') ? 'application/javascript' :
						pathname.endsWith('.css') ? 'text/css' :
							pathname.endsWith('.d.ts') ? 'text/plain' :
								'application/octet-stream'
					return new Response(file, {
						headers: { 'Content-Type': contentType }
					})
				}
			}

			// Route handlers
			switch (pathname) {
				case '/':
					return new Response(indexHTML, {
						headers: { 'Content-Type': 'text/html' }
					})

				case '/basic':
					return new Response(basicExampleHTML, {
						headers: { 'Content-Type': 'text/html' }
					})

				case '/advanced':
					return new Response(advancedExampleHTML, {
						headers: { 'Content-Type': 'text/html' }
					})

				case '/simple':
					const simpleHTML = await Bun.file(join(process.cwd(), 'examples/simple-example.html')).text()
					return new Response(simpleHTML, {
						headers: { 'Content-Type': 'text/html' }
					})

				default:
					return new Response('Not Found', { status: 404 })
			}
		} catch (error) {
			console.error('Server error:', error)
			return new Response('Internal Server Error', { status: 500 })
		}
	},
	development: {
		hmr: false,
		console: true,
	}
})

console.log(`🚀 Examples server running at http://localhost:${server.port}`)
console.log(`📄 Basic Example: http://localhost:${server.port}/basic`)
console.log(`🔧 Advanced Example: http://localhost:${server.port}/advanced`)
console.log(`✨ Simple Example (UMD): http://localhost:${server.port}/simple`)

// HTML Templates
const indexHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PDF Viewer Examples</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      line-height: 1.6;
    }
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 24px;
      margin: 20px 0;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      background: #007AFF;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      margin: 8px 8px 8px 0;
      transition: background 0.2s;
    }
    .btn:hover {
      background: #0056CC;
    }
    .btn-secondary {
      background: #34C759;
    }
    .btn-secondary:hover {
      background: #28A745;
    }
    h1 { color: #333; }
    h2 { color: #666; margin-top: 0; }
    .status {
      background: #f0f8ff;
      border: 1px solid #007AFF;
      border-radius: 6px;
      padding: 16px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <h1>📄 React PDF Viewer Examples</h1>
  
  <div class="status">
    <strong>✅ Using Production Build</strong><br>
    These examples use the compiled production build from <code>/dist/</code> directory.
  </div>

  <div class="card">
    <h2>🚀 Basic Example</h2>
    <p>Simple PDF viewer with default settings and automatic worker setup.</p>
    <a href="/basic" class="btn">View Basic Example</a>
  </div>

  <div class="card">
    <h2>🔧 Advanced Example</h2>
    <p>Feature-rich PDF viewer with file upload, error handling, and custom controls.</p>
    <a href="/advanced" class="btn btn-secondary">View Advanced Example</a>
  </div>

  <div class="card">
    <h2>✨ Simple Example (UMD)</h2>
    <p>Standalone HTML example using UMD React builds - no module resolution issues!</p>
    <a href="/simple" class="btn" style="background: #34C759;">View Simple Example</a>
  </div>

  <div class="card">
    <h2>📋 Setup Instructions</h2>
    <p>To use this component in your project:</p>
    <pre style="background: #f5f5f5; padding: 15px; border-radius: 6px; overflow-x: auto;">
# Install the package
bun add @vvelediaz/react-pdf-viewer

# Copy worker file (recommended)
cp node_modules/@vvelediaz/react-pdf-viewer/public/pdf.worker.min.js public/

# Or use setupPDFJS() for automatic CDN fallback
import { setupPDFJS } from '@vvelediaz/react-pdf-viewer'
setupPDFJS()
    </pre>
  </div>
</body>
</html>
`

const basicExampleHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Basic PDF Viewer Example</title>
  <link rel="stylesheet" href="https://unpkg.com/react-pdf@9.1.1/dist/Page/AnnotationLayer.css">
  <link rel="stylesheet" href="https://unpkg.com/react-pdf@9.1.1/dist/Page/TextLayer.css">
  <link rel="stylesheet" href="/dist/PDFViewer.css">
  <style>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  
  <script type="module">
    // Import React and ReactDOM directly
    const React = await import('https://esm.sh/react@18.2.0')
    const ReactDOM = await import('https://esm.sh/react-dom@18.2.0/client')
    
    // Set up jsx-runtime for the production build
    window.React = React.default
    
    // Import the production build
    const { PDFViewer, setupPDFJS } = await import('/dist/react-pdf-viewer.es.js')
    
    // Setup PDF.js worker
    setupPDFJS()
    
    function BasicExample() {
      const handleLoadSuccess = (pdf) => {
        console.log('PDF loaded successfully:', pdf.numPages, 'pages')
      }
      
      const handleLoadError = (error) => {
        console.error('Failed to load PDF:', error.message)
      }
      
      return React.default.createElement('div', { style: { padding: '20px' } }, [
        React.default.createElement('h1', { key: 'title' }, 'Basic PDF Viewer Example'),
        React.default.createElement('p', { key: 'desc', style: { color: '#666', marginBottom: '20px' } }, 
          '✅ Using production build from /dist/ directory'),
        React.default.createElement('div', { 
          key: 'viewer',
          style: { 
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }
        }, [
          React.default.createElement(PDFViewer, {
            key: 'pdf',
            file: '/sample.pdf',
            width: '100%',
            height: '600px',
            onLoadSuccess: handleLoadSuccess,
            onLoadError: handleLoadError,
            initialZoom: 1.0,
            scrollMode: 'page'
          })
        ]),
        React.default.createElement('div', { 
          key: 'instructions',
          style: { marginTop: '20px', fontSize: '14px', color: '#666' } 
        }, [
          React.default.createElement('p', { key: 'title' }, React.default.createElement('strong', null, 'Setup Instructions:')),
          React.default.createElement('ol', { key: 'list' }, [
            React.default.createElement('li', { key: '1' }, 'Copy the PDF worker file: ', 
              React.default.createElement('code', null, 'cp node_modules/@vvelediaz/react-pdf-viewer/public/pdf.worker.min.js public/')),
            React.default.createElement('li', { key: '2' }, 'Or use ', 
              React.default.createElement('code', null, 'setupPDFJS()'), ' for automatic CDN fallback'),
            React.default.createElement('li', { key: '3' }, 'Import required CSS files as shown above'),
            React.default.createElement('li', { key: '4' }, 'Place your PDF file in the public directory')
          ])
        ]),
        React.default.createElement('div', { 
          key: 'back',
          style: { marginTop: '30px' } 
        }, [
          React.default.createElement('a', { 
            key: 'link',
            href: '/', 
            style: { 
              display: 'inline-block',
              padding: '10px 20px',
              background: '#007AFF',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px'
            }
          }, '← Back to Examples')
        ])
      ])
    }
    
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(React.default.createElement(BasicExample))
  </script>
</body>
</html>
`

const advancedExampleHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Advanced PDF Viewer Example</title>
  <link rel="stylesheet" href="https://unpkg.com/react-pdf@9.1.1/dist/Page/AnnotationLayer.css">
  <link rel="stylesheet" href="https://unpkg.com/react-pdf@9.1.1/dist/Page/TextLayer.css">
  <link rel="stylesheet" href="/dist/PDFViewer.css">
  <style>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  
  <script type="module">
    // Import React and ReactDOM directly
    const React = await import('https://esm.sh/react@18.2.0')
    const ReactDOM = await import('https://esm.sh/react-dom@18.2.0/client')
    
    // Set up jsx-runtime for the production build
    window.React = React.default
    
    // Import the production build
    const { PDFViewer, setupPDFJS } = await import('/dist/react-pdf-viewer.es.js')
    
    // Setup PDF.js worker
    setupPDFJS()
    
    function AdvancedExample() {
      const [pdfFile, setPdfFile] = React.default.useState('/sample.pdf')
      const [loading, setLoading] = React.default.useState(false)
      const [error, setError] = React.default.useState(null)
      const [pageCount, setPageCount] = React.default.useState(0)
      const [currentPage, setCurrentPage] = React.default.useState(1)
      const [zoom, setZoom] = React.default.useState(1.0)
      
      const handleFileUpload = (event) => {
        const file = event.target.files?.[0]
        if (!file) return
        
        if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
          setError('Please select a valid PDF file')
          return
        }
        
        if (file.size > 10 * 1024 * 1024) {
          setError('File size must be less than 10MB')
          return
        }
        
        setError(null)
        setPdfFile(file)
        setCurrentPage(1)
      }
      
      const handleLoadSuccess = (pdf) => {
        setPageCount(pdf.numPages)
        setLoading(false)
        setError(null)
        console.log('PDF loaded successfully:', pdf.numPages, 'pages')
      }
      
      const handleLoadError = (error) => {
        setError(\`Failed to load PDF: \${error.message}\`)
        setLoading(false)
        console.error('PDF load error:', error)
      }
      
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
      }
      
      const handleZoomChange = (scale) => {
        setZoom(scale)
      }
      
      return React.default.createElement('div', { 
        style: { padding: '20px', maxWidth: '1200px', margin: '0 auto' } 
      }, [
        React.default.createElement('h1', { key: 'title' }, 'Advanced PDF Viewer Example'),
        React.default.createElement('p', { 
          key: 'desc', 
          style: { color: '#666', marginBottom: '20px' } 
        }, '✅ Using production build from /dist/ directory'),
        
        // File Upload
        React.default.createElement('div', { 
          key: 'upload',
          style: { marginBottom: '20px' } 
        }, [
          React.default.createElement('label', {
            key: 'label',
            htmlFor: 'pdf-upload',
            style: {
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#007AFF',
              color: 'white',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }
          }, 'Choose PDF File'),
          React.default.createElement('input', {
            key: 'input',
            id: 'pdf-upload',
            type: 'file',
            accept: '.pdf,application/pdf',
            onChange: handleFileUpload,
            style: { display: 'none' }
          }),
          React.default.createElement('button', {
            key: 'sample',
            onClick: () => setPdfFile('/sample.pdf'),
            style: {
              marginLeft: '10px',
              padding: '10px 20px',
              backgroundColor: '#34C759',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }
          }, 'Load Sample PDF')
        ]),
        
        // Status
        React.default.createElement('div', {
          key: 'status',
          style: {
            marginBottom: '20px',
            padding: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '6px',
            fontSize: '14px'
          }
        }, [
          React.default.createElement('strong', { key: 'label' }, 'Status: '),
          loading ? 'Loading...' :
          error ? \`Error: \${error}\` :
          pageCount > 0 ? \`Loaded \${pageCount} pages, currently viewing page \${currentPage}, zoom: \${Math.round(zoom * 100)}%\` :
          'No PDF loaded'
        ]),
        
        // Error Display
        error && React.default.createElement('div', {
          key: 'error',
          style: {
            marginBottom: '20px',
            padding: '15px',
            backgroundColor: '#ffebee',
            border: '1px solid #f44336',
            borderRadius: '6px',
            color: '#d32f2f'
          }
        }, [
          React.default.createElement('h3', { 
            key: 'title',
            style: { margin: '0 0 10px 0' } 
          }, 'Error'),
          React.default.createElement('p', { 
            key: 'message',
            style: { margin: 0 } 
          }, error),
          React.default.createElement('button', {
            key: 'retry',
            onClick: () => {
              setError(null)
              setLoading(true)
            },
            style: {
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }
          }, 'Retry')
        ]),
        
        // PDF Viewer
        pdfFile && !error && React.default.createElement('div', {
          key: 'viewer',
          style: {
            border: '1px solid #ccc',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }
        }, [
          React.default.createElement(PDFViewer, {
            key: 'pdf',
            file: pdfFile,
            width: '100%',
            height: '700px',
            onLoadSuccess: handleLoadSuccess,
            onLoadError: handleLoadError,
            onPageChange: handlePageChange,
            onZoomChange: handleZoomChange,
            initialZoom: 1.0,
            scrollMode: 'continuous'
          })
        ]),
        
        // Back button
        React.default.createElement('div', { 
          key: 'back',
          style: { marginTop: '30px' } 
        }, [
          React.default.createElement('a', { 
            key: 'link',
            href: '/', 
            style: { 
              display: 'inline-block',
              padding: '10px 20px',
              background: '#007AFF',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px'
            }
          }, '← Back to Examples')
        ])
      ])
    }
    
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(React.default.createElement(AdvancedExample))
  </script>
</body>
</html>
` 