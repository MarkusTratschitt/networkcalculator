<template lang="pug">
  v-card.rounded-xl.pa-4.mt-4.shadow-sm
    v-card-title.text-subtitle-1.font-weight-bold Ergebnisse
    v-divider.mb-2
    div(v-if="results && Object.keys(results).length")
      div(v-for="(value, key) in results" :key="key" class="d-flex justify-between align-center py-1")
        span.font-mono.text-sm {{ key }}
        span.font-mono.text-sm.font-weight-medium {{ value }}
    div(v-else class="text-grey") Noch keine Ergebnisse
</template>

<script lang="ts">
export default defineComponent({
  name: 'ResultBox',
  props: {
    results: {
      type: Object,
      required: false,
      default: () => ({})
    }
  }
})
</script>

<style scoped lang="less">
v-card {
  background-color: #2b2b2b;
  color: #fff;
}
.text-sm {
  font-size: 0.875rem;
}
</style>
