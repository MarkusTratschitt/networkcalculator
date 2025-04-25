<template lang="pug">
CalculatorWrapper(title="Subnet Calculator")
  v-form(@submit.prevent="calculate")
    v-row(dense)
      // IPv4 address input
      v-col(cols="12" md="6")
        InputField(
          v-model="ip"
          label="IPv4 Address"
          placeholder="e.g. 192.168.1.1"
        )

      // CIDR dropdown or mask input
      v-col(cols="12" md="6")
        v-autocomplete(
          v-model="maskInput"
          :items="cidrPresets"
          label="CIDR or Subnet Mask"
          placeholder="e.g. 24 or 255.255.255.0"
          clearable
          dense
          outlined
        )

      // Optional IPv6 field (future use)
      v-col(cols="12" md="6")
        InputField(
          v-model="ipv6"
          label="IPv6 Address (optional)"
          placeholder="e.g. 2001:db8::1"
        )

    v-row(justify="center")
      v-btn(color="primary" class="mt-4" type="submit") Calculate

  v-divider.my-6

  // Live CIDR + Subnet Mask preview
  v-row(v-if="cidr !== null || subnetMask")
    v-col(cols="12" md="6")
      v-alert(type="info" border="start" elevation="1")
        strong CIDR:
        |  /{{ cidr ?? '—' }}
    v-col(cols="12" md="6")
      v-alert(type="info" border="start" elevation="1")
        strong Subnet Mask:
        |  {{ subnetMask || '—' }}

  // Output results
  ResultBox(v-if="Object.keys(resultsToShow).length" :results="resultsToShow")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSubnetCalculator } from '@/composables/useSubnetCalculator'
import { cidrToSubnetMask, subnetMaskToCIDR } from '@/types'
import type { IPv4, SubnetInfo } from '@/types'

export default defineComponent({
  name: 'SubnetPage',

  data() {
    return {
      ip: '' as IPv4,                   // IPv4 input
      maskInput: '',                    // CIDR or mask
      ipv6: '',                         // Optional IPv6 input
      result: null as SubnetInfo | null, // Subnet calculation result

      // Dropdown values for typical CIDR lengths
      cidrPresets: [
        '8', '16', '24', '30', '32',
        '255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.252', '255.255.255.255'
      ]
    }
  },

  computed: {
    // Normalize CIDR input
    cidr(): number | null {
      const input = this.maskInput.trim()
      if (/^\d{1,2}$/.test(input)) {
        const parsed = parseInt(input)
        return parsed >= 0 && parsed <= 32 ? parsed : null
      }
      const cidr = subnetMaskToCIDR(input)
      return cidr ?? null
    },

    // Convert CIDR to subnet mask for display
    subnetMask(): string {
      return this.cidr !== null ? cidrToSubnetMask(this.cidr) : ''
    },

    // Build a results object for ResultBox
    resultsToShow(): Record<string, string | number> {
      if (!this.result) return {}
      const {
        subnetMask,
        wildcardMask,
        networkAddress,
        broadcastAddress,
        firstHost,
        lastHost,
        numberOfHosts
      } = this.result

      return {
        'Subnet Mask': subnetMask,
        'Wildcard Mask': wildcardMask,
        'Network Address': networkAddress,
        'Broadcast Address': broadcastAddress,
        'First Host': firstHost,
        'Last Host': lastHost,
        'Number of Hosts': numberOfHosts
      }
    }
  },

  watch: {
    // Live update calculation when input changes
    ip: 'calculate',
    maskInput: 'calculate'
  },

  methods: {
    // Calculate subnet values (only for IPv4 for now)
    calculate(): void {
      if (!this.ip || this.cidr === null) {
        this.result = null
        return
      }

      const calc = useSubnetCalculator(this.ip, this.cidr)
      this.result = calc ? {
        ip: this.ip,
        cidr: this.cidr,
        subnetMask: calc.getSubnetMask(),
        wildcardMask: calc.getWildcardMask(),
        networkAddress: calc.getNetworkAddress(),
        broadcastAddress: calc.getBroadcastAddress(),
        firstHost: calc.getFirstHost(),
        lastHost: calc.getLastHost(),
        numberOfHosts: calc.getHostCount()
      } : null
    }
  }
})
</script>
