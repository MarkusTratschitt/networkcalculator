<template lang="pug">
v-card.rounded-xl.elevation-1.pa-4
  v-card-title.text-h6.font-weight-medium Ergebnisse
  v-divider.my-3
  v-card-text
    v-list(dense)
      v-list-item(v-for="(value, label) in results" :key="label")
        v-list-item-content
          v-list-item-title.font-weight-bold {{ label }}
          v-list-item-subtitle {{ value }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ResultBox',

  props: {
    results: {
      type: Object as () => Record<string, string | number>,
      required: true
    }
  }
})
</script>
