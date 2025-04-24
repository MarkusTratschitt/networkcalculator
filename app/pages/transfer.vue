<template lang="pug">
  CalculatorWrapper(title="Transfer Time Calculator")
    v-form(@submit.prevent="calculate")
      v-row(dense)
        v-col(cols="12" md="6")
          InputField(v-model="input.dataSize" label="Dateigröße" type="number" placeholder="z. B. 150")
        v-col(cols="12" md="6")
          v-select(v-model="input.dataUnit" :items="dataUnits" label="Einheit" outlined dense)

        v-col(cols="12" md="6")
          InputField(v-model="input.bandwidth" label="Bandbreite" type="number" placeholder="z. B. 100")
        v-col(cols="12" md="6")
          v-select(v-model="input.bandwidthUnit" :items="bandwidthUnits" label="Einheit" outlined dense)

        v-col(cols="12" md="6")
          InputField(v-model="input.overheadPercent" label="Overhead in %" type="number" placeholder="optional")
        v-col(cols="12" md="6")
          InputField(v-model="input.estimatedLatencyMs" label="Latenz in ms" type="number" placeholder="optional")

      v-btn(color="primary" class="mt-2" type="submit") Berechnen

    ResultBox(:results="resultsToShow")
</template>

<script lang="ts">
import { useTransferTimeCalculator } from '@/composables/useTransferTimeCalculator'
import type { TransferTimeInput, TransferTimeResult } from '@/types/network'

export default defineComponent({
  name: 'TransferPage',
  setup() {
    let input = ref<TransferTimeInput>({
      dataSize: 0,
      dataUnit: 'MB',
      bandwidth: 0,
      bandwidthUnit: 'Mbps',
      overheadPercent: undefined,
      estimatedLatencyMs: undefined
    })

    let result = ref<TransferTimeResult | null>(null)

    function calculate() {
      result.value = useTransferTimeCalculator(input.value)
    }

    let dataUnits = ['KB', 'MB', 'GB', 'TB']
    let bandwidthUnits = ['Kbps', 'Mbps', 'Gbps']

    let resultsToShow = computed(() => {
      if (!result.value) return {}
      let { effectiveSpeedMbps, transferTimeInSeconds, formattedTime, notes } = result.value
      return {
        'Effektive Bandbreite (Mbps)': effectiveSpeedMbps,
        'Übertragungszeit (Sekunden)': transferTimeInSeconds,
        'Übertragungszeit (formatiert)': formattedTime,
        Hinweise: notes || 'Keine'
      }
    })

    return { input, result, calculate, dataUnits, bandwidthUnits, resultsToShow }
  }
})
</script>
