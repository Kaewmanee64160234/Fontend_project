<script setup lang="ts">
import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { ref} from 'vue'
Chart.register(...registerables)

const props = defineProps<{
  dataValues: number[];
  dataLabels: string[];
  label: String;
  color: String[];
}>();
const options = {
  responsive: true,
  maintainAspectRatio: false,
}

const data = ref({
  labels: props.dataLabels,
  datasets: [
      {
        data: props.dataValues,
        backgroundColor:  props.color,
      },
    ],
}

)
</script>

<template>
  
  <div>
    <DoughnutChart :chart-data="data" :options="options" ></DoughnutChart>
  </div>
</template>