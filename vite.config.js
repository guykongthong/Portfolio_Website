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
const POSITION_PATTERN = /^\d{1,3}% \d{1,3}%$/

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

        // Reject cross-origin requests (e.g. a malicious page open in another tab
        // while `npm run dev` is running) — browsers always set Origin on a
        // cross-origin fetch, so any origin other than this dev server's own is refused.
        const origin = req.headers.origin
        if (origin && !/^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
          res.statusCode = 403
          res.end('Forbidden origin')
          return
        }

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', () => {
          try {
            const { alt, position } = JSON.parse(body)

            if (typeof alt !== 'string' || !alt) {
              res.statusCode = 400
              res.end('Missing alt')
              return
            }
            if (position !== null && !POSITION_PATTERN.test(position)) {
              res.statusCode = 400
              res.end('position must be "N% N%" or null')
              return
            }

            const source = readFileSync(cvDataPath, 'utf-8')
            const lines = source.split('\n')
            const needle = `alt: "${alt}"`

            const matches = lines.reduce((n, line) => n + (line.includes(needle) ? 1 : 0), 0)
            if (matches === 0) {
              res.statusCode = 404
              res.end(`No media entry found with alt "${alt}"`)
              return
            }
            if (matches > 1) {
              res.statusCode = 409
              res.end(`alt "${alt}" is not unique in cv.ts — refusing to guess which entry to edit`)
              return
            }

            const lineIndex = lines.findIndex((line) => line.includes(needle))
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
