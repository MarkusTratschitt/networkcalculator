<template lang="pug">
  v-app
    NuxtLayout
      NuxtPage
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppRoot'
})
</script>

<style lang="less">
html, body, #__nuxt {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>

