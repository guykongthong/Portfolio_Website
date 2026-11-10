import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// self-hosted fonts (all SIL OFL 1.1, via @fontsource), latin subset only
import '@fontsource/pixelify-sans/latin-500.css'
import '@fontsource/pixelify-sans/latin-600.css'
import '@fontsource/silkscreen/latin-400.css'
import '@fontsource/geist/latin-400.css'
import '@fontsource/geist/latin-500.css'
import '@fontsource/geist/latin-600.css'
import '@fontsource/geist-mono/latin-400.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
