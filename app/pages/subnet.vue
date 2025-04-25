<template lang="pug">
CalculatorWrapper(title="Subnet Calculator")
  v-form(@submit.prevent="calculate")
    v-row(dense)
      v-col(cols="12" md="6")
        InputField(
          v-model="ip"
          label="IPv4-Adresse"
          placeholder="z. B. 192.168.1.1"
        )
      v-col(cols="12" md="6")
        InputField(
          v-model="maskInput"
          label="CIDR oder Subnetzmaske"
          placeholder="z. B. 24 oder 255.255.255.0"
        )

    v-row(justify="center")
      v-btn(color="primary" class="mt-4" type="submit") Berechnen

  v-divider.my-6

  v-row(v-if="cidr !== null || subnetMask")
    v-col(cols="12" md="6")
      v-alert(type="info" border="start" elevation="1")
        strong CIDR: 
        |  /{{ cidr ?? '—' }}
    v-col(cols="12" md="6")
      v-alert(type="info" border="start" elevation="1")
        strong Subnetzmaske: 
        |  {{ subnetMask || '—' }}

  ResultBox(v-if="Object.keys(resultsToShow).length" :results="resultsToShow")
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useSubnetCalculator } from '@/composables/useSubnetCalculator'
import { subnetMaskToCIDR, cidrToSubnetMask } from '@/types'
import type { IPv4, SubnetInfo } from '@/types'

export default defineComponent({
  name: 'SubnetPage',

  data() {
    return {
      ip: '' as IPv4,
      maskInput: '',
      result: null as SubnetInfo | null
    }
  },

  computed: {
    cidr(): number | null {
      let input = this.maskInput.trim()
      if (/^\d{1,2}$/.test(input)) {
        let parsed = parseInt(input)
        return parsed >= 0 && parsed <= 32 ? parsed : null
      }
      let cidr = subnetMaskToCIDR(input)
      return cidr ?? null
    },

    subnetMask(): string {
      return this.cidr !== null ? cidrToSubnetMask(this.cidr) : ''
    },

    resultsToShow(): Record<string, string | number> {
      if (!this.result) return {}
      let {
        subnetMask,
        wildcardMask,
        networkAddress,
        broadcastAddress,
        firstHost,
        lastHost,
        numberOfHosts
      } = this.result

      return {
        'Subnetzmaske': subnetMask,
        'Wildcard-Maske': wildcardMask,
        'Netzwerkadresse': networkAddress,
        'Broadcast-Adresse': broadcastAddress,
        'Erster Host': firstHost,
        'Letzter Host': lastHost,
        'Anzahl Hosts': numberOfHosts
      }
    }
  },

  methods: {
    calculate() {
      if (!this.ip || this.cidr === null) {
        this.result = null
        return
      }

      const calc = useSubnetCalculator(this.ip, this.cidr)
      this.result = calc ? { 
        ip: this.ip, 
        cidr: this.cidr, 
        networkAddress: calc.getNetworkAddress(), 
        broadcastAddress: calc.getBroadcastAddress(), 
        firstHost: calc.getFirstHost(), 
        lastHost: calc.getLastHost(), 
        numberOfHosts: calc.numberOfHosts, 
        wildcardMask: calc.getWildcardMask(), 
        subnetMask: calc.getSubnetMask() 
      } : null
    }
  }
})
</script>
