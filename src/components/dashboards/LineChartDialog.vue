<script setup lang="ts">
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { ref} from 'vue'
Chart.register(...registerables)

const props = defineProps<{
  type: "line";
  dataValues: number[];
  dataLabels: string[];
  label: string;
  color: string;
  backgroundColor: string;
  dataValues2: number[];
  dataLabels2: string[];
  label2: string;
  color2: string;
  backgroundColor2: string;
}>();
const options = {
  responsive: true,
  interaction: true,
    mode: 'index',
    intersect: false,
}
 
const scales = {
    y: {
        type: 'linear',
        display: true,
        position: 'left',
    },
    y1: {
        type: 'linear',
        display: true,
        position:'right',
        grid: {
            drawOnChartArea: false,
        }
    }
} 

const data = ref({
  labels: props.dataLabels,
  datasets: [
    {
      label: props.label,
      data: props.dataValues,
      borderColor: props.color,
      backgroundColor: props.backgroundColor,
      yAxisID: scales.y,
    },
    {
      label: props.label2,
      data: props.dataValues2,
      borderColor: props.color2,
      backgroundColor: props.backgroundColor2,
      yAxisID: scales.y1,
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

