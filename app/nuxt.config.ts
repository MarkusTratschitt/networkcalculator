// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false, 

  typescript: {
    strict: true,
    typeCheck: true,
  },

  css: ['@/assets/styles/main.less'], 
  build: {
    transpile: ['vuetify'], 
    
  },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/pwa' 
  ],
  
  //@ts-ignore
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Network Calculator',
      short_name: 'NetCalc',
      description: 'A minimalistic tool for network calculations',
      lang: 'en',
      display: 'standalone',
      background_color: '#121212',
      theme_color: '#1976D2',
    },
    meta: {
      theme_color: '#1976D2',
      ogSiteName: 'Network Calculator',
      ogTitle: 'Network Calculator',
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'], 
    },
  }
})
