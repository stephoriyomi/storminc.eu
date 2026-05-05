/**
 * Build-time prerender: takes the Vite client build in dist/, renders the
 * React app to an HTML string, and injects it into the <!--app-html-->
 * placeholder so search engines and social crawlers see real markup.
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const toAbs = (p) => path.resolve(root, p)

// 1. Build a temporary SSR bundle (ESM so we can import() it below)
await build({
    root,
    configFile: false,
    plugins: [react()],
    build: {
        ssr: 'src/entry-server.jsx',
        outDir: 'dist/.server',
        emptyOutDir: true,
        rollupOptions: {
            output: { format: 'esm' },
        },
    },
})

// 2. Render app to string
const { render } = await import(toAbs('dist/.server/entry-server.js'))
const appHtml = render()

// 3. Inject into the client build's index.html
const template = fs.readFileSync(toAbs('dist/index.html'), 'utf-8')
const html = template.replace('<!--app-html-->', appHtml)
fs.writeFileSync(toAbs('dist/index.html'), html)

// 4. Remove the temporary server bundle
fs.rmSync(toAbs('dist/.server'), { recursive: true, force: true })

console.log('✓  Pre-rendering complete — dist/index.html now has full HTML.')
