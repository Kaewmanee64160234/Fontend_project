<script setup lang="ts">
import { LineChart } from 'vue-chart-3'
import { Chart, registerables} from 'chart.js'
import { ref } from 'vue'
Chart.register(...registerables)
const dataValues = ref([100, 200, 300, 400, 500, 450, 320, 600, 400, 200, 300, 500])
const dataLabels = ref([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
])
const options = {
  responsive: true,
  maintainAspectRatio: false,

}

const data = ref({
  labels: dataLabels.value,
  datasets: [
    {
      label: 'Year',
      data: dataValues.value,
      fill: true,
      backgroundColor: "rgb(237, 241, 214,0.5)",
      tension: 0.4,
      borderColor: '#609966',
      pointBackgroundColor: '#609966',
      pointStyle: 'circle',
      pointRadius: 5,
      pointHoverRadius: 8,
      
    }
  ],
 
}
)
  
</script>
<template>
  <div>
    <LineChart :chart-data="data" :options="options"></LineChart>
  </div>
</template>
