import { NuxtConfig } from '@nuxt/schema';

declare module '@nuxt/schema' {
  interface NuxtConfig {
    css?: string[];
  }
}