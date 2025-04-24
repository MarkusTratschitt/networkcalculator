<template lang="pug">
  CalculatorWrapper(title="Latency Calculator")
    v-form(@submit.prevent="calculate")
      v-row(dense)
        v-col(cols="12" md="6")
          InputField(v-model="distance" label="Entfernung (km)" type="number" placeholder="z. B. 1500")
        v-col(cols="12" md="6")
          InputField(v-model="speed" label="Geschwindigkeit im Medium (m/s)" type="number" placeholder="z. B. 200000000")

      v-btn(color="primary" class="mt-2" type="submit") Berechnen

    ResultBox(:results="resultsToShow")
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useLatencyCalculator } from '@/composables/useLatencyCalculator'
import type { LatencyResult } from '@/types/network'

export default defineComponent({
  name: 'LatencyPage',
  setup() {
    let distance = ref<number | null>(null)
    let speed = ref<number | null>(null)
    let result = ref<LatencyResult | null>(null)

    function calculate() {
      if (distance.value === null || speed.value === null) return
      result.value = useLatencyCalculator(distance.value, speed.value)
    }

    let resultsToShow = computed(() => {
      if (!result.value) return {}
      return {
        'Entfernung (km)': result.value.distanceInKm,
        'Signalgeschwindigkeit (m/s)': result.value.speedInMedium,
        'Geschätzte Latenz (ms)': result.value.estimatedLatencyMs
      }
    })

    return { distance, speed, result, calculate, resultsToShow }
  }
})
</script>
