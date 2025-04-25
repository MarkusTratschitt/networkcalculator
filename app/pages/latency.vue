<template lang="pug">
CalculatorWrapper(title="Latency Calculator")
  v-form(@submit.prevent="calculate")
    v-row(dense)
      v-col(cols="12" md="6")
        InputField(
          v-model="distance"
          label="Distance (km)"
          type="number"
          placeholder="e.g. 1500"
        )
      v-col(cols="12" md="6")
        v-select(
          v-model="speed"
          :items="speedOptions"
          label="Signal speed in medium (m/s)"
          item-title="label"
          item-value="value"
          clearable
          outlined
          dense
        )

    v-row(justify="center")
      v-btn(
        color="primary"
        class="mt-2"
        type="submit"
        :disabled="!isValid"
      ) Calculate

  v-divider.my-6

  ResultBox(v-if="Object.keys(resultsToShow).length" :results="resultsToShow")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useLatencyCalculator } from '@/composables/useLatencyCalculator'
import type { LatencyResult } from '@/types/LatencyResult'

export default defineComponent({
  name: 'LatencyPage',

  data() {
    return {
      // Distance in kilometers
      distance: null as number | null,

      // Signal speed in m/s (selected from dropdown)
      speed: null as number | null,

      // Result object
      result: null as LatencyResult | null,

      // Preset signal speeds for common transmission media
      speedOptions: [
        { label: 'Fiber Optic (Light) – 200,000,000 m/s', value: 200_000_000 },
        { label: 'Copper (Electrical Signal) – 150,000,000 m/s', value: 150_000_000 },
        { label: 'Air (Radio Signal) – 300,000,000 m/s', value: 300_000_000 },
        { label: 'Vacuum (Satellite) – 299,792,458 m/s', value: 299_792_458 },
        { label: 'Water – 1,480,000 m/s', value: 1_480_000 }
      ]
    }
  },

  computed: {
    // Validation logic for inputs
    isValid(): boolean {
      return this.distance !== null && this.speed !== null && this.distance > 0 && this.speed > 0
    },

    // Output formatting for the result
    resultsToShow(): Record<string, number> {
      if (!this.result) return {}
      return {
        'Distance (km)': this.result.distanceInKm,
        'Signal speed (m/s)': this.result.speedInMedium,
        'Estimated latency (ms)': this.result.estimatedLatencyMs
      }
    }
  },

  methods: {
    // Calculation handler
    calculate(): void {
      if (!this.isValid) {
        this.result = null
        return
      }

      this.result = useLatencyCalculator(this.distance!, this.speed!)
    }
  }
})
</script>
