import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { buildSeoTags } from './seo.config.ts'

function seo(demo: boolean): Plugin {
  return {
    name: 'company-seo',
    transformIndexHtml: (html) => html.replace('<!--seo-->', buildSeoTags(demo).trimStart()),
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const demo = env.VITE_DEMO_MODE === 'true'
  return {
    plugins: [react(), tailwindcss(), seo(demo)],
    build: {
      target: 'es2022',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (/node_modules\/(motion|motion-dom|motion-utils|framer-motion)\//.test(id)) return 'motion'
            if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react'
          },
        },
      },
    },
  }
})
