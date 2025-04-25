<template lang="pug">
CalculatorWrapper(title="Bandwidth Calculator")
  v-form(@submit.prevent="calculate")
    v-row(dense)
      v-col(cols="12" md="6")
        InputField(
          v-model="dataSize"
          label="Dateigröße (MB)"
          type="number"
          placeholder="z. B. 100"
        )
      v-col(cols="12" md="6")
        InputField(
          v-model="transferTime"
          label="Zeit (Sekunden)"
          type="number"
          placeholder="z. B. 10"
        )

    v-row(justify="center")
      v-btn(
        color="primary"
        class="mt-4"
        type="submit"
        :disabled="!isValid"
      ) Berechnen

  v-divider.my-6

  ResultBox(v-if="Object.keys(resultsToShow).length" :results="resultsToShow")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useBandwidthCalculator } from '@/composables/useBandwidthCalculator'
import type { BandwidthCalculation } from '@/types'

export default defineComponent({
  name: 'BandwidthPage',

  data() {
    return {
      // User input: file size in megabytes
      dataSize: null as number | null,

      // User input: transfer time in seconds
      transferTime: null as number | null,

      // Calculated result returned from the composable
      result: null as BandwidthCalculation | null
    }
  },

  computed: {
    // Form validation: both inputs must be present and greater than zero
    isValid(): boolean {
      return this.dataSize !== null && this.transferTime !== null && this.dataSize > 0 && this.transferTime > 0
    },

    // Converts the result object into a key-value map for ResultBox display
    resultsToShow(): Record<string, number> {
      if (!this.result) return {}
      return {
        'File size (MB)': this.result.dataSizeInMB,
        'Duration (s)': this.result.transferTimeInSeconds,
        'Bandwidth needed (Mbps)': this.result.bandwidthInMbps
      }
    }
  },

  methods: {
    // Called when the form is submitted.
    // Validates the inputs and calculates the required bandwidth.
    calculate(): void {
      if (!this.isValid) {
        this.result = null
        return
      }

      // Call composable function to perform bandwidth calculation
      const calc = useBandwidthCalculator(this.dataSize!, this.transferTime!)
      this.result = calc
    }
  }
})
</script>

