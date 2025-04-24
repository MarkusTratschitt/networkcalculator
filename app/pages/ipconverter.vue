<template lang="pug">
  CalculatorWrapper(title="IP Format Converter")
    v-form(@submit.prevent="convert")
      v-row(dense)
        v-col(cols="12" md="8")
          InputField(v-model="ip" label="IPv4-Adresse" placeholder="z. B. 192.168.1.1")
        v-col(cols="12" md="4")
          v-select(v-model="format" :items="formats" label="Eingabeformat" outlined dense)

      v-btn(color="primary" class="mt-2" type="submit") Konvertieren

    ResultBox(:results="resultsToShow")
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useIPConverter } from '@/composables/useIPConverter'
import type { IPAddressWithFormat, IPFormat } from '@/types/network'

export default defineComponent({
  name: 'IPConverterPage',
  setup() {
    let ip = ref('')
    let format = ref<IPFormat>('decimal')
    let result = ref<IPAddressWithFormat | null>(null)

    function convert() {
      result.value = useIPConverter(ip.value, format.value)
    }

    let formats: IPFormat[] = ['decimal', 'binary', 'hexadecimal']

    let resultsToShow = computed(() => {
      if (!result.value) return {}
      return {
        'Binär': result.value.binary,
        'Dezimal': result.value.decimal,
        'Hexadezimal': result.value.hexadecimal
      }
    })

    return { ip, format, result, convert, formats, resultsToShow }
  }
})
</script>
