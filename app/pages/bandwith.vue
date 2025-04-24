<template lang="pug">
  CalculatorWrapper(title="Bandwidth Calculator")
    v-form(@submit.prevent="calculate")
      v-row(dense)
        v-col(cols="12" md="6")
          InputField(v-model="dataSize" label="Dateigröße (MB)" type="number" placeholder="z. B. 100")
        v-col(cols="12" md="6")
          InputField(v-model="transferTime" label="Zeit (Sekunden)" type="number" placeholder="z. B. 10")

      v-btn(color="primary" class="mt-2" type="submit") Berechnen

    ResultBox(:results="resultsToShow")
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useBandwidthCalculator } from '@/composables/useBandwidthCalculator'
import type { BandwidthCalculation } from '@/types/network'

export default defineComponent({
  name: 'BandwidthPage',
  setup() {
    let dataSize = ref<number | null>(null)
    let transferTime = ref<number | null>(null)
    let result = ref<BandwidthCalculation | null>(null)

    function calculate() {
      if (dataSize.value === null || transferTime.value === null) return
      result.value = useBandwidthCalculator(dataSize.value, transferTime.value)
    }

    let resultsToShow = computed(() => {
      if (!result.value) return {}
      return {
        'Dateigröße (MB)': result.value.dataSizeInMB,
        'Dauer (s)': result.value.transferTimeInSeconds,
        'Erforderliche Bandbreite (Mbps)': result.value.bandwidthInMbps
      }
    })

    return { dataSize, transferTime, result, calculate, resultsToShow }
  }
})
</script>
