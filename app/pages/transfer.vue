<template lang="pug">
CalculatorWrapper(title="Transfer Time Calculator")
  v-form(@submit.prevent="calculate")
    v-row(dense)
      // Data size input (e.g., 150 MB)
      v-col(cols="12" md="6")
        InputField(
          v-model="input.dataSize"
          label="Data Size"
          type="number"
          placeholder="e.g. 150"
        )

      // Data unit selection (KB, MB, etc.)
      v-col(cols="12" md="6")
        v-select(
          v-model="input.dataUnit"
          :items="dataUnits"
          label="Data Unit"
          outlined
          dense
        )

      // Bandwidth input (e.g., 100 Mbps)
      v-col(cols="12" md="6")
        InputField(
          v-model="input.bandwidth"
          label="Bandwidth"
          type="number"
          placeholder="e.g. 100"
        )

      // Bandwidth unit selection (Kbps, Mbps, etc.)
      v-col(cols="12" md="6")
        v-select(
          v-model="input.bandwidthUnit"
          :items="bandwidthUnits"
          label="Bandwidth Unit"
          outlined
          dense
        )

      // Optional overhead in percent
      v-col(cols="12" md="6")
        InputField(
          v-model="input.overheadPercent"
          label="Overhead (%)"
          type="number"
          placeholder="optional"
        )

      // Optional latency in ms
      v-col(cols="12" md="6")
        InputField(
          v-model="input.estimatedLatencyMs"
          label="Latency (ms)"
          type="number"
          placeholder="optional"
        )

    // Calculate button
    v-row(justify="center")
      v-btn(color="primary" class="mt-4" type="submit") Calculate

  v-divider.my-6

  // Result output box
  ResultBox(v-if="Object.keys(resultsToShow).length" :results="resultsToShow")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTransferTimeCalculator } from '@/composables/useTransferTimeCalculator'
import type { TransferTimeInput } from '@/types/TransferTimeInput'
import type { TransferTimeResult } from '@/types/TransferTimeResult'

export default defineComponent({
  name: 'TransferPage',

  data() {
    return {
      // Input model for transfer time calculation
      input: {
        dataSize: 0,
        dataUnit: 'MB',
        bandwidth: 0,
        bandwidthUnit: 'Mbps',
        overheadPercent: undefined,
        estimatedLatencyMs: undefined
      } as TransferTimeInput,

      // Output result object
      result: null as TransferTimeResult | null,

      // Available data size units
      dataUnits: ['KB', 'MB', 'GB', 'TB'],

      // Available bandwidth units
      bandwidthUnits: ['Kbps', 'Mbps', 'Gbps']
    }
  },

  computed: {
    // Computed object for display in ResultBox
    resultsToShow(): Record<string, string | number> {
      if (!this.result) return {}

      const {
        effectiveSpeedMbps,
        transferTimeInSeconds,
        formattedTime,
        notes
      } = this.result

      return {
        'Effective Bandwidth (Mbps)': effectiveSpeedMbps,
        'Transfer Time (seconds)': transferTimeInSeconds,
        'Formatted Time': formattedTime,
        'Notes': notes || 'None'
      }
    }
  },

  methods: {
    // Execute transfer time calculation
    calculate(): void {
      this.result = useTransferTimeCalculator(this.input)
    }
  }
})
</script>
