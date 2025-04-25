<template lang="pug">
CalculatorWrapper(title="IP Format Converter")
  v-form(@submit.prevent="convert")
    v-row(dense align="center" justify="center")
      v-col(cols="12" md="8")
        InputField(
          v-model="ip"
          label="IPv4 Address"
          placeholder="e.g. 192.168.1.1"
          :error="ipError"
          error-messages="Invalid IP address"
        )
      v-col(cols="12" md="4")
        v-select(
          v-model="format"
          :items="formats"
          label="Input format"
          outlined
          dense
        )

    v-row(justify="center")
      v-btn(
        color="primary"
        class="mt-4"
        type="submit"
        :disabled="!ip"
      ) Convert

  v-divider.my-6

  ResultBox(v-if="Object.keys(resultsToShow).length" :results="resultsToShow")
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { useIPConverter } from '@/composables/useIPConverter'
import type { IPAddressWithFormat, IPFormat } from '@/types'

export default defineComponent({
  name: 'IPConverterPage',

  data() {
    return {
      // User input: the IPv4 address as a string
      ip: '' as string,

      // Selected input format (used for future compatibility)
      format: 'decimal' as IPFormat,

      // Result object containing all converted formats
      result: null as IPAddressWithFormat | null,

      // Indicates whether the input is currently invalid
      ipError: false,

      // Available input formats (for dropdown)
      formats: ['decimal', 'binary', 'hexadecimal'] as IPFormat[]
    }
  },

  computed: {
    // Extract and format results for display in ResultBox
    resultsToShow(): Record<string, string> {
      if (!this.result) return {}
      return {
        'Binary': this.result.binary,
        'Decimal': this.result.decimal,
        'Hexadecimal': this.result.hexadecimal
      }
    }
  },

  methods: {
    // Basic IPv4 validation: checks structure and number ranges
    isValidIPv4(ip: string): boolean {
      const parts = ip.trim().split('.')
      if (parts.length !== 4) return false
      return parts.every(part => {
        const num = Number(part)
        return !isNaN(num) && num >= 0 && num <= 255
      })
    },

    // Triggered when form is submitted
    // Validates input, converts if valid, and handles errors
    convert(): void {
      if (!this.isValidIPv4(this.ip)) {
        this.ipError = true
        this.result = null
        return
      }

      this.ipError = false
      this.result = useIPConverter(this.ip, this.format)
    }
  }
})
</script>
