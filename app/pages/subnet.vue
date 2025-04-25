<template lang="pug">
  CalculatorWrapper(title="Subnet Calculator")
    v-form(@submit.prevent="calculate")
      v-row(dense)
        v-col(cols="12" md="6")
          InputField(v-model="ip" label="IPv4-Adresse" placeholder="z. B. 192.168.0.1")
        v-col(cols="12" md="6")
          InputField(v-model="cidr" label="CIDR" type="number" placeholder="z. B. 24")

      v-btn(color="primary" class="mt-2" type="submit") Berechnen

    ResultBox(:results="resultsToShow")
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useSubnetCalculator } from '@/composables/useSubnetCalculator'
import type { SubnetInfo } from '@/types/SubnetInfo'

export default defineComponent({
  name: 'SubnetPage',
  setup() {
    let ip = ref('')
    let cidr = ref<number | null>(null)
    let result = ref<SubnetInfo | null>(null)

    function calculate() {
      if (!ip.value || cidr.value === null) return
      let calculator = useSubnetCalculator(ip.value as any, cidr.value)
      result.value = calculator?.toSubnetInfo() || null
    }

    let resultsToShow = computed(() => {
      if (!result.value) return {}
      let {
        subnetMask,
        wildcardMask,
        networkAddress,
        broadcastAddress,
        firstHost,
        lastHost,
        numberOfHosts
      } = result.value

      return {
        'Subnetzmaske': subnetMask,
        'Wildcard-Maske': wildcardMask,
        'Netzwerkadresse': networkAddress,
        'Broadcast-Adresse': broadcastAddress,
        'Erster Host': firstHost,
        'Letzter Host': lastHost,
        'Anzahl Hosts': numberOfHosts
      }
    })

    return { ip, cidr, result, calculate, resultsToShow }
  }
})
</script>
