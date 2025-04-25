<template lang="pug">
v-container(fluid class="pa-6")
  v-row(dense align="stretch" justify="center" class="g-4")
    v-col(
      v-for="(tool, index) in tools"
      :key="tool.route"
      cols="12"
      sm="6"
      md="4"
    )
      v-card.rounded-xl.pa-4.elevation-3.d-flex.flex-column.justify-space-between(
        class="hover-card"
        height="100%"
      )
        v-card-title.text-h6.font-weight-bold.text-center {{ tool.title }}
        v-card-text.text-body-2.text-grey-darken-1.mt-2.text-center {{ tool.description }}
        v-spacer
        v-card-actions.justify-center
          v-btn(
            :color="buttonColors[index % buttonColors.length]"
            variant="flat"
            class="text-white px-6"
            @click="$router.push(tool.route)"
          ) Öffnen
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardPage',

  data() {
    return {
      tools: [
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
      ],
      buttonColors: ['primary', 'secondary', 'success', 'info', 'warning']
    }
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
    transform: scale(1.03);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }
}

v-card {
  margin-bottom: 24px;
}

v-card-title,
v-card-text {
  text-align: center;
}
</style>
