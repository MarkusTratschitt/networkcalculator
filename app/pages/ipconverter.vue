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
          outlined dense
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
import { defineComponent, ref, computed } from 'vue'
import { useIPConverter } from '@/composables/useIPConverter'
import type { IPAddressWithFormat, IPFormat } from '@/types/network'

export default defineComponent({
  name: 'IPConverterPage',
  setup() {
    const ip = ref('')
    const format = ref<IPFormat>('decimal')
    const result = ref<IPAddressWithFormat | null>(null)
    const ipError = ref(false)

    function isValidIPv4(ip: string): boolean {
      const parts = ip.trim().split('.')
      if (parts.length !== 4) return false
      return parts.every(part => {
        const num = Number(part)
        return !isNaN(num) && num >= 0 && num <= 255
      })
    }

    function convert() {
      if (!isValidIPv4(ip.value)) {
        ipError.value = true
        result.value = null
        return
      }

      ipError.value = false
      result.value = useIPConverter(ip.value, format.value)
    }

    const formats: IPFormat[] = ['decimal', 'binary', 'hexadecimal']

    const resultsToShow = computed(() => {
      if (!result.value) return {}
      return {
        'Binär': result.value.binary,
        'Dezimal': result.value.decimal,
        'Hexadezimal': result.value.hexadecimal
      }
    })

    return {
      ip,
      format,
      result,
      convert,
      formats,
      resultsToShow,
      ipError
    }
  }
})
</script>
