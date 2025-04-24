<template lang="pug">
  v-card.pa-4.rounded-xl.shadow-md
    v-card-title.text-h6.font-weight-bold {{ title }}
    v-divider.my-2
    slot
</template>

<script lang="ts">
export default defineComponent({
  name: 'CalculatorWrapper',
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped lang="less">
v-card {
  background-color: #1e1e1e;
  color: #fff;
}
</style>
