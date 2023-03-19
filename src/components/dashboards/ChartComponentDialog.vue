<script setup lang="ts">
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { ref} from 'vue'
Chart.register(...registerables)

const props = defineProps<{
  dataValues: number[];
  dataLabels: string[];
  label: String;
}>();
const options = {
  responsive: true,
  maintainAspectRatio: false,

}
const data = ref({
  labels: props.dataLabels,
  datasets: [
    {
      label: props.label,
      data: props.dataValues,
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

