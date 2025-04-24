<template lang="pug">
v-container(fluid class="pa-6")
  v-row(dense align="stretch" justify="center" class="gap-y-4")
    v-col(cols="12" sm="6" md="4" v-for="tool in tools" :key="tool.route")
      v-card.rounded-xl.pa-4.elevation-3.d-flex.flex-column.justify-space-between(class="hover-card" height="100%" @click="$router.push(tool.route)")
        v-card-title.text-h6.font-weight-bold {{ tool.title }}
        v-card-text.text-body-2.text-grey-darken-1.mt-2 {{ tool.description }}
        v-spacer
        v-card-actions.justify-end
          v-btn(text color="primary") Öffnen
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardPage',
  setup() {
    let tools = [
      {
        title: 'IP Format Converter',
        description: 'Konvertiert IPv4 in Binär, Dezimal und Hexadezimal.',
        route: '/ipconverter'
      },
      {
        title: 'Subnet Calculator',
        description: 'Berechnet Netzwerk-, Broadcast- und Hostadressen.',
        route: '/subnet'
      },
      {
        title: 'Transfer Time Calculator',
        description: 'Schätzt die Dauer einer Dateiübertragung.',
        route: '/transfer'
      },
      {
        title: 'Bandwidth Calculator',
        description: 'Berechnet die benötigte Bandbreite.',
        route: '/bandwidth'
      },
      {
        title: 'Latency Calculator',
        description: 'Ermittelt die geschätzte Signallaufzeit.',
        route: '/latency'
      }
    ]

    return { tools }
  }
})
</script>

<style scoped lang="less">
.hover-card {
  cursor: pointer;
  transition: 0.2s ease;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }
}
</style>
