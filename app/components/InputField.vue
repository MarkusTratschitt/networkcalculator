<template lang="pug">
  v-text-field(
    v-bind="props"
    v-model="modelValue"
    :type="props.type || 'text'"
    :label="props.label"
    :placeholder="props.placeholder"
    :error="props.error"
    :error-messages="props.errorMessages"
    outlined
    dense
    hide-details="auto"
  )
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  type: String,
  error: Boolean,
  errorMessages: [String, Array]
})

const emit = defineEmits(['update:modelValue'])
</script>
