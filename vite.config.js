import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const cvDataPath = fileURLToPath(new URL('./src/data/cv.ts', import.meta.url))

/**
 * Dev-only endpoint for the ProjectMedia reposition overlay (src/components/ProjectMedia.tsx).
 * Only registered on the `npm run dev` server via configureServer — `vite build` never
 * includes this plugin's request handler, so it doesn't exist in the deployed site.
 * Locates a media entry in cv.ts by its (unique) `alt` text and writes/clears its
 * `position` field in place.
 */
function mediaRepositionPlugin() {
  return {
    name: 'media-reposition',
    configureServer(server) {
      server.middlewares.use('/__set-media-position', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', () => {
          try {
            const { alt, position } = JSON.parse(body)
            const source = readFileSync(cvDataPath, 'utf-8')
            const lines = source.split('\n')

            const lineIndex = lines.findIndex((line) => line.includes(`alt: "${alt}"`))
            if (lineIndex === -1) {
              res.statusCode = 404
              res.end(`No media entry found with alt "${alt}"`)
              return
            }

            let line = lines[lineIndex]
            line = line.replace(/,\s*position:\s*"[^"]*"/, '')
            if (position) {
              line = line.replace(/\s*}(\s*,?\s*)$/, `, position: "${position}" }$1`)
            }
            lines[lineIndex] = line

            writeFileSync(cvDataPath, lines.join('\n'))
            res.statusCode = 200
            res.end('ok')
          } catch (err) {
            res.statusCode = 500
            res.end(String(err))
          }
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mediaRepositionPlugin()],
})
