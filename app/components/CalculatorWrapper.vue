<template lang="pug">
v-container(fluid class="pa-6")
  v-card.rounded-xl.elevation-2.pa-4
    v-card-title.text-h5.font-weight-medium {{ title }}
    v-divider.my-3
    v-card-text
      slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
