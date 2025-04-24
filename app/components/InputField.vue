<template lang="pug">
  v-text-field(
    v-model="modelValue"
    :label="label"
    :type="type"
    :placeholder="placeholder"
    :rules="rules"
    dense
    outlined
    hide-details="auto"
    clearable
  )
</template>

<script lang="ts">
export default defineComponent({
  name: 'InputField',
  props: {
    modelValue: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:modelValue']
})
</script>
