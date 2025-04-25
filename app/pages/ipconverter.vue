<template lang="pug">
CalculatorWrapper(title="IP Format Converter")
  v-form(@submit.prevent="convert")
    v-row(dense align="center" justify="center")
      v-col(cols="12" md="8")
        InputField(
          v-model="ip"
          label="IPv4-Adresse"
          placeholder="z. B. 192.168.1.1"
          :error="ipError"
          error-messages="Ungültige IP-Adresse"
        )
      v-col(cols="12" md="4")
        v-select(
          v-model="format"
          :items="formats"
          label="Eingabeformat"
          outlined
          dense
        )

    v-row(justify="center")
      v-btn(
        color="primary"
        class="mt-4"
        type="submit"
        :disabled="!ip"
      ) Konvertieren

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
      ip: '' as string,
      format: 'decimal' as IPFormat,
      result: null as IPAddressWithFormat | null,
      ipError: false,
      formats: ['decimal', 'binary', 'hexadecimal'] as IPFormat[]
    }
  },

  computed: {
    resultsToShow(): Record<string, string> {
      if (!this.result) return {}
      return {
        'Binär': this.result.binary,
        'Dezimal': this.result.decimal,
        'Hexadezimal': this.result.hexadecimal
      }
    }
  },

  methods: {
    isValidIPv4(ip: string): boolean {
      const parts = ip.trim().split('.')
      if (parts.length !== 4) return false
      return parts.every(part => {
        const num = Number(part)
        return !isNaN(num) && num >= 0 && num <= 255
      })
    },

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
