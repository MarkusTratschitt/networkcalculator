import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //@ts-ignore
  devtools: { enabled: true },

  css: ['vuetify/styles', '@/assets/main.less'],

  build: {
    transpile: ['vuetify'], 
    
  },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@vite-pwa/nuxt',
    'vuetify-nuxt-module'
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    }
  },
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
  },

  compatibilityDate: '2025-04-25'
})