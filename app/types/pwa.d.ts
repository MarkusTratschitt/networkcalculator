declare module '@nuxt/schema' {
  interface NuxtConfig {
    pwa?: typeof import('@vite-pwa/nuxt').default
  }
}
