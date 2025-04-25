<template lang="pug">
v-text-field(
  v-model="model"
  :label="label"
  :placeholder="placeholder"
  :type="type"
  :error="error"
  :error-messages="errorMessages"
  outlined
  dense
  hide-details="auto"
)
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputField',

  props: {
    modelValue: {
      type: [String, Number],
      required: false,
      default: ''
    },
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessages: {
      type: [String, Array],
      default: ''
    }
  },

  emits: ['update:modelValue'],

  computed: {
    model: {
      get(): string | number {
        return this.modelValue
      },
      set(value: string | number) {
        this.$emit('update:modelValue', value)
      }
    }
  }
})
</script>
