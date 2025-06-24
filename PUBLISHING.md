# Publishing Guide

This guide explains how to publish the `@vvelediaz/react-pdf-viewer` package to JSR and npm.

## Prerequisites

1. **JSR Account**: Sign up at [jsr.io](https://jsr.io)
2. **GitHub Repository**: Your code should be in a public GitHub repository
3. **Bun CLI**: Install the Bun CLI for building and publishing

## Before Publishing

### 1. Update Configuration Files

#### Update `jsr.json`
```json
{
  "name": "@vvelediaz/react-pdf-viewer",
  "version": "1.0.0"
}
```
Replace `@vvelediaz` with your actual JSR scope name.

#### Update `package.json`
```json
{
  "name": "@vvelediaz/react-pdf-viewer",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/react-pdf-viewer.git"
  },
  "homepage": "https://github.com/yourusername/react-pdf-viewer#readme",
  "bugs": {
    "url": "https://github.com/yourusername/react-pdf-viewer/issues"
  }
}
```

### 2. Build the Package

```bash
# Build TypeScript and copy assets
bun run build:lib

# Type check
bun run type-check
```

### 3. Test Locally

```bash
# Test the development version
bun run dev
```

## Publishing to JSR

### 1. Install JSR CLI
```bash
# Install JSR CLI globally
npm install -g @jsr/cli
# or
bun add -g @jsr/cli
```

### 2. Authenticate
```bash
jsr auth
```

### 3. Publish
```bash
jsr publish
```

## Publishing to npm (Optional)

### 1. Build for npm
```bash
bun run build:lib
```

### 2. Login to npm
```bash
npm login
```

### 3. Publish
```bash
npm publish --access public
```

## Post-Publishing

### 1. Tag the Release
```bash
git tag v1.0.0
git push origin v1.0.0
```

### 2. Create GitHub Release
1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Choose the tag you just created
4. Add release notes

### 3. Update Documentation
- Update README.md with the correct package name
- Add badge links for JSR/npm
- Update installation instructions

## Version Management

### Patch Release (1.0.1)
```bash
# Update version in jsr.json and package.json
jsr publish
```

### Minor Release (1.1.0)
```bash
# Update version in jsr.json and package.json
jsr publish
```

### Major Release (2.0.0)
```bash
# Update version in jsr.json and package.json
# Update CHANGELOG.md with breaking changes
jsr publish
```

## Troubleshooting

### Common Issues

1. **Scope not found**: Make sure you've created the scope on JSR
2. **Permission denied**: Ensure you're authenticated with JSR
3. **Type errors**: Run `bun run type-check` to fix TypeScript issues
4. **Missing files**: Check the `files` array in package.json

### Getting Help

- [JSR Documentation](https://jsr.io/docs)
- [GitHub Issues](https://github.com/yourusername/react-pdf-viewer/issues)

## Checklist

- [ ] Updated scope name in jsr.json
- [ ] Updated author info in package.json
- [ ] Updated repository URLs
- [ ] Built the package successfully
- [ ] Type checking passes
- [ ] Created JSR account and scope
- [ ] Authenticated with JSR CLI
- [ ] Published to JSR
- [ ] Tagged the release
- [ ] Created GitHub release
- [ ] Updated documentation 