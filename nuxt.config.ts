import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const postsDirectory = path.resolve(rootDir, 'app/posts')

function collectPostRoutes(dir: string, category = ''): string[] {
  const routes: string[] = []

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      const nextCategory = category ? `${category}/${entry.name}` : entry.name
      routes.push(`/board/${nextCategory}`)
      routes.push(...collectPostRoutes(entryPath, nextCategory))
      continue
    }

    if (!entry.name.endsWith('.html')) continue

    const fileName = entry.name.replace(/\.html$/, '')
    const postPath = category ? `${category}/${fileName}` : fileName
    routes.push(`/post/${postPath}`)
  }

  return routes
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'google-site-verification', content: 'L87dwmgPVDwikx88bqVUQK9s3D5fr26VaotCZ4nDqVE' }
      ]
    }
  },
  modules: [
    '@nuxtjs/sitemap'
  ],
  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://cej13log.netlify.app/',
    name: 'cej-blog',
    description: 'A blog site for sharing knowledge and experiences.'
  },
  sitemap: {
    urls: async () => {
      try {
        return collectPostRoutes(postsDirectory)
      } catch (error) {
        console.error('Error generating sitemap URLs:', error)
        return []
      }
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: import.meta.dev }
})
