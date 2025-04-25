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
        // Tool title
        v-card-title.text-h6.font-weight-bold.text-center {{ tool.title }}

        // Tool description
        v-card-text.text-body-2.text-grey-darken-1.mt-2.text-center {{ tool.description }}

        v-spacer

        // Navigation button
        v-card-actions.justify-center
          v-btn(
            :color="buttonColors[index % buttonColors.length]"
            variant="flat"
            class="text-white px-6"
            @click="$router.push(tool.route)"
          ) Open
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardPage',

  data() {
    return {
      // Available tools with title, description and route
      tools: [
        {
          title: 'IP Format Converter',
          description: 'Converts IPv4 addresses into binary, decimal and hexadecimal format.',
          route: '/ipconverter'
        },
        {
          title: 'Subnet Calculator',
          description: 'Calculates network, broadcast, and host address ranges based on IP and CIDR.',
          route: '/subnet'
        },
        {
          title: 'Transfer Time Calculator',
          description: 'Estimates the time required to transfer a file of a given size.',
          route: '/transfer'
        },
        {
          title: 'Bandwidth Calculator',
          description: 'Calculates required bandwidth based on file size and time.',
          route: '/bandwidth'
        },
        {
          title: 'Latency Calculator',
          description: 'Estimates signal latency based on distance and medium speed.',
          route: '/latency'
        }
      ],

      // Color variations for buttons, cycling through this list
      buttonColors: ['primary', 'secondary', 'success', 'info', 'warning']
    }
  }
})
</script>

<style scoped lang="less">
// Card hover effect
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

// Card bottom spacing
v-card {
  margin-bottom: 24px;
}

// Center-align card title and text
v-card-title,
v-card-text {
  text-align: center;
}
</style>
