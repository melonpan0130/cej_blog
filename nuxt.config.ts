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
  compatibilityDate: '2025-07-15',
  devtools: { enabled: import.meta.dev }
})
