<template lang="pug">
  NuxtLayout
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Document } from "@langchain/core/documents";

const documents = [
  new Document({
    pageContent:
      "Dogs are great companions, known for their loyalty and friendliness.",
    metadata: { source: "mammal-pets-doc" },
  }),
  new Document({
    pageContent: "Cats are independent pets that often enjoy their own space.",
    metadata: { source: "mammal-pets-doc" },
  }),
];
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

